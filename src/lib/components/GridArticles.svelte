<script lang="ts">
	import { AppwriteService, PageSize, type Article } from '$lib/AppwriteService';
	import GridArticle from '$lib/components/GridArticle.svelte';
	import { type Models, Query } from 'appwrite';

	export let initData: Models.DocumentList<Article>;
	export let queries: string[];

	let articles: Article[] = [];
	let hasNextPage: boolean = false;
	let disablePagination = false;

	// Remove last for pagination purposes
	$: {
		initData;

		articles = [...initData.documents].filter(
			(_article, index) =>
				initData.documents.length <= PageSize.Articles || index < initData.documents.length - 1
		);

		hasNextPage = initData.documents.length === PageSize.Articles + 1;
	}

	async function onLoadMore() {
		const cursor = articles[articles.length - 1].$id;

		const page = await AppwriteService.getArticles([...queries, Query.cursorAfter(cursor)]);
		const documents = page.documents.filter(
			(_article, index) =>
				initData.documents.length <= PageSize.Articles || index < initData.documents.length - 1
		);

		articles = [...articles, ...documents];
		hasNextPage = page.documents.length === PageSize.Articles + 1;
	}
</script>

{#if articles.length > 0}
	<ul class="articles-grid u-padding-block-start-16">
		{#each articles as article}
			<GridArticle {article} />
		{/each}
	</ul>

	{#if hasNextPage && !disablePagination}
		<button on:click={onLoadMore} class="articles-grid-item-load-more">Load More</button>
	{/if}
{:else}
	<p class="articles-grid-item-empty">No articles found.</p>
{/if}
