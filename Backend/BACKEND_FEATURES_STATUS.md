# Backend Features Status

Date: 2025-11-04

This document lists backend features, their current integration status with the frontend, short notes about implementation, and recommended next steps.

Summary (counts)
- Completed: 7
- In-progress / partial: 5
- Not started: 8

---

## Implemented / Integrated (Completed)
These backend capabilities are implemented and have working frontend integrations.

1. Auth: login / register / logout / /auth/me
   - Status: Completed
   - Notes: Server sets an httpOnly `token` cookie on login/register; `/auth/me` returns current user. Frontend uses `axios` withCredentials and Next middleware reads cookie to guard protected routes.

2. Auth: token & cookie handling
   - Status: Completed
   - Notes: `cookie-parser` and CORS with credentials enabled on server. Server reads token from cookie or Authorization header.

3. Middleware: auth & role checks
   - Status: Completed
   - Notes: `authMiddleware` attaches `req.user`. `adminMiddleware` exists and protects admin routes.

4. Posts: CRUD
   - Status: Completed
   - Notes: Endpoints: `POST /api/posts/createPost` (multipart), `GET /api/posts`, `GET /api/posts/:id`, `PUT /api/posts/:id`, `DELETE /api/posts/:id`. Author-only edit/delete enforced on server. Frontend supports list, new post (image upload), edit (text), delete.

5. Posts: interactions
   - Status: Completed
   - Notes: `POST /api/posts/:id/like`, `POST /api/posts/:id/comment` implemented. Backend populates `author` and `comments.user`. Frontend shows likes, comments, optimistic updates.

6. Messages: conversations & persistence
   - Status: Completed
   - Notes: REST endpoints to fetch conversation history used by chat UI (e.g., `GET /api/messages/:a/:b`). Messages are persisted and indexed for acceptable performance.

7. Socket.io: auth & realtime messages
   - Status: Completed
   - Notes: Socket handshake authenticates by reading cookie or handshake token. Server joins user rooms and relays/saves `private_message` events. Frontend socket client set to send cookies during handshake.

---

## In-progress / Partially integrated
Features implemented on the backend or partially available, but frontend needs more UI or wiring.

8. Users: profile endpoints
   - Status: In-progress
   - Notes: `GET /api/users` exists and is used for contacts list. Full profile view and edit endpoints exist but frontend profile editing and profile-image upload UI are incomplete.
   - Next: Add profile view page, edit form, and integrate profile image upload endpoint on frontend.

9. Events: CRUD & RSVP
   - Status: In-progress
   - Notes: Backend supports creating/listing events, and RSVP endpoint exists. Frontend events list & create page implemented; event detail, RSVP toggle UI and poster upload still need work.
   - Next: Add event detail page, RSVP button on event lists/details, and integrate poster upload flow.

10. Upload: file storage endpoints
    - Status: In-progress
    - Notes: Upload routes for profile images and event posters exist (multer/cloud helper). Frontend currently integrates post image uploads; profile/event upload UI remains to be added.
    - Next: Wire profile image and event poster upload components; adopt Cloudinary helper if desired for production.

11. Validation & sanitization
    - Status: In-progress
    - Notes: Some input validation present, but request validation/sanitization is not yet consistently applied across all endpoints.
    - Next: Add `express-validator` or `joi` to key endpoints (auth, posts, events, upload) and sanitize outputs.

12. Logging & error handling
    - Status: In-progress
    - Notes: Basic error handling exists; a centralized error handler and consistent structured logging should be formalized.
    - Next: Add centralized error middleware, integrate `morgan` for request logs and structured app-level logs for important events.

---

## Not started / Remaining
Features that are not yet implemented or not integrated on the frontend.

13. Auth: refresh & token expiry (optional)
    - Status: Not started
    - Notes: No refresh-token flow implemented. Consider short-lived JWT + refresh token pattern for production.

14. Notifications: comment / like / new message
    - Status: Not started
    - Notes: Server-side notification model and endpoints (`GET /api/notifications`, `POST /api/notifications/markRead`) are not implemented. Real-time push via socket is not wired.

15. Admin: stats & moderation
    - Status: Not started
    - Notes: Admin UI is missing. Server has admin routes but frontend admin pages and workflows are needed.

16. Search & filtering
    - Status: Not started
    - Notes: Add query-based search and server-side pagination for `GET /api/posts`, `GET /api/events`.

17. Rate limiting & security headers
    - Status: Not started
    - Notes: Add `express-rate-limit`, `helmet` and tighten CORS for production.

18. Testing & CI
    - Status: Not started
    - Notes: Add integration/unit tests and a CI pipeline to run tests on push.

19. Docs & API contract
    - Status: Not started
    - Notes: Create a concise API README describing endpoints and request/response shapes to help frontend devs.

20. Performance & indexes
    - Status: Not started
    - Notes: Add DB indexes (e.g., messages by participants, posts by createdAt) and review slow queries; add cursor-based pagination for feeds.

---

## Recommended Next Priorities (shortlist)
1. Event poster upload & RSVP UI (finishes key event flows) — medium effort, high impact.
2. Profile edit + profile-image upload (improves UX across app) — small effort.
3. Notifications (server + socket push) — increases engagement and ties chat/posts together.
4. Validation & security hardening (rate limiting, helmet) — important for production readiness.

---

## How to use this file
- This document mirrors the tracked todo list and should be updated as items are implemented.
- For any item marked "In-progress", create focused subtasks (e.g., "Event poster upload: add UI, wire POST /upload/event, show poster in event detail").

If you want, I can: create frontend pages/components for profile editing and event poster upload next, or generate the short API README that documents the current implemented endpoints. Pick one and I'll start implementing it.
