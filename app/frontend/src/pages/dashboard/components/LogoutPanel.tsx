import {
  ShieldAlert,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface LogoutPanelProps {
  userName?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isProcessing?: boolean;
}

const REMINDERS = [
  'Unsynced edits will be saved automatically before you leave.',
  'Shared members maintain access to existing grocery lists.',
  'Push alerts pause until you sign back in.',
];

export function LogoutPanel({
  userName = 'Household Admin',
  onConfirm,
  onCancel,
  isProcessing,
}: LogoutPanelProps) {
  return (
    <section className="space-y-6">
      <Card className="border-red-100 bg-red-50/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-900">
            <ShieldAlert className="h-5 w-5" />
            Leaving Donezo?
          </CardTitle>
          <CardDescription>
            You are about to sign {userName} out
            of the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            {REMINDERS.map((reminder) => (
              <li key={reminder}>{reminder}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Confirm logout
          </CardTitle>
          <CardDescription>
            Finish any pending edits before
            leaving the workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            Stay logged in
          </Button>
          <Button
            className="flex-1 bg-red-600 hover:bg-red-500"
            onClick={onConfirm}
            disabled={isProcessing}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isProcessing
              ? 'Signing out…'
              : 'Logout now'}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
