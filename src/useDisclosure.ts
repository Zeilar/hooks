import { useState } from "react";

export interface UseDisclosureReturn {
	isOpen: boolean;
	open(): void;
	close(): void;
	toggle(): void;
}

/**
 * Useful for abstracting disclosure logic, e.g the visibility state of a modal.
 * @example const { isOpen, open, close, toggle } = useDisclosure();
 */
export function useDisclosure(initialState: boolean = false) {
	const [isOpen, setIsOpen] = useState(initialState);

	function open() {
		setIsOpen(true);
	}

	function close() {
		setIsOpen(false);
	}

	function toggle() {
		setIsOpen(open => !open);
	}

	return { isOpen, open, close, toggle };
}
