import { renderHook } from "@testing-library/react-hooks";
import { useIsMounted } from "../src/useIsMounted";

describe("it", () => {
	it("should render without crashing", () => {
		renderHook(() => useIsMounted());
	});

	it("should set isMounted to true on second render", () => {
		const { result } = renderHook(() => useIsMounted());
		expect(result.current()).toBe(true);
	});
});
