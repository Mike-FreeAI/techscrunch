import { AppwriteService } from '$lib/AppwriteService';
import type { PageLoad } from './$types';
import { Query } from 'appwrite';

export const load = (async ({ params }) => {
	const [tag, relationships] = await Promise.all([
		await AppwriteService.getTag(params.tag),
		await AppwriteService.getArticleTagsByTag(params.tag)
	]);

	const articleIds = [...new Set(relationships.documents.map((relationship) => relationship.articleId))];
	const articles = await AppwriteService.getArticles([Query.equal('$id', articleIds), Query.limit(50)]);

	return { tag, articles };
}) satisfies PageLoad;
