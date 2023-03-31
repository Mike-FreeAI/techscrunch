import { clamp } from '$lib/helpers/number';
import type { Action } from 'svelte/action';

export const scrollingProgress: Action<HTMLElement, (progress: number) => void> = (
	node,
	callback
) => {
	const getScrollProgress = () => {
		const viewportHeight = window.innerHeight;
		const viewportTop = window.scrollY;
		// nodeY is the distance from the top of the page to the top of the node. Ignore scroll position.
		const nodeTop = node.getBoundingClientRect().top + viewportTop;
		const nodeHeight = node.getBoundingClientRect().height;

		const lb = nodeTop;
		const ub = nodeTop + nodeHeight - viewportHeight;

		const progress = (viewportTop - lb) / (ub - lb);
		return clamp(progress, 0, 1);
	};

	const handleEvent = () => {
		callback?.(getScrollProgress());
	};

	let observer = new ResizeObserver(handleEvent);

	// Call the callback with the current scroll progress.
	const update = () => {
		handleEvent();
		document.addEventListener('scroll', handleEvent);

		observer.disconnect();
		observer = new ResizeObserver(handleEvent);
		observer.observe(node);
	};

	update();

	return {
		destroy() {
			document.removeEventListener('scroll', update);
			observer.disconnect();
		},
		update
	};
};
