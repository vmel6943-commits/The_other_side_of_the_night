<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, eyebrow = "夜京城供给", title = "", lead = "", total = 1, items = [], coverage = "", pulse = null, source = "", sourceUrl = "", extraSource = "", extraSourceUrl = "", note = "" } = $props();
	const { registerNode } = getContext("nodeRegistry");
	let el;
	let activeIndex = $state(null);
	onMount(() => registerNode(nodeId, el));
	const percent = (value) => `${Math.round((value / total) * 1000) / 10}%`;
	const activeItem = $derived(activeIndex === null ? null : items[activeIndex] ?? null);
</script>

<section id={nodeId} class="night-supply" bind:this={el}>
	<header><p class="eyebrow">{eyebrow}</p><h3>{title}</h3>{#if lead}<p class="lead">{lead}</p>{/if}</header>

	<div class="supply-layout">
		<div class="treemap" role="group" aria-label={`${title}，矩形面积表示各类点位数量；悬停或聚焦方块查看详细点位`} onpointerleave={() => activeIndex = null} onfocusout={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) activeIndex = null; }}>
			{#if items[0]}
				<button type="button" class:active={activeIndex === 0} class="primary" style={`--share:${percent(items[0].value)}`} onpointerenter={() => activeIndex = 0} onfocus={() => activeIndex = 0} onclick={() => activeIndex = 0} aria-controls={`${nodeId}-detail`}>
					<span class="block-head"><strong>{items[0].display}</strong><span>{items[0].label}</span><small>{percent(items[0].value)}</small></span>
					<span class="block-copy">{items[0].detail}</span>
					<span class="example-list">{#each items[0].examples ?? [] as example}<span>{example}</span>{/each}</span>
				</button>
			{/if}
			<div class="treemap-side" style={`--share:${percent(total - (items[0]?.value ?? 0))}`}>
				{#each items.slice(1) as item, index}
					<button type="button" class:active={activeIndex === index + 1} class:index-accent={index === 1} style={`--row-share:${percent(item.value / ((items[1]?.value ?? 0) + (items[2]?.value ?? 0)) * total)}`} onpointerenter={() => activeIndex = index + 1} onfocus={() => activeIndex = index + 1} onclick={() => activeIndex = index + 1} aria-controls={`${nodeId}-detail`}>
						<span class="block-head"><strong>{item.display}</strong><span>{item.label}</span><small>{percent(item.value)}</small></span>
						<span class="block-copy">{item.detail}</span>
						<span class="example-list">{#each item.examples ?? [] as example}<span>{example}</span>{/each}</span>
					</button>
				{/each}
			</div>
			{#if activeItem}
				<div id={`${nodeId}-detail`} class="treemap-tooltip" aria-live="polite">
					<div class="tooltip-head"><span>悬停详情</span><strong>{activeItem.display} {activeItem.label}</strong></div>
					<div class="tooltip-groups">
						{#each activeItem.hoverGroups ?? [] as group}
							<div><b>{group.label}</b><span>{group.places}</span></div>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<aside>
			<div class="coverage"><span>覆盖范围</span><strong>{coverage}</strong><small>夜游 · 夜食 · 夜购 · 夜动</small></div>
			{#if pulse}<div class="pulse"><strong>{pulse.value}</strong><span>{pulse.label}</span></div>{/if}
		</aside>
	</div>

	<footer>
		{#if source || extraSource}
			<p>
				来源：{#if source}{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{source}</a>{:else}{source}{/if}{/if}
				{#if source && extraSource} · {/if}
				{#if extraSource}{#if extraSourceUrl}<a href={extraSourceUrl} target="_blank" rel="noreferrer">{extraSource}</a>{:else}{extraSource}{/if}{/if}
			</p>
		{/if}
		{#if note}<p>{note}</p>{/if}
	</footer>
</section>

<style>
	.night-supply { position:relative; z-index:3; width:min(100%,900px); margin:0 auto; padding:clamp(1.3rem,3vw,2rem); border:2px solid var(--panel-border); border-radius:var(--radius); background:var(--panel-bg); box-shadow:7px 7px 0 color-mix(in srgb,var(--panel-border) 32%,transparent); color:var(--panel-text); }
	p,h3 { margin:0; }
	.eyebrow { font-size:.72rem; font-weight:900; letter-spacing:.12em; text-transform:uppercase; opacity:.66; }
	h3 { max-width:740px; margin-top:.35rem; font-family:var(--font-display); font-size:clamp(1.55rem,3vw,2.25rem); line-height:1.12; text-wrap:balance; }
	.lead { max-width:720px; margin-top:.7rem; font-size:.96rem; line-height:1.58; text-wrap:pretty; opacity:.82; }
	.supply-layout { display:grid; grid-template-columns:minmax(0,1fr) 13rem; gap:1rem; margin-top:1.35rem; }
	.treemap { position:relative; display:flex; min-height:290px; gap:.42rem; padding:.42rem; border:1.5px solid color-mix(in srgb,var(--panel-border) 58%,transparent); border-radius:12px; background:color-mix(in srgb,var(--panel-bg) 86%,var(--panel-text) 14%); }
	.treemap>button { width:var(--share); }
	.treemap-side { width:var(--share); display:flex; flex-direction:column; gap:.42rem; }
	.treemap-side button { height:var(--row-share); }
	.treemap button { display:flex; flex-direction:column; justify-content:space-between; min-width:0; padding:clamp(.7rem,2vw,1rem); border:1.5px solid var(--panel-border); border-radius:9px; background:var(--panel-accent-2); box-shadow:inset -9px -9px 0 color-mix(in srgb,var(--panel-border) 9%,transparent); color:var(--panel-text); font:inherit; text-align:left; overflow:hidden; cursor:pointer; transition:filter 140ms ease,box-shadow 140ms ease; }
	.treemap button.primary { background:color-mix(in srgb,var(--panel-accent-2) 74%,var(--panel-bg) 26%); }
	.treemap-side button { background:color-mix(in srgb,var(--panel-accent) 58%,var(--panel-bg) 42%); }
	.treemap-side button.index-accent { background:color-mix(in srgb,var(--panel-accent) 36%,var(--panel-accent-2) 64%); }
	.treemap button:hover,.treemap button:focus-visible,.treemap button.active { filter:saturate(1.08); box-shadow:inset 0 0 0 3px color-mix(in srgb,var(--panel-border) 48%,transparent),inset -9px -9px 0 color-mix(in srgb,var(--panel-border) 9%,transparent); outline:none; }
	.block-head { display:flex; flex-wrap:wrap; align-items:baseline; gap:.26rem .46rem; }
	.treemap strong { font-family:var(--font-accent); font-size:clamp(1.5rem,4vw,2.8rem); line-height:1; }
	.treemap span { font-family:var(--font-display); font-size:clamp(.72rem,1.5vw,.95rem); line-height:1.2; }
	.treemap small { margin-left:auto; font-size:.62rem; opacity:.62; }
	.block-copy { margin-top:.72rem; font-family:var(--font-body)!important; font-size:.68rem!important; font-weight:750; line-height:1.4!important; text-wrap:pretty; }
	.example-list { display:flex; flex-wrap:wrap; gap:.28rem; margin-top:.72rem; }
	.example-list>span { padding:.2rem .36rem; border:1px solid color-mix(in srgb,var(--panel-border) 38%,transparent); border-radius:999px; background:color-mix(in srgb,var(--panel-bg) 32%,transparent); font-family:var(--font-body)!important; font-size:.55rem!important; font-weight:800; line-height:1.2!important; }
	.treemap-side .block-copy { margin-top:.38rem; font-size:.61rem!important; }
	.treemap-side .example-list { margin-top:.35rem; }
	.treemap-side .example-list>span { font-size:.5rem!important; }
	aside { display:grid; gap:.75rem; }
	.coverage,.pulse { display:flex; flex-direction:column; justify-content:center; padding:1rem; border:1.5px solid color-mix(in srgb,var(--panel-border) 54%,transparent); border-radius:12px; }
	.coverage { background:color-mix(in srgb,var(--panel-bg) 72%,var(--panel-accent) 28%); }
	.coverage span { font-size:.65rem; font-weight:900; opacity:.64; }
	.coverage strong { margin-top:.3rem; font-family:var(--font-accent); font-size:1.45rem; line-height:1.05; }
	.coverage small { margin-top:.45rem; font-size:.64rem; line-height:1.45; }
	.pulse { background:color-mix(in srgb,var(--panel-bg) 72%,var(--panel-accent-2) 28%); }
	.pulse strong { font-family:var(--font-accent); font-size:2rem; line-height:1; }
	.pulse span { margin-top:.45rem; font-size:.66rem; font-weight:750; line-height:1.45; }
	.treemap-tooltip { position:absolute; z-index:30; right:.7rem; bottom:.7rem; left:.7rem; display:grid; grid-template-columns:9.6rem minmax(0,1fr); gap:.75rem; padding:.72rem; border:1.5px solid var(--panel-border); border-radius:9px; background:color-mix(in srgb,var(--panel-bg) 94%,var(--panel-accent-2) 6%); box-shadow:5px 5px 0 color-mix(in srgb,var(--panel-border) 28%,transparent); pointer-events:none; }
	.tooltip-head>span { display:block; font-size:.53rem; font-weight:900; letter-spacing:.1em; opacity:.56; }
	.tooltip-head>strong { display:block; margin-top:.18rem; font-family:var(--font-display); font-size:.9rem; }
	.tooltip-groups { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.3rem .55rem; }
	.tooltip-groups div { padding-left:.45rem; border-left:3px solid var(--panel-accent); }
	.tooltip-groups b,.tooltip-groups span { display:block; }
	.tooltip-groups b { font-size:.56rem; }
	.tooltip-groups span { margin-top:.12rem; font-size:.52rem; line-height:1.3; opacity:.72; }
	footer { display:grid; gap:.2rem; margin-top:.9rem; font-size:.7rem; line-height:1.48; opacity:.65; }
	a { color:inherit; text-underline-offset:.16em; }
	@media(max-width:680px){
		.supply-layout{grid-template-columns:1fr}.treemap{min-height:250px}aside{grid-template-columns:repeat(2,minmax(0,1fr))}.treemap-tooltip{grid-template-columns:8rem minmax(0,1fr)}
	}
	@media(max-width:440px){
		.treemap{min-height:520px;flex-direction:column}.treemap>button,.treemap-side{width:100%}.treemap>button{height:48%}.treemap-side{height:52%;flex-direction:column}.treemap-side button{height:50%;width:100%}.treemap strong{font-size:1.45rem}.treemap-side .block-copy{font-size:.6rem!important}.treemap-side .example-list{display:flex}aside{grid-template-columns:1fr}.treemap-tooltip{grid-template-columns:1fr;gap:.45rem;max-height:calc(100% - 1.4rem);overflow:hidden}.tooltip-groups{grid-template-columns:1fr}
	}
</style>
