<script lang="ts">
	import { AppwriteService, PageSize } from '$lib/AppwriteService';
	import GridArticle from '$lib/components/GridArticle.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: articles = [...data.articles.documents].filter(
		(_article, index) =>
			data.articles.documents.length <= PageSize.Articles ||
			index < data.articles.documents.length - 1
	);

	let hasNextPage = data.articles.documents.length === PageSize.Articles + 1;

	async function onLoadMore() {
		const cursor = articles[articles.length-1].$id;
		
		const page = await AppwriteService.getArticles(data.category.$id, cursor);
		const documents = page.documents.filter(
			(_article, index) =>
				data.articles.documents.length <= PageSize.Articles ||
				index < data.articles.documents.length - 1
		);

		articles.push(...documents);
		console.log(documents.length);
		hasNextPage = page.documents.length === PageSize.Articles + 1;

		articles = articles;
	}
</script>

<section class="category-main u-margin-block-start-16">
	<div class="content">
		<h1>{data.category.name}</h1>
		<h3>
			{data.category.description}
		</h3>
	</div>
</section>

<section>
	{#if data.articles.documents.length > 0}
		<ul class="articles-grid u-padding-block-start-16">
			{#each articles as article}
				<GridArticle {article} />
			{/each}
		</ul>

		{#if hasNextPage}
			<button on:click={onLoadMore} class="articles-grid-item-load-more">Load More</button>
		{/if}
	{:else}
		<p class="articles-grid-item-empty">No articles found.</p>
	{/if}
</section>
