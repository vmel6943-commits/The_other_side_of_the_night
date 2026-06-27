<script>
	import Hero from "$components/Hero.svelte";
	import Chapter from "$components/Chapter.svelte";
	import Methodology from "$components/Methodology.svelte";

	let { story } = $props();
</script>

<article class="story-shell">
	<Hero hero={story.hero} />

	{#each story.sections as section}
		<Chapter {section} />
	{/each}

	<Methodology methodology={story.methodology} footer={story.footer} />
</article>
