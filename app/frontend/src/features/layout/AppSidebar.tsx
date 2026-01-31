import {
  Package2,
  Settings,
  HelpCircle,
  LogOut,
  Download,
  ShoppingCart,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

 
const MAIN_MENU = [
  
];
const GENERAL_MENU = [
  
];

export function AppSidebar({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
}) {
  

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
        isOpen
          ? 'translate-x-0'
          : '-translate-x-full'
      )}
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Donezo
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-8 w-8 text-slate-400 hover:text-slate-900"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto">
        <div>
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Menu
          </p>
          <div className="space-y-1">
            {MAIN_MENU.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  handleNavigate(item.id)
                }
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            General
          </p>
          <div className="space-y-1">
            {GENERAL_MENU.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  handleNavigate(item.id)
                }
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <Download className="w-12 h-12 -mr-4 -mt-4" />
          </div>
          <p className="text-sm font-semibold mb-1">
            Download our Mobile App
          </p>
          <p className="text-[10px] text-slate-400 mb-4">
            Get easy in another way
          </p>
          <Button
            size="sm"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none text-xs font-bold"
          >
            Download
          </Button>
        </div>
      </div>
    </aside>
  );
}
