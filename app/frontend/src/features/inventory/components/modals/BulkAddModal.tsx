import { Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { BulkAddModalTypes } from '../modalTypes';

export function BulkAddModal({
  open,
  onOpenChange,
  value,
  onChange,
  onProcess,
}: BulkAddModalTypes) {
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
            Bulk Add Items
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Add multiple items at once by pasting
            a comma-separated list. Format: Name,
            Description, Category, Price,
            Quantity, Unit, Location, Condition
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="bulkItems"
              className="text-slate-700"
            >
              Items to Add
            </Label>
            <Textarea
              id="bulkItems"
              value={value}
              onChange={(event) =>
                onChange(event.target.value)
              }
              placeholder={`Basmati Rice, Premium long grain rice, Grains & Cereals, 12.99, 2, bags, Pantry Shelf 2, Good\nOlive Oil, Extra virgin olive oil, Condiments, 8.99, 1, bottles, Pantry Shelf 1, Good`}
              className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-600 min-h-[200px] font-mono text-sm"
            />
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
            onClick={onProcess}
          >
            <Upload className="w-4 h-4" />
            Process Items
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
