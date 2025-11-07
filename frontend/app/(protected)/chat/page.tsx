"use client"

import React, { useEffect, useState, useRef } from "react";
import axios from "../../../lib/axios";
import { connectSocket, getSocket, disconnectSocket } from "../../../lib/socket";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [receiver, setReceiver] = useState("");
  const [me, setMe] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      try {
        const res = await axios.get("/auth/me");
        if (cancelled) return;
        setMe(res.data);
        try {
          const ures = await axios.get("/users");
          if (!cancelled) setUsers(ures.data || []);
        } catch (e) {
          console.warn("Could not fetch users list", e);
        }
        connectSocket();
        const socket = getSocket();
        if (socket && res.data && (res.data._id || res.data.id)) {
          const userId = res.data._id || res.data.id;
          socket.emit("join", userId);
        }
        socket?.on("receive_message", (msg: any) => {
          setMessages((prev) => {
            if (!msg) return prev;
            if (msg._id && prev.some((m) => m._id === msg._id)) return prev;
            return [...prev, msg];
          });
        });
      } catch (err) {
        console.error("Failed to init chat", err);
      }
    };
    init();
    return () => {
      cancelled = true;
      const s = getSocket();
      if (s) s.off("receive_message");
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const t = setTimeout(() => (el.scrollTop = el.scrollHeight), 50);
    return () => clearTimeout(t);
  }, [messages]);

  const send = () => {
    if (!text || !receiver) return alert("Provide receiver id and message");
    const s = getSocket();
    if (!s) return alert("Socket not connected");
    const senderId = me?._id || me?.id || "me";
    s.emit("send_message", { receiverId: receiver, text });
    setMessages((prev) => [...prev, { sender: senderId, receiver, content: text, createdAt: new Date() }]);
    setText("");
  };

  // fetch conversation when receiver changes
  useEffect(() => {
    if (!me || !receiver) return;
    const myId = me._id || me.id;
    if (!myId) return;
    let cancelled = false;
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`/messages/${myId}/${receiver}`);
        if (cancelled) return;
        setMessages(res.data || []);
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };
    fetchHistory();
    return () => {
      cancelled = true;
    };
  }, [receiver, me]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Chat</h1>
        <div className="flex gap-4">
          <aside className="w-72 border rounded p-2 bg-white">
            <h3 className="font-semibold mb-2">Contacts</h3>
            <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
              {users.map((u) => (
                <li
                  key={u._id}
                  className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${selectedUser && selectedUser._id === u._id ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSelectedUser(u);
                    setReceiver(u._id);
                    setMessages([]);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm overflow-hidden">
                      {u.profileImage ? <img src={u.profileImage} alt={u.name} className="w-full h-full object-cover" /> : <span className="text-sm font-semibold">{u.name?.charAt(0).toUpperCase()}</span>}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium truncate">{u.name}</div>
                      <div className="text-xs text-gray-500 truncate">{u.email}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <main className="flex-1 flex flex-col">
            <div className="border-b pb-3 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  {selectedUser?.profileImage ? (
                    <img src={selectedUser.profileImage} alt={selectedUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-semibold">{selectedUser?.name?.charAt(0)?.toUpperCase() || "-"}</span>
                  )}
                </div>
                <div>
                  <div className="font-medium">{selectedUser?.name || "Select a contact"}</div>
                  <div className="text-xs text-gray-500">{selectedUser?.email || ""}</div>
                </div>
              </div>
              <div>
                <button className="text-sm text-gray-600" onClick={() => { setSelectedUser(null); setReceiver(""); setMessages([]); }}>Close</button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-3 max-h-[60vh]">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">No messages yet. Say hello 👋</div>
              ) : (
                messages.map((m: any, idx: number) => {
                  const myId = me?._id || me?.id;
                  const isMe = myId && String(m.sender) === String(myId);
                  return (
                    <div key={m._id || idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`${isMe ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"} max-w-[70%] p-3 rounded-lg`}>
                        <div className="text-sm">{m.content || m.text}</div>
                        <div className="text-[10px] text-gray-400 mt-1 text-right">{m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-3">
              <div className="flex gap-2">
                <input aria-label="message" value={text} onChange={(e) => setText(e.target.value)} placeholder={selectedUser ? `Message ${selectedUser.name}` : "Select a contact to chat"} className="flex-1 border p-2 rounded" disabled={!selectedUser} />
                <button onClick={send} className="bg-blue-600 text-white px-4 py-2 rounded" disabled={!selectedUser || !text}>Send</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
