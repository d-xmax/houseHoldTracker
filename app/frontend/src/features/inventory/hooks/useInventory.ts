import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
 
import {
  getTotalValue,
  validateItemForm,
  validateListForm,
} from '@/utils/inventory-helpers';

const INITIAL_LISTS  = [
   
];

const DEFAULT_LIST_FORM   = {
  
};

const DEFAULT_ITEM_FORM   = {
   
};

export function useInventory() {
  const [lists, setLists] = useState<
    InventoryList[]
  >(INITIAL_LISTS);
  const [selectedListId, setSelectedListId] =
    useState(() => INITIAL_LISTS[0]?.id ?? '');
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

  useEffect(() => {
    return () => {
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
      }
    };
  }, []);

  const showNotification = (
    type: Notification['type'],
    message: string
  ) => {
    if (notificationTimeout.current) {
      clearTimeout(notificationTimeout.current);
    }
    setNotification({ type, message });
    notificationTimeout.current = setTimeout(
      () => setNotification(null),
      5000
    );
  };

  const dismissNotification = () => {
    if (notificationTimeout.current) {
      clearTimeout(notificationTimeout.current);
    }
    setNotification(null);
  };

  const selectedList = useMemo(
    () =>
      lists.find(
        (list) => list.id === selectedListId
      ) ?? null,
    [lists, selectedListId]
  );

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    lists.forEach((list) => {
      list.items.forEach((item) => {
        if (item.category) {
          categories.add(item.category);
        }
      });
    });
    return Array.from(categories).sort();
  }, [lists]);

  const filteredLists = useMemo(() => {
    const query = listSearchQuery
      .trim()
      .toLowerCase();
    if (!query) return lists;

    return lists.filter((list) => {
      const haystack = `${list.name} ${
        list.description ?? ''
      }`.toLowerCase();
      return haystack.includes(query);
    });
  }, [lists, listSearchQuery]);

  const filteredItems = useMemo(() => {
    if (!selectedList) return [];

    return selectedList.items.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Categories' ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [
    selectedList,
    searchQuery,
    selectedCategory,
  ]);

  const totalInventoryValue = useMemo(
    () =>
      lists.reduce(
        (sum, list) =>
          sum + getTotalValue(list.items),
        0
      ),
    [lists]
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
        'Please select a list first'
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
        'Please select a list first'
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
    setEditListForm(DEFAULT_LIST_FORM);
  };

  const createList = () => {
    const error = validateListForm(newListForm);
    if (error) {
      showNotification('error', error);
      return;
    }

    const newList: InventoryList = {
      id: Date.now().toString(),
      name: newListForm.name.trim(),
      description: newListForm.description.trim(),
      color: newListForm.color,
      items: [],
      createdDate: new Date().toISOString(),
    };

    setLists((prev) => [...prev, newList]);
    setSelectedListId(newList.id);
    closeCreateListDialog();
    showNotification(
      'success',
      `"${newList.name}" list has been created and is ready for your items.`
    );
  };

  const openEditList = (list: InventoryList) => {
    setListToEdit(list);
    setEditListForm({
      name: list.name,
      description: list.description,
      color: list.color,
    });
    setEditListOpen(true);
  };

  const saveListChanges = () => {
    if (!listToEdit) return;

    const error = validateListForm(editListForm);
    if (error) {
      showNotification('error', error);
      return;
    }

    setLists((prev) =>
      prev.map((list) =>
        list.id === listToEdit.id
          ? {
              ...list,
              name: editListForm.name.trim(),
              description:
                editListForm.description.trim(),
              color: editListForm.color,
            }
          : list
      )
    );

    closeEditListDialog();
    showNotification(
      'success',
      `"${editListForm.name.trim()}" has been updated successfully.`
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
        'Please select a list first'
      );
      return;
    }

    const newItem: Item = {
      id: Date.now().toString(),
      name: newItemForm.name.trim(),
      description: newItemForm.description.trim(),
      category: newItemForm.category.trim(),
      price:
        Number.parseFloat(newItemForm.price) || 0,
      quantity:
        Number.parseInt(newItemForm.quantity) ||
        1,
      unit: newItemForm.unit.trim(),
      location: newItemForm.location.trim(),
      condition: newItemForm.condition,
      addedDate: new Date().toISOString(),
    };

    setLists((prev) =>
      prev.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: [...list.items, newItem],
            }
          : list
      )
    );

    closeAddItemDialog();
    showNotification(
      'success',
      `"${newItem.name}" has been added to ${selectedList.name}.`
    );
  };

  const openEditItem = (item: Item) => {
    setItemToEdit(item);
    setEditItemForm({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price.toString(),
      quantity: item.quantity.toString(),
      unit: item.unit,
      location: item.location,
      condition: item.condition,
    });
    setEditItemOpen(true);
  };

  const saveItemChanges = () => {
    if (!itemToEdit || !selectedList) return;

    const error = validateItemForm(editItemForm);
    if (error) {
      showNotification('error', error);
      return;
    }

    setLists((prev) =>
      prev.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemToEdit.id
                  ? {
                      ...item,
                      name: editItemForm.name.trim(),
                      description:
                        editItemForm.description.trim(),
                      category:
                        editItemForm.category.trim(),
                      price:
                        Number.parseFloat(
                          editItemForm.price
                        ) || 0,
                      quantity:
                        Number.parseInt(
                          editItemForm.quantity
                        ) || 1,
                      unit: editItemForm.unit.trim(),
                      location:
                        editItemForm.location.trim(),
                      condition:
                        editItemForm.condition,
                    }
                  : item
              ),
            }
          : list
      )
    );

    closeEditItemDialog();
    showNotification(
      'success',
      `"${editItemForm.name.trim()}" has been updated successfully.`
    );
  };

  const processBulkAdd = () => {
    if (!selectedList || !bulkItems.trim()) {
      showNotification(
        'error',
        'Please enter some items to add'
      );
      return;
    }

    const lines = bulkItems
      .split('\n')
      .filter((line) => line.trim());
    let successCount = 0;
    let errorCount = 0;

    const newItems: Item[] = lines
      .map((line, index) => {
        const parts = line
          .split(',')
          .map((part) => part.trim());
        if (!parts[0]) {
          errorCount++;
          return null;
        }
        successCount++;
        return {
          id: (Date.now() + index).toString(),
          name: parts[0],
          description: parts[1] || '',
          category: parts[2] || '',
          price: Number.parseFloat(parts[3]) || 0,
          quantity:
            Number.parseInt(parts[4]) || 1,
          unit: parts[5] || '',
          location: parts[6] || '',
          condition:
            (parts[7] as Item['condition']) ||
            'Good',
          addedDate: new Date().toISOString(),
        };
      })
      .filter(Boolean) as Item[];

    setLists((prev) =>
      prev.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: [...list.items, ...newItems],
            }
          : list
      )
    );

    closeBulkAddDialog();

    if (successCount > 0) {
      const skipped =
        errorCount > 0
          ? ` ${errorCount} items were skipped due to missing information.`
          : '';
      showNotification(
        'success',
        `Added ${successCount} items successfully.${skipped}`
      );
    }
  };

  const exportList = () => {
    if (
      !selectedList ||
      selectedList.items.length === 0
    ) {
      showNotification(
        'info',
        'Please select a list with items to export'
      );
      return;
    }
    showNotification(
      'info',
      "Export feature is coming soon! We're working hard to bring you this functionality."
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    showNotification(
      'info',
      'Search and filters have been cleared'
    );
  };

  const requestDeleteItem = (item: Item) => {
    setDeleteTarget({ type: 'item', item });
  };

  const requestDeleteList = (
    list: InventoryList
  ) => {
    setDeleteTarget({ type: 'list', list });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'item') {
      setLists((prev) =>
        prev.map((list) =>
          list.id === selectedListId
            ? {
                ...list,
                items: list.items.filter(
                  (item) =>
                    item.id !==
                    deleteTarget.item.id
                ),
              }
            : list
        )
      );
      showNotification(
        'success',
        `"${deleteTarget.item.name}" has been removed from your list.`
      );
    } else {
      setLists((prev) => {
        const updated = prev.filter(
          (list) =>
            list.id !== deleteTarget.list.id
        );
        if (updated.length === 0) {
          setSelectedListId('');
        } else if (
          deleteTarget.list.id === selectedListId
        ) {
          setSelectedListId(updated[0].id);
        }
        return updated;
      });
      showNotification(
        'success',
        `"${deleteTarget.list.name}" list has been deleted.`
      );
    }

    setDeleteTarget(null);
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
  };
}
