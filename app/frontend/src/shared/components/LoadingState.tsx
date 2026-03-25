import { Loader2 } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type LoadingStateProps = {
  title?: string;
  description?: string;
  variant?: 'inline' | 'panel' | 'page';
  className?: string;
};

export function LoadingState({
  title = 'Loading',
  description = 'Please wait while we prepare your data.',
  variant = 'panel',
  className,
}: LoadingStateProps) {
  const isPage = variant === 'page';
  const isInline = variant === 'inline';

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'w-full',
        isPage && 'flex min-h-screen items-center justify-center p-6',
        isInline && 'py-2',
      )}
    >
      <Card
        className={cn(
          'relative overflow-hidden border-slate-200/70 bg-white/90 shadow-sm',
          isPage ? 'w-full max-w-md p-6' : isInline ? 'p-3' : 'p-4',
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),_transparent_58%)]"
        />

        <div className="relative flex items-start gap-3">
          <span className="rounded-full bg-emerald-100 p-2 text-emerald-700 ring-1 ring-emerald-200/80">
            <Loader2
              className={cn(
                'animate-spin',
                isInline ? 'h-4 w-4' : 'h-5 w-5',
              )}
            />
          </span>

          <div className="min-w-0 flex-1">
            <p
              className={cn(
                'font-semibold text-slate-900',
                isInline ? 'text-sm' : 'text-base',
              )}
            >
              {title}
            </p>
            <p
              className={cn(
                'mt-1 text-slate-600',
                isInline ? 'text-xs' : 'text-sm',
              )}
            >
              {description}
            </p>

            {!isInline && (
              <div className="mt-3 space-y-2" aria-hidden="true">
                <div className="h-2 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-2 w-2/3 animate-pulse rounded bg-slate-200" />
                <div className="h-2 w-1/2 animate-pulse rounded bg-slate-200" />
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
