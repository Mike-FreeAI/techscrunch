import { AppwriteService } from '$lib/AppwriteService';
import type { PageLoad } from './$types';
import { Query } from 'appwrite';

export const load = (async ({ params }) => {
	const [category, articles] = await Promise.all([
		await AppwriteService.getCategory(params.category),
		await AppwriteService.getArticles([Query.equal('categoryId', params.category)])
	]);

	return { category, articles };
}) satisfies PageLoad;
