import { AppwriteService } from '$lib/AppwriteService';
import type { PageLoad } from './$types';
import { Query } from 'appwrite';

export const load = (async ({ params }) => {
	const [articles, author] = await Promise.all([
		AppwriteService.getArticles([Query.equal('authorId', params.author)]),
		AppwriteService.getAuthor(params.author)
	]);

	return { author, articles };
}) satisfies PageLoad;
