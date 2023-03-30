import { writable } from 'svelte/store';
import type { Models } from 'appwrite';
import type { Author } from '$lib/AppwriteService';

export const profileStore = writable<Author | null | undefined>(undefined);