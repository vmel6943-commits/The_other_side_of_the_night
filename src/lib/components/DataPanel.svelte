<script>
	import { getContext, onMount } from "svelte";

	let {
		nodeId,
		eyebrow = "北京内部观察",
		title = "",
		lead = "",
		metrics = [],
		takeaway = "",
		source = "",
		sourceUrl = "",
		note = "",
		columns = 4
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	onMount(() => registerNode(nodeId, el));
</script>

<section id={nodeId} class="data-panel" bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>

	<div class="metrics" style={`--metric-columns: ${columns};`}>
		{#each metrics as metric}
			<article>
				<p class="value">{metric.value}<span>{metric.unit ?? ""}</span></p>
				<h4>{metric.label}</h4>
				{#if metric.detail}<p class="detail">{metric.detail}</p>{/if}
			</article>
		{/each}
	</div>

	{#if takeaway}<p class="takeaway">{takeaway}</p>{/if}
	<footer>
		{#if source}
			<p>来源：{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{source}</a>{:else}{source}{/if}</p>
		{/if}
		{#if note}<p>{note}</p>{/if}
	</footer>
</section>

<style>
	.data-panel {
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

	.eyebrow {
		font-size: 0.76rem;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.72;
	}

	h3 {
		max-width: 720px;
		margin-top: 0.35rem;
		font-family: var(--font-display);
		font-size: clamp(1.55rem, 3vw, 2.25rem);
		line-height: 1.12;
		text-wrap: balance;
	}

	.lead {
		max-width: 700px;
		margin-top: 0.7rem;
		font-size: 0.98rem;
		line-height: 1.58;
		text-wrap: pretty;
		opacity: 0.86;
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(var(--metric-columns), minmax(0, 1fr));
		gap: 0.72rem;
		margin-top: 1.45rem;
	}

	.metrics article {
		min-width: 0;
		padding: 1rem;
		border: 1.5px solid color-mix(in srgb, var(--panel-border) 70%, transparent);
		border-radius: calc(var(--radius) * 0.8);
		background: color-mix(in srgb, var(--panel-bg) 78%, var(--panel-accent) 22%);
	}

	.metrics article:nth-child(4n + 1) { background: color-mix(in srgb, var(--panel-bg) 72%, var(--panel-accent) 28%); }
	.metrics article:nth-child(4n + 2) { background: color-mix(in srgb, var(--panel-bg) 70%, var(--panel-accent-2) 30%); }
	.metrics article:nth-child(4n + 3) { background: color-mix(in srgb, var(--panel-bg) 82%, white 18%); }
	.metrics article:nth-child(4n + 4) { background: color-mix(in srgb, var(--panel-bg) 76%, black 24%); }

	.value {
		font-family: var(--font-accent);
		font-size: clamp(1.65rem, 3.8vw, 2.55rem);
		font-weight: 900;
		line-height: 1;
		white-space: nowrap;
	}

	.value span {
		margin-left: 0.18em;
		font-family: var(--font-body);
		font-size: 0.42em;
		font-weight: 800;
	}

	h4 {
		margin-top: 0.62rem;
		font-size: 0.9rem;
		line-height: 1.3;
		text-wrap: balance;
	}

	.detail {
		margin-top: 0.42rem;
		font-size: 0.76rem;
		line-height: 1.45;
		text-wrap: pretty;
		opacity: 0.74;
	}

	.takeaway {
		margin-top: 1rem;
		padding: 0.75rem 0.9rem;
		border-left: 4px solid var(--panel-accent);
		background: color-mix(in srgb, var(--panel-bg) 76%, var(--panel-accent) 24%);
		font-size: 0.92rem;
		font-weight: 750;
		line-height: 1.55;
		text-wrap: pretty;
	}

	footer {
		display: grid;
		gap: 0.22rem;
		margin-top: 0.9rem;
		font-size: 0.72rem;
		line-height: 1.48;
		opacity: 0.72;
	}

	a { color: inherit; text-underline-offset: 0.18em; }

	@media (max-width: 760px) {
		.metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	}

	@media (max-width: 430px) {
		.metrics { grid-template-columns: 1fr; }
	}
</style>
