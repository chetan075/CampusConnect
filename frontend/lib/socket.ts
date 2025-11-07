import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// Connect without reading httpOnly cookie client-side. The cookie will be sent
// automatically by the browser if CORS and transport options allow it.
export const connectSocket = () => {
    if (!socket) {
        socket = io(process.env.API_URL?.replace("/api", "") || "http://localhost:5000", {
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            // Ensure polling transport sends cookies (for initial HTTP polling handshake)
            transportOptions: {
                polling: {
                    withCredentials: true,
                },
            },
        });

        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket?.id);
        });

        socket.on("disconnect", (reason) => {
            console.log("❌ Socket disconnected:", reason);
        });

        socket.on("connect_error", (err) => {
            console.error("⚠️ Socket connection error:", err?.message || err);
        });
    }
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};