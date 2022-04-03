export type Title = string | (() => string);

export function useTitle(title: Title) {
	const t = typeof title === "function" ? title() : title;
	document.title = t;
	return t;
}
