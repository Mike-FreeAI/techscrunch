<script lang="ts">
	import GridArticles from '$lib/components/GridArticles.svelte';
  import Tags from '$lib/components/Tags.svelte';
	import { Query } from 'appwrite';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="category-main u-margin-block-start-16">
  <header class="category-main-header">
    <div class="u-stretch">
      <h1 class="writer-name">{data.category.name}</h1>
    </div>
    <p class="u-margin-block-start-20">{data.category.description}</p>
  </header>
  <GridArticles queries={[Query.equal('categoryId', data.category.$id)]} initData={data.articles} />
</section>



<Tags title={'TechsCrunch | ' + data.category.name} description={data.category.description} />
