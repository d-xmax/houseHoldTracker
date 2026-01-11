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
import type { ListFormValues } from '@/features/inventory/types';

interface EditListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ListFormValues;
  onFormChange: (values: ListFormValues) => void;
  onSave: () => void;
  listName?: string;
}

const COLOR_OPTIONS = [
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'yellow', label: 'Yellow' },
];

export function EditListModal({
  open,
  onOpenChange,
  form,
  onFormChange,
  onSave,
  listName,
}: EditListModalProps) {
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
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {COLOR_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
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
