import type {
  DeleteTarget,
  ItemFormValues,
  ListFormValues,
} from '../types';

export interface AddItemModalTypes {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ItemFormValues;
  onFormChange: (values: ItemFormValues) => void;
  onAdd: () => void;
}

export interface BulkAddModalTypes {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onChange: (value: string) => void;
  onProcess: () => void;
}

export interface CreateListModalTypes {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ListFormValues;
  onFormChange: (values: ListFormValues) => void;
  onCreate: () => void;
}

export interface DeleteConfirmModalTypes {
  target: DeleteTarget;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export interface EditItemModalTypes {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ItemFormValues;
  onFormChange: (values: ItemFormValues) => void;
  onSave: () => void;
}

export interface EditListModalTypes {
    open : boolean;
    onOpenChange: (open: boolean)=> void;
    form : ListFormValues;
    onFormChange: (values: ListFormValues)=> void;
    onSave: ()=> void;
    listName?: string;
}