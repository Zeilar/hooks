import { useStorage } from "./useStorage";

/**
 * Useful for improving UX by saving things such as settings.
 * @example const [savedEmail, setSavedEmail] = useLocalStorage<string>("email");
 */
export function useLocalStorage<T = any>(key: string, fallback?: any) {
	return useStorage<T>(localStorage, key, fallback);
}
