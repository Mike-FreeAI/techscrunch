<script lang="ts">
	import { AppwriteService } from '$lib/AppwriteService';
	import GridArticles from '$lib/components/GridArticles.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const topArticle = data.topArticles.documents[0] ?? null;
	const topSideArticles = data.topArticles.documents.filter((_article, index) => index > 0);
</script>

{#if data.topArticles.documents.length > 0}
	<section class="grid-2-1 u-margin-block-start-20">
		{#if topArticle}
			<article class="promo-main-article">
				<a href={`/article/${topArticle.$id}`}>
					<h2 class="heading-level-1">
						{topArticle.title}
					</h2>
					<a href={`/author/${topArticle.authorId}`} class="author u-margin-block-start-12">
						By <span>{topArticle.authorName}</span>
					</a>
					<img
						loading="lazy"
						class="u-margin-block-start-4 u-width-full-line"
						alt=""
						src={AppwriteService.getThumbnail(topArticle.imageId, 560, 350)}
						width="560"
					/>
				</a>
			</article>
		{/if}
		<ul class="u-flex-vertical sep-sections">
			{#each topSideArticles as topSideArticle}
				<li>
					<article class="article-level-2">
						<a href={`/article/${topSideArticle.$id}`} class="u-flex-vertical u-gap-8">
							<div class="category">{topSideArticle.category?.name ?? 'Unknown Category'}</div>
							<h3 class="heading-level-2">
								{topSideArticle.title}
							</h3>
							<a href={`/author/${topSideArticle.authorId}`} class="author">
								By <span>{topSideArticle.authorName}</span>
							</a>
						</a>
					</article>
				</li>
			{/each}
		</ul>
	</section>
{/if}

<section>
	<h2 class="heading-level-3 u-padding-block-12 u-sep-block-end u-margin-block-start-32">
		The Latest
	</h2>
	<GridArticles initData={data.latestArticles} queries={[]} />
</section>
