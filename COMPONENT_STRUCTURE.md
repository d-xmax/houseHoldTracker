# Component Structure - Household Tracker App

## Overview

The App.tsx file has been successfully refactored into modular, maintainable components. This document outlines the new structure.

---

## Components Created

### 1. **Sidebar.tsx**

- **Purpose**: Navigation sidebar with menu items
- **Location**: `src/components/Sidebar.tsx`
- **Props**:
  - `isSidebarOpen`: boolean
  - `setIsSidebarOpen`: function
  - `activeTab`: string
  - `setActiveTab`: function
  - `lists`: InventoryList[]
  - `selectedListId`: string
  - `setSelectedListId`: function
  - `openEditList`: function

### 2. **TopBar.tsx**

- **Purpose**: Top navigation bar with search and user profile
- **Location**: `src/components/TopBar.tsx`
- **Props**:
  - `isSidebarOpen`: boolean
  - `setIsSidebarOpen`: function
  - `searchQuery`: string
  - `setSearchQuery`: function

### 3. **ListsSidebar.tsx**

- **Purpose**: Left sidebar showing available lists and inventory statistics
- **Location**: `src/components/ListsSidebar.tsx`
- **Props**:
  - `lists`: InventoryList[]
  - `selectedListId`: string
  - `setSelectedListId`: function
  - `setIsNewListOpen`: function
  - `openEditList`: function
  - `getTotalValue`: function
  - `getColorClasses`: function

### 4. **InventoryTable.tsx**

- **Purpose**: Main table displaying inventory items with search and filter controls
- **Location**: `src/components/InventoryTable.tsx`
- **Props**:
  - `filteredItems`: Item[]
  - `selectedCategory`: string
  - `setSelectedCategory`: function
  - `searchQuery`: string
  - `setSearchQuery`: function
  - `allCategories`: string[]
  - `onAddItem`: function
  - `onBulkAdd`: function
  - `onExport`: function
  - `onEditItem`: function
  - `onDeleteItem`: function

### 5. **Notification.tsx**

- **Purpose**: Toast notification component
- **Location**: `src/components/Notification.tsx`
- **Props**:
  - `type`: 'success' | 'error' | 'info'
  - `message`: string

---

## Dialog Components

Located in `src/components/dialogs/`

### 1. **DeleteConfirmDialog.tsx**

- Purpose: Confirm deletion of items
- Props: `isOpen`, `onOpenChange`, `onConfirm`

### 2. **EditItemDialog.tsx**

- Purpose: Edit existing inventory items
- Props: `isOpen`, `onOpenChange`, `form`, `onFormChange`, `onSave`

### 3. **EditListDialog.tsx**

- Purpose: Edit existing lists
- Props: `isOpen`, `onOpenChange`, `form`, `onFormChange`, `onSave`, `listName`

### 4. **AddItemDialog.tsx**

- Purpose: Add new inventory items
- Props: `isOpen`, `onOpenChange`, `form`, `onFormChange`, `onAdd`

### 5. **AddListDialog.tsx**

- Purpose: Create new lists
- Props: `isOpen`, `onOpenChange`, `form`, `onFormChange`, `onCreate`

### 6. **BulkAddDialog.tsx**

- Purpose: Bulk add multiple items at once
- Props: `isOpen`, `onOpenChange`, `bulkItems`, `onBulkItemsChange`, `onAdd`

---

## App.tsx Structure

After refactoring, the main App.tsx file now contains:

1. **All state management** (useState hooks)
2. **All business logic functions** (CRUD operations)
3. **Component composition** (JSX layout using extracted components)
4. **Type definitions** (Item, InventoryList interfaces)

---

## Benefits of This Structure

✅ **Modularity**: Each component has a single responsibility  
✅ **Reusability**: Components can be easily reused elsewhere  
✅ **Maintainability**: Changes to UI are localized to specific components  
✅ **Testability**: Each component can be tested independently  
✅ **Scalability**: Easy to add new features or modify existing ones  
✅ **Code Organization**: Clear separation of concerns

---

## File Tree

```
src/components/
├── Sidebar.tsx
├── TopBar.tsx
├── ListsSidebar.tsx
├── InventoryTable.tsx
├── Notification.tsx
└── dialogs/
    ├── DeleteConfirmDialog.tsx
    ├── EditItemDialog.tsx
    ├── EditListDialog.tsx
    ├── AddItemDialog.tsx
    ├── AddListDialog.tsx
    └── BulkAddDialog.tsx
```

---

## How to Use

All components are imported into `App.tsx` and used like this:

```tsx
<Sidebar
  isSidebarOpen={isSidebarOpen}
  setIsSidebarOpen={setIsSidebarOpen}
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  lists={lists}
  selectedListId={selectedListId}
  setSelectedListId={setSelectedListId}
  openEditList={openEditList}
/>
```

Each dialog component is similarly integrated and controlled via state management in the main App component.

---

**Last Updated**: January 5, 2026
