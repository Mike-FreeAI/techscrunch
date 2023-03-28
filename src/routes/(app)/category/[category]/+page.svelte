<script lang="ts">
	import GridArticles from '$lib/components/GridArticles.svelte';
  import Tags from '$lib/components/Tags.svelte';
	import { Query } from 'appwrite';

	import type { PageData } from './$types';

	export let data: PageData;
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
	<GridArticles queries={[Query.equal('categoryId', data.category.$id)]} initData={data.articles} />
</section>


<Tags title={'TechsCrunch | ' + data.category.name} description={data.category.description} />