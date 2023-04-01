<script lang="ts">
	export let url = 'https://techscrunch.dev/';
	export let cover = 'https://techscrunch.dev/cover.png';
	export let title = 'TechScrunch | Startup and Technology News';
	export let description =
		'Reporting on the business of technology, startups, venture capital funding, and Silicon Valley';
</script>

<svelte:head>
	<meta property="og:image" content={cover} />
	<meta property="og:image:secure_url" content={cover} />

	<meta name="twitter:image" content={cover} />

	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="description" content={description} />
	<meta name="twitter:description" content={description} />

	<meta property="og:url" content={url} />
	<meta property="twitter:url" content={url} />

	<meta property="twitter:domain" content="techscrunch.dev" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:alt" content="TechScrunch" />
	<meta property="og:type" content="website" />
</svelte:head>
