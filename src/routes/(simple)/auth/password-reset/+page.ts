import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const ssr = false;

export const load: PageLoad = async ({ url }) => {
	const userId = url.searchParams.get('userId') ?? '';
	const secret = url.searchParams.get('secret') ?? '';

	return {
		userId,
		secret
	}
};