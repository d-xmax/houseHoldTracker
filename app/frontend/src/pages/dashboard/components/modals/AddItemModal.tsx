import { Save } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AddItemModalTypes } from '../modalTypes';

export function AddItemModal({
  open,
  onOpenChange,
  form,
  onFormChange,
  onAdd,
}: AddItemModalTypes) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="bg-white border-slate-200 max-w-2xl w-[95vw] sm:w-full overflow-y-auto max-h-[90vh]"
        onOpenAutoFocus={(event) =>
          event.preventDefault()
        }
      >
        <DialogHeader>
          <DialogTitle className="text-slate-900">
            Add New Item
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Add a new item to your inventory list.
            Name, Unit and Quantity are required.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
             
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  value={form.name}
                  onChange={(event) =>
                    onFormChange({
                      ...form,
                      name: event.target.value,
                    })
                  }
                  placeholder="e.g., Basmati Rice"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="description"
                  className="text-slate-700"
                >
                  Description
                </Label>
                <Input
                  id="description"
                  value={form.description}
                  onChange={(event) =>
                    onFormChange({
                      ...form,
                      description:
                        event.target.value,
                    })
                  }
                  placeholder="e.g., Premium long grain rice"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
             
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="category"
                  className="text-slate-700"
                >
                  Category
                </Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(event) =>
                    onFormChange({
                      ...form,
                      category:
                        event.target.value,
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
                  Location
                </Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(event) =>
                    onFormChange({
                      ...form,
                      location:
                        event.target.value,
                    })
                  }
                  placeholder="e.g., Pantry Shelf 2"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
             
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  value={form.quantity}
                  onChange={(event) =>
                    onFormChange({
                      ...form,
                      quantity:
                        event.target.value,
                    })
                  }
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
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
                  value={form.unit}
                  onChange={(event) =>
                    onFormChange({
                      ...form,
                      unit: event.target.value,
                    })
                  }
                  placeholder="e.g., bags, lbs, bottles"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="price"
                  className="text-slate-700"
                >
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) =>
                    onFormChange({
                      ...form,
                      price: event.target.value,
                    })
                  }
                  placeholder="0.00"
                  className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="condition"
                  className="text-slate-700"
                >
                  Condition
                </Label>
                <Select
                  value={form.condition}
                  onValueChange={(value) =>
                    onFormChange({
                      ...form,
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
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-200"
          >
            Cancel
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 rounded-full px-6 font-semibold"
            onClick={onAdd}
          >
            <Save className="w-4 h-4" />
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
