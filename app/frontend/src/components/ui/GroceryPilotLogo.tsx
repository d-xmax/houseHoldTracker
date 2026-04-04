import * as React from "react";

// Simple grocery cart icon with a checkmark, matching the app's color scheme
export function GroceryPilotLogo({
	size = 40,
	className = "",
}: {
	size?: number;
	className?: string;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-label="Grocery Pilot Logo"
		>
			<rect x="2" y="8" width="36" height="24" rx="6" fill="#10B981" />
			<rect x="6" y="12" width="28" height="16" rx="4" fill="#fff" />
			<path
				d="M10 28a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm20 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
				fill="#0f172a"
			/>
			<path
				d="M13 18l5 5 9-9"
				stroke="#10B981"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="2"
				y="8"
				width="36"
				height="24"
				rx="6"
				stroke="#059669"
				strokeWidth="2"
			/>
		</svg>
	);
}
