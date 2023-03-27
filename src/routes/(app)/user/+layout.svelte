<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/authStore';

	let loaded = false;

	$: {
		if ($authStore === null) {
			goto('/auth/login');
		} else if ($authStore === undefined) {
			loaded = false;
		} else {
			loaded = true;
		}
	}
</script>

{#if loaded}
	<slot />
{/if}
