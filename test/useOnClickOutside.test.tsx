import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useOnClickOutside, Options } from "../src/useOnClickOutside";

interface UseOnClickOutsideProps {
	callback(): void;
	options?: Options;
}

export default function UseOnClickOutside({ callback, options }: UseOnClickOutsideProps) {
	const ref = useOnClickOutside<HTMLDivElement>(callback, options);
	return (
		<div>
			<div data-testid="test" ref={ref} />
			<div data-testid="outside" />
		</div>
	);
}

describe("it", () => {
	it("should render without crashing", () => {
		const fn = jest.fn();
		const { baseElement } = render(<UseOnClickOutside callback={fn} />);
		expect(baseElement).toBeTruthy();
	});

	it("should render without crashing", () => {
		const fn = jest.fn();
		const { baseElement } = render(<UseOnClickOutside callback={fn} />);
		expect(baseElement).toBeTruthy();
	});

	it("should fire callback on mousedown", () => {
		const fn = jest.fn();
		const { getByTestId } = render(<UseOnClickOutside callback={fn} />);
		const element = getByTestId("outside");
		fireEvent.mouseDown(element);
		expect(fn.mock.calls.length).toEqual(1);
	});

	it("should fire callback on mouseup", () => {
		const fn = jest.fn();
		const { getByTestId } = render(<UseOnClickOutside callback={fn} options={{ mouseup: true }} />);
		const element = getByTestId("outside");
		fireEvent.mouseUp(element);
		expect(fn.mock.calls.length).toEqual(1);
	});
});
