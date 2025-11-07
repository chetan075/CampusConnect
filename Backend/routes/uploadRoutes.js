const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const Event = require("../models/Event");

router.post("/profile", protect, upload.single("image"), async (req, res) => {
    try {
        console.log("req.file:", req.file);
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded. Use multipart/form-data field name 'image'." });
        }

        const user = await User.findById(req.user.id);
        user.profileImage = req.file.path; // cloudinary url
        await user.save();
        res.json({ message: "Profile Image Uploaded", imageUrl: req.file.path });
    } catch (err) {
        console.error("Error uploading profile image:", err);
        res.status(500).json({ error: "Server error" });
    }
})

// Upload event poster
router.post("/event/:id", protect, upload.single("image"), async (req, res) => {
  try {
    console.log("req.file:", req.file);
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded. Use multipart/form-data field name 'image'." });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    event.poster = req.file.path;
    await event.save();

    res.json({ message: "Event poster uploaded", imageUrl: req.file.path });
  } catch (err) {
    console.error("Error uploading event poster:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;