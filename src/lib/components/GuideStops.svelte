<script>
	import { getContext, onMount } from "svelte";

	let {
		nodeId,
		eyebrow = "路线攻略",
		title = "",
		lead = "",
		stops = [],
		note = ""
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	onMount(() => registerNode(nodeId, el));
</script>

<section id={nodeId} class="guide-stops" bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>

	<ol>
		{#each stops as stop, index}
			<li>
				<div class="rail" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div>
				<article>
					<div class="stop-head">
						<div>
							<p class="time">{stop.time}</p>
							<h4>{stop.name}</h4>
						</div>
						{#if stop.duration}<span class="duration">停留 {stop.duration}</span>{/if}
					</div>
					<p class="description">{stop.description}</p>
					<dl>
						{#if stop.cost}<div><dt>花费</dt><dd>{stop.cost}</dd></div>{/if}
						{#if stop.transfer}<div><dt>衔接</dt><dd>{stop.transfer}</dd></div>{/if}
						{#if stop.crowd}<div><dt>人流</dt><dd>{stop.crowd}</dd></div>{/if}
					</dl>
					{#if stop.tip}<p class="tip"><strong>现场提示</strong>{stop.tip}</p>{/if}
				</article>
			</li>
		{/each}
	</ol>
	{#if note}<p class="note">{note}</p>{/if}
</section>

<style>
	.guide-stops {
		position: relative;
		z-index: 3;
		width: min(100%, 860px);
		margin: 0 auto;
		padding: clamp(1.3rem, 3vw, 2rem);
		border: 2px solid #262626;
		border-radius: var(--radius);
		background: linear-gradient(145deg, #fbfdff, #eeeaff);
		box-shadow: 5px 5px 0 rgba(38, 38, 38, 0.32);
		color: #262626;
	}

	p,
	h3,
	h4,
	ol,
	dl,
	dd { margin: 0; }

	.eyebrow {
		font-size: 0.72rem;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.7;
	}

	h3 {
		margin-top: 0.35rem;
		font-family: var(--font-display);
		font-size: clamp(1.55rem, 3vw, 2.25rem);
		line-height: 1.12;
		text-wrap: balance;
	}

	.lead {
		max-width: 700px;
		margin-top: 0.7rem;
		font-size: 0.96rem;
		line-height: 1.58;
		text-wrap: pretty;
		opacity: 0.82;
	}

	ol {
		list-style: none;
		padding: 0;
		margin-top: 1.45rem;
	}

	li {
		display: grid;
		grid-template-columns: 3rem minmax(0, 1fr);
		gap: 0.82rem;
		position: relative;
	}

	li + li { margin-top: 0.8rem; }

	.rail {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.rail::after {
		content: "";
		position: absolute;
		top: 2.65rem;
		bottom: -1.1rem;
		border-left: 2px dashed #9f40b8;
		opacity: 0.62;
	}

	li:last-child .rail::after { display: none; }

	.rail span {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		width: 2.45rem;
		height: 2.45rem;
		border: 1.5px solid #262626;
		border-radius: 50%;
		background: #f1fd0f;
		color: #181716;
		font-family: var(--font-accent);
		font-size: 0.78rem;
		font-weight: 900;
	}

	article {
		padding: 1rem;
		border: 1.5px solid rgba(38, 38, 38, 0.7);
		border-radius: calc(var(--radius) * 0.8);
		background: rgba(255, 255, 255, 0.72);
	}

	.stop-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.8rem;
	}

	.time {
		font-family: var(--font-accent);
		font-size: 0.8rem;
		font-weight: 900;
		opacity: 0.68;
	}

	h4 {
		margin-top: 0.12rem;
		font-family: var(--font-display);
		font-size: 1.18rem;
		line-height: 1.2;
		text-wrap: balance;
	}

	.duration {
		flex: 0 0 auto;
		padding: 0.24rem 0.55rem;
		border: 1px solid currentColor;
		border-radius: 999px;
		font-size: 0.68rem;
		font-weight: 850;
	}

	.description {
		margin-top: 0.62rem;
		font-size: 0.9rem;
		line-height: 1.56;
		text-wrap: pretty;
	}

	dl {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.5rem;
		margin-top: 0.78rem;
	}

	dl div {
		padding: 0.55rem 0.62rem;
		border-radius: 8px;
		background: rgba(218, 218, 255, 0.46);
	}

	dt {
		font-size: 0.64rem;
		font-weight: 850;
		opacity: 0.6;
	}

	dd {
		margin-top: 0.18rem;
		font-size: 0.76rem;
		font-weight: 850;
		line-height: 1.38;
		text-wrap: pretty;
	}

	.tip {
		margin-top: 0.72rem;
		padding-left: 0.68rem;
		border-left: 3px solid #9f40b8;
		font-size: 0.76rem;
		line-height: 1.5;
		text-wrap: pretty;
		opacity: 0.8;
	}

	.tip strong { margin-right: 0.45rem; }

	.note {
		margin-top: 1rem;
		font-size: 0.72rem;
		line-height: 1.5;
		opacity: 0.66;
	}

	@media (max-width: 620px) {
		li { grid-template-columns: 2.55rem minmax(0, 1fr); gap: 0.55rem; }
		.rail span { width: 2.1rem; height: 2.1rem; }
		.rail::after { top: 2.25rem; }
		dl { grid-template-columns: 1fr; }
	}
</style>
