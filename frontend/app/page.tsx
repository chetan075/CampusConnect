import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-extrabold mb-3">Campus Connect</h1>
              <p className="text-gray-700 mb-6">
                A lightweight community for students to share posts, create and RSVP to events,
                and chat in real time. Built with an Express + MongoDB backend and a Next.js frontend.
              </p>

              <div className="flex gap-3 flex-wrap">
                <Link href="/login" className="px-5 py-3 bg-blue-600 text-white rounded-md">Log in</Link>
                <Link href="/register" className="px-5 py-3 border border-blue-600 text-blue-600 rounded-md">Register</Link>
                <Link href="/dashboard" className="px-5 py-3 text-gray-700 rounded-md bg-gray-100">Dashboard</Link>
              </div>
            </div>

            <div className="hidden md:block mt-6 md:mt-0">
              <div className="w-56 h-36 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-3xl">
                🎓
              </div>
            </div>
          </div>

          <hr className="my-8" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/posts" className="block p-4 bg-gray-50 rounded hover:shadow transition">
                <div className="text-2xl mb-2">📝</div>
                <div className="font-semibold">Posts</div>
                <div className="text-sm text-gray-600">Share updates and photos with your campus.</div>
              </Link>

              <Link href="/events" className="block p-4 bg-gray-50 rounded hover:shadow transition">
                <div className="text-2xl mb-2">📅</div>
                <div className="font-semibold">Events</div>
                <div className="text-sm text-gray-600">Create events and RSVP to those you plan to attend.</div>
              </Link>

              <Link href="/chat" className="block p-4 bg-gray-50 rounded hover:shadow transition">
                <div className="text-2xl mb-2">💬</div>
                <div className="font-semibold">Chat</div>
                <div className="text-sm text-gray-600">Real-time messaging with other students.</div>
              </Link>

              <Link href="/profile" className="block p-4 bg-gray-50 rounded hover:shadow transition">
                <div className="text-2xl mb-2">👤</div>
                <div className="font-semibold">Profile</div>
                <div className="text-sm text-gray-600">Manage your account and profile picture.</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
