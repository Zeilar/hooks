import React from "react";
import { useOnClickOutside, Options } from "../../src";

interface Props {
	callback(): void;
	options?: Options;
}

export default function UseOnClickOutside({ callback, options }: Props) {
	const ref = useOnClickOutside<HTMLDivElement>(callback, options);
	return (
		<div>
			<div data-testid="test" ref={ref} />
			<div data-testid="outside" />
		</div>
	);
}
