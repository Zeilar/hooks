import { useState } from "react";

export type Theme = "light" | "dark";

/**
 * Useful for dynamically changing theme.
 */
export function useTheme(fallback?: Theme) {
	const [theme, setTheme] = useState<Theme>(() => {
		if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}
		if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
			return "light";
		}
		return fallback ?? "light";
	});
	return [theme, setTheme] as const;
}
