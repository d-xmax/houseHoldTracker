import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { InventoryList } from '@/features/inventory/types';
import {
  getColorClasses, 
} from '@/utils/inventory-helpers';

interface ListSidebarProps {
  lists: InventoryList[];
  visibleLists: InventoryList[];
  selectedListId: string;
  onSelectList: (id: string) => void;
  onCreateList: () => void;
  onEditList: (list: InventoryList) => void;
  onDeleteList: (list: InventoryList) => void;
  totalValue: number;
  isSearchActive: boolean;
}

export function ListSidebar({
  lists,
  visibleLists,
  selectedListId,
  onSelectList,
  onCreateList,
  onEditList,
  onDeleteList,
  totalValue,
  isSearchActive,
}: ListSidebarProps) {
  return (
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
              onClick={onCreateList}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-2 pb-2">
          <div className="space-y-1">
            {visibleLists.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-slate-400">
                {isSearchActive
                  ? 'No lists match your search.'
                  : 'Create a list to get started.'}
              </div>
            ) : (
              visibleLists.map((list) => {
                const isSelected =
                  selectedListId === list.id;

                return (
                  <div
                    key={list.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={() =>
                      onSelectList(list.id)
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key === 'Enter' ||
                        event.key === ' '
                      ) {
                        event.preventDefault();
                        onSelectList(list.id);
                      }
                    }}
                    className={`group relative flex items-center justify-between px-3 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex-1 flex items-center gap-2 text-sm font-semibold text-left tracking-tight">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${getColorClasses(
                          list.color
                        )}`}
                      />
                      <span className="truncate">
                        {list.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pl-3">
                      <span
                        className={`inline-flex items-center justify-center min-w-[26px] text-[10px] tracking-wide px-1 py-0  rounded-md transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                        }`}
                        aria-label={`${list.items.length} items in ${list.name}`}
                      >
                        {list.items.length}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-emerald-600"
                        onClick={(event) => {
                          event.stopPropagation();
                          onEditList(list);
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeleteList(list);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
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
          {totalValue.toFixed(2)}
        </p>
      </Card>
    </aside>
  );
}
