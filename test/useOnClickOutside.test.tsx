import React from "react";
import UseOnClickOutside from "../mock/components/UseOnClickOutside";
import { fireEvent, render } from "@testing-library/react";

describe("it", () => {
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
