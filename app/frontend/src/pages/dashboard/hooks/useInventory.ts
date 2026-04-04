import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AxiosError } from 'axios';

import {
  getTotalValue,
  validateItemForm,
  validateListForm,
} from '@/utils/inventory-helpers';
import { exportSelectedListPdf } from '@/utils/export-list-pdf';
import { useLists } from '@/hooks/useLists';
import { useListsInfo } from '@/hooks/useListsInfo';
import { useUserInfo } from '@/hooks/useUserInfo';
import type {
  DeleteTarget,
  InventoryList,
  Item,
  ListFormValues,
  ItemFormValues,
  Notification,
} from '@/pages/dashboard/types';
import { useItems } from '@/hooks/useItems';
import { useItemsInfo } from '@/hooks/useItemsInfo';
const INITIAL_LISTS: InventoryList[] = [];

const DEFAULT_LIST_FORM: ListFormValues = {
  name: '',
  description: '',
  color: '',
};

const DEFAULT_ITEM_FORM: ItemFormValues = {
  name: '',
  description: '',
  category: '',
  price: '',
  quantity: '',
  unit: '',
  location: '',
  condition: 'Good',
};

const NOTIFICATION_DURATION_MS = 2000;

export function useInventory() {
  const [selectedListId, setSelectedListId] =
    useState(() => INITIAL_LISTS[0]?._id ?? '');
  const [searchQuery, setSearchQuery] =
    useState('');
  const [listSearchQuery, setListSearchQuery] =
    useState('');
  const [selectedCategory, setSelectedCategory] =
    useState('All Categories');
  const [notification, setNotification] =
    useState<Notification | null>(null);
  const notificationTimeout = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const [isCreateListOpen, setCreateListOpen] =
    useState(false);
  const [isAddItemOpen, setAddItemOpen] =
    useState(false);
  const [isEditItemOpen, setEditItemOpen] =
    useState(false);
  const [isEditListOpen, setEditListOpen] =
    useState(false);
  const [isBulkAddOpen, setBulkAddOpen] =
    useState(false);

  const [newListForm, setNewListForm] =
    useState<ListFormValues>(DEFAULT_LIST_FORM);
  const [editListForm, setEditListForm] =
    useState<ListFormValues>(DEFAULT_LIST_FORM);
  const [newItemForm, setNewItemForm] =
    useState<ItemFormValues>(DEFAULT_ITEM_FORM);
  const [editItemForm, setEditItemForm] =
    useState<ItemFormValues>(DEFAULT_ITEM_FORM);
  const [bulkItems, setBulkItems] = useState('');

  const [listToEdit, setListToEdit] =
    useState<InventoryList | null>(null);
  const [itemToEdit, setItemToEdit] =
    useState<Item | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<DeleteTarget>(null);

  const { data: userInfo } = useUserInfo();
  const userId = userInfo?._id;

  const {
    updateListMutation,
    deleteListMutation,
    createListMutation,
  } = useLists(userId);
   
  const { createItemMutation , deleteItemMutation, updateItemMutation} = useItems(userId);
  const { listData, isLoadingListData } = useListsInfo(userId);
  const { itemData, isItemDataLoading } = useItemsInfo(userId, selectedListId);

  const lists = useMemo<InventoryList[]>(
    () =>
      Array.isArray(listData?.readAll)
        ? listData.readAll
        : [],
    [listData],
  );

 
  useEffect(() => {
    return () => {
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
      }
    };
  }, []);

  const showNotification = (
    type: Notification['type'],
    message: string,
  ) => {
    if (notificationTimeout.current) {
      clearTimeout(notificationTimeout.current);
    }
    setNotification({
      type,
      message,
      durationMs: NOTIFICATION_DURATION_MS,
    });
    notificationTimeout.current = setTimeout(
      () => setNotification(null),
      NOTIFICATION_DURATION_MS,
    );
  };

  const dismissNotification = () => {
    if (notificationTimeout.current) {
      clearTimeout(notificationTimeout.current);
    }
    setNotification(null);
  };
  // server response 
  const getServerMessage = (
    resMessage: unknown,
  ): string | null => {
    if (typeof resMessage === 'string') {
     
      return resMessage;
    }

    if (
      resMessage &&
      typeof resMessage === 'object' &&
      'message' in resMessage
    ) {
      const message = (
        resMessage as { message?: unknown }
      ).message;
      // log removed
      return typeof message === 'string'
        ? message
        : null;
    }

    return null;
  };
// server error response
  const getErrorMessage = (
    error: unknown,
    fallback: string,
  ) => {
    if (error instanceof AxiosError) {
      const serverMessage = getServerMessage(
        error.response?.data,
      );

      if (serverMessage) {
        return serverMessage;
      }
    }

    if (
      error instanceof Error &&
      typeof error.message === 'string' &&
      error.message.trim().length > 0
    ) {
      return error.message;
    }

    return fallback;
  };

  const selectedList = useMemo(
    () =>
      lists.find(
        (list) => list?._id === selectedListId,
      ) ?? null,
    [lists, selectedListId],
  );

  const isListMutationPending =
    createListMutation.isPending ||
    updateListMutation.isPending ||
    deleteListMutation.isPending;

  const isItemMutationPending =
    createItemMutation.isPending ||
    updateItemMutation.isPending ||
    deleteItemMutation.isPending;

  const isInventoryMutating =
    isListMutationPending || isItemMutationPending;
 
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    lists.forEach((list) => {
      const items = Array.isArray(list?.items)
        ? list.items
        : [];

      items.forEach((item) => {
        if (item.category) {
          categories.add(item.category);
        }
      });
    });
    return Array.from(categories).sort();
  }, [lists]);

  const filteredLists = useMemo(() => {
    return lists;
  }, [lists]);

  const filteredItems = useMemo(() => {
    return Array.isArray(itemData?.items)
      ? itemData.items
      : [];
  }, [itemData]);

  const totalInventoryValue = useMemo(
    () =>
      lists.reduce(
        (sum, list) =>
          sum +
          getTotalValue(
            Array.isArray(list?.items)
              ? list.items
              : [],
          ),
        0,
      ),
    [lists],
  );

  const resetListForm = () =>
    setNewListForm(DEFAULT_LIST_FORM);
  const resetItemForm = () =>
    setNewItemForm(DEFAULT_ITEM_FORM);

  const openCreateListDialog = () =>
    setCreateListOpen(true);
  const closeCreateListDialog = () => {
    setCreateListOpen(false);
    resetListForm();
  };

  const openAddItemDialog = () => {
    if (!selectedList) {
      showNotification(
        'error',
        'Select a list first, then try adding your item again.',
      );
      return;
    }
    setAddItemOpen(true);
  };
  const closeAddItemDialog = () => {
    setAddItemOpen(false);
    resetItemForm();
  };

  const openBulkAddDialog = () => {
    if (!selectedList) {
      showNotification(
        'error',
        'Select a list first, then use Bulk Add.',
      );
      return;
    }
    setBulkAddOpen(true);
  };
  const closeBulkAddDialog = () => {
    setBulkAddOpen(false);
    setBulkItems('');
  };

  const closeEditItemDialog = () => {
    setEditItemOpen(false);
    setItemToEdit(null);
    setEditItemForm(DEFAULT_ITEM_FORM);
  };

  const closeEditListDialog = () => {
    setEditListOpen(false);
    setListToEdit(null);
  };

  const createList = async () => {
    const error = validateListForm(newListForm);
    if (error) {
      showNotification('error', error);
      return;
    }

    const listData = {
      name: newListForm.name.trim(),
      description: newListForm.description.trim(),
      color: newListForm.color,
    };

    createListMutation.mutate(listData, {
      onSuccess: (response) => {
        const createdList = (
          response as {
            list?: { _id?: string };
          }
        ).list;

        if (createdList?._id) {
          setSelectedListId(createdList._id);
        }

        showNotification(
          'success',
          getServerMessage(response) ??
            'List created successfully.',
        );
      },
      onError: (err: unknown) => {
        showNotification(
          'error',
          getErrorMessage(
            err,
            'Failed to create list',
          ),
        );
      }, 
      onSettled: () => {
        closeCreateListDialog();
      },
    });
  };
  // open edit form for edit list and pre-fill the form with selected list data
  const openEditList = (list: InventoryList) => {
    setListToEdit(list);
    // pre fill
    setEditListForm({
      name: list.name,
      description: list.description,
      color: list.color,
    });

    setEditListOpen(true);
  };
  // save list changes to the list and update the list in the state, then close the edit form
  const saveListChanges = async () => {
    if (!listToEdit) return;

    const error = validateListForm(editListForm);
    if (error) {
      showNotification('error', error);
      return;
    }

    const updatedData = {
      name: editListForm.name.trim(),
      description:
        editListForm.description.trim(),
      color: editListForm.color,
    };
    // data mutation
    updateListMutation.mutate(
      { id: listToEdit?._id, updatedData },
      {
        onSuccess: (response) => {
          // log removed
          showNotification(
            'success',
            getServerMessage(response) ??
              `List "${editListForm.name.trim()}" was updated successfully.`,
          );
        },
        onError: (err: unknown) => {
          showNotification(
            'error',
            getErrorMessage(
              err,
              'Failed to update list',
            ),
          );
        },
        onSettled: () => {
          closeEditListDialog();
        },
      },
    );
  };

  const addItem = () => {
    const error = validateItemForm(newItemForm);
    if (error) {
      showNotification('error', error);
      return;
    }

    if (!selectedList) {
      showNotification(
        'error',
        'Select a list first, then try adding your item again.',
      );

      return;
    }

    const newItem: Item = {
      id: selectedList._id,
      name: newItemForm.name.trim(),
      description: newItemForm.description.trim(),
      category: newItemForm.category.trim(),
      price:
        Number.parseFloat(newItemForm.price) || 0,
      quantity:
        Number.parseInt(newItemForm.quantity) ||
        1,
      quantityType: newItemForm.unit.trim(),
      location: newItemForm.location.trim(),
      condition: newItemForm.condition,
      addedDate: new Date().toISOString(),
    };
    createItemMutation.mutate(
      {
        listId: newItem.id,
        itemData:newItem,
      },
      {
        onSuccess: (response) => {
          showNotification(
            'success',
            getServerMessage(response) ??
              `"${newItem.name}" has been added to ${selectedList.name}.`,
          );
        },
        onError: (err: unknown) => {
          showNotification(
            'error',
            getErrorMessage(
              err,
              'Failed to add item',
            ),
          );
        },
        onSettled: () => {
          closeAddItemDialog();
        },
      },
    );
  };

  const openEditItem = (item: Item) => {
   

   const quantity = item.quantityDetails?.quantity ?? item.quantity ?? 1;
  const unit = item.quantityDetails?.quantityType ?? item.unit ?? '';

    setItemToEdit(item);
    setEditItemForm({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price.toString(),
      quantity: quantity.toString(),
      unit,
      location: item.location,
      condition: item.condition,
    });
    setEditItemOpen(true);
  };

  const saveItemChanges = () => {
     if (!itemToEdit) return;
       const updatedData = {
    name: editItemForm.name.trim(),
    description: editItemForm.description.trim(),
    category: editItemForm.category.trim(),
    quantity:
      Number.parseInt(editItemForm.quantity) || 1,
    quantityType: editItemForm.unit.trim(),
    price:
      Number.parseFloat(editItemForm.price) || 0,
    location: editItemForm.location.trim(),
  };
 updateItemMutation.mutate(
    {
      itemId: itemToEdit._id ?? itemToEdit.id,
      updatedData,
    },
    {
      onSuccess: (response) => {
        showNotification(
          'success',
          getServerMessage(response) ??
            `"${updatedData.name}" has been updated successfully.`,
        );
      },
      onError: (err: unknown) => {
        showNotification(
          'error',
          getErrorMessage(
            err,
            'Failed to update item',
          ),
        );
      },
      onSettled: () => {
        closeEditItemDialog();
      },
    },
  );

  };

  const processBulkAdd = () => {
    closeBulkAddDialog();
    showNotification(
      'info',
      'Bulk add is being prepared. This modal is now closed.',
    );
  };

  const exportList = () => {
    if (!selectedList) {
      showNotification(
        'info',
        'Select a list before exporting.',
      );
      return;
    }

    const items = Array.isArray(filteredItems)
      ? filteredItems
      : [];

    if (items.length === 0) {
      showNotification(
        'info',
        'Select a list that has at least one item before exporting.',
      );
      return;
    }

    try {
      exportSelectedListPdf(selectedList, items);
      showNotification(
        'success',
        `"${selectedList.name}" exported as PDF.`,
      );
    } catch (error: unknown) {
      showNotification(
        'error',
        getErrorMessage(
          error,
          'Unable to export this list as PDF right now.',
        ),
      );
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    showNotification(
      'info',
      'Filters cleared. You are now viewing all items in this list.',
    );
  };

  const requestDeleteItem = (item: Item) => {
    setDeleteTarget({ type: 'item', item });
   
  };

  const requestDeleteList = (
    list: InventoryList,
  ) => {
    setDeleteTarget({ type: 'list', list });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
 
    if (target.type === 'item') {
  deleteItemMutation.mutate(
    // extra parameter 'listId'
    {
      itemId: target.item?._id,
      listId: selectedListId,
    },
    {
      onSuccess: (response) => {
        showNotification(
          'success',
          getServerMessage(response) ??
            `"${target.item.name}" has been removed from your list.`,
        );
      },
      onError: (err: unknown) => {
        showNotification(
          'error',
          getErrorMessage(
            err,
            'Failed to delete item',
          ),
        );
      },
    },
  );
} else if (target.type === 'list') {
      // Use the deleteListMutation from useLists
      deleteListMutation.mutate(
        target.list._id,
        {
          onSuccess: (response) => {
            const updated = lists.filter(
              (list) =>
                list._id !== target.list._id,
            );

            if (updated.length === 0) {
              setSelectedListId('');
            } else if (
              target.list._id === selectedListId
            ) {
              setSelectedListId(updated[0]._id);
            }
            showNotification(
              'success',
              getServerMessage(response) ??
                `"${target.list.name}" list has been deleted.`,
            );
          },
          onError: (err: unknown) => {
            showNotification(
              'error',
              getErrorMessage(
                err,
                'Failed to delete list',
              ),
            );
          },
        },
      );
    }
  };

  const cancelDelete = () =>
    setDeleteTarget(null);

  return {
    lists,
    filteredLists,
    selectedListId,
    setSelectedListId,
    selectedList,
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
    showNotification,
    isCreateListOpen,
    openCreateListDialog,
    closeCreateListDialog,
    isAddItemOpen,
    openAddItemDialog,
    closeAddItemDialog,
    isEditItemOpen,
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
    saveListChanges,
    openEditItem,
    saveItemChanges,
    addItem,
    processBulkAdd,
    exportList,
    clearFilters,
    deleteTarget,
    requestDeleteItem,
    requestDeleteList,
    confirmDelete,
    cancelDelete,
    isLoadingListData,
    isItemDataLoading,
    isInventoryMutating
  };
}
