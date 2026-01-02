import { useState, useMemo } from 'react';
import {
  Plus,
  ShoppingCart,
  Package2,
  Edit,
  Trash2,
  Search,
  AlertCircle,
  CheckCircle2,
  Info,
  Save,
  Menu,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Mail,
  Download,
  FileDown,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  location: string;
  condition: 'Good' | 'Fair' | 'Poor' | 'Expired';
  addedDate: string;
}

interface InventoryList {
  id: string;
  name: string;
  description: string;
  color: string;
  items: Item[];
  createdDate: string;
}

const CHART_DATA = [
  { name: 'S', value: 40 },
  { name: 'M', value: 65 },
  { name: 'T', value: 45 },
  { name: 'W', value: 80 },
  { name: 'T', value: 50 },
  { name: 'F', value: 55 },
  { name: 'S', value: 45 },
];

export default function DonezoDashboard() {
  const [lists, setLists] = useState<
    InventoryList[]
  >([
    {
      id: '1',
      name: 'Pantry Items',
      description:
        'Dry goods and non-perishables',
      color: 'blue',
      createdDate: new Date().toISOString(),
      items: [
        {
          id: '1',
          name: 'Basmati Rice',
          description: 'Premium long grain rice',
          category: 'Grains & Cereals',
          price: 12.99,
          quantity: 2,
          unit: 'bags',
          location: 'Pantry Shelf 2',
          condition: 'Good',
          addedDate: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Olive Oil',
          description: 'Extra virgin olive oil',
          category: 'Condiments',
          price: 8.99,
          quantity: 1,
          unit: 'bottles',
          location: 'Pantry Shelf 1',
          condition: 'Good',
          addedDate: new Date().toISOString(),
        },
      ],
    },
    {
      id: '2',
      name: 'Fresh Produce',
      description: 'Fruits and vegetables',
      color: 'green',
      createdDate: new Date().toISOString(),
      items: [
        {
          id: '3',
          name: 'Organic Bananas',
          description: 'Fresh organic bananas',
          category: 'Fruits',
          price: 3.49,
          quantity: 1,
          unit: 'bunch',
          location: 'Fruit Bowl',
          condition: 'Good',
          addedDate: new Date().toISOString(),
        },
      ],
    },
    {
      id: '3',
      name: 'Refrigerator',
      description: 'Dairy, meat, and perishables',
      color: 'purple',
      createdDate: new Date().toISOString(),
      items: [
        {
          id: '4',
          name: 'Whole Milk',
          description: 'Fresh whole milk',
          category: 'Dairy',
          price: 4.39,
          quantity: 1,
          unit: 'gallon',
          location: 'Main Fridge',
          condition: 'Good',
          addedDate: new Date().toISOString(),
        },
      ],
    },
  ]);

  const [selectedListId, setSelectedListId] =
    useState('1');
  const [searchQuery, setSearchQuery] =
    useState('');
  const [selectedCategory, setSelectedCategory] =
    useState('All Categories');
  const [isAddItemOpen, setIsAddItemOpen] =
    useState(false);
  const [isNewListOpen, setIsNewListOpen] =
    useState(false);
  const [isBulkAddOpen, setIsBulkAddOpen] =
    useState(false);
  const [isEditItemOpen, setIsEditItemOpen] =
    useState(false);
  const [isEditListOpen, setIsEditListOpen] =
    useState(false);
  const [
    isDeleteConfirmOpen,
    setIsDeleteConfirmOpen,
  ] = useState(false);
  const [itemToDelete, setItemToDelete] =
    useState<string | null>(null);
  const [itemToEdit, setItemToEdit] =
    useState<Item | null>(null);
  const [listToEdit, setListToEdit] =
    useState<InventoryList | null>(null);
  const [notification, setNotification] =
    useState<{
      type: 'success' | 'error' | 'info';
      message: string;
    } | null>(null);

  // Dashboard specific states
  const [activeTab, setActiveTab] =
    useState<'tasks'>('tasks');
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);
  const [timer, setTimer] = useState(5048); // 01:24:08 in seconds
  const [isTimerRunning, setIsTimerRunning] =
    useState(false);

  const selectedList = lists.find(
    (list) => list.id === selectedListId
  );

  // Show notification
  const showNotification = (
    type: 'success' | 'error' | 'info',
    message: string
  ) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    lists.forEach((list) => {
      list.items.forEach((item) => {
        if (item.category)
          categories.add(item.category);
      });
    });
    return Array.from(categories).sort();
  }, [lists]);

  // Filter items based on search and category
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

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'purple':
        return 'bg-purple-500';
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getTotalValue = (items: Item[]) => {
    return items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  };

  const validateForm = (
    form: any,
    type: 'item' | 'list'
  ) => {
    if (type === 'item') {
      if (!form.name.trim())
        return 'Please provide an item name';
      if (!form.unit.trim())
        return 'Please provide a valid unit (e.g., bags, lbs)';
      if (
        !form.quantity ||
        Number.parseInt(form.quantity) < 1
      )
        return 'Please provide a valid quantity';
    } else {
      if (!form.name.trim())
        return 'Please provide a list name';
      if (!form.color)
        return 'Please select a color theme for your list';
    }
    return null;
  };

  // Create new list
  const createList = () => {
    const error = validateForm(
      newListForm,
      'list'
    );
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

    setLists([...lists, newList]);
    setNewListForm({
      name: '',
      description: '',
      color: 'blue',
    });
    setIsNewListOpen(false);
    setSelectedListId(newList.id);
    showNotification(
      'success',
      `Wonderful! "${newList.name}" list has been created and is ready for your items.`
    );
  };

  // Edit existing list
  const openEditList = (list: InventoryList) => {
    setListToEdit(list);
    setEditListForm({
      name: list.name,
      description: list.description,
      color: list.color,
    });
    setIsEditListOpen(true);
  };

  const saveListChanges = () => {
    if (!listToEdit) return;

    const error = validateForm(
      editListForm,
      'list'
    );
    if (error) {
      showNotification('error', error);
      return;
    }

    const updatedList = {
      ...listToEdit,
      name: editListForm.name.trim(),
      description:
        editListForm.description.trim(),
      color: editListForm.color,
    };

    setLists(
      lists.map((list) =>
        list.id === listToEdit.id
          ? updatedList
          : list
      )
    );
    setIsEditListOpen(false);
    setListToEdit(null);
    showNotification(
      'success',
      `Perfect! "${updatedList.name}" has been updated successfully.`
    );
  };

  // Add new item
  const addItem = () => {
    const error = validateForm(
      newItemForm,
      'item'
    );
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

    setLists(
      lists.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: [...list.items, newItem],
            }
          : list
      )
    );

    setNewItemForm({
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: '1',
      unit: '',
      location: '',
      condition: 'Good',
    });
    setIsAddItemOpen(false);
    showNotification(
      'success',
      `Excellent! "${newItem.name}" has been added to your ${selectedList.name} list.`
    );
  };

  // Edit existing item
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
    setIsEditItemOpen(true);
  };

  const saveItemChanges = () => {
    if (!itemToEdit || !selectedList) return;

    const error = validateForm(
      editItemForm,
      'item'
    );
    if (error) {
      showNotification('error', error);
      return;
    }

    const updatedItem = {
      ...itemToEdit,
      name: editItemForm.name.trim(),
      description:
        editItemForm.description.trim(),
      category: editItemForm.category.trim(),
      price:
        Number.parseFloat(editItemForm.price) ||
        0,
      quantity:
        Number.parseInt(editItemForm.quantity) ||
        1,
      unit: editItemForm.unit.trim(),
      location: editItemForm.location.trim(),
      condition: editItemForm.condition,
    };

    setLists(
      lists.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemToEdit.id
                  ? updatedItem
                  : item
              ),
            }
          : list
      )
    );

    setIsEditItemOpen(false);
    setItemToEdit(null);
    showNotification(
      'success',
      `Great! "${updatedItem.name}" has been updated successfully.`
    );
  };

  // Delete item
  const confirmDeleteItem = (itemId: string) => {
    setItemToDelete(itemId);
    setIsDeleteConfirmOpen(true);
  };

  const deleteItem = () => {
    if (!itemToDelete || !selectedList) return;

    const item = selectedList.items.find(
      (i) => i.id === itemToDelete
    );

    setLists(
      lists.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: list.items.filter(
                (item) => item.id !== itemToDelete
              ),
            }
          : list
      )
    );

    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
    showNotification(
      'success',
      `"${item?.name}" has been removed from your list.`
    );
  };

  // Bulk add items
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

        if (parts[0]) {
          successCount++;
          return {
            id: (Date.now() + index).toString(),
            name: parts[0] || `Item ${index + 1}`,
            description: parts[1] || '',
            category: parts[2] || '',
            price:
              Number.parseFloat(parts[3]) || 0,
            quantity:
              Number.parseInt(parts[4]) || 1,
            unit: parts[5] || '',
            location: parts[6] || '',
            condition:
              (parts[7] as any) || 'Good',
            addedDate: new Date().toISOString(),
          };
        } else {
          errorCount++;
          return null;
        }
      })
      .filter(Boolean) as Item[];

    setLists(
      lists.map((list) =>
        list.id === selectedListId
          ? {
              ...list,
              items: [...list.items, ...newItems],
            }
          : list
      )
    );

    setBulkItems('');
    setIsBulkAddOpen(false);

    if (successCount > 0) {
      showNotification(
        'success',
        `Fantastic! Successfully added ${successCount} items to your list.${
          errorCount > 0
            ? ` ${errorCount} items were skipped due to missing information.`
            : ''
        }`
      );
    }
  };

  const exportToPDF = () => {
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

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    showNotification(
      'info',
      'Search and filters have been cleared'
    );
  };

  // Helper function for time formatting
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  // State for forms
  const [newListForm, setNewListForm] = useState({
    name: '',
    description: '',
    color: 'blue',
  });

  const [editListForm, setEditListForm] =
    useState({
      name: '',
      description: '',
      color: 'blue',
    });

  const [newItemForm, setNewItemForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '1',
    unit: '',
    location: '',
    condition: 'Good' as const,
  });

  const [editItemForm, setEditItemForm] =
    useState({
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: '1',
      unit: '',
      location: '',
      condition: 'Good' as const,
    });

  const [bulkItems, setBulkItems] = useState('');

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Navigation Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }`}
        >
          <div className="p-6 flex items-center justify-between">
            {' '}
            {/* Adjusted to include justify-between */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Donezo
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8 text-slate-400 hover:text-slate-900"
              onClick={() =>
                setIsSidebarOpen(false)
              }
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto">
            <div>
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Menu
              </p>
              <div className="space-y-1">
                {[
                  {
                    id: 'tasks',
                    icon: Package2,
                    label: 'Tasks',
                    badge: '12+',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(
                        item.id as any
                      );
                      if (
                        window.innerWidth < 1024
                      )
                        setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <Badge className="bg-slate-900 text-white text-[10px] h-5 px-1.5">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                General
              </p>
              <div className="space-y-1">
                {[
                  {
                    icon: Settings,
                    label: 'Settings',
                  },
                  {
                    icon: HelpCircle,
                    label: 'Help',
                  },
                  {
                    icon: LogOut,
                    label: 'Logout',
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (
                        window.innerWidth < 1024
                      )
                        setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="p-4 mt-auto">
            <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                <Download className="w-12 h-12 -mr-4 -mt-4" />
              </div>
              <p className="text-sm font-semibold mb-1">
                Download our Mobile App
              </p>
              <p className="text-[10px] text-slate-400 mb-4">
                Get easy in another way
              </p>
              <Button
                size="sm"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none text-xs font-bold"
              >
                Download
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB] overflow-y-auto">
          {/* Top Bar */}
          <header className="h-16 flex items-center justify-between px-6 bg-transparent">
            <div className="flex items-center gap-4 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setIsSidebarOpen(true)
                }
              >
                <Menu className="w-6 h-6" />
              </Button>
              <span className="font-bold text-lg">
                Donezo
              </span>
            </div>

            <div className="hidden lg:flex flex-1 max-w-md relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              <Input
                placeholder="Search task"
                className="pl-10 pr-12 bg-white border-slate-200 rounded-full h-10 focus-visible:ring-emerald-600"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-mono text-slate-400 pointer-events-none">
                ⌘ F
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-slate-900 relative"
                >
                  <Mail className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#F9FAFB]"></span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-slate-900"
                >
                  <Bell className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900 leading-none">
                    Totok Michael
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    tmichael20@mail.com
                  </p>
                </div>
                <Avatar className="w-9 h-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" />
                  <AvatarFallback>
                    TM
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-6 h-full">
              {/* Sidebar for lists - Visible on desktop, hidden or adjusted on mobile */}
              <aside className="w-full lg:w-64 flex flex-col gap-6">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-bold">
                        Your Lists
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-400 hover:text-emerald-600"
                        onClick={() =>
                          setIsNewListOpen(true)
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="px-2 pb-2">
                    <div className="space-y-1">
                      {lists.map((list) => (
                        <div
                          key={list.id}
                          className={`group relative flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                            selectedListId ===
                            list.id
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <button
                            onClick={() =>
                              setSelectedListId(
                                list.id
                              )
                            }
                            className="flex-1 flex items-center gap-2 text-xs font-medium text-left"
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${getColorClasses(
                                list.color
                              )}`}
                            />
                            {list.name}
                          </button>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-emerald-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditList(
                                  list
                                );
                              }}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <span className="text-[10px] opacity-50 font-mono">
                              {list.items.length}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-900 text-white p-4">
                  <p className="text-xs text-emerald-300 font-medium mb-1">
                    Total Active Lists
                  </p>
                  <h4 className="text-2xl font-bold">
                    {lists.length}
                  </h4>
                  <p className="text-[10px] text-emerald-400 mt-2">
                    Inventory Value: $
                    {lists
                      .reduce(
                        (acc, l) =>
                          acc +
                          getTotalValue(l.items),
                        0
                      )
                      .toFixed(2)}
                  </p>
                </Card>
              </aside>

              {/* Main Inventory Table */}
              <div className="flex-1">
                <Card className="border-none shadow-sm overflow-hidden flex flex-col h-full">
                  <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search items..."
                        className="pl-9 bg-slate-50 border-none rounded-lg h-9 text-sm focus-visible:ring-emerald-600"
                        value={searchQuery}
                        onChange={(e) =>
                          setSearchQuery(
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={selectedCategory}
                        onValueChange={
                          setSelectedCategory
                        }
                      >
                        <SelectTrigger className="w-[140px] h-9 bg-slate-50 border-none rounded-lg text-xs">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200">
                          <SelectItem value="All Categories">
                            All Categories
                          </SelectItem>
                          {allCategories.map(
                            (cat) => (
                              <SelectItem
                                key={cat}
                                value={cat}
                              >
                                {cat}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-lg border-slate-100 bg-transparent"
                        onClick={exportToPDF}
                      >
                        <FileDown className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() =>
                          setIsAddItemOpen(true)
                        }
                        className="bg-emerald-900 hover:bg-emerald-800 text-white rounded-full px-4 h-9 gap-2 font-semibold"
                      >
                        <Plus className="w-4 h-4" />
                        Add Item
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setIsBulkAddOpen(true)
                        }
                        className="rounded-full px-4 h-9 border-slate-200 text-slate-700 font-semibold"
                      >
                        Bulk Add
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto flex-1">
                    <Table className="h-full">
                      <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-slate-100">
                          <TableHead className="text-[10px] uppercase font-bold text-slate-400 px-6">
                            Item
                          </TableHead>
                          <TableHead className="text-[10px] uppercase font-bold text-slate-400">
                            Category
                          </TableHead>
                          <TableHead className="text-[10px] uppercase font-bold text-slate-400">
                            Price
                          </TableHead>
                          <TableHead className="text-[10px] uppercase font-bold text-slate-400">
                            Quantity
                          </TableHead>
                          <TableHead className="text-[10px] uppercase font-bold text-slate-400 text-right pr-6">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.length ===
                        0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="h-48 text-center"
                            >
                              <div className="flex flex-col items-center justify-center opacity-40">
                                <Package2 className="w-12 h-12 mb-2" />
                                <p className="text-sm font-medium">
                                  No items found
                                  in this list
                                </p>
                                <p className="text-xs text-slate-400">
                                  Try clearing
                                  filters or
                                  adding new
                                  items.
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredItems.map(
                            (item) => (
                              <TableRow
                                key={item.id}
                                className="border-slate-50 hover:bg-slate-50/50 transition-colors"
                              >
                                <TableCell className="px-6 py-4">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-900">
                                      {item.name}
                                    </span>
                                    <span className="text-xs text-slate-400 truncate max-w-[200px]">
                                      {
                                        item.description
                                      }
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="secondary"
                                    className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0 h-5"
                                  >
                                    {item.category ||
                                      'General'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm font-medium text-slate-600">
                                  $
                                  {item.price.toFixed(
                                    2
                                  )}
                                </TableCell>
                                <TableCell className="text-sm font-medium text-slate-600">
                                  {item.quantity}{' '}
                                  {item.unit}
                                </TableCell>
                                <TableCell className="text-right pr-6">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-slate-400 hover:text-emerald-600"
                                      onClick={() =>
                                        openEditItem(
                                          item
                                        )
                                      }
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-slate-400 hover:text-red-600"
                                      onClick={() =>
                                        confirmDeleteItem(
                                          item.id
                                        )
                                      }
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          )
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <Alert
            className={`border ${
              notification.type === 'success'
                ? 'border-green-500 bg-green-950'
                : notification.type === 'error'
                ? 'border-red-500 bg-red-950'
                : 'border-blue-500 bg-blue-950'
            }`}
          >
            {notification.type === 'success' && (
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            )}
            {notification.type === 'error' && (
              <AlertCircle className="h-4 w-4 text-red-400" />
            )}
            {notification.type === 'info' && (
              <Info className="h-4 w-4 text-blue-400" />
            )}
            <AlertDescription
              className={
                notification.type === 'success'
                  ? 'text-green-100'
                  : notification.type === 'error'
                  ? 'text-red-100'
                  : 'text-blue-100'
              }
            >
              {notification.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Dialogs for adding/editing lists and items */}
      {/* Edit Item Dialog */}
      <Dialog
        open={isEditItemOpen}
        onOpenChange={setIsEditItemOpen}
      >
        <DialogContent className="bg-white border-slate-200 max-w-2xl w-[95vw] sm:w-full overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-slate-900">
              Edit Item
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Update the details for your item.
              Unit and Quantity are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="editItemName"
                  className="text-slate-700"
                >
                  Item Name{' '}
                  <span className="text-red-400">
                    *
                  </span>
                </Label>
                <Input
                  id="editItemName"
                  value={editItemForm.name}
                  onChange={(e) =>
                    setEditItemForm({
                      ...editItemForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g., Basmati Rice"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                  aria-required="true"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="editDescription"
                  className="text-slate-700"
                >
                  Description (Optional)
                </Label>
                <Input
                  id="editDescription"
                  value={editItemForm.description}
                  onChange={(e) =>
                    setEditItemForm({
                      ...editItemForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="e.g., Premium long grain rice"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="editCategory"
                  className="text-slate-700"
                >
                  Category (Optional)
                </Label>
                <Input
                  id="editCategory"
                  value={editItemForm.category}
                  onChange={(e) =>
                    setEditItemForm({
                      ...editItemForm,
                      category: e.target.value,
                    })
                  }
                  placeholder="e.g., Grains & Cereals"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="editLocation"
                  className="text-slate-700"
                >
                  Location (Optional)
                </Label>
                <Input
                  id="editLocation"
                  value={editItemForm.location}
                  onChange={(e) =>
                    setEditItemForm({
                      ...editItemForm,
                      location: e.target.value,
                    })
                  }
                  placeholder="e.g., Pantry Shelf 2"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="editPrice"
                  className="text-slate-700"
                >
                  Price (Optional)
                </Label>
                <Input
                  id="editPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editItemForm.price}
                  onChange={(e) =>
                    setEditItemForm({
                      ...editItemForm,
                      price: e.target.value,
                    })
                  }
                  placeholder="0.00"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="editQuantity"
                  className="text-slate-700"
                >
                  Quantity{' '}
                  <span className="text-red-400">
                    *
                  </span>
                </Label>
                <Input
                  id="editQuantity"
                  type="number"
                  min="1"
                  value={editItemForm.quantity}
                  onChange={(e) =>
                    setEditItemForm({
                      ...editItemForm,
                      quantity: e.target.value,
                    })
                  }
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                  aria-required="true"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="editUnit"
                  className="text-slate-700"
                >
                  Unit{' '}
                  <span className="text-red-400">
                    *
                  </span>
                </Label>
                <Input
                  id="editUnit"
                  value={editItemForm.unit}
                  onChange={(e) =>
                    setEditItemForm({
                      ...editItemForm,
                      unit: e.target.value,
                    })
                  }
                  placeholder="e.g., bags, lbs, bottles"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                  aria-required="true"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="editCondition"
                  className="text-slate-700"
                >
                  Condition (Optional)
                </Label>
                <Select
                  value={editItemForm.condition}
                  onValueChange={(value: any) =>
                    setEditItemForm({
                      ...editItemForm,
                      condition: value,
                    })
                  }
                >
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="Good">
                      Good
                    </SelectItem>
                    <SelectItem value="Fair">
                      Fair
                    </SelectItem>
                    <SelectItem value="Poor">
                      Poor
                    </SelectItem>
                    <SelectItem value="Expired">
                      Expired
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setIsEditItemOpen(false)
                }
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={saveItemChanges}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit List Dialog */}
      <Dialog
        open={isEditListOpen}
        onOpenChange={setIsEditListOpen}
      >
        <DialogContent className="bg-white border-slate-200 max-w-2xl w-[95vw] sm:w-full overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-slate-900">
              Edit List
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Update the details for "
              {listToEdit?.name}" list. Required
              fields are marked with *.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label
                htmlFor="editListName"
                className="text-slate-700"
              >
                List Name{' '}
                <span className="text-red-400">
                  *
                </span>
              </Label>
              <Input
                id="editListName"
                value={editListForm.name}
                onChange={(e) =>
                  setEditListForm({
                    ...editListForm,
                    name: e.target.value,
                  })
                }
                placeholder="e.g., Freezer Items, Cleaning Supplies"
                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="editListDescription"
                className="text-slate-700"
              >
                Description (Optional)
              </Label>
              <Textarea
                id="editListDescription"
                value={editListForm.description}
                onChange={(e) =>
                  setEditListForm({
                    ...editListForm,
                    description: e.target.value,
                  })
                }
                placeholder="e.g., Items stored in the freezer..."
                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600 min-h-20"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-slate-700">
                Color Theme{' '}
                <span className="text-red-400">
                  *
                </span>
              </Label>
              <Select
                value={editListForm.color}
                onValueChange={(value) =>
                  setEditListForm({
                    ...editListForm,
                    color: value,
                  })
                }
              >
                <SelectTrigger className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {[
                    {
                      value: 'blue',
                      label: 'Blue',
                      class: 'bg-blue-500',
                    },
                    {
                      value: 'green',
                      label: 'Green',
                      class: 'bg-green-500',
                    },
                    {
                      value: 'purple',
                      label: 'Purple',
                      class: 'bg-purple-500',
                    },
                    {
                      value: 'red',
                      label: 'Red',
                      class: 'bg-red-500',
                    },
                    {
                      value: 'yellow',
                      label: 'Yellow',
                      class: 'bg-yellow-500',
                    },
                  ].map((color) => (
                    <SelectItem
                      key={color.value}
                      value={color.value}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${color.class}`}
                        />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setIsEditListOpen(false)
                }
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={saveListChanges}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      >
        <DialogContent className="bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-slate-900">
              Confirm Removal
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Are you sure you want to remove this
              item from your list? This action
              cannot be undone, but you can always
              add it back later if needed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() =>
                setIsDeleteConfirmOpen(false)
              }
              className="border-slate-200 text-slate-700 hover:bg-slate-50 flex-1"
            >
              Keep Item
            </Button>
            <Button
              variant="destructive"
              onClick={deleteItem}
              className="flex-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Yes, Remove Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogs for adding/editing lists and items */}
      <Dialog
        open={isNewListOpen}
        onOpenChange={setIsNewListOpen}
      >
        <DialogContent className="bg-white border-slate-200 max-w-2xl w-[95vw] sm:w-full overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-slate-900">
              Create New List
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Let's create a new list to help you
              stay organized. Please provide some
              details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label
                htmlFor="listName"
                className="text-slate-700"
              >
                List Name{' '}
                <span className="text-red-400">
                  *
                </span>
              </Label>
              <Input
                id="listName"
                value={newListForm.name}
                onChange={(e) =>
                  setNewListForm({
                    ...newListForm,
                    name: e.target.value,
                  })
                }
                placeholder="e.g., Freezer Items, Cleaning Supplies"
                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                aria-describedby="listName-help"
              />
              <p
                id="listName-help"
                className="text-xs text-slate-400"
              >
                Choose a descriptive name that
                helps you identify this list
              </p>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="listDescription"
                className="text-slate-700"
              >
                Description (Optional)
              </Label>
              <Textarea
                id="listDescription"
                value={newListForm.description}
                onChange={(e) =>
                  setNewListForm({
                    ...newListForm,
                    description: e.target.value,
                  })
                }
                placeholder="e.g., Items stored in the freezer including frozen meals and ice cream"
                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600 min-h-20"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-slate-700">
                Color Theme{' '}
                <span className="text-red-400">
                  *
                </span>
              </Label>
              <Select
                value={newListForm.color}
                onValueChange={(value) =>
                  setNewListForm({
                    ...newListForm,
                    color: value,
                  })
                }
              >
                <SelectTrigger className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {[
                    {
                      value: 'blue',
                      label: 'Blue',
                      class: 'bg-blue-500',
                    },
                    {
                      value: 'green',
                      label: 'Green',
                      class: 'bg-green-500',
                    },
                    {
                      value: 'purple',
                      label: 'Purple',
                      class: 'bg-purple-500',
                    },
                    {
                      value: 'red',
                      label: 'Red',
                      class: 'bg-red-500',
                    },
                    {
                      value: 'yellow',
                      label: 'Yellow',
                      class: 'bg-yellow-500',
                    },
                  ].map((color) => (
                    <SelectItem
                      key={color.value}
                      value={color.value}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${color.class}`}
                        />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setIsNewListOpen(false)
                }
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={createList}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create List
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isBulkAddOpen}
        onOpenChange={setIsBulkAddOpen}
      >
        <DialogContent className="bg-white border-slate-200 max-w-2xl w-[95vw] sm:w-full overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-slate-900">
              Bulk Add Items
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Save time by adding multiple items
              at once. Enter one item per line
              with details separated by commas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="text-slate-700">
                Items (one per line)
              </Label>
              <p className="text-xs text-slate-400 mb-2">
                Format: Name, Description,
                Category, Price, Quantity, Unit,
                Location, Condition
              </p>
              <Textarea
                value={bulkItems}
                onChange={(e) =>
                  setBulkItems(e.target.value)
                }
                placeholder="Rice, Premium basmati rice, Grains, 15.99, 2, bags, Pantry, Good&#10;Milk, Fresh whole milk, Dairy, 3.50, 1, gallon, Fridge, Good&#10;Apples, Red delicious apples, Fruits, 4.99, 3, lbs, Counter, Good"
                className="min-h-32 bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600 resize-none"
                rows={8}
                aria-describedby="bulk-help"
              />
              <p
                id="bulk-help"
                className="text-xs text-slate-400"
              >
                💡 Tip: Only the item name is
                required. Leave other fields empty
                if you don't have the information
                yet.
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-slate-700 mb-2">
                Example Format:
              </h4>
              <code className="text-xs text-slate-500 block">
                Bread, Whole wheat bread, Bakery,
                2.99, 1, loaf, Kitchen Counter,
                Good
              </code>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setIsBulkAddOpen(false)
                }
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={processBulkAdd}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add All Items
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isAddItemOpen}
        onOpenChange={setIsAddItemOpen}
      >
        <DialogContent className="bg-white border-slate-200 max-w-2xl w-[95vw] sm:w-full overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-slate-900">
              Add New Item
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Please provide the details for your
              new item. Unit and Quantity are
              required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="itemName"
                  className="text-slate-700"
                >
                  Item Name{' '}
                  <span className="text-red-400">
                    *
                  </span>
                </Label>
                <Input
                  id="itemName"
                  value={newItemForm.name}
                  onChange={(e) =>
                    setNewItemForm({
                      ...newItemForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g., Basmati Rice"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                  aria-required="true"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="description"
                  className="text-slate-700"
                >
                  Description (Optional)
                </Label>
                <Input
                  id="description"
                  value={newItemForm.description}
                  onChange={(e) =>
                    setNewItemForm({
                      ...newItemForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="e.g., Premium long grain rice"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="category"
                  className="text-slate-700"
                >
                  Category (Optional)
                </Label>
                <Input
                  id="category"
                  value={newItemForm.category}
                  onChange={(e) =>
                    setNewItemForm({
                      ...newItemForm,
                      category: e.target.value,
                    })
                  }
                  placeholder="e.g., Grains & Cereals"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="location"
                  className="text-slate-700"
                >
                  Location (Optional)
                </Label>
                <Input
                  id="location"
                  value={newItemForm.location}
                  onChange={(e) =>
                    setNewItemForm({
                      ...newItemForm,
                      location: e.target.value,
                    })
                  }
                  placeholder="e.g., Pantry Shelf 2"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="price"
                  className="text-slate-700"
                >
                  Price (Optional)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newItemForm.price}
                  onChange={(e) =>
                    setNewItemForm({
                      ...newItemForm,
                      price: e.target.value,
                    })
                  }
                  placeholder="0.00"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="quantity"
                  className="text-slate-700"
                >
                  Quantity{' '}
                  <span className="text-red-400">
                    *
                  </span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newItemForm.quantity}
                  onChange={(e) =>
                    setNewItemForm({
                      ...newItemForm,
                      quantity: e.target.value,
                    })
                  }
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                  aria-required="true"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="unit"
                  className="text-slate-700"
                >
                  Unit{' '}
                  <span className="text-red-400">
                    *
                  </span>
                </Label>
                <Input
                  id="unit"
                  value={newItemForm.unit}
                  onChange={(e) =>
                    setNewItemForm({
                      ...newItemForm,
                      unit: e.target.value,
                    })
                  }
                  placeholder="e.g., bags, lbs, bottles"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                  aria-required="true"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="condition"
                  className="text-slate-700"
                >
                  Condition (Optional)
                </Label>
                <Select
                  value={newItemForm.condition}
                  onValueChange={(value: any) =>
                    setNewItemForm({
                      ...newItemForm,
                      condition: value,
                    })
                  }
                >
                  <SelectTrigger className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="Good">
                      Good
                    </SelectItem>
                    <SelectItem value="Fair">
                      Fair
                    </SelectItem>
                    <SelectItem value="Poor">
                      Poor
                    </SelectItem>
                    <SelectItem value="Expired">
                      Expired
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setIsAddItemOpen(false)
                }
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={addItem}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
