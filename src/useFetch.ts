import { useState, useEffect } from "react";
import { Status } from "./types";

export type Dependencies = Record<any, boolean>;

/**
 * Budget deep compare, it won't work if order of keys changes.
 */
export function isEqual(foo: any, bar: any) {
	return JSON.stringify(foo) === JSON.stringify(bar);
}

export interface UseFetchLoadingReturn<T = any> {
	data: T | undefined;
	status: "loading";
	isLoading: true;
	isError: false;
	isSuccess: false;
}

export interface UseFetchSuccessReturn<T = any> {
	data: T;
	status: "success";
	isLoading: false;
	isError: false;
	isSuccess: true;
}

export interface UseFetchErrorReturn<T = any> {
	data: T | undefined;
	status: "error";
	isLoading: false;
	isError: true;
	isSuccess: false;
}

/**
 * Useful for client side rendering.
 * @example const { data, isLoading, isSuccess, isError, status } = useFetch<Post[]>("/api/v1/posts");
 */
export function useFetch<T = any>(url: string, config?: RequestInit, fallback?: T) {
	const [data, setData] = useState<T>(typeof fallback === "function" ? fallback() : fallback);
	const [status, setStatus] = useState<Status>("loading");
	const [configState, setConfigState] = useState(config);

	useEffect(() => {
		if (!isEqual(config, configState)) {
			setConfigState(config);
		}
	}, [config, configState]);

	useEffect(() => {
		(async () => {
			setStatus("loading");
			try {
				const response = await fetch(url, configState);
				if (response.ok) {
					setData(
						response.headers.get("Content-Type")?.includes("application/json")
							? await response.json()
							: await response.text()
					);
				}
				setStatus(response.ok ? "success" : "error");
			} catch (error) {
				console.error(error);
				setStatus("error");
			}
		})();
	}, [url, configState]);

	const result = {
		data,
		status,
		isLoading: status === "loading",
		isSuccess: status === "success",
		isError: status === "error"
	};

	if (result.isLoading) {
		return result as UseFetchLoadingReturn<T>;
	}

	if (result.isSuccess) {
		return result as UseFetchSuccessReturn<T>;
	}

	if (result.isError) {
		return result as UseFetchErrorReturn<T>;
	}

	return result as UseFetchErrorReturn<T>;
}
