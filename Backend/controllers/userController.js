const User = require("../models/User");
const Post = require("../models/Post");
const Event = require("../models/Event");
const { deleteFromCloudinary } = require("../utils/cloudinaryHelper");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a list of users (for contacts list)
exports.getUsers = async (req, res) => {
  try {
    // basic list, exclude passwords
    const users = await User.find().select('-password').limit(200);
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = (await Post.find({ createdBy: req.params.id })).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUserEvents = async (req, res) => {
  try {
    const createdEvents = await Event.find({ createdBy: req.params.id });
    const rsvpEvents = await Event.find({ attendees: req.params.id });
    res.json({ createdEvents, rsvpEvents });
  } catch (err) {
    console.error("Error fetching user events:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Update user profile (author or admin)
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Only the user themselves or an admin can update
    if (req.user.id !== user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    const allowed = ['name', 'email'];
    allowed.forEach((k) => {
      if (req.body[k] !== undefined) user[k] = req.body[k];
    });

    await user.save();
    const out = user.toObject();
    delete out.password;
    res.status(200).json({ message: 'User updated', user: out });
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if current user owns the post
    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this post" });
    }

    // // 👇 If post has image, delete from Cloudinary
    // if (post.image) {
    //   // Extract public_id from URL (Cloudinary URL format example)
    //   const publicId = post.image.split("/").pop().split(".")[0];
    //   await cloudinary.uploader.destroy(`campus-connect/${publicId}`);
      // }
      
      await deleteFromCloudinary(post.image);

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};