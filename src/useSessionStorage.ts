import { useStorage } from "./useStorage";

/**
 * Useful for improving UX by saving things such as settings.
 * @example const [theme, setTheme] = useSessionStorage<"light" | "dark">("theme", "dark");
 */
export function useSessionStorage<T = any>(key: string, fallback?: any) {
	return useStorage<T>(sessionStorage, key, fallback);
}
