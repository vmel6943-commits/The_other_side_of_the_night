<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, eyebrow = "城市系统", title = "", lead = "", items = [], sources = [], note = "" } = $props();
	const { registerNode } = getContext("nodeRegistry");
	let el;
	onMount(() => registerNode(nodeId, el));
</script>

<section id={nodeId} class="system-flow" bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>
	<ol>
		{#each items as item, index}
			<li>
				<div class="card-top"><span class="step">{item.phase ?? String(index + 1).padStart(2, "0")}</span><span class="year">{item.year}</span></div>
				<p class="metric">{item.value}<small>{item.unit}</small></p>
				<h4>{item.title}</h4>
				<p class="text">{item.text}</p>
			</li>
		{/each}
	</ol>
	<footer>
		{#if sources.length}
			<p>来源：{#each sources as source, index}{#if index > 0}<span>、</span>{/if}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>{/each}</p>
		{/if}
		{#if note}<p>{note}</p>{/if}
	</footer>
</section>

<style>
	.system-flow { position:relative;z-index:3;width:min(100%,920px);margin:0 auto;padding:clamp(1.15rem,2.5vw,1.7rem);border:2px solid var(--panel-border);border-radius:var(--radius);background:var(--panel-bg);box-shadow:6px 6px 0 color-mix(in srgb,var(--panel-border) 34%,transparent);color:var(--panel-text) }
	p,h3,h4,ol{margin:0}.eyebrow{font-size:.72rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;opacity:.72}h3{max-width:740px;margin-top:.35rem;font-family:var(--font-display);font-size:clamp(1.55rem,3vw,2.25rem);line-height:1.12;text-wrap:balance}.lead{max-width:720px;margin-top:.7rem;font-size:.96rem;font-weight:630;line-height:1.58;text-wrap:pretty;opacity:.86}
	ol{list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding:0;margin-top:1.25rem;border:1.5px solid color-mix(in srgb,var(--panel-border) 62%,transparent);border-radius:14px;overflow:hidden;background:color-mix(in srgb,var(--panel-bg) 86%,var(--panel-accent-2) 14%)}
	li{position:relative;min-width:0;min-height:8.35rem;padding:.78rem .86rem .82rem;background:linear-gradient(145deg,color-mix(in srgb,var(--panel-bg) 82%,var(--panel-accent) 18%),color-mix(in srgb,var(--panel-bg) 91%,var(--panel-accent-2) 9%))}
	li:nth-child(3n+2){background:linear-gradient(145deg,color-mix(in srgb,var(--panel-bg) 80%,var(--panel-accent-2) 20%),color-mix(in srgb,var(--panel-bg) 92%,var(--panel-accent) 8%))}
	li:nth-child(3n){background:color-mix(in srgb,var(--panel-bg) 88%,var(--panel-accent-2) 12%)}
	li:not(:nth-child(3n)){border-right:1px solid color-mix(in srgb,var(--panel-border) 34%,transparent)}
	li:nth-child(n+4){border-top:1px solid color-mix(in srgb,var(--panel-border) 34%,transparent)}
	.card-top{display:flex;align-items:center;justify-content:space-between;gap:.5rem}.step{font-family:var(--font-accent);font-size:.58rem;font-weight:950;letter-spacing:.08em;color:var(--panel-accent)}.year{padding:.18rem .38rem;border:1px solid color-mix(in srgb,var(--panel-border) 36%,transparent);border-radius:999px;background:color-mix(in srgb,var(--panel-bg) 72%,transparent);font-size:.54rem;font-weight:850;letter-spacing:.03em}
	.metric{margin-top:.55rem;font-family:var(--font-accent);font-size:clamp(1.45rem,3.2vw,2.15rem);font-weight:950;line-height:1;color:var(--panel-text)}.metric small{margin-left:.18em;font-family:var(--font-body);font-size:.36em;font-weight:850}h4{margin-top:.34rem;font-family:var(--font-display);font-size:.86rem;line-height:1.2}.text{margin-top:.26rem;max-width:17rem;font-size:.62rem;font-weight:650;line-height:1.42;text-wrap:pretty;opacity:.76}
	footer{display:grid;gap:.18rem;margin-top:.8rem;font-size:.66rem;line-height:1.46;opacity:.72}a{color:inherit;text-underline-offset:.16em}
	@media(max-width:680px){.system-flow{padding:1.05rem}.lead{font-size:.88rem}ol{grid-template-columns:repeat(2,minmax(0,1fr));margin-top:1rem}li{min-height:8.15rem;padding:.7rem}li:not(:nth-child(3n)){border-right:0}li:nth-child(n+4){border-top:0}li:nth-child(odd){border-right:1px solid color-mix(in srgb,var(--panel-border) 34%,transparent)}li:nth-child(n+3){border-top:1px solid color-mix(in srgb,var(--panel-border) 34%,transparent)}.metric{font-size:1.55rem}.text{font-size:.58rem}footer{margin-top:.7rem}}
</style>
