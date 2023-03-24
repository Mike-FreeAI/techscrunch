import { AppwriteService } from '$lib/AppwriteService';
import type { PageLoad } from './$types';
import { Query } from 'appwrite';

export const load = (async ({ params }) => {
	const pins = await AppwriteService.getPins();
	const pinnedArticleIds = [...new Set(pins.documents.map((pin) => pin.articleId))];

	const [ latestArticles, topArticles ] = await Promise.all([
		AppwriteService.getArticles([]),
		(async () => {
			if(pinnedArticleIds.length <= 0) {
				return []
			}

			return (await AppwriteService.getArticles([ Query.equal('$id', pinnedArticleIds) ])).documents;
		})()
	]);

	return { latestArticles, topArticles  };
}) satisfies PageLoad;
