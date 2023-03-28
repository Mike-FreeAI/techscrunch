<script lang="ts">
	import { AppwriteService, type Article } from '$lib/AppwriteService';

	export let article: Article;
</script>

<li class="articles-grid-item">
	{#if !article.isPromoted}
		<article class="articles-grid-item-article">
			<a href={`/article/${article.$id}`} class="articles-grid-item-link">
				<header class="articles-grid-item-header">
					<a href={`/category/${article.categoryId}`} class="category"
						>{article.category?.name ?? 'Unknown Category'}</a
					>
					<h3 class="heading-level-2 category-heading">{article.title}</h3>
					<a href={`/author/${article.authorId}`} class="author u-margin-block-start-12">
						By <span>{article.authorName}</span>
					</a>
					<time class="date-time">{article.verboseDate}</time>
				</header>
				<p class="articles-grid-item-content u-trim-6 u-cross-child-start">
					{article.content}
				</p>
				<figure class="articles-grid-item-image">
					<img
						class="u-margin-block-start-4"
						src={AppwriteService.getThumbnail(article.imageId, 300, 160)}
						alt=""
					/>
				</figure>
			</a>
		</article>
	{:else}
		<article class="articles-grid-item-article">
			<a href={`/article/${article.$id}`} class="articles-grid-item-link is-double-image">
				<header class="articles-grid-item-header">
					<p class="category-featured">Featured Article</p>

					<h3 class="heading-level-2 category-heading">{article.title}</h3>

					<p class="u-trim-6 category-content">{article.content}</p>

					<a href={`/author/${article.authorId}`} class="author u-margin-block-start-12">
						By <span>{article.authorName}</span>
					</a>
					<time class="date-time">{article.verboseDate}</time>
				</header>
				<figure class="articles-grid-item-image">
					<!-- TODO: Stretch -->
					<img
						class="u-margin-block-start-4"
						src={AppwriteService.getThumbnail(article.imageId, 600, 160)}
						alt=""
					/>
				</figure>
			</a>
		</article>
	{/if}
</li>
