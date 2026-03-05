import { Link } from "react-router-dom";

const highlights = [
  {
    title: 'Unified Household Dashboard',
    copy: 'Track pantry stock, wishlist items, and shopping tasks from a single command center.',
  },
  {
    title: 'Smart Automations',
    copy: 'Bulk add groceries, duplicate seasonal lists, and export summaries for quick errands.',
  },
  {
    title: 'Shared Context',
    copy: 'Invite family members so everyone stays synced on what is running low or newly added.',
  },
];

export default function IntroductionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:px-10">
        <section className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-sm uppercase tracking-[0.2em] text-white/70">
              Household Tracker
              <span
                className="h-2 w-2 rounded-full bg-emerald-400"
                aria-hidden
              />
              Live Preview
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Stay ahead of chores, groceries, and
              wishlists with a dashboard built for
              busy homes.
            </h1>
            <p className="text-lg text-white/80">
              This introduction area is your
              launchpad. Skim the highlights, then
              jump straight into the
              authentication flow to start
              curating personalized household
              lists.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
               to={'/signup'}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-emerald-400"
              >
                Create an account
              </Link>
              <Link
              to={'/login'}
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:border-white"
              >
                I already have access
              </Link>
            </div>
            <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-semibold text-white">
                  4
                </p>
                <p className="mt-1">
                  Active household spaces
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">
                  120+
                </p>
                <p className="mt-1">
                  Items synced weekly
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">
                  8 min
                </p>
                <p className="mt-1">
                  Average setup time
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
            <div className="rounded-2xl bg-white/5 p-4 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Sneak peek
              </p>
              <p className="mt-4 text-base text-white/80">
                Collect favorite recipes, monitor
                supplies, and hand off errands
                with confidence. The dashboard
                brings together everything you
                log, so your home feels
                effortless, not chaotic.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1 h-2 w-2 rounded-full bg-emerald-400"
                    aria-hidden
                  />
                  Instant overview of every list
                  in your household stack.
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1 h-2 w-2 rounded-full bg-cyan-400"
                    aria-hidden
                  />
                  One-click exports for store runs
                  or accountability updates.
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1 h-2 w-2 rounded-full bg-indigo-400"
                    aria-hidden
                  />
                  Fine-grained controls for
                  editing, bulk importing, and
                  archiving lists.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Why it matters
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                What the dashboard unlocks
              </h2>
              <p className="mt-2 text-base text-white/70">
                These pillars guide the rest of
                the experience you will see once
                you sign in.
              </p>
            </div>
            <a
              href="#signin-form"
              className="text-sm font-semibold text-emerald-300 hover:text-emerald-200"
            >
              Skip ahead to sign in →
            </a>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {highlights.map(({ title, copy }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-white/20"
              >
                <h3 className="text-xl font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-white/80">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
