<script>
	import { getContext, onMount } from "svelte";

	let {
		nodeId,
		eyebrow = "今晚怎么走",
		title = "三条路径，读懂北京夜晚",
		lead = "",
		routes = []
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	onMount(() => registerNode(nodeId, el));

	const goToRoute = (targetId) => {
		document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
	};
</script>

<section id={nodeId} class="route-overview" bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>

	<div class="route-list">
		{#each routes as route, index}
			<button type="button" class={`route route-${index + 1}`} onclick={() => goToRoute(route.targetId)}>
				<div class="route-head">
					<span class="route-number">{String(index + 1).padStart(2, "0")}</span>
					<div>
						<p class="route-kicker">{route.kicker}</p>
						<h4>{route.name}</h4>
					</div>
					<span class="route-arrow">查看</span>
				</div>

				<div class="stops" aria-label={`${route.name}途经站点`}>
					{#each route.stops as stop, stopIndex}
						<span>{stop}</span>
						{#if stopIndex < route.stops.length - 1}<i aria-hidden="true"></i>{/if}
					{/each}
				</div>

				<dl>
					<div><dt>进入时刻</dt><dd>{route.time}</dd></div>
					<div><dt>数据锚点</dt><dd>{route.duration}</dd></div>
					<div><dt>核心追问</dt><dd>{route.budget}</dd></div>
				</dl>
				<p class="route-note">{route.note}</p>
			</button>
		{/each}
	</div>
	<p class="hint">点击卡片，继续阅读对应现场</p>
</section>

<style>
	.route-overview {
		position: relative;
		z-index: 3;
		width: min(100%, 940px);
		margin: 0 auto;
		padding: clamp(1.35rem, 3vw, 2.2rem);
		border: 2px solid var(--panel-border);
		border-radius: var(--radius);
		background: var(--panel-bg);
		box-shadow: 5px 5px 0 color-mix(in srgb, var(--panel-border) 34%, transparent);
		color: var(--panel-text);
	}

	p,
	h3,
	h4,
	dl,
	dd { margin: 0; }

	.eyebrow,
	.route-kicker {
		font-size: 0.72rem;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.7;
	}

	h3 {
		max-width: 720px;
		margin-top: 0.35rem;
		font-family: var(--font-display);
		font-size: clamp(1.65rem, 3.2vw, 2.45rem);
		line-height: 1.1;
		text-wrap: balance;
	}

	.lead {
		max-width: 720px;
		margin-top: 0.72rem;
		font-size: 0.98rem;
		line-height: 1.6;
		text-wrap: pretty;
		opacity: 0.84;
	}

	.route-list {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
		margin-top: 1.55rem;
	}

	.route {
		min-width: 0;
		padding: 1.05rem;
		border: 1.8px solid currentColor;
		border-radius: calc(var(--radius) * 0.82);
		background: linear-gradient(145deg, color-mix(in srgb, var(--panel-bg) 72%, white 28%), var(--route-tint));
		box-shadow: 3px 3px 0 color-mix(in srgb, currentColor 28%, transparent);
		color: var(--panel-text);
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: transform 180ms ease, box-shadow 180ms ease;
	}

	.route-1 { --route-tint: color-mix(in srgb, var(--panel-bg) 60%, var(--panel-accent) 40%); }
	.route-2 { --route-tint: color-mix(in srgb, var(--panel-bg) 58%, var(--panel-accent-2) 42%); }
	.route-3 { --route-tint: color-mix(in srgb, var(--panel-bg) 64%, white 36%); }

	.route:hover,
	.route:focus-visible {
		transform: translateY(-4px);
		box-shadow: 5px 7px 0 color-mix(in srgb, currentColor 26%, transparent);
	}

	.route:focus-visible { outline: 3px solid #4162be; outline-offset: 3px; }

	.route-head {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		gap: 0.7rem;
		align-items: start;
	}

	.route-number {
		display: grid;
		place-items: center;
		width: 2.35rem;
		height: 2.35rem;
		border: 1.5px solid currentColor;
		border-radius: 50%;
		font-family: var(--font-accent);
		font-size: 0.82rem;
		font-weight: 900;
	}

	h4 {
		margin-top: 0.16rem;
		font-family: var(--font-display);
		font-size: 1.2rem;
		line-height: 1.18;
		text-wrap: balance;
	}

	.route-arrow {
		padding: 0.2rem 0.42rem;
		border: 1px solid currentColor;
		border-radius: 999px;
		font-size: 0.66rem;
		font-weight: 900;
	}

	.stops {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.32rem;
		min-height: 3rem;
		margin-top: 1rem;
		font-size: 0.78rem;
		font-weight: 850;
		line-height: 1.4;
	}

	.stops i {
		width: 0.9rem;
		border-top: 1.5px dashed currentColor;
		opacity: 0.45;
	}

	dl {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.35rem;
		margin-top: 1rem;
		padding-top: 0.85rem;
		border-top: 1px solid rgba(38, 38, 38, 0.22);
	}

	dt {
		font-size: 0.62rem;
		font-weight: 800;
		opacity: 0.58;
	}

	dd {
		margin-top: 0.18rem;
		font-size: 0.78rem;
		font-weight: 900;
		line-height: 1.28;
	}

	.route-note {
		margin-top: 0.85rem;
		font-size: 0.75rem;
		line-height: 1.5;
		text-wrap: pretty;
		opacity: 0.72;
	}

	.hint {
		margin-top: 0.9rem;
		font-size: 0.72rem;
		font-weight: 750;
		text-align: right;
		opacity: 0.6;
	}

	@media (max-width: 820px) {
		.route-list { grid-template-columns: 1fr; }
		.stops { min-height: auto; }
	}

	@media (max-width: 430px) {
		dl { grid-template-columns: 1fr; gap: 0.55rem; }
	}
</style>
