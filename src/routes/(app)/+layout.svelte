<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { AppwriteService } from '$lib/AppwriteService';
	import Modal from '$lib/components/Modal.svelte';
	import { authStore } from '$lib/stores/authStore';
	import { modalStore } from '$lib/stores/modalStore';
	import { profileStore } from '$lib/stores/profileStore';
	import '$lib/styles/index.scss';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { readingArticle } from './readingArticle';

	let isMenuOpened = false;
	let footerBanner = true;

	export let data: LayoutData;

	onMount(async () => {
		if (browser) {
			$authStore = await AppwriteService.getAccount();
			if ($authStore) {
				if (!$authStore.prefs.profileId) {
					goto('/user/onboarding');
				} else {
					$profileStore = await AppwriteService.getProfile($authStore.prefs.profileId);
				}
			}
		}
	});

	page.subscribe(() => {
		readingArticle.reset();
	});
</script>

<div class:is-nav-open={isMenuOpened} class="main-grid">
	<header class="mobile-header is-only-mobile">
		<a href="/" class="u-block">
			<img
				src="/img/techscrunch-logo.svg"
				class="mobile-header-logo"
				alt="TechScrunch"
				width="70"
				height="43"
			/>
		</a>
		<button
			aria-label="Toggle menu"
			class="mobile-header-button"
			on:click={() => (isMenuOpened = !isMenuOpened)}
		>
			<span class="hamburger-icon" />
		</button>
	</header>
	<nav class="side-nav">
		<header class="mobile-header is-only-mobile">
			<a href="/" class="u-block">
				<img
					src="/img/techscrunch-logo.svg"
					class="mobile-header-logo"
					alt="TechScrunch"
					width="70"
					height="43"
				/>
			</a>
			<button
				aria-label="Toggle menu"
				class="mobile-header-button"
				on:click={() => (isMenuOpened = !isMenuOpened)}
			>
				<span class="hamburger-icon" />
			</button>
		</header>

		<div class="side-nav-content">
			<a href="/" class="u-block is-not-mobile">
				<img height="35" src="/img/techscrunch-logo.svg" class="side-nav-logo" alt="TechScrunch" />
			</a>
			<div class="side-nav-join heading-level-3 u-margin-block-start-20">Tech News</div>
			<ul class="side-nav-list" style="margin-block-start: 0.8rem; font-size: 1.2rem;">
				{#if !$authStore}
					<li class="side-nav-item" style="margin-block-end: 2.5rem">
						<a href="/auth/login" class="side-nav-link">
							<span class="text">Login</span>
						</a>
					</li>
				{:else if !$profileStore}
					<li class="side-nav-item" style="margin-block-end: 2.5rem">
						<a href="/user/onboarding" class="side-nav-link">
							<span class="text">Onboarding</span>
						</a>
					</li>
				{:else}
					<li class="u-min-height-32">
						<a class="link-on-hover u-flex u-gap-8 u-cross-center u-trim-1" href="/user/profile">
							{#if $profileStore?.imageId}
								<img
									loading="lazy"
									class="u-block u-rounded-full"
									width="32"
									height="32"
									src={AppwriteService.getProfileImage($profileStore?.imageId, 32, 32)}
									alt=""
								/>
							{:else}
								<img class="u-block" width="32" height="32" src="/img/profile.webp" alt="" />
							{/if}

							<span class="text side-nav-item">{$profileStore?.name ?? ''}</span>
						</a>
					</li>
					<li class="side-nav-item">
						<button
							on:click={() => ($modalStore = { type: 'addArticle' })}
							class="side-nav-link u-color-text-pink"
						>
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
		<!-- <section class="u-margin-block-start-12">
			<img src="/img/appwrite-banner.webp" class="u-aspect-wide" alt="Cloud banner" />
		</section> -->
		<slot />
	</main>
	<aside class="side-content">
		<section class="side-content-body u-margin-block-start-12">
			<section class="side-register">
				<div>
					<section>
						<h1>Appwrite Cloud Private Beta</h1>
						<p>
							Join the
							<br />
							Waiting List
						</p>
					</section>
					<div class="divider" />
					<a href="https://appwrite.io/cloud" target="_blank">Register Now</a>
				</div>
			</section>
			<section class="u-margin-block-start-12">
				<a href="https://appwrite.io/cloud" target="_blank">
					<img
					height="270"
					width="270"
					src="/img/cloud-banner.webp"
					class="u-aspect-1-1"
					alt="Cloud banner"
				/>
				</a>
			</section>
		</section>
	</aside>
	<footer class="main-footer">
		<div class="u-flex u-gap-8 u-flex-wrap">
			<p class="u-margin-inline-end-auto">© 2023 TechScrunch. All rights reserved.</p>

			<div class="u-flex u-gap-16">
				<a
					href="https://github.com/appwrite/techscrunch"
					target="_blank"
					class="u-margin-inline-start-auto u-inline-flex u-gap-8"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M9 0C4.0293 0 0 4.13094 0 9.22827C0 13.3049 2.5785 16.7642 6.1551 17.9839C6.6051 18.0687 6.7689 17.784 6.7689 17.539C6.7689 17.3206 6.7617 16.7393 6.7572 15.9701C4.2534 16.5274 3.7251 14.7328 3.7251 14.7328C3.3165 13.666 2.7261 13.3822 2.7261 13.3822C1.9089 12.8111 2.7882 12.8221 2.7882 12.8221C3.6909 12.8866 4.1661 13.7729 4.1661 13.7729C4.9689 15.1824 6.273 14.7752 6.7851 14.5393C6.8679 13.9433 7.1001 13.537 7.3575 13.3067C5.3595 13.0736 3.258 12.2813 3.258 8.74553C3.258 7.73859 3.609 6.91407 4.1841 6.26918C4.0914 6.0361 3.7827 5.09734 4.2723 3.82784C4.2723 3.82784 5.0283 3.5791 6.7473 4.77305C7.48149 4.56809 8.23899 4.46369 9 4.46259C9.765 4.46627 10.5345 4.56853 11.2536 4.77305C12.9717 3.5791 13.7259 3.82692 13.7259 3.82692C14.2173 5.09734 13.9077 6.0361 13.8159 6.26918C14.3919 6.91407 14.7411 7.73859 14.7411 8.74553C14.7411 12.2905 12.636 13.0709 10.6317 13.2993C10.9548 13.584 11.2419 14.1469 11.2419 15.0083C11.2419 16.2409 11.2311 17.2368 11.2311 17.539C11.2311 17.7859 11.3931 18.0733 11.8503 17.983C13.6425 17.3677 15.2004 16.1914 16.3039 14.6205C17.4075 13.0495 18.0008 11.1632 18 9.22827C18 4.13094 13.9698 0 9 0Z"
							fill="#373B4D"
						/>
					</svg>
					<span>Star Us on <b>GitHub</b></span>
				</a>
				<p class="u-flex u-flex-shrink-0">
					<a
						class="u-flex u-gap-8 u-flex-shrink-0"
						href="https://appwrite.io/cloud"
						target="_blank"
					>
						<img
							alt=""
							width="26"
							src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyMCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuNjAwMzkgMTUuMkMyLjI4MDc5IDE1LjIgMC40MDAzOTEgMTMuMzE5NiAwLjQwMDM5MSAxMUMwLjQwMDM5MSA4LjgzIDIuMDQ2MTUgNy4wNDQzNCA0LjE1NzYxIDYuODIzMTFDNC4wNTUwMiA2LjQzMjYzIDQuMDAwMzkgNi4wMjI3MiA0LjAwMDM5IDUuNjAwMDVDNC4wMDAzOSAyLjk0OTA4IDYuMTQ5NDIgMC44MDAwNDkgOC44MDAzOSAwLjgwMDA0OUMxMS4wNTUgMC44MDAwNDkgMTIuOTQ2NSAyLjM1NDUgMTMuNDYxOCA0LjQ1MDE0QzEzLjcwMzMgNC40MTcxMSAxMy45NDk4IDQuNDAwMDUgMTQuMjAwNCA0LjQwMDA1QzE3LjE4MjcgNC40MDAwNSAxOS42MDA0IDYuODE3NzEgMTkuNjAwNCA5LjgwMDA1QzE5LjYwMDQgMTIuNzgyNCAxNy4xODI3IDE1LjIgMTQuMjAwNCAxNS4ySDQuNjAwMzlaIiBmaWxsPSIjMzczQjREIi8+Cjwvc3ZnPgo="
						/>
						<span class="text u-flex-shrink-0">Built with <b>Appwrite Cloud</b></span>
					</a>
				</p>
			</div>
		</div>
	</footer>
</div>

{#if footerBanner}
	<div class="bottom-banner">
		<section>
			<button
				aria-label="Hide banner"
				class="close close-mobile"
				on:click={() => (footerBanner = false)}
			>
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

			<img width="114" height="20" src="/img/banner-logo.svg" alt="OSS fund" />
			<div class="divider" />
			<h1>Have a cool open source project and want to get some support? Join our funding.</h1>
			<a class="button" href="https://appwrite.io/oss-fund"> Apply now </a>

			<button aria-label="Hide banner" class="close" on:click={() => (footerBanner = false)}>
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
