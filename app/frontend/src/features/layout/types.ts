export interface AppHeaderTypes {
    searchValue: string;
    onSearchChange: (value: string)=> void;
    onMenuClick: ()=> void;
}

export interface AppSidebarTypes {
    isOpen: boolean;
    onClose: ()=> void;
    activeTab: string;
    onTabChange: (tab: string)=> void;
}