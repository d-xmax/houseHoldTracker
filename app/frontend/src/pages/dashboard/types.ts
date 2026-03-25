export type ItemCondition =
  | 'Good'
  | 'Fair'
  | 'Poor'
  | 'Expired';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  location: string;
  condition: ItemCondition;
  addedDate: string;
}

export interface InventoryList {
  _id: string;
  name: string;
  description: string;
  color: string;
  items: Item[];
  createdDate: string;
}

export interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
  durationMs?: number;
}

export interface ListFormValues {
  name: string;
  description: string;
  color: string;
}

export interface ItemFormValues {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  unit: string;
  location: string;
  condition: ItemCondition;
}

export type DeleteTarget =
  | { type: 'item'; item: Item }
  | { type: 'list'; list: InventoryList }
  | null;
