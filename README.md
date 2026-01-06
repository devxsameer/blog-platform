# 📝 Blog Platform

A **production-style blog platform** built with modern React and TypeScript, featuring a public blog, a role-based admin dashboard, and a shared API client — all structured as a **pnpm monorepo**.

This project was designed to mirror real-world frontend systems, focusing on authentication flows, shared domain models, and scalable routing patterns.

---

## 🌐 Live URLs

- **Public Blog:** https://blog.devxsameer.me
- **Admin Dashboard:** https://dashboard.blog.devxsameer.me
- **Backend API:** https://blogapi.devxsameer.me

---

## ✨ Features

### Public Blog (`apps/web`)

- Read posts with **Markdown rendering**
- Syntax highlighting for code blocks
- **Table of Contents** generated from headings
- Nested comments with replies
- Post likes with **optimistic UI**
- Tag browsing
- Authentication (login / signup)
- Profile page

### Admin Dashboard (`apps/dashboard`)

- Role-based access (**admin / author**)
- Create, edit, archive, and delete posts
- Markdown editor with live preview
- Tag management
- Cursor-based pagination
- Dashboard analytics (posts, likes, views, comments)
- Secure logout & session handling

### Shared Packages (`packages/*`)

- Typed API client
- Centralized token handling
- Shared TypeScript domain models

Both applications share a single typed API client and domain model to ensure consistency across the platform.

---

## 🎯 Why This Project Exists

This blog was built as a **real application**, not a tutorial exercise.

Some parts may feel “over-engineered” for a personal blog — that is intentional.  
The goal was to practice:

- Production-style frontend architecture
- Authentication edge cases
- Scalable routing and data patterns
- Writing code that is easy to reason about and maintain

---

## 🧱 Tech Stack

### Frontend

- **React 19**
- **React Router v7 (Data APIs)**
- **TypeScript**
- **Tailwind CSS + DaisyUI**
- **Vite**

### Backend (separate repo)

- **Node.js + Express**
- **Drizzle ORM**
- **PostgreSQL**
- **Zod validation**
- **JWT + refresh token auth**

---

## 🗂 Monorepo Structure

```
blog-platform/
├─ apps/
│ ├─ web/ # Public blog
│ └─ dashboard/ # Admin dashboard
│
├─ packages/
│ ├─ api-client/ # Typed API client
│ ├─ token-store/ # In-memory access token store
│ └─ types/ # Shared domain types
│
└─ pnpm-workspace.yaml
```

---

## 🔐 Authentication Design

- **Access token** stored in memory (prevents XSS)
- **Refresh token** stored as httpOnly cookie
- Session restored on page reload via `/auth/refresh`
- Single refresh request guarded with a shared promise
- Backend remains the source of truth

Access tokens are intentionally kept out of persistent storage to reduce XSS impact.
This approach mirrors production-grade SPA authentication patterns.

---

## 🔄 Data Fetching Pattern

- **Route loaders** → read data
- **Route actions** → mutations
- **useFetcher** → background updates
- Cursor-based pagination (no offset queries)
- Parallel data loading with `defer`, `Suspense`, and `Await`

All data flow is predictable and colocated with routes.

---

## 🧠 Key Architectural Decisions

- Feature-based folder structure
- No global state library — router loaders own server state
- Domain-driven shared types (`@blog/types`)
- API client abstracts retries, auth refresh, and error handling
- Optimistic UI only where safe (likes)

---

## 🧪 Error Handling

- Centralized API error types
- Route-level error boundaries
- Graceful fallback UI for network and auth failures
- Dev-only stack traces

---

## 🚀 Running Locally

```bash
pnpm install
pnpm dev

```

Run apps individually:

```
pnpm dev:web
pnpm dev:dashboard
```

> Backend API should be running separately.
> See the Blog API repository for backend setup instructions.

---

## 👤 Author

**Sameer Ali** (@devxsameer)

- Portfolio: [https://devxsameer.me](https://devxsameer.me)
- GitHub: [https://github.com/devxsameer](https://github.com/devxsameer)
- LinkedIn: [https://www.linkedin.com/in/devxsameer](https://www.linkedin.com/in/devxsameer)

---

### 📄 License

ISC
