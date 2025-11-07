const Post = require("../models/Post");

// Create a post
exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      image: req.file ? req.file.path : "",
      author: req.user.id,
    });
    await post.save();
    res.status(201).json({ message: "Post Created Successfully", post });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all posts (feed)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email role")
      .populate("comments.user", "name email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Like/Unlike post
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user.id;

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user.id,
      text: req.body.text,
    });

    await post.save();
    // return comments populated with user name/email
    const updated = await Post.findById(post._id).populate('comments.user', 'name email');
    res.json(updated.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a post (author only)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    if (req.body.content != null) post.content = req.body.content;
    if (req.file) post.image = req.file.path;

    await post.save();

    const populated = await Post.findById(post._id).populate('author', 'name email').populate('comments.user', 'name email');
    res.json({ message: 'Post updated', post: populated });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a post (author only)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
