<script lang="ts">
	import GridArticles from '$lib/components/GridArticles.svelte';
	import { Query } from 'appwrite';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="category-main u-margin-block-start-16">
	<div class="content">
		<h1>{data.author.name}</h1>
		<h6>Reporter</h6>
	</div>
</section>

<section>
	<GridArticles queries={[Query.equal('authorId', data.author.id)]} initData={data.articles} />
</section>
