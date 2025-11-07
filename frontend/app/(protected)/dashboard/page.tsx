"use client"

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // ignore errors
    } finally {
      // force full reload to clear any client state
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-600">Your home for quick actions</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-3 py-2 bg-red-600 text-white rounded"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/posts"
            className="block p-6 bg-white rounded shadow hover:shadow-md transition transform hover:-translate-y-1"
          >
            <div className="h-40 flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-2">📝</div>
                <h3 className="text-lg font-semibold mb-1">Posts</h3>
                <p className="text-sm text-gray-600">See and create posts from the community.</p>
              </div>
              <div className="text-xs text-gray-400">Open feed</div>
            </div>
          </Link>

          <Link
            href="/events"
            className="block p-6 bg-white rounded shadow hover:shadow-md transition transform hover:-translate-y-1"
          >
            <div className="h-40 flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-2">📅</div>
                <h3 className="text-lg font-semibold mb-1">Events</h3>
                <p className="text-sm text-gray-600">Browse and RSVP to campus events.</p>
              </div>
              <div className="text-xs text-gray-400">Find events</div>
            </div>
          </Link>

          <Link
            href="/chat"
            className="block p-6 bg-white rounded shadow hover:shadow-md transition transform hover:-translate-y-1"
          >
            <div className="h-40 flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-2">💬</div>
                <h3 className="text-lg font-semibold mb-1">Chat</h3>
                <p className="text-sm text-gray-600">Open real-time conversations with classmates.</p>
              </div>
              <div className="text-xs text-gray-400">Start chatting</div>
            </div>
          </Link>

          <Link
            href="/profile"
            className="block p-6 bg-white rounded shadow hover:shadow-md transition transform hover:-translate-y-1"
          >
            <div className="h-40 flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-2">👤</div>
                <h3 className="text-lg font-semibold mb-1">Profile</h3>
                <p className="text-sm text-gray-600">Edit your profile and update your picture.</p>
              </div>
              <div className="text-xs text-gray-400">Manage account</div>
            </div>
          </Link>
        </section>

        <footer className="mt-8 text-sm text-gray-500">
          <p>
            Tip: use the quick links above. If you see an access error, make sure
            you are signed in and have the correct role.
          </p>
        </footer>
      </div>
    </div>
  );
}
