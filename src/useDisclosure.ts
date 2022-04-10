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
export function useDisclosure() {
	const [isOpen, setIsOpen] = useState(false);

	function open() {
		setIsOpen(true);
	}

	function close() {
		setIsOpen(false);
	}

	function toggle() {
		setIsOpen(p => !p);
	}

	return { isOpen, open, close, toggle };
}