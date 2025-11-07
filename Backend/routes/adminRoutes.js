const express = require("express");
const router = express.Router();
const adminOnly = require("../middleware/adminMiddleware");
const Event = require("../models/Event");
const Post = require("../models/Post");

router.get("/stats", adminOnly, async (res) => {
  const userCount = await User.countDocuments();
  const postCount = await Post.countDocuments();
  const eventCount = await Event.countDocuments();
  res.json({ users: userCount, posts: postCount, events: eventCount });
});

// Delete event
router.delete("/events/:id", adminOnly, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted by admin" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete post
router.delete("/posts/:id", adminOnly, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted by admin" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
