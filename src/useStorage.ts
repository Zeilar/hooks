import { useEffect, useState } from "react";

/**
 * Stub for useSessionStorage and useLocalStorage, which should be used instead.
 */
export function useStorage<T = any>(storage: Storage, key: string, fallback?: any) {
	const [data, setData] = useState<T>(() => {
		const data = storage.getItem(key);
		return typeof data === "string" ? (JSON.parse(data) as T) : fallback;
	});

	useEffect(() => {
		storage.setItem(key, JSON.stringify(data));
	}, [data, key, storage]);

	return [data, setData] as const;
}
