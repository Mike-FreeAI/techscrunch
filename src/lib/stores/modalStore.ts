import { writable } from 'svelte/store';

export type Modal = {
    type: string;
    data?: any;
}

export const modalStore = writable<Modal | null>(null);