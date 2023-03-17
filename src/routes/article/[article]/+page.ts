import { AppwriteService } from '$lib/AppwriteService';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	return { article: await AppwriteService.getArticle(params.article) };
}) satisfies PageLoad;
