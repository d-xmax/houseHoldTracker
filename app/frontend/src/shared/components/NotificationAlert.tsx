import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/components/ui/alert';
import type { Notification } from '@/pages/dashboard/types';
import { cn } from '@/lib/utils';
 

interface NotificationAlertProps {
  notification: Notification | null;
  onClose: () => void;
}

export function NotificationAlert({
  notification,
  onClose,
}: NotificationAlertProps) {
  if (!notification) return null;

  const notificationTitle =
    notification.type === 'success'
      ? 'Success'
      : notification.type === 'error'
      ? 'Action failed'
      : 'Notice';

  const colorClass =
    notification.type === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
      : notification.type === 'error'
      ? 'border-red-200 bg-red-50 text-red-900'
      : 'border-sky-200 bg-sky-50 text-sky-900';

  const progressColorClass =
    notification.type === 'success'
      ? 'bg-emerald-400/70'
      : notification.type === 'error'
      ? 'bg-red-400/70'
      : 'bg-sky-400/70';
  const durationMs = notification.durationMs ?? 2000;

  return (
    <div
      className="fixed inset-x-4 top-4 z-50 sm:inset-x-auto sm:right-6 sm:w-full sm:max-w-md"
      style={{
        top: 'max(1rem, env(safe-area-inset-top))',
        right: 'max(1rem, env(safe-area-inset-right))',
        left: 'max(1rem, env(safe-area-inset-left))',
      }}
      role={notification.type === 'error' ? 'alert' : 'status'}
      aria-live={notification.type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <Alert
        className={cn(
          'relative overflow-hidden rounded-xl border pr-12 shadow-lg ring-1 ring-black/5 backdrop-blur-sm',
          colorClass,
        )}
      >
        <AlertTitle className="text-sm font-semibold leading-5 tracking-normal text-current">
          {notificationTitle}
        </AlertTitle>
        <AlertDescription className="mt-1 text-sm leading-6 text-current/90 break-words">
          {notification.message}
        </AlertDescription>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold text-current/80 transition hover:bg-black/5 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/35"
          aria-label="Dismiss notification"
        >
          Close
        </button>
        <div
          className={cn(
            'absolute bottom-0 left-0 h-1 rounded-r-full motion-reduce:animate-none',
            progressColorClass,
          )}
          style={{
            animation: `shrink ${durationMs}ms linear forwards`,
          }}
          aria-hidden="true"
        />
      </Alert>
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
