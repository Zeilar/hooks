import { useState } from "react";

export type Theme = "light" | "dark";

/**
 * Useful for dynamically changing theme.
 * @example const [theme, setTheme, toggleTheme] = useTheme("dark");
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

	function toggle() {
		setTheme(theme => (theme === "dark" ? "light" : "dark"));
	}

	return [theme, setTheme, toggle] as const;
}
