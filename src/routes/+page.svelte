<script>
	import StoryNav from "$components/StoryNav.svelte";
	import StoryIndex from "$components/StoryIndex.svelte";
	import { story } from "$data/story.js";
</script>

<svelte:head>
	<title>{story.meta.title}</title>
	<meta name="description" content={story.meta.description} />
</svelte:head>

<StoryNav
	sections={story.sections}
	brand={story.nav?.brand ?? story.meta.shortTitle ?? story.meta.title}
	brandImage={story.nav?.brandImage}
/>
<StoryIndex {story} />
