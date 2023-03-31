<script lang="ts">
	import { AppwriteService } from '$lib/AppwriteService';
	import GridArticles from '$lib/components/GridArticles.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import { Query } from 'appwrite';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="category-main u-margin-block-start-40">
	<header class="category-main-header">
		<div class="u-flex u-flex-vertical-mobile-reverse u-gap-32">
			<div class="u-stretch">
				<h1 class="writer-name">{data.author.name}</h1>
				<h6 class="writer-profession">Reporter</h6>
			</div>
			<div>
				{#if data.author.imageId}
					<img
						style="inline-size: inherit;"
						loading="lazy"
						class="u-block"
						width="200"
						height="200"
						src={AppwriteService.getProfileImage(data.author.imageId, 200, 200)}
						alt=""
					/>
				{:else}
					<img
						loading="lazy"
						class="u-block"
						width="200"
						height="200"
						src="img/profile.webp"
						alt=""
					/>
				{/if}
			</div>
		</div>
		<p class="u-margin-block-start-20">{data.author.bio}</p>

		<section class="u-flex u-main-end u-gap-24 u-margin-block-start-8">
			{#if data.author.twitter}
				<a href={`https://twitter.com/${data.author.twitter}`}
					><svg
						width="18"
						height="18"
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><title>Twitter</title><path
							d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
						/></svg
					></a
				>
			{/if}
			{#if data.author.email}
				<a href={`mailto:${data.author.email}`}>
					<svg
						width="18"
						height="18"
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><title>Mailgun</title><path
							d="M11.837 0c6.602 0 11.984 5.381 11.984 11.994-.017 2.99-3.264 4.84-5.844 3.331a3.805 3.805 0 0 1-.06-.035l-.055-.033-.022.055c-2.554 4.63-9.162 4.758-11.894.232-2.732-4.527.46-10.313 5.746-10.416a6.868 6.868 0 0 1 7.002 6.866 1.265 1.265 0 0 0 2.52 0c0-5.18-4.197-9.38-9.377-9.387C4.611 2.594.081 10.41 3.683 16.673c3.238 5.632 11.08 6.351 15.289 1.402l1.997 1.686A11.95 11.95 0 0 1 11.837 24C2.6 23.72-2.87 13.543 1.992 5.684A12.006 12.006 0 0 1 11.837 0Zm0 7.745c-3.276-.163-5.5 3.281-4.003 6.2a4.26 4.26 0 0 0 4.014 2.31c3.276-.171 5.137-3.824 3.35-6.575a4.26 4.26 0 0 0-3.36-1.935Zm0 2.53c1.324 0 2.152 1.433 1.49 2.58a1.72 1.72 0 0 1-1.49.86 1.72 1.72 0 1 1 0-3.44Z"
						/></svg
					></a
				>
			{/if}
		</section>
	</header>

	<section>
		<h2 class="heading-level-1 u-padding-block-12 u-sep-block-end u-margin-block-start-32">
			The Latest from {data.author.name}
		</h2>

		<GridArticles queries={[Query.equal('authorId', data.author.$id)]} initData={data.articles} />
	</section>
</section>

<Tags title={'TechScrunch | ' + data.author.name} description={data.author.bio} />
