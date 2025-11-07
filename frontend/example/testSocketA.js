import { io } from "socket.io-client";

const userId = "68ebbbffd66c021c2073969c"; // User A’s id
const receiverId = "68ebbbf7d66c021c20739699"; // User B’s id
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWJiYmZmZDY2YzAyMWMyMDczOTY5YyIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzYxNTc1NTg1LCJleHAiOjE3NjE2NjE5ODV9.IgJSNyQITw-TCURv4CIoH_jKk4I5jymX3j5tbw1FzAQ"; // User A’s JWT token

const socket = io("http://localhost:5000", {
  auth: { token },
});

socket.emit("join", userId);

socket.on("receive_message", (msg) => {
  console.log("📩 Message received by A:", msg);
});

setTimeout(() => {
  socket.emit("send_message", {
    receiverId,
    text: "Hey B, this is A!",
  });
}, 8000);