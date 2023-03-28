<script lang="ts">
	import GridArticles from '$lib/components/GridArticles.svelte';
	import { Query } from 'appwrite';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="category-main u-margin-block-start-40">

	<header class="category-main-header">
    <div class="u-flex u-gap-32">
      <div class="u-stretch">
        <h1 class="writer-name">{data.author.name}</h1>
        <h6 class="writer-profession">Reporter</h6>
      </div>
      <div>
        <img class="u-block" width="200" src={data.author.image} alt="">
      </div>
    </div>
    <p class="u-margin-block-start-20">{data.author.bio}</p>
	</header>

  <GridArticles queries={[Query.equal('authorId', data.author.id)]} initData={data.articles} />
</section>
