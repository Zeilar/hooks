import { useStorage } from "./useStorage";

/**
 * Useful for improving UX by saving things such as settings.
 * @example const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "dark");
 */
export function useLocalStorage<T = any>(key: string, fallback?: any) {
	return useStorage<T>(localStorage, key, fallback);
}
