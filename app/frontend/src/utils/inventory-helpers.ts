import { z } from 'zod';
import type {
  Item,
  ItemFormValues,
  ListFormValues,
} from '@/pages/dashboard/types';

const listSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please provide a list name'),
  description: z
    .string()
    .max(
      500,
      'Description should be under 500 characters',
    ),
  color: z
    .string()
    .min(
      1,
      'Please select a color theme for your list',
    ),
});

const itemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please provide an item name'),
  description: z
    .string()
    .max(
      500,
      'Description should be under 500 characters',
    ),
  category: z
    .string()
    .max(
      120,
      'Category should be under 120 characters',
    ),
  price: z
    .string()
    .refine(
      (value) =>
        value.trim() === '' ||
        Number.isFinite(Number(value)),
      {
        message: 'Please provide a valid price',
      },
    )
    .refine(
      (value) =>
        value.trim() === '' || Number(value) >= 0,
      {
        message: 'Price cannot be negative',
      },
    ),
  quantity: z
    .string()
    .min(1, 'Please provide a valid quantity')
    .refine(
      (value) => {
        const quantity = Number(value);
        return (
          Number.isInteger(quantity) && quantity > 0
        );
      },
      {
        message: 'Please provide a valid quantity',
      },
    ),
  unit: z
    .string()
    .trim()
    .min(
      1,
      'Please provide a valid unit (e.g., bags, lbs)',
    ),
  location: z
    .string()
    .max(
      160,
      'Location should be under 160 characters',
    ),
  condition: z.enum([
    'Good',
    'Fair',
    'Poor',
    'Expired',
  ]),
});

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
  const parsed = itemSchema.safeParse(form);
  if (!parsed.success) {
    return (
      parsed.error.issues[0]?.message ??
      'Please provide valid item details'
    );
  }
  return null;
};

export const validateListForm = (
  form: ListFormValues
): string | null => {
  const parsed = listSchema.safeParse(form);
  if (!parsed.success) {
    return (
      parsed.error.issues[0]?.message ??
      'Please provide valid list details'
    );
  }
  return null;
};
