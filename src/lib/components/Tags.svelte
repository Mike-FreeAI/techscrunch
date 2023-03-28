<script lang="ts">
	export let cover = 'https://techscrunch.dev/cover.png';
	export let title = 'TechScrunch | Startup and Technology News';
	export let description =
		'Reporting on the business of technology, startups, venture capital funding, and Silicon Valley';
</script>

<svelte:head>
	<meta property="og:image" content={cover} />
	<meta name="twitter:image" content={cover} />

	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="description" content={description} />
	<meta name="twitter:description" content={description} />
</svelte:head>


