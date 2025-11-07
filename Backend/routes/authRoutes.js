const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;