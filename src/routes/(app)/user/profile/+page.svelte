<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { AppwriteService, type Article } from '$lib/AppwriteService';
	import GridArticles from '$lib/components/GridArticles.svelte';
	import { authStore } from '$lib/stores/authStore';
	import { modalStore } from '$lib/stores/modalStore';
	import { profileStore } from '$lib/stores/profileStore';
	import { Query, type Models } from 'appwrite';
	import { onDestroy, onMount } from 'svelte';

	async function onLogout() {
		await AppwriteService.logout();
		$authStore = null;
		$profileStore = null;
		goto('/');
	}

	let files: any = [];
	let error = '';

	async function onChange() {
		const file = files[0] ?? null;
		if (file) {
			try {
				const { $id: fileId } = await AppwriteService.uploadProfilePicture(file);

				$profileStore = await AppwriteService.updateProfile($profileStore?.$id ?? '', {
					imageId: fileId
				});
			} catch (err: any) {
				error = err.message;
			}
		}
	}

	let initArticles: Models.DocumentList<Article> | null = null;

	onMount(async () => {
		if (browser) {
			if ($profileStore) {
				initArticles = await AppwriteService.getArticles([
					Query.equal('authorId', $profileStore.$id)
				]);
			}
		}
	});

	const unsub = profileStore.subscribe(async (profile) => {
		if (profile && !initArticles) {
			initArticles = await AppwriteService.getArticles([
				Query.equal('authorId', profile.$id)
			]);
		}
	});
	onDestroy(() => {
		unsub();
	});
</script>

{#if $profileStore}
	<h1 class="heading-level-1 u-color-text-pink u-margin-block-start-40">
		Hi, {$profileStore.name}.
	</h1>

	<div class="profile-uploader">
		<label for="file-upload" class="u-cursor-pointer">
			{#if $profileStore.imageId}
				<img
					loading="lazy"
					class="u-block u-margin-block-start-40 u-rounded-full"
					width="64"
					height="64"
					src={AppwriteService.getProfileImage($profileStore.imageId, 64, 64)}
					alt=""
				/>
			{:else}
				<img
					class="u-block u-margin-block-start-40"
					width="64"
					height="64"
					src="/img/profile.webp"
					alt=""
				/>
			{/if}
		</label>
		<input
			class="u-hide"
			id="file-upload"
			type="file"
			accept="image/png, image/jpeg, image/jpg"
			multiple={false}
			bind:files
			on:change={onChange}
		/>
	</div>

	{#if error}
		<p class="u-margin-block-start-12 u-color-text-danger">{error}</p>
	{/if}

	<section class="u-margin-block-start-40">
		<header class="u-flex u-flex-wrap u-gap-32 u-padding-block-12 u-sep-block-end">
			<h2 class="heading-level-2 u-margin-inline-end-auto">Account Details</h2>
			<button on:click={() => ($modalStore = { type: 'changePassword' })} class="link"
				>Change Password</button
			>
			<button on:click={() => ($modalStore = { type: 'editAccount' })} class="link"
				>Edit Account</button
			>
		</header>
		<table class="user-table">
			<tr>
				<th style="width:100px">Name</th>
				<td class="u-bold">{$profileStore.name ?? ''}</td>
			</tr>
			<tr>
				<th style="width:100px">E-mail</th>
				<td class="u-bold">{$profileStore.email ?? ''}</td>
			</tr>
			<tr>
				<th style="width:100px">Twitter</th>
				<td class="u-bold">{$profileStore.twitter ? '@' + $profileStore.twitter : ''}</td>
			</tr>
			<tr>
				<th style="width:100px">Bio</th>
				<td class="u-bold">{$profileStore.bio ?? ''}</td>
			</tr>
		</table>
		<div class="u-flex u-margin-block-start-64">
			<button on:click={onLogout} class="button u-margin-inline-start-auto">
				<span class="text">Logout</span>
			</button>
		</div>
	</section>

	<section>
		<h2 class="heading-level-1 u-padding-block-12 u-sep-block-end u-margin-block-start-32">
			The Latest from {$profileStore.name}
		</h2>

		{#if initArticles}
			<GridArticles
				queries={[Query.equal('authorId', $profileStore.$id)]}
				initData={initArticles}
			/>
		{/if}
	</section>
{/if}

<style lang="scss">
	.user-table {
		margin-block-start: 24px;
		th {
			width: 180px;
			padding-block: 8px;
		}
	}
</style>
