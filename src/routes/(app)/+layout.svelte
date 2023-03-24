<script lang="ts">
	import '$lib/styles/index.scss';
	import type { LayoutData } from './$types';

	let isMenuOpened = false;
	let footerBanner = true;

	export let data: LayoutData;
</script>

<div class:is-nav-open={isMenuOpened} class="main-grid">
	<header class="mobile-header is-only-mobile">
		<a href="/" class="u-block">
			<img
				src="/img/techscrunch-logo.svg"
				class="mobile-header-logo"
				alt="Techs Crunch"
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
					alt="Techs Crunch"
					width="70"
				/>
			</a>
			<button class="mobile-header-button" on:click={() => (isMenuOpened = !isMenuOpened)}>
				<span class="hamburger-icon" />
			</button>
		</header>

		<div class="side-nav-content">
			<a href="/" class="u-block is-not-mobile">
				<img src="/img/techscrunch-logo.svg" class="side-nav-logo" alt="Techs Crunch" width="70" />
			</a>
			<a class="side-nav-join heading-level-3 u-margin-block-start-20 u-strike" href="/"
				>Join TechsCrunch+</a
			>
			<ul class="side-nav-list" style="margin-block-start: 0.8rem; font-size: 1.2rem;">
				<li class="side-nav-item">
					<a href="/" class="side-nav-link u-strike">
						<span class="text">Login</span>
					</a>
				</li>
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
						<span class="text">TechsCrunch+</span>
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
						<h1>TechsCrunch Early Stage</h1>
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
		<p>© 2023 Techs Crunch. All rights reserved.</p>
	</footer>
</div>

{#if footerBanner}
<div class="bottom-banner">

	<section>

	<button class="close close-mobile" on:click={() => footerBanner = false}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		  </svg>
	</button>

		<img src="/img/banner-logo.png" alt="OSS fund" />
		<div class="divider" />
		<h1>
			Have a cool open source project and want to get some support? Join our funding. 

		</h1>
		<a href="https://appwrite.io/oss-fund"> Apply now </a>

		<button class="close" on:click={() => footerBanner = false}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			  </svg>
		</button>
		  
	</section>
	<div class="divider" />
</div>
{/if}
