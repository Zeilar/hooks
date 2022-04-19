import { useStorage } from "./useStorage";

/**
 * Useful for improving UX by saving things such as settings.
 * @example const [savedEmail, setSavedEmail] = useLocalStorage<string>("email");
 */
export function useSessionStorage<T = any>(key: string, fallback?: any) {
	return useStorage<T>(sessionStorage, key, fallback);
}
