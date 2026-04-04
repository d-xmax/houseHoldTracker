import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useUserInfo } from "@/hooks/useUserInfo";

export interface UserSettingsState {
	fullName: string;
	email: string;
	timezone: string;
	enableReminders: boolean;
	weeklyDigest: boolean;
}

interface SettingsPanelProps {
	initialSettings?: Partial<UserSettingsState>;
	onSave?: (settings: UserSettingsState) => void;
}

const TIMEZONE_OPTIONS = [
	"Pacific Time (PT)",
	"Mountain Time (MT)",
	"Central Time (CT)",
	"Eastern Time (ET)",
	"Greenwich Mean Time (GMT)",
];

export function SettingsPanel({ initialSettings, onSave }: SettingsPanelProps) {
	const userInfo = useUserInfo();
	const normalizedInitial = useMemo<UserSettingsState>(() => {
		const user = userInfo?.data;
		return {
			fullName: initialSettings?.fullName ?? user?.name  ,
			email: initialSettings?.email ?? user?.email  ,
			timezone: initialSettings?.timezone  ,
			enableReminders: initialSettings?.enableReminders ?? true,
			weeklyDigest: initialSettings?.weeklyDigest ?? false,
		};
	}, [initialSettings, userInfo?.data]);

	const [settings, setSettings] =
		useState<UserSettingsState>(normalizedInitial);

	useEffect(() => {
		setSettings(normalizedInitial);
	}, [normalizedInitial]);

	const updateSetting = <K extends keyof UserSettingsState>(
		key: K,
		value: UserSettingsState[K],
	) => {
		setSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSave = () => {
		onSave?.(settings);
	};

	const handleReset = () => {
		setSettings(normalizedInitial);
	};

	return (
		<section className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Profile</CardTitle>
					<CardDescription>
						Keep your contact details current so list collaborators know who is
						on duty.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm font-medium text-slate-700">
							Display name
						</label>
						<Input
							value={settings.fullName}
							onChange={(event) =>
								updateSetting("fullName", event.target.value)
							}
							placeholder="Full name"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium text-slate-700">
							Notification email
						</label>
						<Input
							type="email"
							value={settings.email}
							onChange={(event) => updateSetting("email", event.target.value)}
							placeholder="name@email.com"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium text-slate-700">
							Timezone
						</label>
						<select
							className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
							value={settings.timezone}
							onChange={(event) =>
								updateSetting("timezone", event.target.value)
							}
						>
							{TIMEZONE_OPTIONS.map((timezone) => (
								<option key={timezone} value={timezone}>
									{timezone}
								</option>
							))}
						</select>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Notifications</CardTitle>
					<CardDescription>
						Toggle how Donezo keeps your household in sync.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
						<div>
							<p className="text-sm font-semibold text-slate-900">
								Smart reminders
							</p>
							<p className="text-xs text-slate-500">
								Nudges when pantry levels dip below your threshold.
							</p>
						</div>
						<button
							type="button"
							role="switch"
							aria-checked={settings.enableReminders}
							onClick={() =>
								updateSetting("enableReminders", !settings.enableReminders)
							}
							className={cn(
								"relative h-6 w-11 rounded-full border transition-colors",
								settings.enableReminders
									? "border-emerald-500 bg-emerald-500"
									: "border-slate-300 bg-slate-200",
							)}
						>
							<span
								className={cn(
									"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
									settings.enableReminders ? "left-5" : "left-0.5",
								)}
							/>
						</button>
					</div>

					<div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
						<div>
							<p className="text-sm font-semibold text-slate-900">
								Weekly digest
							</p>
							<p className="text-xs text-slate-500">
								Once-a-week recap of inventory changes and list progress.
							</p>
						</div>
						<button
							type="button"
							role="switch"
							aria-checked={settings.weeklyDigest}
							onClick={() =>
								updateSetting("weeklyDigest", !settings.weeklyDigest)
							}
							className={cn(
								"relative h-6 w-11 rounded-full border transition-colors",
								settings.weeklyDigest
									? "border-emerald-500 bg-emerald-500"
									: "border-slate-300 bg-slate-200",
							)}
						>
							<span
								className={cn(
									"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
									settings.weeklyDigest ? "left-5" : "left-0.5",
								)}
							/>
						</button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="flex flex-wrap justify-end gap-3">
					<Button variant="outline" onClick={handleReset}>
						Reset
					</Button>
					<Button
						className="bg-emerald-600 hover:bg-emerald-500"
						onClick={handleSave}
					>
						Save changes
					</Button>
				</CardContent>
			</Card>
		</section>
	);
}
