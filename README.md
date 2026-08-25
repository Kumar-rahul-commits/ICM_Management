# Ticket Management App

A full-stack incident/ticket management system with role-based access, threaded comments, activity history, SLA tracking, and full search, filter, and pagination. Users raise support tickets and track their status; support engineers work a shared queue, assign tickets to themselves, and resolve them.

---

## Features

- **Authentication & roles** — register and log in with JWT-based auth. Two roles: **user** (raises and tracks their own tickets) and **engineer** (works the full queue and resolves tickets). Users are routed to their home; engineers to the console.
- **Ticket lifecycle** — create tickets with a title, description, and priority; view, update status (open → in-progress → resolved), and change priority.
- **Assignment** — engineers self-assign tickets, and can reassign a ticket already taken by another engineer.
- **Comments** — a threaded conversation on each ticket between the ticket owner and engineers, with engineer comments visually distinguished.
- **Activity history** — an automatic audit trail of everything that happens to a ticket (created, assigned, status changes), shown newest-first.
- **Search, filter & pagination** — a dedicated All Tickets page with title search (debounced), combinable status and priority filters, and paginated results. A global search in the top bar carries a query into this page.
- **SLA tracking** — every ticket gets a resolution deadline based on priority (high = 4h, medium = 24h, low = 72h). The UI shows live time-remaining, colour-coded amber when under an hour and red when breached; resolved tickets stop the countdown.
- **Dashboard stats** — the engineer console shows live counts (Assigned to me / Due today / Resolved today) computed from real data.
- **Polish** — light/dark theme that persists across reloads, protected routes (unauthenticated users are redirected to login), and logout.

---

## Tech Stack

**Frontend**
- React (with Vite)
- React Router (routing, protected routes, URL search params)
- Tailwind CSS (semantic colour tokens, class-based dark mode)
- Axios (API calls, with a token interceptor)
- React Context (global auth state)

**Backend**
- Node.js + Express
- MongoDB (Atlas) with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

---

## Architecture

The project is split into two independent apps: a React frontend (`client/`) and an Express API (`server/`), talking over HTTP/JSON.

### Authentication flow

1. On register/login, the server hashes/verifies the password (bcrypt) and signs a JWT containing the user's id and role.
2. The frontend stores the token and attaches it to every request via an Axios interceptor (`Authorization: Bearer <token>`).
3. Protected API routes run a `protect` middleware that verifies the token and sets `req.user`; an `authorize` middleware restricts certain routes to engineers.
4. On the frontend, an `AuthContext` holds the current user, and `ProtectedRoute` / `PublicOnlyRoute` wrappers redirect based on auth state.

### Data models

- **User** — name, email (unique), hashed password, role (`user` | `engineer`).
- **Ticket** — title, description, status (`open` | `in-progress` | `resolved`), priority (`low` | `medium` | `high`), `createdBy` (ref User), `assignedTo` (ref User), `slaDeadline` (Date), timestamps.
- **Comment** — `ticket` (ref Ticket), `author` (ref User), body, timestamps.
- **Activity** — `ticket` (ref Ticket), `actor` (ref User), action, timestamps.

References are resolved with Mongoose `populate` so responses include the related user's name/role rather than a raw id.

### Role-based data access

A single `GET /api/tickets` endpoint serves both roles: users are filtered to only their own tickets (`createdBy = req.user.id`), while engineers see all. Filters, search, and pagination layer on top of this via query parameters.

### Folder structure

```
ticket-management-app/
├── client/                     # React frontend
│   └── src/
│       ├── components/         # UI components
│       │   ├── common/         # Badge, StatCard, ThemeToggle, Avatar
│       │   ├── layout/         # Sidebar, TopBar, PageHeader
│       │   ├── tickets/        # TicketRow, WorkQueue, CommentThread, ActivityLog, etc.
│       │   ├── ProtectedRoute.jsx
│       │   └── PublicOnlyRoute.jsx
│       ├── context/            # AuthContext (global auth state)
│       ├── pages/              # EngineerConsole, UserHome, AllTickets,
│       │                       #   TicketDetail, CreateTicket, Login, Register
│       ├── routes/             # router config + path constants
│       ├── services/           # api (axios), authService, ticketService,
│       │                       #   commentService, activityService
│       └── utils/              # sla.js (time-remaining helper)
│
└── server/                     # Express API
    ├── config/                 # db.js (Mongoose connection), sla.js (SLA rules)
    ├── controllers/            # authController, ticketController, commentController
    ├── middleware/             # authMiddleware (protect, authorize)
    ├── models/                 # User, Ticket, Comment, Activity
    ├── routes/                 # authRoutes, ticketRoutes
    └── index.js                # app entry (middleware + route mounting)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account and cluster (free tier is fine)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ticket-management-app
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret_string
PORT=5000
```

- **MONGODB_URI** — from your Atlas cluster (Connect → Drivers). Include a database name after the host, e.g. `.../ticketdb?...`.
- **JWT_SECRET** — any long random string; it signs the auth tokens.
- **PORT** — the port the API runs on (defaults to 5000).

> In Atlas, make sure your IP is allowed under **Network Access** (add your current IP, or `0.0.0.0/0` for development).

Start the backend:

```bash
npm run dev
```

You should see `Server running on port 5000` and `MongoDB connected`.

### 3. Frontend setup

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173` (Vite's default).

### 4. Create an engineer account

Registration creates regular **user** accounts only (by design). To get an **engineer** account for the console:

1. Register a normal account through the UI.
2. In MongoDB Atlas, open the `users` collection and change that user's `role` field from `"user"` to `"engineer"`.
3. Log out and back in — you'll be routed to the engineer console.

---

## API Reference

All ticket, comment, and activity routes require an `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user; returns a token |
| POST | `/api/auth/login` | Log in; returns a token |

### Tickets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets` | List tickets (role-filtered). Query params: `search`, `status`, `priority`, `page`, `limit` |
| POST | `/api/tickets` | Create a ticket |
| GET | `/api/tickets/:id` | Get one ticket |
| PATCH | `/api/tickets/:id` | Update status/priority (engineer only) |
| PATCH | `/api/tickets/:id/assign` | Self-assign the ticket (engineer only) |

### Comments & Activity

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets/:id/comments` | List a ticket's comments |
| POST | `/api/tickets/:id/comments` | Add a comment (owner or engineer) |
| GET | `/api/tickets/:id/activity` | List a ticket's activity trail |

`GET /api/tickets` returns a paginated object: `{ tickets, total, page, totalPages }`.

---

## Key Design Decisions

- **Two roles, not three.** Scoped to `user` and `engineer` for a clear separation (users create, engineers resolve). Engineer promotion is done manually in the database rather than via an admin UI, since engineers are added rarely — an admin role would own this if the system grew.
- **MongoDB + Mongoose.** Chosen for flexible document modelling and easy relationships via `populate`.
- **React Context over Redux.** Auth is the only real piece of global state, so Context is the right-sized tool; Redux would be overkill.
- **Server-side search/filter/pagination.** The database does the filtering and returns only the requested page, so it scales rather than shipping all tickets to the browser.
- **SLA: store the deadline, compute time-remaining live.** The deadline is fixed at creation from priority; "time left" is derived at render against the current time, so it's always accurate without storing a stale value.
- **Layered security.** The frontend redirects unauthenticated users for UX, but the real enforcement is the backend `protect`/`authorize` middleware — the API rejects unauthorized requests regardless of the client.

---

## Possible Future Work

- Reopen workflow for resolved tickets (back to in-progress, with owner/engineer permissions)
- Editing/deleting comments; attachments
- Live-ticking SLA countdown (auto-refresh without reload)
- Automated tests (Jest + React Testing Library) and deployment
