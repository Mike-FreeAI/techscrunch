<script lang="ts">
	import { AppwriteService, type Article as ArticleType } from '$lib/AppwriteService';
	import { last } from '$lib/helpers/array';
	import Article from '../../routes/(app)/Article.svelte';
	import { readingArticle } from '../../routes/(app)/readingArticle';

	export let article: ArticleType;

	const onLinkClick = (e: MouseEvent) => {
		const anchorEl = e.currentTarget as HTMLAnchorElement;
		const href = anchorEl.getAttribute('href');
		if (!href) return;
		e.preventDefault();
		const id = last(href.split('/'));

		readingArticle.setId(id);
	};

	$: isReading = $readingArticle?.$id === article.$id;
</script>

<li class="articles-grid-item">
	{#if isReading && $readingArticle}
		<div class="u-flex u-flex-vertical" style:grid-column="span 3">
			<Article article={$readingArticle} />
		</div>
	{:else if !article.isPromoted}
		<article class="articles-grid-item-article">
			<a href={`/article/${article.$id}`} class="articles-grid-item-link" on:click={onLinkClick}>
				<header class="articles-grid-item-header">
					{#if article.isPlus}
						<div class="ts-plus is-small">
							<span class="ts-plus-title">
								<img height="12" src="/img/techscrunch-logo.svg" class="logo" alt="Tech Scrunch" />
							</span>
							<span class="ts-plus-sign" />
							<a href={`/category/${article.categoryId}`} style="font-weight:300">
								<span class="ts-plus-text">{article.category?.name ?? 'Unknown Category'}</span></a
							>
						</div>
					{:else}
						<a href={`/category/${article.categoryId}`} class="category"
							>{article.category?.name ?? 'Unknown Category'}</a
						>
					{/if}
					<h3 class="heading-level-2 category-heading">{article.title}</h3>
					<a href={`/author/${article.authorId}`} class="author u-margin-block-start-12">
						<span>{article.author?.name ?? 'Anonymous'}</span>
					</a>
					<time class="date-time">{article.verboseDate}</time>
				</header>
				<p class="articles-grid-item-content u-trim-6 u-cross-child-start">
					{article.content}
				</p>
				<figure class="articles-grid-item-image">
					<img
						loading="lazy"
						class="u-margin-block-start-4"
						src={AppwriteService.getThumbnail(article.imageId, 300, 160)}
						alt=""
						width="300"
					/>
				</figure>
			</a>
		</article>
	{:else}
		<article class="articles-grid-item-article">
			<a
				href={`/article/${article.$id}`}
				class="articles-grid-item-link is-double-image"
				on:click={onLinkClick}
			>
				<header class="articles-grid-item-header">
					<p class="category-featured">Featured Article</p>

					<h3 class="heading-level-2 category-heading">{article.title}</h3>

					<p class="u-trim-6 category-content">{article.content}</p>

					<a href={`/author/${article.authorId}`} class="author u-margin-block-start-12">
						<span>{article.author?.name ?? 'Anonymous'}</span>
					</a>
					<time class="date-time">{article.verboseDate}</time>
				</header>
				<figure class="articles-grid-item-image">
					<img
						loading="lazy"
						class="u-margin-block-start-4"
						src={AppwriteService.getThumbnail(article.imageId, 600, 300)}
						alt=""
						width="600"
					/>
				</figure>
			</a>
		</article>
	{/if}
</li>
