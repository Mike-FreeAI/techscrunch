import { AppwriteService } from '$lib/AppwriteService';
import type { PageLoad } from './$types';
import { Query } from 'appwrite';

export const load = (async () => {
	const [ latestArticles, topArticles ] = await Promise.all([
		AppwriteService.getArticles([ Query.equal("isPinned", false) ]),
		AppwriteService.getArticles([ Query.equal("isPinned", true) ])
	]);

	return { latestArticles, topArticles  };
}) satisfies PageLoad;
