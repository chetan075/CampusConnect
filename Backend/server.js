const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const app = require("./app");
const Message = require("./models/Message");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Socket authentication middleware
io.use((socket, next) => {
    // Try token from handshake.auth first (used for non-cookie flows)
    let token = socket.handshake.auth && socket.handshake.auth.token;

    // If not provided, try to parse cookie header from the handshake (cookie-based auth)
    if (!token && socket.handshake && socket.handshake.headers && socket.handshake.headers.cookie) {
        const cookieHeader = socket.handshake.headers.cookie;
        // very small cookie parser for the handshake
        const parseCookies = (str) => {
            return str.split(';').map(s => s.trim()).reduce((acc, pair) => {
                const eq = pair.indexOf('=');
                if (eq === -1) return acc;
                const key = pair.substring(0, eq).trim();
                const val = pair.substring(eq + 1).trim();
                try { acc[key] = decodeURIComponent(val); } catch (e) { acc[key] = val; }
                return acc;
            }, {});
        };

        const cookies = parseCookies(cookieHeader);
        if (cookies && cookies.token) token = cookies.token;
    }

    if (!token) return next(); // allow anonymous sockets if you want

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // available on socket in handlers
        return next();
    } catch (err) {
        return next(new Error("Unauthorized"));
    }
});

// Handling socket events
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id, "user:", socket.user ? socket.user.id : "anon");

    socket.on("join", (userId) => {
        socket.join(userId);
        // When a user joins, send them recent messages addressed to them so
        // they see messages that arrived while they were offline.
        (async () => {
            try {
                const undelivered = await Message.find({ receiver: userId }).sort({ createdAt: 1 }).limit(200);
                undelivered.forEach((m) => {
                    // emit each message directly to the socket that just joined
                    socket.emit('receive_message', m);
                });
            } catch (err) {
                console.error('Error sending stored messages on join', err);
            }
        })();
    });

    socket.on("send_message", async (payload) => {
        
        const { receiverId, text, meta } = payload; 

        const senderId = socket.user ? socket.user.id : false;

        if (!senderId) {
            const errRes = { stats: "error", message: "Unauthorized: no sender id" };
            if (ack) return ack(errRes);
            return;
        }

        const message = new Message({
            // from: socket.user ? socket.user.id : null,
            sender: senderId,
            receiver: receiverId,
            // text,
            content: text,
            meta,
            createdAt: new Date(),
        });

        await message.save();

        io.to(receiverId).emit("receive_message", message);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));