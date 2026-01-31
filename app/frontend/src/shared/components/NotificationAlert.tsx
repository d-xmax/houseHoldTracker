import {
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert';
 

 

export function NotificationAlert({
  notification,
  onClose,
}) {
  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return (
          <CheckCircle2 className="h-4 w-4 text-green-400" />
        );
      case 'error':
        return (
          <AlertCircle className="h-4 w-4 text-red-400" />
        );
      default:
        return (
          <Info className="h-4 w-4 text-blue-400" />
        );
    }
  };

  const colorClass =
    notification.type === 'success'
      ? 'border-green-500 bg-green-950 text-green-100'
      : notification.type === 'error'
      ? 'border-red-500 bg-red-950 text-red-100'
      : 'border-blue-500 bg-blue-950 text-blue-100';

  return (
    <div
      className="fixed top-4 right-4 z-50 max-w-md"
      role="status"
      aria-live="polite"
    >
      <Alert
        className={`border ${colorClass} flex items-center gap-2`}
      >
        {getIcon()}
        <AlertDescription className="flex-1 text-sm">
          {notification.message}
        </AlertDescription>
        <button
          onClick={onClose}
          className="text-xs underline"
        >
          Dismiss
        </button>
      </Alert>
    </div>
  );
}
