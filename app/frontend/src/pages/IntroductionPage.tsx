import { Link } from "react-router-dom";

const highlights = [
	{
		title: "Unified Household Dashboard",
		copy: "Track pantry stock, wishlist items, and shopping tasks from a single command center.",
	},
	{
		title: "Smart Automations",
		copy: "Bulk add groceries, duplicate seasonal lists, and export summaries for quick errands.",
	},
	{
		title: "Shared Context",
		copy: "Invite family members so everyone stays synced on what is running low or newly added.",
	},
];

export default function IntroductionPage() {
	const currentYear = new Date().getFullYear();
	return (
		<div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white animated-bg">
			<div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-12 lg:px-10">
				<section className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
					<div className="space-y-6">
						<div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/40 bg-slate-900/40 px-4 py-1 text-lg font-extrabold uppercase tracking-[0.2em] bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent shadow-[0_0_24px_rgba(16,185,129,0.35)]">
							Grocery Pilot
							<span
								className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse"
								aria-hidden
							/>
						</div>
						<h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
							Prepare your grocery list early. Buy all without misses
						</h1>
						<p className="text-lg text-white/80">
							Grocery Pilot helps you plan and organize everything you need for
							your monthly household supplies, so you’re always prepared before
							you go shopping. No more last-minute thinking or forgotten items,
							enjoy a smooth and easy shopping experience.
						</p>
						<div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
							<Link
								to={"/login"}
								className="inline-flex w-full items-center justify-center rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:border-white sm:w-auto"
							>
								I already have access
							</Link>
							<Link
								to={"/signup"}
								className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-emerald-400 sm:w-auto"
							>
								Create an account
							</Link>
						</div>
					</div>

					<div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_0_40px_rgba(15,23,42,0.35)] animated-card">
						<div className="rounded-2xl bg-slate-800/70 p-4 backdrop-blur">
							<p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300 mb-2">
								Get started in 4 steps
							</p>
							<ol className="relative ml-2 mt-4 space-y-6 border-l-2 border-emerald-300/35 pl-6">
								<li className="group flex items-center gap-6 animate-fade-in-up delay-0">
									<span className="inline-flex h-9 w-9 flex-shrink-0 aspect-square items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 via-cyan-300 to-indigo-300 text-slate-900 font-extrabold text-sm leading-none shadow-lg ring-2 ring-emerald-200/60 group-hover:scale-110 transition-transform">
										1
									</span>
									<div>
										<span className="font-extrabold text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text drop-shadow">
											Sign up with Grocery Pilot
										</span>
										<p className="text-white/70 text-sm">
											Create your secure account to access all features.
										</p>
									</div>
								</li>
								<li className="group flex items-center gap-6 animate-fade-in-up delay-200">
									<span className="inline-flex h-9 w-9 flex-shrink-0 aspect-square items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 via-cyan-300 to-indigo-300 text-slate-900 font-extrabold text-sm leading-none shadow-lg ring-2 ring-emerald-200/60 group-hover:scale-110 transition-transform">
										2
									</span>
									<div>
										<span className="font-extrabold text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text drop-shadow">
											Create your monthly list
										</span>
										<p className="text-white/70 text-sm">
											Start a new list for groceries for the month.
										</p>
									</div>
								</li>
								<li className="group flex items-center gap-6 animate-fade-in-up delay-400">
									<span className="inline-flex h-9 w-9 flex-shrink-0 aspect-square items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 via-cyan-300 to-indigo-300 text-slate-900 font-extrabold text-sm leading-none shadow-lg ring-2 ring-emerald-200/60 group-hover:scale-110 transition-transform">
										3
									</span>
									<div>
										<span className="font-extrabold text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text drop-shadow">
											Add items you want
										</span>
										<p className="text-white/70 text-sm">
											Quickly add monthly grocery items
										</p>
									</div>
								</li>
								<li className="group flex items-center gap-6 animate-fade-in-up delay-600">
									<span className="inline-flex h-9 w-9 flex-shrink-0 aspect-square items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 via-cyan-300 to-indigo-300 text-slate-900 font-extrabold text-sm leading-none shadow-lg ring-2 ring-emerald-200/60 group-hover:scale-110 transition-transform">
										4
									</span>
									<div>
										<span className="font-extrabold text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text drop-shadow">
											Download or share your list
										</span>
										<p className="text-white/70 text-sm">
											Get list as PDF or share in one click.
										</p>
									</div>
								</li>
							</ol>
							<style>{`
								@keyframes fade-in-up {
									0% { opacity: 0; transform: translateY(24px); }
									100% { opacity: 1; transform: translateY(0); }
								}
								.animate-fade-in-up {
									animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both;
								}
								.delay-0 { animation-delay: 0s; }
								.delay-200 { animation-delay: 0.2s; }
								.delay-400 { animation-delay: 0.4s; }
								.delay-600 { animation-delay: 0.6s; }
								/* subtle animated background */
								@keyframes bg-anim {
									0% { background-position: 0% 50%; }
									50% { background-position: 100% 50%; }
									100% { background-position: 0% 50%; }
								}
								.animated-bg {
									background-image: linear-gradient(270deg, #0f172a, #0b1220, #071226, #0b1220);
									background-size: 400% 400%;
									animation: bg-anim 18s ease-in-out infinite;
								}

								/* gentle bobbing for the card to add life */
								@keyframes bob {
									0% { transform: translateY(0); }
									50% { transform: translateY(-6px); }
									100% { transform: translateY(0); }
								}
								.animated-card { animation: bob 6s ease-in-out infinite; }

								/* removed breathing animation to keep step numbers identical */
							`}</style>
						</div>
					</div>
				</section>
			</div>

			<footer className="mt-auto w-full text-center py-4 bg-slate-900/80 text-white/70 text-sm font-normal tracking-wide shadow-sm">
				&copy; {currentYear} DevDrag. All rights reserved.
			</footer>
		</div>
	);
}
