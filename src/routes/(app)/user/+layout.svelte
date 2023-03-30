<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/authStore';
	import { onDestroy } from 'svelte';

	let loaded = false;

	const unsub = authStore.subscribe((state) => {
		if (state === null) {
			goto('/auth/login');
		} else if (state === undefined) {
			loaded = false;
		} else {
			loaded = true;
		}
	});
	
	onDestroy(() => {
		unsub();
	});
</script>

{#if loaded}
	<slot />
{/if}
