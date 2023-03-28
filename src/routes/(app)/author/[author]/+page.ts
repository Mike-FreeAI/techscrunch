import { AppwriteService } from '$lib/AppwriteService';
import type { PageLoad } from './$types';
import { Query } from 'appwrite';

export const load = (async ({ params }) => {
	const [articles] = await Promise.all([
		await AppwriteService.getArticles([Query.equal('authorId', params.author)])
	]);

	const author = {
		name: articles.documents[0]?.authorName,
		id: articles.documents[0]?.authorId,
		image: articles.documents[0]?.authorImage,
	}

	return { author, articles };
}) satisfies PageLoad;
