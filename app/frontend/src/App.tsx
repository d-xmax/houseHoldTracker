import { useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/features/layout/AppSidebar';
import { AppHeader } from '@/features/layout/AppHeader';
import { ListSidebar } from '@/features/inventory/components/ListSidebar';
import { InventoryTable } from '@/features/inventory/components/InventoryTable';
import { CreateListModal } from '@/features/inventory/components/modals/CreateListModal';
import { EditListModal } from '@/features/inventory/components/modals/EditListModal';
import { AddItemModal } from '@/features/inventory/components/modals/AddItemModal';
import { EditItemModal } from '@/features/inventory/components/modals/EditItemModal';
import { BulkAddModal } from '@/features/inventory/components/modals/BulkAddModal';
import { DeleteConfirmModal } from '@/features/inventory/components/modals/DeleteConfirmModal';
import { NotificationAlert } from '@/shared/components/NotificationAlert';
import { useInventory } from '@/features/inventory/hooks/useInventory';

export default function App() {
  const [activeTab, setActiveTab] =
    useState('tasks');
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);
  const {
    lists,
    filteredLists,
    selectedListId,
    setSelectedListId,
    searchQuery,
    setSearchQuery,
    listSearchQuery,
    setListSearchQuery,
    selectedCategory,
    setSelectedCategory,
    allCategories,
    filteredItems,
    totalInventoryValue,
    notification,
    dismissNotification,
    isCreateListOpen,
    openCreateListDialog,
    closeCreateListDialog,
    isAddItemOpen,
    openAddItemDialog,
    closeAddItemDialog,
    isEditItemOpen,
    openEditItem,
    closeEditItemDialog,
    isEditListOpen,
    openEditList,
    closeEditListDialog,
    isBulkAddOpen,
    openBulkAddDialog,
    closeBulkAddDialog,
    createList,
    newListForm,
    setNewListForm,
    editListForm,
    setEditListForm,
    newItemForm,
    setNewItemForm,
    editItemForm,
    setEditItemForm,
    bulkItems,
    setBulkItems,
    listToEdit,
    itemToEdit,
    addItem,
    saveItemChanges,
    saveListChanges,
    processBulkAdd,
    exportList,
    deleteTarget,
    requestDeleteItem,
    requestDeleteList,
    confirmDelete,
    cancelDelete,
  } = useInventory();

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <AppSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <main className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB] overflow-y-auto">
          <AppHeader
            searchValue={listSearchQuery}
            onSearchChange={setListSearchQuery}
            onMenuClick={() =>
              setIsSidebarOpen(true)
            }
          />

          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-6 h-full">
              <ListSidebar
                lists={lists}
                visibleLists={filteredLists}
                isSearchActive={
                  listSearchQuery.trim().length >
                  0
                }
                selectedListId={selectedListId}
                onSelectList={setSelectedListId}
                onCreateList={
                  openCreateListDialog
                }
                onEditList={openEditList}
                onDeleteList={requestDeleteList}
                totalValue={totalInventoryValue}
              />

              <div className="flex-1">
                <InventoryTable
                  items={filteredItems}
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={
                    selectedCategory
                  }
                  onCategoryChange={
                    setSelectedCategory
                  }
                  categories={allCategories}
                  onExport={exportList}
                  onAddItem={openAddItemDialog}
                  onBulkAdd={openBulkAddDialog}
                  onEditItem={openEditItem}
                  onDeleteItem={requestDeleteItem}
                />
              </div>
            </div>
          </div>
        </main>

        <NotificationAlert
          notification={notification}
          onClose={dismissNotification}
        />

        <CreateListModal
          open={isCreateListOpen}
          onOpenChange={(open) =>
            open
              ? openCreateListDialog()
              : closeCreateListDialog()
          }
          form={newListForm}
          onFormChange={setNewListForm}
          onCreate={createList}
        />

        <EditListModal
          open={isEditListOpen}
          onOpenChange={(open) =>
            open
              ? undefined
              : closeEditListDialog()
          }
          form={editListForm}
          onFormChange={setEditListForm}
          onSave={saveListChanges}
          listName={listToEdit?.name}
        />

        <AddItemModal
          open={isAddItemOpen}
          onOpenChange={(open) =>
            open
              ? openAddItemDialog()
              : closeAddItemDialog()
          }
          form={newItemForm}
          onFormChange={setNewItemForm}
          onAdd={addItem}
        />

        <EditItemModal
          open={isEditItemOpen}
          onOpenChange={(open) =>
            open
              ? undefined
              : closeEditItemDialog()
          }
          form={editItemForm}
          onFormChange={setEditItemForm}
          onSave={saveItemChanges}
        />

        <BulkAddModal
          open={isBulkAddOpen}
          onOpenChange={(open) =>
            open
              ? openBulkAddDialog()
              : closeBulkAddDialog()
          }
          value={bulkItems}
          onChange={setBulkItems}
          onProcess={processBulkAdd}
        />

        <DeleteConfirmModal
          target={deleteTarget}
          onOpenChange={(open) =>
            !open ? cancelDelete() : undefined
          }
          onConfirm={confirmDelete}
        />
      </div>
    </TooltipProvider>
  );
}
