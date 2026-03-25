import { AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { DeleteConfirmModalTypes } from '../modalTypes';

export function DeleteConfirmModal({
  target,
  onOpenChange,
  onConfirm,
}: DeleteConfirmModalTypes) {
  const isListDelete = target?.type === 'list';
  const entityName =
    target?.type === 'item'
      ? target.item.name
      : target?.list.name;

  return (
    <Dialog
      open={!!target}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="bg-white border-slate-200 max-w-sm w-[95vw] sm:w-full"
        onOpenAutoFocus={(event) =>
          event.preventDefault()
        }
      >
        <DialogHeader>
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-slate-900">
                {isListDelete
                  ? 'Delete List'
                  : 'Delete Item'}
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                {isListDelete
                  ? `Are you sure you want to delete the "${entityName}" list? All items inside will be removed.`
                  : `Are you sure you want to delete "${entityName}"? This action cannot be undone.`}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-200"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
