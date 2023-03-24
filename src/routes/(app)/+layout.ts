import { AppwriteService } from '$lib/AppwriteService';
import type { LayoutLoad } from './$types';

export const load = (async () => {
	return { categories: await AppwriteService.listCategories() };
}) satisfies LayoutLoad;
