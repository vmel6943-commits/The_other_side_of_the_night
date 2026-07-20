<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, eyebrow = "北京演艺 / 2024", title = "", lead = "", totals = [], growth = [], source = "", sourceUrl = "", note = "" } = $props();
	const { registerNode } = getContext("nodeRegistry");
	let visible = $state(false);
	let el;
	onMount(() => {
		registerNode(nodeId, el);
		if (typeof IntersectionObserver === "undefined") {
			visible = true;
			return;
		}
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				visible = true;
				observer.disconnect();
			}
		}, { threshold: 0.2 });
		observer.observe(el);
		return () => observer.disconnect();
	});
	const scaleMax = 80;
</script>

<section id={nodeId} class="performance-growth" class:visible bind:this={el}>
	<header><p class="eyebrow">{eyebrow}</p><h3>{title}</h3>{#if lead}<p class="lead">{lead}</p>{/if}</header>

	<div class="total-ticker" aria-label="2024年北京演艺市场总量">
		{#each totals as total}<div><strong>{total.value}</strong><span>{total.label}</span><small>{total.detail}</small></div>{/each}
	</div>

	<div class="growth-rings" role="img" aria-label="四项指标同比增幅，圆环使用0%到80%的统一刻度">
		<div class="scale-note">同比增幅 · 统一刻度 0—80%</div>
		{#each growth as item, index}
			<article style={`--target-progress:${Math.min(item.value / scaleMax, 1) * 360}deg; --ring:${index}; --ring-delay:${120 + index * 110}ms;`}>
				<div class={`ring ring-${index + 1}`}><div class="ring-core"><strong>{item.display}</strong><span>同比</span></div></div>
				<b>{item.label}</b>
				<small>{item.detail}</small>
			</article>
		{/each}
	</div>

	<footer>{#if source}<p>来源：{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{source}</a>{:else}{source}{/if}</p>{/if}{#if note}<p>{note}</p>{/if}</footer>
</section>

<style>
	@property --draw { syntax:"<angle>"; inherits:true; initial-value:0deg; }
	.performance-growth { position:relative; z-index:3; width:min(100%,900px); margin:0 auto; padding:clamp(1.3rem,3vw,2rem); border:2px solid var(--panel-border); border-radius:var(--radius); background:var(--panel-bg); box-shadow:7px 7px 0 color-mix(in srgb,var(--panel-border) 32%,transparent); color:var(--panel-text); }
	p,h3 { margin:0; }
	.eyebrow { font-size:.72rem; font-weight:900; letter-spacing:.12em; text-transform:uppercase; opacity:.66; }
	h3 { max-width:720px; margin-top:.35rem; font-family:var(--font-display); font-size:clamp(1.55rem,3vw,2.25rem); line-height:1.12; text-wrap:balance; }
	.lead { max-width:710px; margin-top:.7rem; font-size:.96rem; line-height:1.58; text-wrap:pretty; opacity:.82; }
	.total-ticker { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); margin-top:1.3rem; border-block:1.5px solid color-mix(in srgb,var(--panel-border) 54%,transparent); }
	.total-ticker div { padding:.9rem .8rem; opacity:0; transform:translateY(.45rem); transition:opacity 440ms ease,transform 560ms cubic-bezier(.22,1,.36,1); }
	.total-ticker div:nth-child(2){transition-delay:70ms}.total-ticker div:nth-child(3){transition-delay:140ms}.total-ticker div:nth-child(4){transition-delay:210ms}
	.visible .total-ticker div { opacity:1; transform:none; }
	.total-ticker div + div { border-left:1px solid color-mix(in srgb,var(--panel-border) 38%,transparent); }
	.total-ticker strong { display:block; font-family:var(--font-accent); font-size:clamp(1.25rem,3vw,1.85rem); line-height:1; }
	.total-ticker span { display:block; margin-top:.4rem; font-size:.72rem; font-weight:900; }
	.total-ticker small { display:block; margin-top:.2rem; font-size:.6rem; opacity:.58; }
	.growth-rings { position:relative; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:1rem; margin-top:1.2rem; padding:2.4rem 1rem 1rem; border:1.5px solid color-mix(in srgb,var(--panel-border) 52%,transparent); border-radius:12px; background:color-mix(in srgb,var(--panel-bg) 88%,var(--panel-text) 12%); }
	.scale-note { position:absolute; left:1rem; top:.7rem; font-size:.62rem; font-weight:800; opacity:.64; }
	.growth-rings article { --draw:0deg; display:grid; justify-items:center; align-content:start; min-width:0; text-align:center; opacity:0; transform:translateY(.6rem); transition:opacity 420ms ease var(--ring-delay),transform 600ms cubic-bezier(.22,1,.36,1) var(--ring-delay),--draw 980ms cubic-bezier(.22,1,.36,1) var(--ring-delay); }
	.visible .growth-rings article { --draw:var(--target-progress); opacity:1; transform:none; }
	.ring { width:min(132px,100%); aspect-ratio:1; display:grid; place-items:center; border:1.5px solid var(--panel-border); border-radius:50%; background:conic-gradient(var(--panel-accent) 0 var(--draw), color-mix(in srgb,var(--panel-border) 12%,transparent) var(--draw) 360deg); box-shadow:4px 4px 0 color-mix(in srgb,var(--panel-border) 18%,transparent); clip-path:inset(0 100% 0 0); transition:clip-path 760ms cubic-bezier(.22,1,.36,1) var(--ring-delay); }
	.visible .ring { clip-path:inset(0); }
	.ring-2 { background:conic-gradient(var(--panel-accent-2) 0 var(--draw), color-mix(in srgb,var(--panel-border) 12%,transparent) var(--draw) 360deg); }
	.ring-3 { background:conic-gradient(color-mix(in srgb,var(--panel-accent) 42%,var(--panel-accent-2) 58%) 0 var(--draw), color-mix(in srgb,var(--panel-border) 12%,transparent) var(--draw) 360deg); }
	.ring-4 { background:conic-gradient(color-mix(in srgb,var(--panel-text) 58%,var(--panel-accent-2) 42%) 0 var(--draw), color-mix(in srgb,var(--panel-border) 12%,transparent) var(--draw) 360deg); }
	.ring-core { width:68%; aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; border:1px solid color-mix(in srgb,var(--panel-border) 42%,transparent); border-radius:50%; background:var(--panel-bg); }
	.ring-core strong { font-family:var(--font-accent); font-size:clamp(.92rem,2vw,1.2rem); line-height:1; }
	.ring-core span { margin-top:.2rem; font-size:.56rem; font-weight:800; opacity:.55; }
	.growth-rings article>b { margin-top:.62rem; font-size:.72rem; line-height:1.25; }
	.growth-rings article>small { margin-top:.2rem; font-size:.58rem; opacity:.58; }
	footer { display:grid; gap:.2rem; margin-top:.85rem; font-size:.7rem; line-height:1.48; opacity:.65; }
	a { color:inherit; text-underline-offset:.16em; }
	@media(max-width:640px){
		.total-ticker{grid-template-columns:repeat(2,minmax(0,1fr))}.total-ticker div:nth-child(3){border-left:0;border-top:1px solid color-mix(in srgb,var(--panel-border) 38%,transparent)}.total-ticker div:nth-child(4){border-top:1px solid color-mix(in srgb,var(--panel-border) 38%,transparent)}
		.growth-rings{grid-template-columns:repeat(2,minmax(0,1fr));gap:1.2rem .7rem}.ring{width:min(118px,100%)}
	}
	@media(prefers-reduced-motion:reduce){
		.total-ticker div,.growth-rings article{opacity:1;transform:none;transition:none!important}.growth-rings article{--draw:var(--target-progress)}.ring{clip-path:inset(0);transition:none!important}
	}
</style>
