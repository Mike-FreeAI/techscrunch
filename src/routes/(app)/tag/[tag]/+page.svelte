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
      <h1 class="writer-name">{data.tag.name}</h1>
    </div>
  </header>

  <GridArticles queries={[]} disablePagination={true} initData={data.articles} />
</section>



<Tags title={'TechsCrunch | ' + data.tag.name} />
