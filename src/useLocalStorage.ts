import { useEffect, useState } from "react";

/**
 * Useful for improving UX by saving things such as settings.
 * @example const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "dark")
 */
export function useLocalStorage<T = any>(key: string, fallback?: any) {
	const [data, setData] = useState<T>(() => {
		const data = localStorage.getItem(key);
		return typeof data === "string" ? (JSON.parse(data) as T) : fallback;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(data));
	}, [data, key]);

	return [data, setData] as const;
}
