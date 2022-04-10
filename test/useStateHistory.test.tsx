import { act, renderHook } from "@testing-library/react-hooks";
import { useStateHistory } from "../src/useStateHistory";

describe("it", () => {
	it("should render without crashing", () => {
		renderHook(() => useStateHistory());
	});

	it("should add a state", () => {
		const { result } = renderHook(() => useStateHistory());
		act(() => {
			result.current.push(1, 2, 3);
		});
		expect(result.current.state).toEqual(3);
		expect(result.current.historyIndex).toEqual(2);
	});

	it("should go back", () => {
		const { result } = renderHook(() => useStateHistory());
		act(() => {
			result.current.push(1, 2, 3);
		});
		act(() => {
			result.current.back();
		});
		expect(result.current.state).toEqual(2);
		expect(result.current.historyIndex).toEqual(1);
	});

	it("should go forward", () => {
		const { result } = renderHook(() => useStateHistory());
		act(() => {
			result.current.push(1, 2, 3);
		});
		act(() => {
			result.current.back();
		});
		act(() => {
			result.current.forward();
		});
		expect(result.current.state).toEqual(3);
		expect(result.current.historyIndex).toEqual(2);
	});

	it("should go to index", () => {
		const { result } = renderHook(() => useStateHistory());
		act(() => {
			result.current.push(1, 2, 3);
		});
		act(() => {
			result.current.go(1);
		});
		expect(result.current.state).toEqual(2);
		expect(result.current.historyIndex).toEqual(1);
	});

	it("should clear the history", () => {
		const { result } = renderHook(() => useStateHistory());
		act(() => {
			result.current.clear();
		});
		expect(result.current.state).toEqual(undefined);
		expect(result.current.historyIndex).toEqual(0);
	});

	it("should remove the oldest", () => {
		const { result } = renderHook(() => useStateHistory());
		act(() => {
			result.current.push(1, 2, 3);
		});
		act(() => {
			result.current.remove(0);
		});
		act(() => {
			result.current.oldest();
		});
		expect(result.current.state).toEqual(2);
		expect(result.current.historyIndex).toEqual(0);
	});
});
