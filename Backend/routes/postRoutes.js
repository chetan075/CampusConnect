const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createPost,
  getPosts,
  toggleLike,
  addComment,
  updatePost,
  deletePost
} = require("../controllers/postController");
const upload = require("../middleware/uploadMiddleware");

router.post("/createPost", protect,upload.single("image"), createPost);
router.get("/", protect, getPosts);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comment", protect, addComment);
router.put("/:id", protect, upload.single('image'), updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
