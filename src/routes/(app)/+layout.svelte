<script lang="ts">
	import { browser } from '$app/environment';
	import { AppwriteService } from '$lib/AppwriteService';
	import Modal from '$lib/components/Modal.svelte';
	import { authStore } from '$lib/stores/authStore';
  import { modalStore } from '$lib/stores/modalStore';
	import '$lib/styles/index.scss';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	let isMenuOpened = false;
	let footerBanner = true;

	export let data: LayoutData;

	onMount(async () => {
		if (browser) {
			authStore.set(await AppwriteService.getAccount());
		}
	});
</script>

<div class:is-nav-open={isMenuOpened} class="main-grid">
	<header class="mobile-header is-only-mobile">
		<a href="/" class="u-block">
			<img
				src="/img/techscrunch-logo.svg"
				class="mobile-header-logo"
				alt="Tech Scrunch"
				width="70"
			/>
		</a>
		<button class="mobile-header-button" on:click={() => (isMenuOpened = !isMenuOpened)}>
			<span class="hamburger-icon" />
		</button>
	</header>
	<nav class="side-nav">
		<header class="mobile-header is-only-mobile">
			<a href="/" class="u-block">
				<img
					src="/img/techscrunch-logo.svg"
					class="mobile-header-logo"
					alt="Tech Scrunch"
					width="70"
				/>
			</a>
			<button class="mobile-header-button" on:click={() => (isMenuOpened = !isMenuOpened)}>
				<span class="hamburger-icon" />
			</button>
		</header>

		<div class="side-nav-content">
			<a href="/" class="u-block is-not-mobile">
				<img src="/img/techscrunch-logo.svg" class="side-nav-logo" alt="Tech Scrunch" width="70" />
			</a>
			<div class="side-nav-join heading-level-3 u-margin-block-start-20"
				>Tech News</div
			>
			<ul class="side-nav-list" style="margin-block-start: 0.8rem; font-size: 1.2rem;">
				{#if !$authStore}
					<li class="side-nav-item">
						<a href="/auth/login" class="side-nav-link">
							<span class="text">Login</span>
						</a>
					</li>
				{:else}
					<li>
						<a class="link-on-hover u-flex u-gap-8 u-cross-center" href="/user/profile">
							{#if $authStore?.prefs?.imageId}
								<img
									class="u-block u-rounded-full"
									width="32"
									src={AppwriteService.getProfileImage($authStore.prefs.imageId, 32, 32)}
									alt=""
								/>
							{:else}
								<img
									class="u-block"
									width="32"
									src="/img/profile.jpg"
									alt=""
								/>
							{/if}

							<span class="text">{$authStore?.name}</span>
						</a>
					</li>
					<li class="side-nav-item">
						<button on:click={() => $modalStore = { type: 'addArticle' }} class="side-nav-link u-color-text-pink">
							<span class="text">Add Article</span>
						</button>
					</li>
				{/if}
			</ul>
			<ul class="side-nav-list">
				<!-- <li class="side-nav-item">
					<a href="/" class="side-nav-link u-strike">
						<span class="text"
							>Search <svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								width="20"
								height="20"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						</span>
					</a>
				</li>
				<li class="side-nav-item">
					<a href="/" class="side-nav-link u-strike">
						<span class="text">TechScrunch+</span>
					</a>
				</li> -->
				{#each data.categories.documents as category}
					<li class="side-nav-item">
						<a href={`/category/${category.$id}`} class="side-nav-link">
							<span class="text">{category.name}</span>
						</a>
					</li>
				{/each}
				<!-- <li class="side-nav-item">
					<a href="/" class="side-nav-link u-strike">
						<span class="text">More</span>
					</a>
				</li> -->
			</ul>
		</div>
	</nav>

	<main class="main-content">
		<section class="u-margin-block-start-12">
			<img src="/img/appwrite-banner.png" class="u-aspect-wide" alt="Cloud banner" />
		</section>
		<slot />
	</main>
	<aside class="side-content">
		<section class="side-content-body u-margin-block-start-12">
			<section class="side-register">
				<div>
					<section>
						<h1>Appwrite Cloud Private Beta</h1>
						<p>
							Join Now
							<br />
							Free Credits
						</p>
					</section>
					<div class="divider" />
					<a href="https://appwrite.io/cloud"><button class="">Register Now</button></a>
				</div>
			</section>
			<section class="u-margin-block-start-12">
				<img src="/img/cloud-banner.png" class="u-aspect-1-1" alt="Cloud banner" />
			</section>
		</section>
	</aside>
	<footer class="main-footer">
		<p>© 2023 Tech Scrunch. All rights reserved.</p>
	</footer>
</div>

{#if footerBanner}
	<div class="bottom-banner">
		<section>
			<button class="close close-mobile" on:click={() => (footerBanner = false)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<img src="/img/banner-logo.png" alt="OSS fund" />
			<div class="divider" />
			<h1>Have a cool open source project and want to get some support? Join our funding.</h1>
			<a class="button" href="https://appwrite.io/oss-fund"> Apply now </a>

			<button class="close" on:click={() => (footerBanner = false)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</section>
		<div class="divider" />
	</div>
{/if}

<Modal />
