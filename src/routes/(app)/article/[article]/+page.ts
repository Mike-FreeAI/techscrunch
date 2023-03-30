import { AppwriteService } from '$lib/AppwriteService';
import type { PageLoad } from './$types';
import { Query } from 'appwrite';

export const load = (async ({ params }) => {
	const article = await AppwriteService.getArticle(params.article);
	const moreArticles = await AppwriteService.getArticles([Query.cursorAfter(article.$id)]);

	return { article, moreArticles };
}) satisfies PageLoad;
