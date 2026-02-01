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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { EditListModalTypes } from '../types/modalTypes';
 

const COLOR_OPTIONS = [
  {
    value: 'blue',
    label: 'Blue',
    swatchClass: 'bg-blue-500',
  },
  {
    value: 'green',
    label: 'Green',
    swatchClass: 'bg-green-500',
  },
  {
    value: 'purple',
    label: 'Purple',
    swatchClass: 'bg-purple-500',
  },
  {
    value: 'red',
    label: 'Red',
    swatchClass: 'bg-red-500',
  },
  {
    value: 'yellow',
    label: 'Yellow',
    swatchClass: 'bg-yellow-400',
  },
];

export function EditListModal({
  open,
  onOpenChange,
  form,
  onFormChange,
  onSave,
  listName,
}: EditListModalTypes) {
  const selectedColor = COLOR_OPTIONS.find(
    (color) => color.value === form.color,
  );

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="bg-white border-slate-200 max-w-md w-[95vw] sm:w-full"
        onOpenAutoFocus={(event) =>
          event.preventDefault()
        }
      >
        <DialogHeader>
          <DialogTitle className="text-slate-900">
            Edit List
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Update the details for{' '}
            {listName
              ? `"${listName}"`
              : 'your list'}
            .
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
              value={form.name}
              onChange={(event) =>
                onFormChange({
                  ...form,
                  name: event.target.value,
                })
              }
              placeholder="e.g., Kitchen Pantry"
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
              value={form.description}
              onChange={(event) =>
                onFormChange({
                  ...form,
                  description: event.target.value,
                })
              }
              placeholder="Add a description for this list..."
              className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600 min-h-[80px]"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="editListColor"
              className="text-slate-700"
            >
              Color Theme{' '}
              <span className="text-red-400">
                *
              </span>
            </Label>
            <Select
              value={form.color}
              onValueChange={(value) =>
                onFormChange({
                  ...form,
                  color: value,
                })
              }
            >
              <SelectTrigger className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600">
                <div className="flex items-center gap-2">
                  {selectedColor && (
                    <span
                      className={`h-4 w-4 rounded-full border border-white shadow-inner ${selectedColor.swatchClass}`}
                      aria-hidden="true"
                    />
                  )}
                  <SelectValue placeholder="Select a color">
                    {selectedColor?.label ??
                      'Select a color'}
                  </SelectValue>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {COLOR_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-4 w-4 rounded-full border border-white shadow-inner ${option.swatchClass}`}
                        aria-hidden="true"
                      />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            onClick={onSave}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
