<script lang="ts">
  import { goto } from "$app/navigation";
  import { AppwriteService } from "$lib/AppwriteService";
  import { profileStore } from "$lib/stores/profileStore";
  import { onMount } from "svelte";

	let error = '';

	async function createProfile() {
		try {
			const profile = await AppwriteService.createProfile();
			await AppwriteService.updatePrefs({
				profileId: profile.$id
			});
			$profileStore = profile;
			goto('/');
		} catch(err: any) {
			error = err.message;
		}
	}

	onMount(() => {
		createProfile();
	});
</script>

<section class="category-main u-margin-block-start-16">
	<header>
		<div class="u-stretch">
			<h1 class="writer-name">Onboarding</h1>
		</div>
		<p class="u-margin-block-start-20">Setting up your profile ...</p>
		{#if error}
		<p class="u-margin-block-start-20 u-color-text-danger">{error}</p>
		{/if}
	</header>
</section>
