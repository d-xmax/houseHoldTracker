import {
  Menu,
  Mail,
  Bell,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

interface AppHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onMenuClick: () => void;
}

export function AppHeader({
  searchValue,
  onSearchChange,
  onMenuClick,
}: AppHeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-transparent pt-4 lg:pt-0">
      <div className="flex items-center gap-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </Button>
        <span className="font-bold text-lg">
          Donezo
        </span>
      </div>

      <div className="hidden lg:flex flex-1 max-w-md relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search lists"
          className="pl-10 pr-12 bg-white border-slate-200 rounded-full h-10 focus-visible:ring-emerald-600"
          value={searchValue}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
          ⌘
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-mono text-slate-400">
          F
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-slate-900 relative"
          >
            <Mail className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#F9FAFB]"></span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-slate-900"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">
              Totok Michael
            </p>
            <p className="text-xs text-slate-400 mt-1">
              tmichael20@mail.com
            </p>
          </div>
          <Avatar className="w-9 h-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" />
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
