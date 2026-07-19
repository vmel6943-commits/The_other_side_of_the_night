<script>
	import { getContext, onMount } from "svelte";

	let {
		nodeId,
		eyebrow = "同一地点 / 不同时刻",
		title = "一条街区的夜间时间线",
		lead = "",
		entries = [],
		source = "",
		sourceUrl = ""
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;

	onMount(() => registerNode(nodeId, el));
</script>

<section id={nodeId} class="timeline" bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>

	<ol>
		{#each entries as entry}
			<li>
				<time>{entry.time}</time>
				<div>
					<h4>{entry.title}</h4>
					<p>{entry.text}</p>
					{#if entry.roles?.length}
						<div class="roles" aria-label="参与角色">
							{#each entry.roles as role}<span>{role}</span>{/each}
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ol>

	{#if source}
		<p class="source">
			资料：{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{source}</a>{:else}{source}{/if}
		</p>
	{/if}
</section>

<style>
	.timeline {
		position: relative;
		z-index: 3;
		width: min(100%, 820px);
		margin: 0 auto;
		padding: clamp(1.3rem, 3vw, 2rem);
		border: 2px solid var(--panel-border);
		border-radius: var(--radius);
		background: var(--panel-bg);
		box-shadow: 5px 5px 0 color-mix(in srgb, var(--panel-border) 34%, transparent);
		color: var(--panel-text);
	}

	header { max-width: 680px; }
	.eyebrow,
	h3,
	h4,
	p { margin: 0; }

	.eyebrow {
		font-size: 0.76rem;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.72;
	}

	h3 {
		margin-top: 0.35rem;
		font-family: var(--font-display);
		font-size: clamp(1.55rem, 3vw, 2.25rem);
		line-height: 1.12;
		text-wrap: balance;
	}

	.lead {
		margin-top: 0.7rem;
		font-size: 0.98rem;
		line-height: 1.58;
		text-wrap: pretty;
		opacity: 0.86;
	}

	ol {
		list-style: none;
		margin: 1.6rem 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.8rem;
	}

	li {
		position: relative;
		min-width: 0;
		padding: 1rem;
		border: 1.5px solid color-mix(in srgb, var(--panel-border) 70%, transparent);
		border-radius: calc(var(--radius) * 0.8);
		background: color-mix(in srgb, var(--panel-bg) 78%, var(--panel-accent) 22%);
	}

	li:nth-child(4n + 1) { background: color-mix(in srgb, var(--panel-bg) 70%, var(--panel-accent) 30%); }
	li:nth-child(4n + 2) { background: color-mix(in srgb, var(--panel-bg) 68%, var(--panel-accent-2) 32%); }
	li:nth-child(4n + 3) { background: color-mix(in srgb, var(--panel-bg) 82%, white 18%); }
	li:nth-child(4n + 4) { background: color-mix(in srgb, var(--panel-bg) 76%, black 24%); }

	li::before {
		content: "";
		position: absolute;
		left: -0.55rem;
		top: 1.45rem;
		width: 0.55rem;
		border-top: 2px dashed var(--line-stroke);
	}

	li:first-child::before { display: none; }

	time {
		display: inline-block;
		padding: 0.24rem 0.5rem;
		border-radius: 999px;
		background: var(--panel-accent);
		color: var(--panel-bg);
		font-family: var(--font-accent);
		font-size: 0.82rem;
		font-weight: 900;
	}

	h4 {
		margin-top: 0.68rem;
		font-family: var(--font-display);
		font-size: 1.04rem;
		line-height: 1.22;
		text-wrap: balance;
	}

	li p {
		margin-top: 0.48rem;
		font-size: 0.88rem;
		line-height: 1.55;
		text-wrap: pretty;
	}

	.roles {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-top: 0.7rem;
	}

	.roles span {
		padding: 0.2rem 0.42rem;
		border: 1px solid currentColor;
		border-radius: 999px;
		font-size: 0.68rem;
		font-weight: 800;
		opacity: 0.78;
	}

	.source {
		margin-top: 1rem;
		font-size: 0.74rem;
		line-height: 1.5;
		opacity: 0.72;
	}

	a { color: inherit; text-underline-offset: 0.18em; }

	@media (max-width: 760px) {
		ol { grid-template-columns: 1fr; }
		li::before {
			left: 1.35rem;
			top: -0.82rem;
			height: 0.82rem;
			border-top: 0;
			border-left: 2px dashed var(--line-stroke);
		}
	}
</style>
