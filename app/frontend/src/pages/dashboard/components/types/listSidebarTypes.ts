import type { InventoryList } from "../../types";

export interface ListSidebarTypes {
    lists: InventoryList[];
    visibleLists: InventoryList[];
    selectedListId : string;
    onSelectList: (id: string) => void;
    onCreateList: ()=> void;
    onEditList: (list: InventoryList)=> void;
    onDeleteList: (list: InventoryList)=> void;
    totalValue: number;
    isSearchActive: boolean;
}
 
 