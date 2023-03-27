<script lang="ts">
	import { browser } from '$app/environment';
	import { AppwriteService } from '$lib/AppwriteService';
  import Modal from '$lib/components/Modal.svelte';
	import { authStore } from '$lib/stores/authStore';
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
			<a class="side-nav-join heading-level-3 u-margin-block-start-20 u-strike" href="/"
				>Join TechScrunch+</a
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
						<img
							width="32"
							src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABAAEADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+qF9q0NnlB+8l/ug9PrSatf/AGO3Cof3r8D2HrXLEliSTknqTQBen1i8mPEnlr6Jx+tVWuJ3+9NIfqxqKigCVbmdPuzSD6MatwazeQnl/MX0cZ/Ws+igDrLHVIb35R8kv9w9/pV6uGVijBlJBHII7V1el33222+b/Wpw3v70AYGqzmfUJT2Q7R+FUqdI2+RmPUkmm0AKASQAMk10lnokEcQa4XzJCOQTwK563cR3Ebt0VgT+ddqrBlDKcgjIIoAyb7RIXiZ7ZdkgGdoPDVzldw7rGjOxwqjJNcTKweV3AwGYnFADav6POYNRQfwyfKf6frVCpbdtlzE3o4P60AMddkjKexIptXdVgMGoSjsx3D8arQwSXEojiUsxoAjq7a6rc2ibFYMnZWGcVr2mhQxANcHzH9P4R/jWkkEMYwkSL9FAoA5W71S5vF2OwVP7qjANU67Z7eGUYeJG+qisu80KKQFrY+W3908g/wCFAHO1JbruuYl9XA/WklieGQxyKVYdQauaPAZ9RjP8KfOfw/8Ar0AbWr2Bu4A8Y/ex9PcelY+l362EzLKnytwTjla6ms6+0iG7JdT5cvqBwfrQBeimjnQPE4dfUGn1yz6dqFm+6NX/AN6I0DUtTi4Lvx/eT/61AHU1HNPFbpvlcIvvXNHUdTm+UPJ/wFMfyFCaZf3j7pFYf7Up/wAmgBupXg1C5Xy48BeF45atzSrH7HbZcfvX5b29qLHSobPDn95L/ePb6VfoA//Z"
							alt=""
						/>
						<span class="text">{$authStore?.name}</span>
					</a>
				</li>
				{/if}
			</ul>
			<ul class="side-nav-list">
				<li class="side-nav-item">
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
				</li>
				{#each data.categories.documents as category}
					<li class="side-nav-item">
						<a href={`/category/${category.$id}`} class="side-nav-link">
							<span class="text">{category.name}</span>
						</a>
					</li>
				{/each}
				<li class="side-nav-item">
					<a href="/" class="side-nav-link u-strike">
						<span class="text">More</span>
					</a>
				</li>
			</ul>
		</div>
	</nav>

	<main class="main-content">
		<section
			class="u-margin-block-start-12"
			style="background-color:rgba(0,0,0,0.05); color: rgba(0,0,0,0.15); min-height:264px; display: flex; align-items: center; justify-content: center;"
		>
			NOT AD
		</section>
		<slot />
	</main>
	<aside class="side-content">
		<section class="side-content-body u-margin-block-start-12">
			<section class="side-register">
				<div>
					<section>
						<h1>TechScrunch Early Stage</h1>
						<p>
							April 20, 2023
							<br />
							Boston, MA
						</p>
					</section>
					<div class="divider" />
					<button class="u-strike">Register Now</button>
				</div>
			</section>
			<section
				class="u-margin-block-start-12"
				style="background-color:rgba(0,0,0,0.05); color: rgba(0,0,0,0.15); min-height:264px; display: flex; align-items: center; justify-content: center;"
			>
				NOT AD
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