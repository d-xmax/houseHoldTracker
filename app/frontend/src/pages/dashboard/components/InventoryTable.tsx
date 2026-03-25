import {
  Search,
  FileDown,
  Plus,
  Edit,
  Trash2,
  Package2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { InventoryTableTypes } from './types/inventoryTypes';
import { LoadingState } from '@/shared/components/LoadingState';
 
 

 

export function InventoryTable({
  items,
  searchValue,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onExport,
  onAddItem,
  onBulkAdd,
  onEditItem,
  onDeleteItem,
  isLoading,
}:InventoryTableTypes  ) {
 
   
  return (
    <Card className="relative border-none shadow-sm overflow-hidden flex flex-col h-full">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-[1px]">
          <div className="w-full max-w-md px-4">
            <LoadingState
              variant="panel"
              title="Loading items"
              description="Loading items for this list..."
            />
          </div>
        </div>
      )}

      <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search items..."
            className="pl-9 bg-slate-50 border-none rounded-lg h-9 text-sm focus-visible:ring-emerald-600"
            value={searchValue}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={selectedCategory}
            onValueChange={onCategoryChange}
          >
            <SelectTrigger className="w-[140px] h-9 bg-slate-50 border-none rounded-lg text-xs">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="All Categories">
                All Categories
              </SelectItem>
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-slate-100 bg-transparent"
            onClick={onExport}
          >
            <FileDown className="w-4 h-4" />
          </Button>
          <Button
            onClick={onAddItem}
            className="bg-emerald-900 hover:bg-emerald-800 text-white rounded-full px-4 h-9 gap-2 font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
          <Button
            variant="outline"
            onClick={onBulkAdd}
            className="rounded-full px-4 h-9 border-slate-200 text-slate-700 font-semibold bg-transparent"
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
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-48 text-center"
                >
                  <div className="flex flex-col items-center justify-center opacity-40">
                    <Package2 className="w-12 h-12 mb-2" />
                    <p className="text-sm font-medium">
                      No items found in this list
                    </p>
                    <p className="text-xs text-slate-400">
                      Try clearing filters or
                      adding new items.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
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
                        {item.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0 h-5"
                    >
                      {item.category || 'General'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-slate-600">
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-slate-600">
                    {item.quantityDetails?.quantity} {item.quantityDetails?.quantityType}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-emerald-600"
                        onClick={() =>
                          onEditItem(item)
                        }
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-600"
                        onClick={() =>
                          onDeleteItem(item)
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
