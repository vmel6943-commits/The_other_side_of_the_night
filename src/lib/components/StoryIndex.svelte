<script>
	import Hero from "$components/Hero.svelte";
	import Chapter from "$components/Chapter.svelte";
	import Methodology from "$components/Methodology.svelte";
	import Footer from "$components/Footer.svelte";

	let { story } = $props();
</script>

<article class="story-shell">
	<Hero hero={story.hero} />

	{#each story.sections as section}
		<Chapter {section} />
	{/each}

	{#if story.methodology}
		<Methodology methodology={story.methodology} footer={story.footer} />
	{:else if story.footer}
		<Footer footer={story.footer} />
	{/if}
</article>
