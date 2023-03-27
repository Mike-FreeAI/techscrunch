<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppwriteService } from '$lib/AppwriteService';
	import type { PageData } from './$types';

	export let data: PageData;

	$: isValid = data.userId && data.secret;

	let password = '';
	let passwordAgain = '';

	let error = '';

	async function onSubmit() {
		if (password !== passwordAgain) {
			error = 'Passwords do not match.';
			return;
		}

		try {
			await AppwriteService.resetPasswordFinish(data.userId, data.secret, password, passwordAgain);
			goto('/auth/login');
		} catch (err: any) {
			error = err.message;
		}
	}
</script>

<img
	src="/img/techscrunch-logo.svg"
	class="u-block u-margin-inline-auto"
	alt="Tech Scrunch"
	width="70"
/>

<p class="u-margin-block-start-16 u-text-center">Last step!</p>
<h1 class="heading-level-2 u-margin-block-start-24 u-text-center">New Password</h1>

{#if isValid}
	<form class="form u-margin-block-start-16" on:submit|preventDefault={onSubmit}>
		<ul class="form-list">
			<li class="form-item">
				<input
					required={true}
					bind:value={password}
					class="input-text"
					type="password"
					placeholder="New Password"
					aria-label="Password"
				/>
			</li>
			<li class="form-item">
				<input
					required={true}
					bind:value={passwordAgain}
					class="input-text"
					type="password"
					placeholder="New Password Again"
					aria-label="Repeat Password"
				/>
			</li>
		</ul>

		<button type="submit" class="button u-margin-block-start-24 u-width-full-line">
			<span class="text">Save</span>
		</button>

		{#if error}
			<p class="u-margin-block-start-12 u-text-center u-color-text-danger">{error}</p>
		{/if}
	</form>
{:else}
	<p class="u-margin-block-start-12 u-text-center u-color-text-danger">
		Link is no longer valid. Please generate a new one.
	</p>

	<div class="u-margin-block-start-24">
		<a href="/auth/login" class="link u-block u-width-fit-content u-margin-inline-auto"
			>Go to Login</a
		>
	</div>
{/if}
