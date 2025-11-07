"use client"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // Middleware enforces authentication for routes under /(protected).
  // Keep layout simple and render children directly. If you need
  // user data here, call /auth/me from the child page or implement
  // server-side fetching.
  return <>{children}</>;
}