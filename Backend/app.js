const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");
const logger = require("./middleware/logger");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();

// Middleware
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

// Health check
app.get("/", (req, res) => {
    res.send("CampusConnect API is Live");
});

// Health check
app.get("/api", (req, res) => {
    res.send("CampusConnect API is Live");
});

module.exports = app;