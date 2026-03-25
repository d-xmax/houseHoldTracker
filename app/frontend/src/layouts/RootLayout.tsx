import { useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DashboardSidebar } from '@/pages/dashboard/components/DashboardSidebar';
import { DashboardHeader } from '@/pages/dashboard/components/DashboardHeader';

import { useInventory } from '@/pages/dashboard/hooks/useInventory';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  const [activeTab, setActiveTab] =
    useState('tasks');
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);
  const inventory = useInventory();
  const { listSearchQuery, setListSearchQuery } =
    inventory;

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <main className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB] overflow-y-auto">
          <DashboardHeader
            searchValue={listSearchQuery}
            onSearchChange={setListSearchQuery}
            onMenuClick={() =>
              setIsSidebarOpen(true)
            }
          />
          <Outlet/>
        </main>
      </div>
    </TooltipProvider>
  );
}
