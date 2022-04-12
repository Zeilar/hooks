/**
 * Useful for view components. Writes to the document title.
 * @example useTitle(`${BRAND} | Home`);
 */
export function useTitle(title: string | (() => string)) {
	const resolvedTitle = typeof title === "function" ? title() : title;
	document.title = resolvedTitle;
	return resolvedTitle;
}
