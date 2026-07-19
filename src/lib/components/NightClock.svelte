<script>
	import { getContext, onMount } from "svelte";

	let {
		nodeId,
		eyebrow = "一夜时间轴",
		title = "北京夜游的十二小时",
		lead = "",
		startHour = 17,
		endHour = 29,
		items = [],
		note = ""
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	onMount(() => registerNode(nodeId, el));

	const span = endHour - startHour;
	const offset = (hour) => `${((hour - startHour) / span) * 100}%`;
	const width = (start, end) => `${((end - start) / span) * 100}%`;
	const labelHour = (hour) => `${String(hour % 24).padStart(2, "0")}:00`;
	const ticks = Array.from({ length: 7 }, (_, i) => startHour + i * 2);
</script>

<section id={nodeId} class="night-clock" bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>

	<div class="chart" role="img" aria-label="从傍晚五点到次日清晨五点的北京夜游路线与城市服务时间轴">
		<div class="ticks" aria-hidden="true">
			{#each ticks as tick}
				<span style={`left: ${offset(tick)}`}>{labelHour(tick)}</span>
			{/each}
		</div>
		<div class="grid-lines" aria-hidden="true">
			{#each ticks as tick}<i style={`left: ${offset(tick)}`}></i>{/each}
		</div>

		<div class="bands">
			{#each items as item}
				<div class="band-row">
					<p>{item.label}<span>{item.detail}</span></p>
					<div class="track">
						<div class={`band ${item.kind ?? "route"}`} style={`left: ${offset(item.start)}; width: ${width(item.start, item.end)};`}>
							<span>{item.short}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	{#if note}<p class="note">{note}</p>{/if}
</section>

<style>
	.night-clock {
		position: relative;
		z-index: 3;
		width: min(100%, 900px);
		margin: 0 auto;
		padding: clamp(1.3rem, 3vw, 2rem);
		border: 2px solid var(--panel-border);
		border-radius: var(--radius);
		background: var(--panel-bg);
		box-shadow: 5px 5px 0 color-mix(in srgb, var(--panel-border) 34%, transparent);
		color: var(--panel-text);
		overflow: hidden;
	}

	p,
	h3 { margin: 0; }

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
		max-width: 720px;
		margin-top: 0.7rem;
		font-size: 0.96rem;
		line-height: 1.58;
		text-wrap: pretty;
		opacity: 0.82;
	}

	.chart {
		position: relative;
		margin-top: 1.55rem;
		padding-top: 1.9rem;
	}

	.ticks {
		position: absolute;
		left: 10.5rem;
		right: 0;
		top: 0;
		height: 1.5rem;
	}

	.ticks span {
		position: absolute;
		transform: translateX(-50%);
		font-family: var(--font-accent);
		font-size: 0.68rem;
		font-weight: 900;
		white-space: nowrap;
		opacity: 0.74;
	}

	.grid-lines {
		position: absolute;
		left: 10.5rem;
		right: 0;
		top: 1.7rem;
		bottom: 0;
		pointer-events: none;
	}

	.grid-lines i {
		position: absolute;
		top: 0;
		bottom: 0;
		border-left: 1px dashed currentColor;
		opacity: 0.16;
	}

	.bands { display: grid; gap: 0.62rem; }

	.band-row {
		display: grid;
		grid-template-columns: 9.7rem minmax(0, 1fr);
		gap: 0.8rem;
		align-items: center;
		min-height: 2.7rem;
	}

	.band-row > p {
		font-size: 0.8rem;
		font-weight: 900;
		line-height: 1.25;
	}

	.band-row > p span {
		display: block;
		margin-top: 0.12rem;
		font-size: 0.65rem;
		font-weight: 700;
		opacity: 0.72;
	}

	.track {
		position: relative;
		height: 2.25rem;
		border-radius: 999px;
		background: color-mix(in srgb, currentColor 8%, transparent);
	}

	.band {
		position: absolute;
		top: 0.22rem;
		bottom: 0.22rem;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 2.2rem;
		border: 1.5px solid #262626;
		border-radius: 999px;
		background: var(--panel-accent);
		color: #171b2b;
		box-shadow: 2px 2px 0 rgba(38, 38, 38, 0.34);
		overflow: hidden;
	}

	.band.route-modern { background: var(--panel-accent-2); }
	.band.route-culture { background: color-mix(in srgb, var(--panel-accent) 52%, var(--panel-accent-2) 48%); }
	.band.service { background: color-mix(in srgb, var(--panel-bg) 45%, white 55%); }
	.band.patrol { background: color-mix(in srgb, var(--panel-accent-2) 38%, white 62%); }

	.band span {
		padding: 0 0.38rem;
		font-size: 0.66rem;
		font-weight: 900;
		white-space: nowrap;
	}

	.note {
		margin-top: 0.92rem;
		font-size: 0.72rem;
		line-height: 1.5;
		opacity: 0.76;
	}

	@media (max-width: 660px) {
		.chart { overflow-x: auto; padding-bottom: 0.4rem; }
		.ticks,
		.grid-lines { left: 8rem; min-width: 560px; }
		.band-row { grid-template-columns: 7.2rem 560px; }
	}
</style>
