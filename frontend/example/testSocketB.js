import { io } from "socket.io-client";

const userId = "68ebbbf7d66c021c20739699"; // User B’s id
const receiverId = "68ebbbffd66c021c2073969c"; // User A’s id
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWJiYmY3ZDY2YzAyMWMyMDczOTY5OSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzYxNTc1NzE1LCJleHAiOjE3NjE2NjIxMTV9.kGZKyar0sKR38CLlen20JPb83NZZDqVAlXENtNnlLK4"; // User B’s JWT token

const socket = io("http://localhost:5000", {
  auth: { token },
});

socket.emit("join", userId);

socket.on("receive_message", (msg) => {
  console.log("📩 Message received by B:", msg);
});

setTimeout(() => {
  socket.emit("send_message", {
    receiverId,
    text: "Hey A, I got your message!",
  });
}, 4000);