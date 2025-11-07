const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      createdBy: req.user.id,
    });
    await event.save();
    res.status(201).json({ event });
  } catch (err) {
    console.error("Error creating event:", err.message);
    res.status(500).json({ error: "server error" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const { upcoming, past, createdBy, limit = 10, page = 1 } = req.query;

    const filter = {};
    const now = new Date();

    if (upcoming === "true") {
      filter.date = { $gte: now };
    } else if (past === "true") {
      filter.date = { $le: now };
    }

    if (createdBy) {
      filter.createdBy = createdBy;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const events = await Event.find(filter)
      .populate("createdBy", "name")
      .sort({ date: 1 })
      .skip(skip)
      .limit(limitNum);

    const totalEvents = await Event.countDocuments(filter);

    res.status(200).json({
      total: totalEvents,
      page: pageNum,
      limit: limitNum,
      events,
    });
  } catch (err) {
    console.error("Error fetching events:", err.message);
    res.status(500).json({ error: "server error" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(400).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    console.error("Error fetching event:", err.message);
    res.status(500).json({ error: "server error" });
  }
};

exports.rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const userId = req.user.id;

    if (event.attendees.includes(userId)) {
      // Optional: toggle off RSVP
      event.attendees.pull(userId);
      await event.save();
      return res.status(200).json({ message: "RSVP removed", event });
    } else {
      // Add user (RSVP)
      event.attendees.push(userId);
    }

    await event.save();

    res.status(200).json({ message: "RSVP added", event });
  } catch (err) {
    console.error("Error rsvping event:", err.message);
    res.status(500).json({ error: "server error" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(event, req.body);
    await event.save();
    res.status(200).json({ message: "Event updated", event });
  } catch (err) {
    console.error("Error updating event:", err.message);
    res.status(500).json({ error: "server error" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.save();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err.message);
    res.status(500).json({ error: "server error" });
  }
};
