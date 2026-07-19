<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, eyebrow = "一夜接力", title = "", lead = "", rows = [], facts = [], source = "", sourceUrl = "", note = "" } = $props();
	const { registerNode } = getContext("nodeRegistry");
	let el;
	onMount(() => registerNode(nodeId, el));
	const start = 18;
	const span = 12;
	const left = (hour) => `${((hour - start) / span) * 100}%`;
	const width = (from, to) => `${((to - from) / span) * 100}%`;
	const ticks = [18,20,22,24,26,28,30];
	const label = (hour) => `${String(hour % 24).padStart(2,"0")}:00`;
</script>

<section id={nodeId} class="service-relay" bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>
	<div class="facts">
		{#each facts as fact}<div><strong>{fact.value}</strong><span>{fact.label}</span></div>{/each}
	</div>
	<div class="relay-scroll">
		<div class="relay-chart" role="img" aria-label={title}>
			<div class="ticks">{#each ticks as tick}<span style={`left:${left(tick)}`}>{label(tick)}</span>{/each}</div>
			<div class="rows">
				{#each rows as row, index}
					<div class="row">
						<p>{row.label}<span>{row.detail}</span></p>
						<div class="track">
							{#each ticks as tick}<i class="grid" style={`left:${left(tick)}`}></i>{/each}
							<b class={`segment tone-${index + 1}`} style={`left:${left(row.start)};width:${width(row.start,row.end)}`}><span>{row.time}</span></b>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<footer>
		{#if source}<p>来源：{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{source}</a>{:else}{source}{/if}</p>{/if}
		{#if note}<p>{note}</p>{/if}
	</footer>
</section>

<style>
	.service-relay { position:relative;z-index:3;width:min(100%,880px);margin:0 auto;padding:clamp(1.3rem,3vw,2rem);border:2px solid var(--panel-border);border-radius:var(--radius);background:var(--panel-bg);box-shadow:6px 6px 0 color-mix(in srgb,var(--panel-border) 34%,transparent);color:var(--panel-text);overflow:hidden; }
	p,h3{margin:0}.eyebrow{font-size:.72rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;opacity:.66}h3{max-width:720px;margin-top:.35rem;font-family:var(--font-display);font-size:clamp(1.55rem,3vw,2.25rem);line-height:1.12;text-wrap:balance}.lead{max-width:710px;margin-top:.7rem;font-size:.96rem;line-height:1.58;text-wrap:pretty;opacity:.82}
	.facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.55rem;margin-top:1.25rem}.facts div{padding:.75rem;border:1px solid color-mix(in srgb,var(--panel-border) 54%,transparent);border-radius:10px;background:color-mix(in srgb,var(--panel-bg) 70%,var(--panel-accent-2) 30%)}.facts div:nth-child(odd){background:color-mix(in srgb,var(--panel-bg) 72%,var(--panel-accent) 28%)}.facts strong{display:block;font-family:var(--font-accent);font-size:clamp(1.25rem,2.8vw,1.9rem);line-height:1}.facts span{display:block;margin-top:.32rem;font-size:.68rem;font-weight:800;line-height:1.3}
	.relay-scroll{margin-top:1.3rem;overflow-x:hidden;padding-bottom:.35rem}.relay-chart{min-width:680px}.ticks{position:relative;height:1.6rem;margin-left:9rem}.ticks span{position:absolute;transform:translateX(-50%);font-family:var(--font-accent);font-size:.66rem;font-weight:900;opacity:.72}.ticks span:last-child{transform:translateX(-100%)}.rows{display:grid;gap:.65rem}.row{display:grid;grid-template-columns:8.2rem minmax(0,1fr);gap:.8rem;align-items:center}.row>p{font-size:.78rem;font-weight:900}.row>p span{display:block;margin-top:.12rem;font-size:.62rem;font-weight:700;opacity:.72}.track{position:relative;height:2.35rem;border-radius:999px;background:color-mix(in srgb,var(--panel-border) 9%,transparent);overflow:hidden}.grid{position:absolute;inset:0 auto 0 0;border-left:1px dashed color-mix(in srgb,var(--panel-border) 22%,transparent)}.segment{position:absolute;top:.22rem;bottom:.22rem;display:flex;align-items:center;justify-content:center;min-width:2.7rem;border:1.5px solid var(--panel-border);border-radius:999px;background:var(--panel-accent);color:#21122e;box-shadow:2px 2px 0 color-mix(in srgb,var(--panel-border) 28%,transparent);overflow:hidden}.segment span{padding:0 .4rem;font-size:.65rem;font-weight:900;white-space:nowrap}.tone-2{background:var(--panel-accent-2)}.tone-3{background:color-mix(in srgb,var(--panel-accent) 44%,var(--panel-accent-2) 56%)}.tone-4{background:color-mix(in srgb,var(--panel-bg) 45%,white 55%)}
	footer{display:grid;gap:.2rem;margin-top:.85rem;font-size:.7rem;line-height:1.48;opacity:.65}a{color:inherit;text-underline-offset:.16em}
	@media(max-width:620px){.facts{grid-template-columns:repeat(2,minmax(0,1fr))}.relay-scroll{overflow-x:auto}}
</style>
