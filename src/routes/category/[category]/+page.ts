import { AppwriteService } from '$lib/AppwriteService';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    const [
        category,
        articles
    ] = await Promise.all([
        await AppwriteService.getCategory(params.category),
        await AppwriteService.getArticles(params.category)
    ]);
    
	return { category, articles };
}) satisfies PageLoad;
