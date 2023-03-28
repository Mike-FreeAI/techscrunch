<script lang="ts">
	import { AppwriteService } from '$lib/AppwriteService';
	import type { PageData } from './$types';

	export let data: PageData;

	$: parahraphs = data.article.content.split('\n');
</script>

<article class="main-article u-margin-block-start-32">
	<header class="main-article-header">
		<a href={`/category/${data.article.categoryId}`} class="category"
			>{data.article.category?.name ?? 'Unknown Category'}</a
		>
		<h1 class="heading-level-1">{data.article.title}</h1>

		<div class="u-padding-block-24">
			<address>
				<a href={`/author/${data.article.authorId}`} class="author">{data.article.authorName}</a>
				<!-- <a href="https://twitter.com/eladsc" target="_blank">@eladsc</a> -->
				<span class="u-color-text-pink">/</span>
				<time class="date-time">{data.article.verboseDate}</time>
			</address>
		</div>
	</header>
	<div class="main-article-content u-margin-block-start-24">
		<figure class="">
			<img
				loading="lazy"
				class="u-margin-block-start-4"
				alt=""
				src={AppwriteService.getThumbnail(data.article.imageId, 750, 400)}
			/>
			<!-- <figcaption>Took by the greatest Pikachu</figcaption> -->
		</figure>
		<div class="u-margin-block-start-16">
			{#each parahraphs as parahraph}
				<p>
					{parahraph}
				</p>
			{/each}
		</div>
	</div>
</article>
