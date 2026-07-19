<script>
	import { getContext, onMount } from "svelte";
	import { asset } from "$lib/asset.js";

	let {
		nodeId,
		eyebrow = "结语",
		title = "夜晚的另一面",
		lead = "",
		dialogue = [],
		summary = ""
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	let visible = $state(false);

	onMount(() => {
		registerNode(nodeId, el);
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) visible = true;
			},
			{ threshold: 0.12 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<section id={nodeId} class:visible class="conclusion" bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>

	{#if dialogue.length}
		<div class="dialogue" aria-label="晚晚和小夏的结尾对话">
			{#each dialogue as line, index}
				<article class:right={index % 2 === 1} style={`--delay:${index * 90}ms;`}>
					<img src={asset(line.avatar)} alt={`${line.speaker}头像`} />
					<div>
						<strong>{line.speaker}</strong>
						<p>{line.text}</p>
					</div>
				</article>
			{/each}
		</div>
	{/if}

	{#if summary}
		<article class="summary">
			<span>最后一段</span>
			<p>{summary}</p>
		</article>
	{/if}
</section>

<style>
	.conclusion {
		position: relative;
		z-index: 3;
		display: grid;
		gap: clamp(1.25rem, 3vw, 2rem);
		width: min(100%, 860px);
		margin: clamp(1rem, 3vw, 2.5rem) auto 0;
		padding: clamp(1.3rem, 3vw, 2rem);
		border: 2px solid var(--panel-border);
		border-radius: var(--radius);
		background: var(--panel-bg);
		box-shadow: 7px 7px 0 color-mix(in srgb, var(--panel-border) 32%, transparent);
		color: var(--panel-text);
		scroll-margin-top: 7rem;
	}

	header { max-width: 700px; }
	p,h3 { margin: 0; }
	.eyebrow { font-size: .72rem; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; opacity: .72; }
	h3 { margin-top: .35rem; font-family: var(--font-display); font-size: clamp(1.65rem, 3.8vw, 2.7rem); line-height: 1.08; text-wrap: balance; }
	.lead { max-width: 650px; margin-top: .65rem; font-size: clamp(.9rem, 1.4vw, 1rem); font-weight: 650; line-height: 1.58; opacity: .84; text-wrap: pretty; }

	.dialogue { display: grid; gap: .9rem; padding-block: .25rem; }
	.dialogue article {
		display: grid;
		grid-template-columns: 4rem minmax(0, 1fr);
		align-items: end;
		gap: .7rem;
		width: min(88%, 650px);
		opacity: 0;
		transform: translateX(-24px);
		transition: opacity 520ms ease var(--delay), transform 620ms cubic-bezier(.22,1,.36,1) var(--delay);
	}
	.dialogue article.right { justify-self: end; grid-template-columns: minmax(0, 1fr) 4rem; transform: translateX(24px); }
	.dialogue article.right img { grid-column: 2; }
	.dialogue article.right div { grid-column: 1; grid-row: 1; border-color: color-mix(in srgb, var(--panel-accent-2) 72%, var(--panel-border) 28%); background: color-mix(in srgb, var(--panel-bg) 76%, var(--panel-accent-2) 24%); }
	.conclusion.visible .dialogue article { opacity: 1; transform: translateX(0); }
	.dialogue img { width: 4rem; aspect-ratio: 1; object-fit: cover; border: 2px solid var(--panel-border); border-radius: 50%; box-shadow: 3px 4px 0 color-mix(in srgb, var(--panel-border) 24%, transparent); }
	.dialogue article>div { position: relative; padding: .85rem 1rem; border: 1.5px solid color-mix(in srgb, var(--panel-accent) 72%, var(--panel-border) 28%); border-radius: 16px 16px 16px 5px; background: color-mix(in srgb, var(--panel-bg) 76%, var(--panel-accent) 24%); }
	.dialogue article.right>div { border-radius: 16px 16px 5px 16px; }
	.dialogue strong { display: block; margin-bottom: .22rem; font-size: .68rem; letter-spacing: .08em; }
	.dialogue p { font-family: var(--font-display); font-size: clamp(1rem, 1.7vw, 1.18rem); font-weight: 760; line-height: 1.48; text-wrap: pretty; }

	.summary { position: relative; padding: 1.05rem 1.1rem; border: 1.5px solid var(--panel-border); border-radius: 12px; background: color-mix(in srgb, var(--panel-bg) 82%, var(--panel-text) 18%); color: var(--panel-text); }
	.summary span { display: block; margin-bottom: .42rem; font-size: .62rem; font-weight: 900; letter-spacing: .1em; opacity: .72; }
	.summary p { max-width: 720px; font-size: clamp(.98rem, 1.6vw, 1.12rem); font-weight: 720; line-height: 1.62; text-wrap: pretty; }

	@media (max-width: 560px) {
		.dialogue article,.dialogue article.right { width: 100%; grid-template-columns: 3.15rem minmax(0,1fr); }
		.dialogue article.right { grid-template-columns: minmax(0,1fr) 3.15rem; }
		.dialogue img { width: 3.15rem; }
		.dialogue article>div { padding: .75rem .8rem; }
	}

	@media (prefers-reduced-motion: reduce) {
		.dialogue article { opacity: 1; transform: none !important; transition: none; }
	}
</style>
