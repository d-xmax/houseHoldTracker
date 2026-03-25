import {
  ArrowLeft,
  Compass,
  Home,
  LifeBuoy,
  MapPin,
} from 'lucide-react';
 ;

type ParsedRouteError = {
  status?: number;
  statusText?: string;
  message?: string;
};

const supportEmail =
  'support@householdtracker.app';

function extractRouteError(
  error: unknown,
): ParsedRouteError | null {
  if (!error) {
    return null;
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  if (typeof error === 'object') {
    const candidate = error as Record<
      string,
      unknown
    >;
    const data = candidate.data;

    let message: string | undefined;

    if (typeof data === 'string') {
      message = data;
    } else if (
      data &&
      typeof data === 'object' &&
      'message' in
        (data as Record<string, unknown>) &&
      typeof (data as Record<string, unknown>)
        .message === 'string'
    ) {
      message = (data as Record<string, unknown>)
        .message as string;
    } else if (
      'message' in candidate &&
      typeof candidate.message === 'string'
    ) {
      message = candidate.message as string;
    }

    return {
      status:
        typeof candidate.status === 'number'
          ? (candidate.status as number)
          : undefined,
      statusText:
        typeof candidate.statusText === 'string'
          ? (candidate.statusText as string)
          : undefined,
      message,
    };
  }

  return null;
}

export default function NotFound() {
  
 
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 right-12 h-72 w-72 rounded-full bg-emerald-500/20 blur-[140px]"
          aria-hidden
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[160px]"
          aria-hidden
        />
      </div>

      <div className="relative w-full max-w-4xl rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10 backdrop-blur-lg">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1">
            <span
              className="h-2 w-2 rounded-full bg-emerald-400"
              aria-hidden
            />
            Signal Lost
          </span>
          <span className="text-slate-400">
            Household Tracker
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-end gap-4">
            <p className="text-6xl font-semibold tracking-tight">
              {statusCode}
            </p>
            <p className="text-base uppercase tracking-[0.5em] text-slate-300">
              {statusText}
            </p>
          </div>

          <h1 className="text-4xl font-semibold leading-tight text-white">
            We could not find the page you
            requested.
          </h1>
          <p className="text-lg text-slate-300">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-200">
            <span className="uppercase tracking-[0.35em] text-emerald-300">
              Attempted Path
            </span>
            <span className="rounded-full bg-black/30 px-3 py-1 text-slate-100">
              {attemptedPath || '/'}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-emerald-300"
            >
              <Home className="h-4 w-4" />
              Back to dashboard
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:border-white/60"
            >
              <ArrowLeft className="h-4 w-4" />
              Try previous page
            </button>
          </div>

          <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <Compass className="h-4 w-4 text-emerald-300" />
              Double-check the slug in your
              address bar.
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <MapPin className="h-4 w-4 text-emerald-300" />
              Re-open the list from the sidebar
              switcher.
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <LifeBuoy className="h-4 w-4 text-emerald-300" />
              Email {supportEmail} if the link
              should exist.
            </div>
          </div>

          {parsedError && (
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                Router payload
              </p>
              <p className="mt-2 font-mono text-sm text-white">
                {statusCode} {statusText}
              </p>
              {description && (
                <p className="mt-1 text-xs text-slate-400">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
