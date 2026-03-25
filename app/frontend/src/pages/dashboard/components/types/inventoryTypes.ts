import type { Item } from "../../types";

export interface InventoryTableTypes {
    items: Item[];
    searchValue: string;
    onSearchChange: (value: string)=> void;
    selectedCategory: string;
    onCategoryChange: (value:string)=> void;
    categories: string[];
    onExport: ()=> void;
    onAddItem: ()=> void;
    onBulkAdd: ()=> void;
    onEditItem: (item: Item)=> void;
    onDeleteItem: (item: Item)=> void;
    isLoading?: boolean;
}