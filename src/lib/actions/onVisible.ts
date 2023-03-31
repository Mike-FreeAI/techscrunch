import type { Action } from 'svelte/action';

type Params = (isVisible: boolean) => void;

export const onVisible: Action<HTMLElement, Params> = (node, callback) => {
	const observer = new IntersectionObserver(([entry]) => {
		if (callback) {
			callback(entry.isIntersecting);
		}
	});

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
