import { useEffect, useState } from "react";

export interface UseImageReturn {
	isLoaded: boolean;
	isError: boolean;
}

/**
 * Useful for handling image loading state, like showing a placeholder in its place.
 * @example const { isLoaded, isError } = useImage(src, () => console.log("Image loaded"));
 */
export function useImage(src: string, onImageLoad?: () => void): UseImageReturn {
	const [isLoaded, setIsloaded] = useState(false);
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		const image = new Image();
		image.src = src;
		image.onload = () => {
			setIsloaded(true);
			if (onImageLoad) {
				onImageLoad();
			}
		};
		image.onerror = () => {
			setIsloaded(true);
			setIsError(true);
		};
		return () => {
			image.onload = null;
			image.onerror = null;
		};
	}, [src, onImageLoad]);

	return { isLoaded, isError };
}
