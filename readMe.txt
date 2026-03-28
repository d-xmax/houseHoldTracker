### API Folder (Frontend)

All files inside `app/frontend/src/api/` are responsible for communicating with backend endpoints using Axios. Each file is focused on a specific resource or feature:

- **lists.ts** — Functions for all `/api/list` endpoints (create, read, update, delete lists).
- **items.ts** — Functions for `/api/:listId/item` (create/get items for a list) and `/api/item/:itemId` (get, update, delete a single item).
- **login.ts** and **register.ts** — Functions for authentication endpoints (`/api/users/auth`, `/api/users`).
- **axios.ts** — Sets up the shared Axios instance, including base URL and automatic token handling for authenticated requests.

These API functions are used by React hooks and components throughout the frontend to send HTTP requests (GET, POST, PUT, DELETE) to the backend. This structure keeps backend communication organized, reusable, and easy to maintain.
## Frontend Architecture and Data Flow

### Hooks for Backend Communication

- **Info Hooks**  
	Hooks like `useListsInfo` and `useItemsInfo` are responsible for fetching data from the backend.  
	- They use TanStack Query to cache and manage server state.  
	- Example: `useListsInfo` fetches all lists for the current user and keeps them in sync with the backend.

- **Mutation Hooks**  
	Hooks like `useLists` and `useItems` handle create, update, and delete operations (mutations).  
	- They use TanStack Query’s mutation features to send changes to the backend and automatically update the cache.

### The Brain: `useInventory` Hook

- `useInventory` is the central logic hub for the dashboard.  
	- It combines all list and item info, handles form state, manages modals, and processes user actions.  
	- It does everything except authentication.  
	- All business logic for adding, editing, deleting, searching, filtering, and exporting is managed here.

### Main UI Connection: `GroceryPlanner`

- The `GroceryPlanner` component is the main dashboard page.  
	- It uses `useInventory` to get all data and actions.  
	- Passes this data and handlers to child components (sidebar, table, modals, etc).  
	- This keeps the UI and logic cleanly separated.

### Modals for Forms

- Each form (add/edit list, add/edit item, bulk add, delete confirm) is implemented as a modal component.  
	- Modals are opened/closed and populated by state managed in `useInventory`.  
	- This makes the UI responsive and user-friendly.

### Notifications

- All user feedback (success, error, info) is handled by a shared `NotificationAlert` component.  
	- Notifications are triggered by actions in `useInventory` and displayed at the top of the dashboard.

### Layout

- `DashboardSidebar` and `DashboardHeader` are used as layout components.  
	- They provide navigation and context for the dashboard.
- The main content area (lists, items, forms) is rendered via React Router’s `<Outlet />` pattern, allowing for modular and extendable UI.

**Summary:**  
- All backend communication is handled by hooks (info for queries, others for mutations).  
- `useInventory` is the main logic controller for the dashboard.  
- `GroceryPlanner` is the main UI, connecting logic and presentation.  
- Modals and notifications provide a smooth user experience.  
- Layout is modular, with sidebar/header and main content separated.
## Item API Endpoints and Controller Responsibilities

The backend item API is divided for clarity and security:

### 1. List-based Item Operations (`/api/:listId/item`)
- **POST /api/:listId/item**  
	Create a new item in the specified list.  
	Checks if the list exists and belongs to the user.  
	Only then allows item creation.
- **GET /api/:listId/item**  
	Get all items for a specific list.  
	Only returns items if the list belongs to the user.
**Controller:**  
See `itemControllerWithListParam.js`  
Handles create and get-all for items by list.

### 2. Item-based Operations (`/api/item/:itemId`)
- **GET /api/item/:itemId**  
	Get a single item by its ID.
- **PUT /api/item/:itemId**  
	Update an item by its ID.
- **DELETE /api/item/:itemId**  
	Delete an item by its ID.
**Controller:**  
See `itemController.js`  
Handles get, update, and delete for a single item.
### 1. List-based Item Operations (`/api/:listId/item`)
- **POST /api/:listId/item**  
	Create a new item in the specified list.  
	Checks if the list exists and belongs to the user.  
	Only then allows item creation.
- **GET /api/:listId/item**  
	Get all items for a specific list.  
	Only returns items if the list belongs to the user.
**Controller:**  
See `itemControllerWithListParam.js`  
Handles create and get-all for items by list.

### 2. Item-based Operations (`/api/item/:itemId`)
- **GET /api/item/:itemId**  
	Get a single item by its ID.
- **PUT /api/item/:itemId**  
	Update an item by its ID.
- **DELETE /api/item/:itemId**  
	Delete an item by its ID.
**Controller:**  
See `itemController.js`  
Handles get, update, and delete for a single item.
## HouseHold Tracker

Full-stack household inventory and grocery planning app built with React, Express, and MongoDB.

---

## Features

### 1. User Authentication
- Register new account
- Login with email and password
- Get/update user profile
- Logout
- Protected routes with JWT verification

### 2. List Management
- Create, read, update, delete lists

### 3. Item Management
- Add item to a selected list
- Get all items in a list
- Get, update, delete single item

### 4. Dashboard Experience
- Protected dashboard route
- List sidebar and inventory table
- Create/edit/delete modals
- Bulk add modal
- Search, filter, notifications
- Total inventory value summary

### 5. Export
- Export selected list and items as PDF

---

## Project Structure

```
app/
  backend/
	 config/           # DB config
	 controllers/      # Route logic (users, lists, items)
	 middleware/       # Auth, validation, error handling
	 model/            # Mongoose schemas
	 routes/           # API endpoint definitions
	 utils/            # Helpers (JWT, validation)
	 server.js         # Express app entry
  frontend/
	 src/
		api/            # Axios API clients for backend endpoints
		hooks/          # React hooks for data and logic
		pages/          # Page-level React components
		router/         # App route definitions
		utils/          # Frontend helpers (PDF export, etc)
		...             # UI components, layouts, etc
	 ...               # Vite config, static files
docker-compose.yaml   # (Optional) Local MongoDB service
.env                  # Environment variables (never commit!)
```

---

## Frontend Architecture and Data Flow

### Hooks for Backend Communication
- **Info Hooks**: `useListsInfo`, `useItemsInfo` fetch and cache data using TanStack Query.
- **Mutation Hooks**: `useLists`, `useItems` handle create, update, delete and update the cache.

### The Brain: `useInventory` Hook
- Central logic hub for the dashboard (all business logic except authentication).
- Manages list/item info, form state, modals, and user actions.

### Main UI Connection: `GroceryPlanner`
- Main dashboard page, uses `useInventory` for all data/actions.
- Passes data/handlers to child components (sidebar, table, modals).

### Modals for Forms
- Each form (add/edit list, add/edit item, bulk add, delete confirm) is a modal component.
- Modals are opened/closed and populated by state in `useInventory`.

### Notifications
- All user feedback handled by shared `NotificationAlert` component.
- Triggered by actions in `useInventory`.

### Layout
- `DashboardSidebar` and `DashboardHeader` provide navigation/context.
- Main content area rendered via React Router’s `<Outlet />` for modular UI.

### API Folder (Frontend)
- All files in `app/frontend/src/api/` communicate with backend endpoints using Axios.
- Each file (e.g., `lists.ts`, `items.ts`, `login.ts`, `register.ts`) wraps HTTP requests for a specific resource.
- `axios.ts` sets up the shared Axios instance and token handling.

---

## Backend API Endpoints and Controller Responsibilities

### 1. List-based Item Operations (`/api/:listId/item`)
- **POST /api/:listId/item**: Create a new item in the specified list. Checks if the list exists and belongs to the user before creation.
- **GET /api/:listId/item**: Get all items for a specific list. Only returns items if the list belongs to the user.
**Controller:** `itemControllerWithListParam.js` (handles create and get-all for items by list)

### 2. Item-based Operations (`/api/item/:itemId`)
- **GET /api/item/:itemId**: Get a single item by its ID.
- **PUT /api/item/:itemId**: Update an item by its ID.
- **DELETE /api/item/:itemId**: Delete an item by its ID.
**Controller:** `itemController.js` (handles get, update, and delete for a single item)

---

## API Overview

### Auth Endpoints
- POST /api/users
- POST /api/users/auth
- GET /api/users/profile
- PUT /api/users/profile
- POST /api/users/logout

### List Endpoints
- POST /api/list
- GET /api/list
- GET /api/list/:id
- PUT /api/list/:id
- DELETE /api/list/:id

### Item Endpoints
- POST /api/:listId/item
- GET /api/:listId/item
- GET /api/item/:itemId
- PUT /api/item/:itemId
- DELETE /api/item/:itemId

---

## Tech Stack
- Frontend: React, TypeScript, Vite, React Router, TanStack Query
- Backend: Node.js, Express, Mongoose
- Database: MongoDB (local or Atlas)
- UI: Tailwind CSS
- Utilities: jsPDF, jspdf-autotable

---

## Environment Variables

Create a root `.env` file with:

```
MONGO_URI=your_mongodb_connection_string_with_database_name
PORT=5000
SECRET_KEY=your_strong_random_secret
```

---

## Local Development Setup

1. Install dependencies from project root:
	```sh
	pnpm install
	```
2. Start backend:
	```sh
	cd app/backend
	pnpm dev
	```
3. Start frontend:
	```sh
	cd app/frontend
	pnpm dev
	```
4. Open app:
	http://localhost:5173

---

## Production Notes
- Deploy backend and frontend separately
- Configure frontend rewrite or proxy for /api requests
- Use MongoDB Atlas connection string with explicit database name
- Rotate and protect all secrets before going live