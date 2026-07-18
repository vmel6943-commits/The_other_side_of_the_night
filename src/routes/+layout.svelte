<script>
	import { base } from "$app/paths";
	import "$styles/app.css";
</script>

<svelte:head>
	<link rel="stylesheet" href={`${base}/assets/fonts/noto-sans-sc/wght.css`} />
	<link rel="stylesheet" href={`${base}/assets/fonts/site-fonts.css`} />
</svelte:head>

<slot />
