const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
    createEvent,
    getEvents,
    getEventById,
    rsvpEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

router.post("/", protect, createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/:id/rsvp", protect, rsvpEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;