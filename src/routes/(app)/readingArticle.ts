import { AppwriteService, type Article } from '$lib/AppwriteService';
import { writable } from 'svelte/store';

const createReadingArticleStore = () => {
	const store = writable<Article | null>(null);

	const setId = async (articleId: string) => {
		const article = await AppwriteService.getArticle(articleId);
		console.log(article);
		store.set(article);
	};

	const reset = () => {
		store.set(null);
	};

	return {
		...store,
		setId,
		reset
	};
};

export const readingArticle = createReadingArticleStore();
