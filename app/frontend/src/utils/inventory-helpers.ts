import type {
  Item,
  ItemFormValues,
  ListFormValues,
} from '@/features/inventory/types';

export const getTotalValue = (
  items: Item[]
): number => {
  return items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );
};

export const getColorClasses = (
  color: string
): string => {
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

export const formatTime = (
  seconds: number
): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m
    .toString()
    .padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`;
};

export const validateItemForm = (
  form: ItemFormValues
): string | null => {
  if (!form.name.trim())
    return 'Please provide an item name';
  if (!form.unit.trim())
    return 'Please provide a valid unit (e.g., bags, lbs)';
  if (
    !form.quantity ||
    Number.parseInt(form.quantity) < 1
  )
    return 'Please provide a valid quantity';
  return null;
};

export const validateListForm = (
  form: ListFormValues
): string | null => {
  if (!form.name.trim())
    return 'Please provide a list name';
  if (!form.color)
    return 'Please select a color theme for your list';
  return null;
};
