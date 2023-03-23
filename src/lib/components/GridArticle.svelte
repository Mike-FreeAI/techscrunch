<script lang="ts">
	import { AppwriteService, type Article } from "$lib/AppwriteService";

  export let article: Article;
</script>

<li class="articles-grid-item">
    <article class="articles-grid-item-article">
        <a href={`/article/${article.$id}`} class="articles-grid-item-link">
            <header class="articles-grid-item-header">
                <a href={`/category/${article.categoryId}`} class="category">{article.category?.name ?? 'Unknown Category'}</a>
                <h3 class="heading-level-2">{article.title}</h3>
                <a href={`/author/${article.author?.$id}`} class="author u-margin-block-start-12">
                    By <span>{article.author?.name ?? 'Unknown Author'}</span>
                </a>
                <time class="date-time">{article.verboseDate}</time>
            </header>
            <p class="articles-grid-item-content u-trim-6 u-cross-child-start">
                {article.content}
            </p>
            <figure class="articles-grid-item-image">
                <img
                    class="u-aspect-16-9 u-margin-block-start-4"
                    src={AppwriteService.getThumbnail(article.imageId, 500, 500)}
                    alt=""
                />
            </figure>
        </a>
    </article>
</li>