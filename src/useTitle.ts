export type Title = string | (() => string);

/**
 * Useful for view components. Writes to the document title.
 * @example useTitle(`${BRAND} | Home`);
 */
export function useTitle(title: Title) {
	const t = typeof title === "function" ? title() : title;
	document.title = t;
	return t;
}
