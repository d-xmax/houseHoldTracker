import type { ReactNode } from 'react';

export interface DashboardHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onMenuClick: () => void;
}

export interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface DashboardLayoutProps {
  children: ReactNode;
  headerProps: DashboardHeaderProps;
  sidebarProps: DashboardSidebarProps;
}
