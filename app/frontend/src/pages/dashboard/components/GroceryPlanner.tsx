import { NotificationAlert } from '@/shared/components/NotificationAlert';
import { ListSidebar } from '@/pages/dashboard/components/ListSidebar';
import { InventoryTable } from '@/pages/dashboard/components/InventoryTable';
import { CreateListModal } from '@/pages/dashboard/components/modals/CreateListModal';
import { EditListModal } from '@/pages/dashboard/components/modals/EditListModal';
import { AddItemModal } from '@/pages/dashboard/components/modals/AddItemModal';
import { EditItemModal } from '@/pages/dashboard/components/modals/EditItemModal';
import { BulkAddModal } from '@/pages/dashboard/components/modals/BulkAddModal';
import { DeleteConfirmModal } from '@/pages/dashboard/components/modals/DeleteConfirmModal';
import { useInventory } from '../hooks/useInventory';

export default function GroceryPilot( ) {
  const {
    lists,
    selectedListId,
    setSelectedListId,
    searchQuery,
    setSearchQuery,
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
    isLoadingListData,
    isItemDataLoading
  } = useInventory();

  return (
    <>
      <div className="flex-1 p-4 lg:p-6">
        <div className="flex h-full flex-col gap-6">
          <div className="flex flex-1 min-h-0 flex-col gap-6 lg:flex-row">
            <ListSidebar
              lists={lists}
              selectedListId={selectedListId}
              onSelectList={setSelectedListId}
              onCreateList={openCreateListDialog}
              onEditList={openEditList}
              onDeleteList={requestDeleteList}
              totalValue={totalInventoryValue}
              isLoading={isLoadingListData}
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
                isLoading={isItemDataLoading}
              />
            </div>
          </div>
        </div>
      </div>

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
          open ? undefined : closeEditListDialog()
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
          open ? undefined : closeEditItemDialog()
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
    </>
  );
}
