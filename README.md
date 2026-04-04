# 🏠 HouseHold Tracker

> **A full-stack household inventory and grocery planning application** built with React, Express, and MongoDB.

---

## 📖 Introduction

HouseHold Tracker helps you manage your home inventory and plan grocery shopping in one place. Organize items into custom lists, track quantities and costs, search and filter your inventory, and export reports as PDFs — all from a clean, responsive dashboard.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Authentication** | Register, login, update profile, and logout with JWT-protected routes |
| 📋 **List Management** | Create, read, update, and delete inventory lists |
| 📦 **Item Management** | Add, view, edit, and delete items within any list |
| 🖥️ **Dashboard** | Protected dashboard with sidebar, inventory table, search, filter, and notifications |
| 📊 **Inventory Summary** | View total inventory value at a glance |
| 📤 **PDF Export** | Export selected list and its items as a PDF report |
| 🔔 **Notifications** | Real-time success, error, and info alerts for all user actions |

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, TypeScript, Vite, React Router, TanStack Query |
| **Backend** | Node.js, Express, Mongoose |
| **Database** | MongoDB (local or Atlas) |
| **Styling** | Tailwind CSS |
| **Utilities** | jsPDF, jspdf-autotable |
| **Package Manager** | pnpm (workspaces) |

---

## 📁 Project Structure

```
houseHoldTracker/
├── app/
│   ├── backend/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route logic (users, lists, items)
│   │   ├── middleware/       # Auth, validation, error handling
│   │   ├── model/            # Mongoose schemas
│   │   ├── routes/           # API endpoint definitions
│   │   ├── utils/            # Helpers (JWT, validation)
│   │   └── server.js         # Express app entry point
│   └── frontend/
│       └── src/
│           ├── api/          # Axios API clients for backend endpoints
│           ├── hooks/        # React hooks for data and logic
│           ├── pages/        # Page-level React components
│           ├── router/       # App route definitions
│           └── utils/        # Frontend helpers (PDF export, etc.)
├── docker-compose.yaml       # Local MongoDB service (optional)
├── .env                      # Environment variables (never commit!)
└── package.json              # Root workspace config
```

---

## ⚙️ Environment Variables

Create a **`.env`** file at the project root with the following variables:

```env
MONGO_URI=your_mongodb_connection_string_with_database_name
PORT=5000
SECRET_KEY=your_strong_random_secret
```

> ⚠️ **Never commit your `.env` file to version control.**

---

## 🚀 Installation & Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- MongoDB (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Steps

**1. Clone the repository**

```sh
git clone https://github.com/d-xmax/houseHoldTracker.git
cd houseHoldTracker
```

**2. Install all dependencies** from the project root:

```sh
pnpm install
```

**3. Set up environment variables** — create `.env` at the root (see [Environment Variables](#️-environment-variables)).

**4. Start the backend server:**

```sh
cd app/backend
pnpm dev
```

**5. Start the frontend development server:**

```sh
cd app/frontend
pnpm dev
```

**6. Open the app in your browser:**

```
http://localhost:5173
```

### Optional: Run MongoDB with Docker

If you don't have a local MongoDB instance, use Docker:

```sh
docker-compose up -d
```

Update your `MONGO_URI` in `.env`:

```env
MONGO_URI=mongodb://your_username:your_password@localhost:27017/houseHoldTracker?authSource=admin
```

> ⚠️ **Replace `your_username` and `your_password` with strong, unique credentials.** The defaults in `docker-compose.yaml` are for local development only — never use them in production.

---

## 📡 API Overview

### Auth Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users` | Register a new user |
| `POST` | `/api/users/auth` | Login and receive JWT |
| `GET` | `/api/users/profile` | Get current user's profile |
| `PUT` | `/api/users/profile` | Update current user's profile |
| `POST` | `/api/users/logout` | Logout current user |

### List Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/list` | Create a new list |
| `GET` | `/api/list` | Get all lists for the user |
| `GET` | `/api/list/:id` | Get a specific list by ID |
| `PUT` | `/api/list/:id` | Update a list |
| `DELETE` | `/api/list/:id` | Delete a list |

### Item Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/:listId/item` | Create a new item in a list |
| `GET` | `/api/:listId/item` | Get all items in a list |
| `GET` | `/api/item/:itemId` | Get a single item by ID |
| `PUT` | `/api/item/:itemId` | Update an item |
| `DELETE` | `/api/item/:itemId` | Delete an item |

---

## 🏗️ Frontend Architecture

### Data Flow Overview

```
Backend API
    ↓
Axios API Clients  (app/frontend/src/api/)
    ↓
TanStack Query Hooks  (useListsInfo, useItemsInfo, useLists, useItems)
    ↓
useInventory Hook  ← Central logic hub (forms, modals, actions, state)
    ↓
GroceryPlanner Component  ← Main dashboard UI
    ↓
Child Components  (Sidebar, Table, Modals, Notifications)
```

### Key Concepts

- **`app/frontend/src/api/`** — Axios-based API clients, one file per resource:
  - `lists.ts` — CRUD for `/api/list` endpoints
  - `items.ts` — CRUD for `/api/:listId/item` and `/api/item/:itemId`
  - `login.ts` / `register.ts` — Authentication endpoints
  - `axios.ts` — Shared Axios instance with base URL and token handling

- **Info Hooks** (`useListsInfo`, `useItemsInfo`) — Fetch and cache server data using TanStack Query.
- **Mutation Hooks** (`useLists`, `useItems`) — Handle create, update, and delete operations, keeping the cache in sync.
- **`useInventory`** — The central logic hub: combines all data, manages form state, modals, and user actions for the dashboard.
- **`GroceryPlanner`** — Main dashboard component; consumes `useInventory` and distributes data/handlers to child components.
- **Modals** — Each form (add/edit list, add/edit item, bulk add, delete confirm) is a dedicated modal component.
- **`NotificationAlert`** — Shared notification component triggered by `useInventory` actions.

---

## 🤝 Contributing

Contributions are welcome! Follow these steps to get started:

1. **Fork** the repository on GitHub.
2. **Create a new branch** for your feature or fix:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and commit with a clear message:
   ```sh
   git commit -m "feat: add your feature description"
   ```
4. **Push** your branch to your fork:
   ```sh
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against the `main` branch and describe your changes.

---

## 🚢 Production Notes

- Deploy **backend** and **frontend** separately (e.g., Railway, Render, Vercel).
- Configure a **frontend rewrite or proxy** to forward `/api` requests to the backend.
- Use a **MongoDB Atlas** connection string with an explicit database name in `MONGO_URI`.
- **Rotate and protect all secrets** before going live — never expose `SECRET_KEY` publicly.

---

## 📄 License

This project is open source. See the repository for license details.
