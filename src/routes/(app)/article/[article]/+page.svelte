<script lang="ts">
	import { AppwriteService } from '$lib/AppwriteService';
	import GridArticles from '$lib/components/GridArticles.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import Article from '$routes/(app)/Article.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Article article={data.article} changesUrl={false} />

<section>
	<h2 class="heading-level-3 u-padding-block-12 u-sep-block-end u-margin-block-start-32">
		Read More
	</h2>
	<GridArticles initData={data.moreArticles} queries={[]} />
</section>

<Tags
	url={`https://techscrunch.dev/article/${data.article.$id}`}
	title={'TechScrunch | ' + data.article.title}
	cover={AppwriteService.getThumbnail(data.article.imageId, 1200, 627, 'png')}
	description={data.article.content.substring(0, 150) + '...'}
/>
