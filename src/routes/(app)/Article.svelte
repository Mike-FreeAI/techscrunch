<script lang="ts">
	import { browser } from '$app/environment';
	import { onVisible } from '$lib/actions/onVisible';
	import { scrollingProgress } from '$lib/actions/scrollingProgress';
	import { AppwriteService, type Article } from '$lib/AppwriteService';
	import { readingArticle } from '$routes/(app)/readingArticle';
	import { onDestroy, onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';

	export let article: Article;
	export let changesUrl = true;

	$: parahraphs = article.content.split('\n').filter((p) => (p === '' ? false : true));

	let copyClasses = '';
	let copyText = 'copy';
	let asideCopied = false;
	function onCopy() {
		copyClasses = 'is-copy';
		copyText = 'copied';

		navigator.clipboard.writeText(`https://tsrn.ch/${article.shortId}`);

		setTimeout(() => {
			copyClasses = '';
			copyText = 'copy';
		}, 1500);
	}

	function onCopyAside() {
		asideCopied = true;

		navigator.clipboard.writeText(`https://tsrn.ch/${article.shortId}`);

		setTimeout(() => {
			asideCopied = false;
		}, 1500);
	}

	let prevUrl = '';
	const handleVisible = (visible: boolean) => {
		if (!browser || !changesUrl) return;
		if (visible) {
			prevUrl = window.location.href;
			// Change the url to the article's shortId
			window.history.replaceState({}, '', `/article/${article.$id}`);
		} else {
			// Change the url to the article's shortId
			window.history.replaceState({}, '', prevUrl);
		}
	};

	let progress = 0;
	let articleEl: HTMLElement | null = null;

	onMount(() => {
		if (!browser || !articleEl) return;
		scrollTo(0, articleEl.offsetTop - 32);
	});

	onDestroy(() => {
		if (!browser) return;
		// Change the url to the article's shortId
		window.history.replaceState({}, '', prevUrl);

		tick().then(() => {
			const listArticleEl = document.querySelector(`[data-article-id="${article.$id}"] header`);
			if (
				listArticleEl &&
				'offsetTop' in listArticleEl &&
				typeof listArticleEl.offsetTop === 'number'
			) {
				scrollTo(0, listArticleEl.offsetTop - 32);
			}
		});
	});
</script>

<article
	class="main-article u-margin-block-start-32"
	use:onVisible={handleVisible}
	use:scrollingProgress={(p) => (progress = p)}
	bind:this={articleEl}
>
	<header class="main-article-header">
		{#if article.isPlus}
			<div class="ts-plus">
				<span class="ts-plus-title">TechScrunch</span>
				<span class="ts-plus-sign" />
				<a href={`/category/${article.categoryId}`}
					><span class="ts-plus-text">{article.category?.name ?? 'Unknown Category'}</span></a
				>
			</div>
		{:else}
			<a href={`/category/${article.categoryId}`} class="category"
				>{article.category?.name ?? 'Unknown Category'}</a
			>
		{/if}
		<h1 class="heading-level-1 u-padding-block-start-16">{article.title}</h1>

		<div class="u-padding-block-start-24">
			<div class="u-flex u-gap-4">
				<a href={`/author/${article.authorId}`} class="author"
					>{article.author?.name ?? 'Anonymous'}</a
				>
				{#if article.author?.twitter}
					<a href={`https://twitter.com/${article.author?.twitter ?? ''}`} target="_blank"
						>@{article.author?.twitter ?? ''}</a
					>
				{/if}
				<span class="u-color-text-pink">/</span>
				<time class="date-time">{article.verboseDate}</time>
			</div>
		</div>
	</header>
	{#if article.isPublished}
		<aside class="share-links u-margin-block-end-20 is-only-desktop">
			<a
				style:display="block"
				href="/"
				class="share-links-x-button"
				on:click={(e) => {
					if (changesUrl) {
						e.preventDefault();
					}
					readingArticle.reset();
				}}
			>
				<svg viewBox="0 0 36 36" class="circle-svg absolute-center">
					<path
						class="around"
						stroke-dasharray="100, 100"
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
					{#if progress > 0}
						<path
							class="percent"
							stroke-dasharray={`${progress * 100}, 100`}
							d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						/>
					{/if}
				</svg>

				<svg
					class="share-links-x-icon absolute-center"
					height="35%"
					width="35%"
					viewBox="0 0 500 500"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<bx:grid x="0" y="0" width="71.301" height="71.369" />
						<linearGradient id="color-0">
							<stop style="stop-color: rgb(193, 15, 83);" offset="0" />
							<stop style="stop-color: rgb(239, 45, 100);" offset="1" />
						</linearGradient>
						<linearGradient
							gradientUnits="userSpaceOnUse"
							x1="249.553"
							y1="0"
							x2="249.553"
							y2="499.583"
							id="gradient-0"
							gradientTransform="matrix(0.676007, -0.736895, 0.999047, 1, -168.699618, 183.894391)"
						>
							<stop offset="0" style="stop-color: rgb(193, 15, 83);" />
							<stop offset="1" style="stop-color: rgb(239, 45, 100);" />
						</linearGradient>
					</defs>
					<g>
						<path
							d="M 427.806 428.214 L 499.107 428.214 L 499.107 499.583 L 427.806 499.583 Z M 356.505 356.845 L 427.806 356.845 L 427.806 428.214 L 356.505 428.214 Z M 285.204 285.476 L 356.505 285.476 L 356.505 356.845 L 285.204 356.845 Z M 213.903 214.107 L 285.204 214.107 L 285.204 285.476 L 213.903 285.476 Z M 285.204 142.738 L 356.505 142.738 L 356.505 214.107 L 285.204 214.107 Z M 356.505 71.369 L 427.806 71.369 L 427.806 142.738 L 356.505 142.738 Z M 427.806 0 L 499.107 0 L 499.107 71.369 L 427.806 71.369 Z M 142.602 142.738 L 213.903 142.738 L 213.903 214.107 L 142.602 214.107 Z M 71.301 71.369 L 142.602 71.369 L 142.602 142.738 L 71.301 142.738 Z M 0 0 L 71.301 0 L 71.301 71.369 L 0 71.369 Z M 142.602 285.476 L 213.903 285.476 L 213.903 356.845 L 142.602 356.845 Z M 71.301 356.845 L 142.602 356.845 L 142.602 428.214 L 71.301 428.214 Z M 0 428.214 L 71.301 428.214 L 71.301 499.583 L 0 499.583 Z"
							style="stroke: rgb(0, 0, 0); stroke-width: 0px; paint-order: fill; fill-rule: evenodd; fill: url(#gradient-0);"
						/>
					</g>
				</svg>
			</a>
			<ul class="share-links-list">
				<li class="share-links-item">
					<a
						href={`https://twitter.com/intent/tweet?url=https://techscrunch.dev/article/${
							article.$id
						}&text=${encodeURIComponent(article.title)}&via=techscrunch"`}
						target="_blank"
						aria-label="Share in Twitter"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="16"
							viewBox="0 0 20 16"
							fill="none"
						>
							<path
								d="M6.2918 16C13.8371 16 17.9652 9.84369 17.9652 4.50658C17.9652 4.33351 17.9613 4.15659 17.9535 3.98352C18.7566 3.41173 19.4496 2.70348 20 1.89206C19.2521 2.21968 18.458 2.43365 17.6449 2.52665C18.5011 2.02137 19.1421 1.22761 19.4492 0.292501C18.6438 0.762466 17.763 1.09399 16.8445 1.27285C16.2257 0.625448 15.4075 0.196792 14.5164 0.0531537C13.6253 -0.0904844 12.711 0.0588966 11.9148 0.478201C11.1186 0.897505 10.4848 1.56338 10.1115 2.37287C9.73825 3.18236 9.64619 4.09039 9.84961 4.95656C8.21874 4.87598 6.62328 4.45886 5.16665 3.73224C3.71002 3.00561 2.42474 1.98571 1.39414 0.738639C0.870333 1.62782 0.710047 2.68001 0.945859 3.68136C1.18167 4.68271 1.79589 5.5581 2.66367 6.12959C2.01219 6.10923 1.37498 5.93653 0.804688 5.62577V5.67576C0.804104 6.60889 1.13175 7.51342 1.73192 8.2356C2.3321 8.95777 3.16777 9.45302 4.09687 9.63716C3.49338 9.79973 2.85999 9.82342 2.2457 9.70638C2.50788 10.5089 3.01798 11.2108 3.70481 11.7141C4.39164 12.2174 5.22093 12.497 6.07695 12.514C4.62369 13.6379 2.82848 14.2476 0.980469 14.2447C0.652739 14.2442 0.325333 14.2244 0 14.1855C1.87738 15.3713 4.06128 16.0011 6.2918 16Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
				</li>
				<li class="share-links-item">
					<a
						href={`https://www.facebook.com/sharer.php?u=https://techscrunch.dev/article/${article.$id}`}
						target="_blank"
						aria-label="Share in Facebook"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
						>
							<path
								d="M18 9.055C18 4.05406 13.9706 0 9 0C4.02943 0 0 4.05406 0 9.055C0 13.5745 3.29115 17.3207 7.59375 18V11.6725H5.30859V9.055H7.59375V7.06007C7.59375 4.79066 8.93742 3.53711 10.9932 3.53711C11.9776 3.53711 13.0078 3.71397 13.0078 3.71397V5.94234H11.873C10.755 5.94234 10.4062 6.64039 10.4062 7.35719V9.055H12.9023L12.5033 11.6725H10.4062V18C14.7088 17.3207 18 13.5745 18 9.055Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
				</li>
				<li class="share-links-item">
					<a
						href={`https://www.linkedin.com/shareArticle?mini=true&url=https://techscrunch.dev/article/${
							article.$id
						}&title=${encodeURIComponent(article.title)}&summary=${
							article.content.substring(0, 150) + '...'
						}&source=TechScrunch`}
						target="_blank"
						aria-label="Share in LinkedIn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="17"
							viewBox="0 0 18 17"
							fill="none"
						>
							<path
								d="M0 1.97475C0 1.40235 0.202708 0.930123 0.608108 0.558081C1.01351 0.186021 1.54055 0 2.18919 0C2.82626 0 3.34169 0.183154 3.73552 0.549495C4.14092 0.927273 4.34363 1.41952 4.34363 2.02626C4.34363 2.57576 4.14672 3.03366 3.7529 3.4C3.3475 3.77778 2.81467 3.96667 2.15444 3.96667H2.13707C1.49999 3.96667 0.984562 3.77778 0.590734 3.4C0.196905 3.02222 0 2.54713 0 1.97475ZM0.225869 17V5.52929H4.08301V17H0.225869ZM6.22008 17H10.0772V10.5949C10.0772 10.1943 10.1236 9.88517 10.2162 9.66768C10.3784 9.27845 10.6245 8.94932 10.9546 8.6803C11.2847 8.41127 11.6988 8.27677 12.1969 8.27677C13.4942 8.27677 14.1429 9.14107 14.1429 10.8697V17H18V10.4232C18 8.72895 17.5946 7.44394 16.7838 6.56818C15.973 5.69242 14.9016 5.25455 13.5695 5.25455C12.0753 5.25455 10.9112 5.8899 10.0772 7.16061V7.19495H10.0598L10.0772 7.16061V5.52929H6.22008C6.24324 5.89562 6.25483 7.03467 6.25483 8.94646C6.25483 10.8582 6.24324 13.5427 6.22008 17Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
				</li>
				<li class="share-links-item">
					<a
						href={`https://www.reddit.com/submit?url=https://techscrunch.dev/article/${
							article.$id
						}&title=${encodeURIComponent(article.title)}`}
						target="_blank"
						aria-label="Share in Reddit"
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
								d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM13.6844 7.68424C14.4107 7.68424 15.0002 8.27371 15.0002 9.00003C15.0002 9.53687 14.6739 10 14.2423 10.2106C14.2633 10.3369 14.2739 10.4632 14.2739 10.6C14.2739 12.6211 11.9265 14.2527 9.02124 14.2527C6.11598 14.2527 3.76861 12.6211 3.76861 10.6C3.76861 10.4632 3.77914 10.3263 3.80019 10.2C3.33703 9.9895 3.02124 9.53687 3.02124 9.00003C3.02124 8.27371 3.61071 7.68424 4.33703 7.68424C4.6844 7.68424 5.01071 7.83161 5.24229 8.05266C6.14756 7.3895 7.40019 6.97898 8.80019 6.93687L9.46335 3.80003C9.4844 3.73687 9.51598 3.68424 9.56861 3.65266C9.62124 3.62108 9.6844 3.61055 9.74756 3.62108L11.9265 4.08424C12.0739 3.76845 12.3897 3.55792 12.7581 3.55792C13.2739 3.55792 13.6949 3.97898 13.6949 4.49477C13.6949 5.01055 13.2739 5.43161 12.7581 5.43161C12.2528 5.43161 11.8423 5.03161 11.8212 4.53687L9.87387 4.12634L9.27387 6.93687C10.6423 6.9895 11.8844 7.41055 12.7791 8.05266C13.0107 7.82108 13.3265 7.68424 13.6844 7.68424ZM6.93703 9.00003C6.42124 9.00003 6.00019 9.42108 6.00019 9.93687C6.00019 10.4527 6.42124 10.8737 6.93703 10.8737C7.45282 10.8737 7.87387 10.4527 7.87387 9.93687C7.87387 9.42108 7.45282 9.00003 6.93703 9.00003ZM9.01071 13.0948C9.36861 13.0948 10.5897 13.0527 11.2318 12.4106C11.3265 12.3158 11.3265 12.1684 11.2528 12.0632C11.1581 11.9684 11.0002 11.9684 10.9055 12.0632C10.4949 12.4632 9.64229 12.6106 9.02124 12.6106C8.40019 12.6106 7.53703 12.4632 7.13703 12.0632C7.04229 11.9684 6.8844 11.9684 6.78966 12.0632C6.69492 12.1579 6.69492 12.3158 6.78966 12.4106C7.42124 13.0421 8.65282 13.0948 9.01071 13.0948ZM10.1265 9.93687C10.1265 10.4527 10.5476 10.8737 11.0633 10.8737C11.5791 10.8737 12.0002 10.4527 12.0002 9.93687C12.0002 9.42108 11.5791 9.00003 11.0633 9.00003C10.5476 9.00003 10.1265 9.42108 10.1265 9.93687Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
				</li>
				<li class="share-links-item">
					<a
						href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(
							`Article: https://techscrunch.dev/article/${article.$id}`
						)}`}
						target="_blank"
						aria-label="Share in email"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="16"
							viewBox="0 0 20 16"
							fill="none"
						>
							<path
								d="M0.404391 3.06031L10.0003 7.85828L19.5964 3.06025C19.524 1.79983 18.4789 0.800049 17.2004 0.800049H2.80039C1.52181 0.800049 0.476752 1.79986 0.404391 3.06031Z"
								fill="#ffffff"
							/>
							<path
								d="M19.6004 5.74153L10.0003 10.5416L0.400391 5.7416V12.8C0.400391 14.1255 1.47491 15.2 2.80039 15.2H17.2004C18.5259 15.2 19.6004 14.1255 19.6004 12.8V5.74153Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
				</li>
				<li class="share-links-item">
					<button on:click={onCopyAside} aria-label="Share in email">
						<svg width="18" height="18" viewBox="0 0 20 20" version="1.1" aria-labelledby="title"
							><path
								d="M4.8 20c-1 0-2.1-.4-2.8-1.2l-.7-.6c-1.6-1.6-1.6-4.1 0-5.7l4.9-4.8c1.6-1.6 4.1-1.6 5.7 0l.7.7c.3.3.3.9 0 1.2-.3.3-.9.3-1.2 0l-.7-.7c-.9-.9-2.4-.9-3.3 0l-4.9 4.8c-.9.9-.9 2.4 0 3.3l.7.6c1 1 2.4 1 3.4 0l3.3-3.3c.3-.3.9-.3 1.2 0 .3.3.3.9 0 1.2l-3.3 3.3c-1 .8-2 1.2-3 1.2zm9.1-7.5 4.9-4.8c1.6-1.6 1.6-4.1 0-5.7l-.7-.7C17.3.5 16.3 0 15.2 0c-1.1 0-2.2.5-2.8 1.2L9.1 4.6c-.3.3-.3.9 0 1.2.3.3.9.3 1.2 0l3.4-3.4c.4-.5 1-.7 1.6-.7.6 0 1.2.3 1.7.7l.7.7c.9.9.9 2.4 0 3.3l-4.9 4.8c-.8.8-2.5.8-3.3 0l-.7-.7c-.3-.3-.9-.3-1.2 0-.3.3-.3.9 0 1.2l.7.7c.7.7 1.8 1.2 2.8 1.2s2.1-.4 2.8-1.1z"
								fill="#ffffff"
							/></svg
						>
					</button>
				</li>
				{#if asideCopied}
					<li transition:fade class="share-links-item u-margin-block-start-12 u-text-color-black">
						<div class="u-flex u-main-center" style="block-size: auto;">
							<svg
								class="u-color-text-success"
								style="width: 24px;"
								viewBox="0 0 20 20"
								version="1.1"
								aria-labelledby="title"
								><path
									d="M10 18.2c-4.5 0-8.2-3.7-8.2-8.2S5.5 1.8 10 1.8s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2zm0-15c-3.7 0-6.8 3-6.8 6.8 0 3.7 3 6.8 6.8 6.8 3.7 0 6.8-3 6.8-6.8 0-3.7-3.1-6.8-6.8-6.8zm-.9 10.6c.5 0 .9-.3 1.2-.7l3.6-4.8c.2-.3.2-.8-.1-1.1-.3-.2-.8-.2-1.1.2l-3.6 4.8-.1.1c-.1 0-.1 0-.1-.1L7 10.4c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l1.9 1.9c.3.3.7.5 1.2.5 0-.1 0-.1.1-.1z"
									fill="currentColor"
								/></svg
							>
						</div>
						<p class="u-margin-block-start-8" style="block-size: auto;">Link</p>
						<p style="block-size: auto;">Copied</p>
					</li>
				{/if}
			</ul>
		</aside>
		<div class="main-article-content">
			<figure class="">
				<img
					loading="lazy"
					class="u-margin-block-start-4"
					alt=""
					src={AppwriteService.getThumbnail(article.imageId, 750, 400)}
					width="750"
				/>
				<!-- <figcaption>Took by the greatest Pikachu</figcaption> -->
			</figure>
			<div class="u-margin-block-start-16">
				{#each parahraphs as parahraph, index}
					<p>
						{parahraph}
					</p>
					{#if index === 3}
						<section
							class="register-box u-max-width-750 u-margin-inline-auto u-margin-block-start-32 u-margin-block-end-32"
						>
							<div class="register-box-side">
								<img height="35" src="/img/techscrunch-logo.svg" class="logo" alt="TechScrunch" />
							</div>
							<div class="register-box-content">
								<h5 class="heading-level-2 u-color-text-pink">Sign Up for TS!</h5>
								<p class="heading-level-2 u-margin-block-start-12">
									Generate your own fake AI news and fool your friends and followers!
								</p>

								<a href="/auth/login">
									<button class="button u-margin-block-start-16">
										<span class="u-padding-inline-32">Register Now</span>
									</button></a
								>
							</div>
						</section>
					{/if}
				{/each}
			</div>
		</div>
	{:else}
		<aside class="share-links u-margin-block-end-20 is-only-desktop" />
		<div class="main-article-content">
			<div class="u-color-text-pink u-margin-block-start-16 u-margin-block-end-20">
				Your article is being generated. This can take up to a few minutes.
			</div>
		</div>
	{/if}
</article>

{#if article.isPublished}
	<div class="u-max-width-750 u-margin-block-start-40 u-margin-inline-auto">
		<section
			class="u-flex u-flex-wrap share-links u-sep-block-end u-padding-block-end-4"
			style="grid-column:span 2"
		>
			<ul class="share-links-list is-horizontal">
				<li class="share-links-item">
					<a
						href={`https://twitter.com/intent/tweet?url=https://techscrunch.dev/article/${
							article.$id
						}&text=${encodeURIComponent(article.title)}&via=techscrunch"`}
						target="_blank"
						aria-label="Share in Twitter"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="16"
							viewBox="0 0 20 16"
							fill="none"
						>
							<path
								d="M6.2918 16C13.8371 16 17.9652 9.84369 17.9652 4.50658C17.9652 4.33351 17.9613 4.15659 17.9535 3.98352C18.7566 3.41173 19.4496 2.70348 20 1.89206C19.2521 2.21968 18.458 2.43365 17.6449 2.52665C18.5011 2.02137 19.1421 1.22761 19.4492 0.292501C18.6438 0.762466 17.763 1.09399 16.8445 1.27285C16.2257 0.625448 15.4075 0.196792 14.5164 0.0531537C13.6253 -0.0904844 12.711 0.0588966 11.9148 0.478201C11.1186 0.897505 10.4848 1.56338 10.1115 2.37287C9.73825 3.18236 9.64619 4.09039 9.84961 4.95656C8.21874 4.87598 6.62328 4.45886 5.16665 3.73224C3.71002 3.00561 2.42474 1.98571 1.39414 0.738639C0.870333 1.62782 0.710047 2.68001 0.945859 3.68136C1.18167 4.68271 1.79589 5.5581 2.66367 6.12959C2.01219 6.10923 1.37498 5.93653 0.804688 5.62577V5.67576C0.804104 6.60889 1.13175 7.51342 1.73192 8.2356C2.3321 8.95777 3.16777 9.45302 4.09687 9.63716C3.49338 9.79973 2.85999 9.82342 2.2457 9.70638C2.50788 10.5089 3.01798 11.2108 3.70481 11.7141C4.39164 12.2174 5.22093 12.497 6.07695 12.514C4.62369 13.6379 2.82848 14.2476 0.980469 14.2447C0.652739 14.2442 0.325333 14.2244 0 14.1855C1.87738 15.3713 4.06128 16.0011 6.2918 16Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
				</li>
				<li class="share-links-item">
					<a
						href={`https://www.facebook.com/sharer.php?u=https://techscrunch.dev/article/${article.$id}`}
						target="_blank"
						aria-label="Share in Facebook"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
						>
							<path
								d="M18 9.055C18 4.05406 13.9706 0 9 0C4.02943 0 0 4.05406 0 9.055C0 13.5745 3.29115 17.3207 7.59375 18V11.6725H5.30859V9.055H7.59375V7.06007C7.59375 4.79066 8.93742 3.53711 10.9932 3.53711C11.9776 3.53711 13.0078 3.71397 13.0078 3.71397V5.94234H11.873C10.755 5.94234 10.4062 6.64039 10.4062 7.35719V9.055H12.9023L12.5033 11.6725H10.4062V18C14.7088 17.3207 18 13.5745 18 9.055Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
				</li>
				<li class="share-links-item">
					<a
						href={`https://www.linkedin.com/shareArticle?mini=true&url=https://techscrunch.dev/article/${
							article.$id
						}&title=${encodeURIComponent(article.title)}&summary=${
							article.content.substring(0, 150) + '...'
						}&source=TechScrunch`}
						target="_blank"
						aria-label="Share in LinkedIn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="17"
							viewBox="0 0 18 17"
							fill="none"
						>
							<path
								d="M0 1.97475C0 1.40235 0.202708 0.930123 0.608108 0.558081C1.01351 0.186021 1.54055 0 2.18919 0C2.82626 0 3.34169 0.183154 3.73552 0.549495C4.14092 0.927273 4.34363 1.41952 4.34363 2.02626C4.34363 2.57576 4.14672 3.03366 3.7529 3.4C3.3475 3.77778 2.81467 3.96667 2.15444 3.96667H2.13707C1.49999 3.96667 0.984562 3.77778 0.590734 3.4C0.196905 3.02222 0 2.54713 0 1.97475ZM0.225869 17V5.52929H4.08301V17H0.225869ZM6.22008 17H10.0772V10.5949C10.0772 10.1943 10.1236 9.88517 10.2162 9.66768C10.3784 9.27845 10.6245 8.94932 10.9546 8.6803C11.2847 8.41127 11.6988 8.27677 12.1969 8.27677C13.4942 8.27677 14.1429 9.14107 14.1429 10.8697V17H18V10.4232C18 8.72895 17.5946 7.44394 16.7838 6.56818C15.973 5.69242 14.9016 5.25455 13.5695 5.25455C12.0753 5.25455 10.9112 5.8899 10.0772 7.16061V7.19495H10.0598L10.0772 7.16061V5.52929H6.22008C6.24324 5.89562 6.25483 7.03467 6.25483 8.94646C6.25483 10.8582 6.24324 13.5427 6.22008 17Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
				</li>
				<li class="share-links-item">
					<a
						href={`https://www.reddit.com/submit?url=https://techscrunch.dev/article/${
							article.$id
						}&title=${encodeURIComponent(article.title)}`}
						target="_blank"
						aria-label="Share in Reddit"
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
								d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM13.6844 7.68424C14.4107 7.68424 15.0002 8.27371 15.0002 9.00003C15.0002 9.53687 14.6739 10 14.2423 10.2106C14.2633 10.3369 14.2739 10.4632 14.2739 10.6C14.2739 12.6211 11.9265 14.2527 9.02124 14.2527C6.11598 14.2527 3.76861 12.6211 3.76861 10.6C3.76861 10.4632 3.77914 10.3263 3.80019 10.2C3.33703 9.9895 3.02124 9.53687 3.02124 9.00003C3.02124 8.27371 3.61071 7.68424 4.33703 7.68424C4.6844 7.68424 5.01071 7.83161 5.24229 8.05266C6.14756 7.3895 7.40019 6.97898 8.80019 6.93687L9.46335 3.80003C9.4844 3.73687 9.51598 3.68424 9.56861 3.65266C9.62124 3.62108 9.6844 3.61055 9.74756 3.62108L11.9265 4.08424C12.0739 3.76845 12.3897 3.55792 12.7581 3.55792C13.2739 3.55792 13.6949 3.97898 13.6949 4.49477C13.6949 5.01055 13.2739 5.43161 12.7581 5.43161C12.2528 5.43161 11.8423 5.03161 11.8212 4.53687L9.87387 4.12634L9.27387 6.93687C10.6423 6.9895 11.8844 7.41055 12.7791 8.05266C13.0107 7.82108 13.3265 7.68424 13.6844 7.68424ZM6.93703 9.00003C6.42124 9.00003 6.00019 9.42108 6.00019 9.93687C6.00019 10.4527 6.42124 10.8737 6.93703 10.8737C7.45282 10.8737 7.87387 10.4527 7.87387 9.93687C7.87387 9.42108 7.45282 9.00003 6.93703 9.00003ZM9.01071 13.0948C9.36861 13.0948 10.5897 13.0527 11.2318 12.4106C11.3265 12.3158 11.3265 12.1684 11.2528 12.0632C11.1581 11.9684 11.0002 11.9684 10.9055 12.0632C10.4949 12.4632 9.64229 12.6106 9.02124 12.6106C8.40019 12.6106 7.53703 12.4632 7.13703 12.0632C7.04229 11.9684 6.8844 11.9684 6.78966 12.0632C6.69492 12.1579 6.69492 12.3158 6.78966 12.4106C7.42124 13.0421 8.65282 13.0948 9.01071 13.0948ZM10.1265 9.93687C10.1265 10.4527 10.5476 10.8737 11.0633 10.8737C11.5791 10.8737 12.0002 10.4527 12.0002 9.93687C12.0002 9.42108 11.5791 9.00003 11.0633 9.00003C10.5476 9.00003 10.1265 9.42108 10.1265 9.93687Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
				</li>
				<li class="share-links-item">
					<a
						href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(
							`Article: https://techscrunch.dev/article/${article.$id}`
						)}`}
						target="_blank"
						aria-label="Share in email"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="16"
							viewBox="0 0 20 16"
							fill="none"
						>
							<path
								d="M0.404391 3.06031L10.0003 7.85828L19.5964 3.06025C19.524 1.79983 18.4789 0.800049 17.2004 0.800049H2.80039C1.52181 0.800049 0.476752 1.79986 0.404391 3.06031Z"
								fill="#ffffff"
							/>
							<path
								d="M19.6004 5.74153L10.0003 10.5416L0.400391 5.7416V12.8C0.400391 14.1255 1.47491 15.2 2.80039 15.2H17.2004C18.5259 15.2 19.6004 14.1255 19.6004 12.8V5.74153Z"
								fill="#ffffff"
							/>
						</svg>
					</a>
				</li>

				<li class="share-links-item">
					<button on:click={onCopy} aria-label="Share in email">
						<svg width="18" height="18" viewBox="0 0 20 20" version="1.1" aria-labelledby="title"
							><path
								d="M4.8 20c-1 0-2.1-.4-2.8-1.2l-.7-.6c-1.6-1.6-1.6-4.1 0-5.7l4.9-4.8c1.6-1.6 4.1-1.6 5.7 0l.7.7c.3.3.3.9 0 1.2-.3.3-.9.3-1.2 0l-.7-.7c-.9-.9-2.4-.9-3.3 0l-4.9 4.8c-.9.9-.9 2.4 0 3.3l.7.6c1 1 2.4 1 3.4 0l3.3-3.3c.3-.3.9-.3 1.2 0 .3.3.3.9 0 1.2l-3.3 3.3c-1 .8-2 1.2-3 1.2zm9.1-7.5 4.9-4.8c1.6-1.6 1.6-4.1 0-5.7l-.7-.7C17.3.5 16.3 0 15.2 0c-1.1 0-2.2.5-2.8 1.2L9.1 4.6c-.3.3-.3.9 0 1.2.3.3.9.3 1.2 0l3.4-3.4c.4-.5 1-.7 1.6-.7.6 0 1.2.3 1.7.7l.7.7c.9.9.9 2.4 0 3.3l-4.9 4.8c-.8.8-2.5.8-3.3 0l-.7-.7c-.3-.3-.9-.3-1.2 0-.3.3-.3.9 0 1.2l.7.7c.7.7 1.8 1.2 2.8 1.2s2.1-.4 2.8-1.1z"
								fill="#ffffff"
							/></svg
						>
					</button>
				</li>
			</ul>
			<div class="input-copy">
				<input type="url" value={`https://tsrn.ch/${article.shortId}`} aria-label="page url" />
				<button on:click={onCopy} class={`input-copy-button ${copyClasses}`}>
					<span>{copyText}</span>
				</button>
			</div>
		</section>

		{#if article.tags}
			<section class="u-margin-block-start-32" style="grid-column: span 2">
				<h2 class="heading-level-2">Tags</h2>
				<ul class="u-flex u-flex-wrap u-gap-16 u-margin-block-16">
					{#each article.tags as tag}
						<li><a href={`/tag/${tag.$id}`} class="link">{tag.name}</a></li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
{/if}

<style>
	.circle-svg {
		width: 95%;
	}

	.absolute-center {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		margin: 0;
	}
</style>
