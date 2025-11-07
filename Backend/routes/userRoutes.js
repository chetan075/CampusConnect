const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
    getUserProfile,
    getUserPosts,
    getUserEvents,
    getUsers
} = require("../controllers/userController");

// list users for contacts
router.get("/", getUsers);

router.get("/:id", getUserProfile);
router.get("/:id/posts", getUserPosts);
router.get("/:id/events", getUserEvents);
// update profile (protected)
router.put("/:id", protect, require('../controllers/userController').updateUser);

module.exports = router;