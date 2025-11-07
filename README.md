# Campus Connect

Campus Connect is a lightweight full-stack social platform for students built as a learning project. It demonstrates a real-world web application architecture with user authentication, persistent storage, file uploads, real-time chat, and a modern frontend built on Next.js.

## Key features

- Email/password authentication with server-set httpOnly JWT cookie
- Protected routes on the frontend using Next middleware
- Posts: create (image upload supported), edit, delete, like and comment
- Events: create (poster upload supported), list, RSVP toggle
- Profile: view and edit profile, upload profile image
- Real-time chat using Socket.io (authenticated handshakes)
- File uploads endpoints (profile images, post images, event posters)
- Admin API endpoints (server-side) for moderation (backend)

## Tech stack

- Frontend: Next.js (App Router), TypeScript, Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose), Socket.io, Multer
- Authentication: JWT stored in httpOnly cookies
- Storage: Local filesystem or cloud provider helper (Cloudinary) via upload helpers

## Folder structure

- `backend/` — Express API, controllers, models, middleware, upload helpers
- `frontend/` — Next.js app (App Router), client components, pages and layout

## Local development

Prerequisites:
- Node.js (16+)
- MongoDB connection (local or cloud)

Start backend

1. Open a terminal and go to the backend folder:

```powershell
cd "d:\IMPS CHETAN\programming\web dev\projects\Fresh projects\Campus_Connect\backend"
npm install
npm run dev
```

The backend server will start (default port configured in `server.js` or `app.js`).

Start frontend

```powershell
cd "d:\IMPS CHETAN\programming\web dev\projects\Fresh projects\Campus_Connect\frontend"
npm install
npm run dev
```

Open `http://localhost:3000` for the public landing page. The `/dashboard` and other protected routes require authentication.

## Configuration / Environment variables

Create a `.env` in the backend folder (example keys):

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=supersecretkey
PORT=5000
CLOUDINARY_URL=optional_if_using_cloudinary
```

Frontend may need environment variables if you integrate third-party services (Cloudinary, external APIs). The frontend axios client is already configured to send credentials (cookies) with requests.

## API overview

Key endpoints (expressed without `/api` prefix if proxied):

- `POST /auth/register` — register user
- `POST /auth/login` — login and set httpOnly cookie
- `POST /auth/logout` — clear cookie
- `GET /auth/me` — return current user (based on cookie)

- `GET /posts` — list posts
- `POST /posts/createPost` — create a post (multipart: image + content)
- `PUT /posts/:id` — update a post (author only)
- `DELETE /posts/:id` — delete a post (author or admin)
- `POST /posts/:id/like` — toggle like
- `POST /posts/:id/comment` — add comment

- `GET /events` — list events
- `POST /events` — create event
- `POST /events/:id/rsvp` — toggle RSVP
- `POST /upload/profile` — upload profile image
- `POST /upload/event/:id` — upload event poster

- `GET /messages/:userA/:userB` — conversation history

## Notes & known issues

- The project uses server-set httpOnly JWT cookies to avoid storing tokens in localStorage. Make sure CORS and cookie settings are configured correctly when running frontend and backend on different origins.
- Images in the frontend currently use `<img>` elements for simplicity. Converting to `next/image` improves performance and satisfies Next.js lint rules.
- There are some accessibility and lint warnings flagged by Next.js (labels, image optimization). These are small polish tasks that can be addressed incrementally.

## Contributing

This project was built as an educational/full-stack demo. If you want to contribute:

1. Fork the repo
2. Create a feature branch
3. Run the backend and frontend locally
4. Open a PR with tests or screenshots for UI changes

