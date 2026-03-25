import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import type {
  InventoryList,
  Item,
} from '@/pages/dashboard/types';

type ItemWithDetails = Item & {
  quantityDetails?: {
    quantity?: number;
    quantityType?: string;
  };
};

const formatMoney = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

const sanitizeFileName = (name: string): string => {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9\s_-]/g, '')
    .replace(/\s+/g, '_');
};

const getQuantity = (
  item: ItemWithDetails,
): { quantity: number; unit: string } => {
  const quantity =
    item.quantityDetails?.quantity ??
    item.quantity ??
    0;
  const unit =
    item.quantityDetails?.quantityType ??
    item.unit ??
    '';

  return {
    quantity,
    unit,
  };
};

export const exportSelectedListPdf = (
  list: InventoryList,
  items: ItemWithDetails[],
) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const exportedAt = new Date().toLocaleString();

  doc.setFontSize(16);
  doc.text(list.name, 14, 14);

  doc.setFontSize(10);
  doc.text(
    `Description: ${list.description || 'N/A'}`,
    14,
    20,
  );
  doc.text(`Exported: ${exportedAt}`, 14, 25);
  doc.text(`Total items: ${items.length}`, 14, 30);

  const body = items.map((item, index) => {
    const { quantity, unit } = getQuantity(item);
    const price = Number(item.price || 0);
    const subtotal = price * quantity;

    return [
      String(index + 1),
      item.name || '-',
      item.description || '-',
      item.category || '-',
      `${quantity} ${unit}`.trim() || '-',
      formatMoney(price),
      item.location || '-',
      item.condition || '-',
      formatMoney(subtotal),
    ];
  });

  autoTable(doc, {
    startY: 36,
    head: [
      [
        '#',
        'Name',
        'Description',
        'Category',
        'Quantity',
        'Price',
        'Location',
        'Condition',
        'Subtotal',
      ],
    ],
    body,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [22, 101, 52],
    },
    columnStyles: {
      2: { cellWidth: 62 },
    },
  });

  const totalValue = items.reduce((sum, item) => {
    const { quantity } = getQuantity(item);
    return sum + Number(item.price || 0) * quantity;
  }, 0);

  const finalY =
    (
      doc as jsPDF & {
        lastAutoTable?: { finalY: number };
      }
    ).lastAutoTable?.finalY ?? 36;

  doc.setFontSize(11);
  doc.text(
    `Total list value: ${formatMoney(totalValue)}`,
    14,
    finalY + 8,
  );

  const fileName = sanitizeFileName(list.name);
  doc.save(`${fileName || 'inventory_list'}.pdf`);
};