<script>
	import { getContext, onMount } from "svelte";

	let {
		nodeId,
		eyebrow = "观察框架",
		title = "",
		lead = "",
		items = [],
		source = "",
		sourceUrl = ""
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	onMount(() => registerNode(nodeId, el));
</script>

<section id={nodeId} class="insight-grid" bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>

	<div class="grid">
		{#each items as item, index}
			<article>
				<span class="index">{item.icon ?? String(index + 1).padStart(2, "0")}</span>
				<div>
					{#if item.kicker}<p class="kicker">{item.kicker}</p>{/if}
					<h4>{item.title}</h4>
					<p class="text">{item.text}</p>
					{#if item.note}<p class="note">{item.note}</p>{/if}
				</div>
			</article>
		{/each}
	</div>

	{#if source}
		<p class="source">资料：{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{source}</a>{:else}{source}{/if}</p>
	{/if}
</section>

<style>
	.insight-grid {
		position: relative;
		z-index: 3;
		width: min(100%, 860px);
		margin: 0 auto;
		padding: clamp(1.3rem, 3vw, 2rem);
		border: 2px solid var(--panel-border);
		border-radius: var(--radius);
		background: var(--panel-bg);
		box-shadow: 5px 5px 0 color-mix(in srgb, var(--panel-border) 34%, transparent);
		color: var(--panel-text);
	}

	p,
	h3,
	h4 { margin: 0; }

	.eyebrow,
	.kicker {
		font-size: 0.72rem;
		font-weight: 900;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		opacity: 0.72;
	}

	h3 {
		max-width: 720px;
		margin-top: 0.35rem;
		font-family: var(--font-display);
		font-size: clamp(1.45rem, 2.8vw, 2.1rem);
		line-height: 1.14;
		text-wrap: balance;
	}

	.lead {
		max-width: 700px;
		margin-top: 0.65rem;
		font-size: 0.96rem;
		line-height: 1.58;
		text-wrap: pretty;
		opacity: 0.84;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
		margin-top: 1.35rem;
	}

	article {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.75rem;
		padding: 1rem;
		border: 1.5px solid color-mix(in srgb, var(--panel-border) 70%, transparent);
		border-radius: calc(var(--radius) * 0.8);
		background: color-mix(in srgb, var(--panel-bg) 78%, var(--panel-accent) 22%);
	}

	article:nth-child(4n + 1) { background: color-mix(in srgb, var(--panel-bg) 70%, var(--panel-accent) 30%); }
	article:nth-child(4n + 2) { background: color-mix(in srgb, var(--panel-bg) 68%, var(--panel-accent-2) 32%); }
	article:nth-child(4n + 3) { background: color-mix(in srgb, var(--panel-bg) 82%, white 18%); }
	article:nth-child(4n + 4) { background: color-mix(in srgb, var(--panel-bg) 76%, black 24%); }

	.index {
		display: grid;
		place-items: center;
		width: 2.15rem;
		height: 2.15rem;
		border: 1.5px solid currentColor;
		border-radius: 50%;
		font-family: var(--font-accent);
		font-size: 0.8rem;
		font-weight: 900;
	}

	h4 {
		margin-top: 0.18rem;
		font-family: var(--font-display);
		font-size: 1.02rem;
		line-height: 1.25;
		text-wrap: balance;
	}

	.text {
		margin-top: 0.4rem;
		font-size: 0.86rem;
		line-height: 1.55;
		text-wrap: pretty;
	}

	.note {
		margin-top: 0.45rem;
		font-size: 0.72rem;
		font-weight: 750;
		opacity: 0.68;
	}

	.source {
		margin-top: 0.9rem;
		font-size: 0.72rem;
		line-height: 1.45;
		opacity: 0.7;
	}

	a { color: inherit; text-underline-offset: 0.16em; }

	@media (max-width: 620px) {
		.grid { grid-template-columns: 1fr; }
	}
</style>
