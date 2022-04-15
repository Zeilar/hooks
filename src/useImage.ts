import { useEffect, useState } from "react";
import { Status } from "./types";

export interface UseImageReturn {
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
}

/**
 * Useful for handling image loading state, like showing a placeholder in its place.
 * @example const { isError, isLoading, isSuccess } = useImage(src, () => console.log("Image loaded"));
 */
export function useImage(src: string, onImageLoad?: () => void): UseImageReturn {
	const [status, setStatus] = useState<Status>("loading");

	useEffect(() => {
		const image = new Image();
		image.src = src;
		setStatus("loading");

		function onLoad() {
			setStatus("success");
			if (onImageLoad) {
				onImageLoad();
			}
		}

		function onError() {
			setStatus("error");
		}

		image.addEventListener("load", onLoad);
		image.addEventListener("error", onError);

		return () => {
			image.removeEventListener("load", onLoad);
			image.removeEventListener("error", onError);
		};
	}, [src, onImageLoad]);

	return {
		isSuccess: status === "success",
		isError: status === "error",
		isLoading: status === "loading"
	};
}
