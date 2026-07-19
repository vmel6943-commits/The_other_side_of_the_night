<script>
	import { getContext, onMount } from "svelte";

	let {
		nodeId,
		eyebrow = "同一城市 / 同一假期",
		title = "",
		lead = "",
		items = [],
		max = 1,
		map = null,
		source = "",
		sourceUrl = "",
		note = ""
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	onMount(() => registerNode(nodeId, el));

	const bubbleSize = (value) => 46 + Math.sqrt(value / max) * 44;
</script>

<section id={nodeId} class="hotspot-map" bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>

	<div class="map-stage" role="group" aria-label={`${title}，圆面积表示春节假期游客量，位置对应北京城区的大致方位`}>
		<div class="tiles" aria-hidden="true">
			{#each map?.rows ?? [] as row}
				{#each map?.columns ?? [] as column}
					<img src={`https://tile.openstreetmap.org/${map.zoom}/${column}/${row}.png`} alt="" loading="eager" />
				{/each}
			{/each}
		</div>
		<div class="map-shade" aria-hidden="true"></div>
		<div class="legend"><i></i><span>圆面积表示游客量 · 位置表示大致方位</span></div>

		{#each items as item, index}
			<button
				type="button"
				class:focus={item.focus}
				class={`bubble bubble-${index + 1}`}
				style={`--bubble-size:${bubbleSize(item.value)}px; --x:${item.x}%; --y:${item.y}%; --z:${20 + index};`}
				aria-label={`${item.label}，${item.display}，${item.context}`}
			>
				<strong>{item.shortDisplay ?? item.display}</strong>
				<b>{item.label}</b>
				<span class="tooltip"><em>{item.context}</em><span>{item.display}</span>{#if item.focus}<small>文中观察点</small>{/if}</span>
			</button>
		{/each}

		<a class="attribution" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© {map?.attribution ?? "OpenStreetMap contributors"}</a>
	</div>

	<div class="map-index" aria-label="图中点位列表">
		{#each items as item}<span class:focus={item.focus}><b>{item.label}</b>{item.shortDisplay ?? item.display}</span>{/each}
	</div>

	<footer>
		{#if source}<p>数据来源：{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{source}</a>{:else}{source}{/if}</p>{/if}
		{#if note}<p>{note}</p>{/if}
	</footer>
</section>

<style>
	.hotspot-map { position:relative; z-index:3; width:min(100%,900px); margin:0 auto; padding:clamp(1.3rem,3vw,2rem); border:2px solid var(--panel-border); border-radius:var(--radius); background:var(--panel-bg); box-shadow:7px 7px 0 color-mix(in srgb,var(--panel-border) 32%,transparent); color:var(--panel-text); }
	p,h3 { margin:0; }
	.eyebrow { font-size:.72rem; font-weight:900; letter-spacing:.12em; text-transform:uppercase; opacity:.66; }
	h3 { max-width:730px; margin-top:.35rem; font-family:var(--font-display); font-size:clamp(1.55rem,3vw,2.25rem); line-height:1.12; text-wrap:balance; }
	.lead { max-width:720px; margin-top:.7rem; font-size:.96rem; line-height:1.58; text-wrap:pretty; opacity:.82; }

	.map-stage { position:relative; aspect-ratio:3/2; min-height:380px; margin-top:1.2rem; overflow:hidden; border:1.5px solid color-mix(in srgb,var(--panel-border) 58%,transparent); border-radius:calc(var(--radius)*.82); background:color-mix(in srgb,var(--panel-bg) 82%,var(--panel-accent-2) 18%); }
	.tiles { position:absolute; inset:0; display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:repeat(2,1fr); }
	.tiles img { width:100%; height:100%; object-fit:cover; filter:saturate(.55) contrast(.9) brightness(1.08); }
	.map-shade { position:absolute; inset:0; background:linear-gradient(145deg,color-mix(in srgb,var(--panel-bg) 38%,transparent),color-mix(in srgb,var(--panel-accent-2) 16%,transparent)); box-shadow:inset 0 0 70px color-mix(in srgb,var(--panel-bg) 42%,transparent); pointer-events:none; }
	.legend { position:absolute; left:.72rem; top:.65rem; z-index:35; display:flex; align-items:center; gap:.4rem; padding:.34rem .48rem; border:1px solid color-mix(in srgb,var(--panel-border) 44%,transparent); border-radius:999px; background:color-mix(in srgb,var(--panel-bg) 88%,transparent); font-size:.62rem; font-weight:850; backdrop-filter:blur(7px); }
	.legend i { width:.62rem; aspect-ratio:1; border:1.5px solid currentColor; border-radius:50%; background:var(--panel-accent); }
	.attribution { position:absolute; right:.35rem; bottom:.25rem; z-index:35; padding:.18rem .3rem; border-radius:3px; background:rgba(255,255,255,.84); color:#243047; font-size:.5rem; text-decoration:none; }
	.bubble { position:absolute; left:var(--x); top:var(--y); z-index:var(--z); width:var(--bubble-size); aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:.45rem; border:2px solid var(--panel-border); border-radius:50%; background:color-mix(in srgb,var(--panel-accent-2) 82%,var(--panel-bg) 18%); box-shadow:inset -8px -10px 0 color-mix(in srgb,var(--panel-border) 9%,transparent),3px 4px 0 color-mix(in srgb,var(--panel-border) 28%,transparent); color:var(--panel-text); font:inherit; text-align:center; transform:translate(-50%,-50%); transition:transform 160ms ease,filter 160ms ease; outline:none; cursor:help; }
	.bubble:nth-of-type(3n) { background:color-mix(in srgb,var(--panel-accent) 70%,var(--panel-bg) 30%); }
	.bubble.focus { border-width:3px; background:color-mix(in srgb,var(--panel-accent) 52%,var(--panel-accent-2) 48%); }
	.bubble:hover,.bubble:focus-visible { z-index:50; transform:translate(-50%,-50%) scale(1.08); filter:saturate(1.15); }
	.bubble strong { font-family:var(--font-accent); font-size:clamp(.63rem,1.5vw,.88rem); line-height:1; white-space:nowrap; }
	.bubble b { margin-top:.2rem; font-family:var(--font-display); font-size:clamp(.55rem,1.2vw,.72rem); line-height:1.05; }
	.tooltip { position:absolute; left:50%; bottom:calc(100% + .5rem); display:none; min-width:9.5rem; padding:.55rem .65rem; border:1.5px solid var(--panel-border); border-radius:8px; background:var(--panel-bg); box-shadow:4px 4px 0 color-mix(in srgb,var(--panel-border) 25%,transparent); color:var(--panel-text); text-align:left; transform:translateX(-50%); }
	.tooltip::after { content:""; position:absolute; left:50%; top:100%; width:.55rem; height:.55rem; border-right:1.5px solid var(--panel-border); border-bottom:1.5px solid var(--panel-border); background:var(--panel-bg); transform:translate(-50%,-50%) rotate(45deg); }
	.tooltip em,.tooltip span,.tooltip small { display:block; }
	.tooltip em { font-size:.63rem; font-style:normal; font-weight:900; }
	.tooltip span { margin-top:.16rem; font-family:var(--font-accent); font-size:.82rem; }
	.tooltip small { margin-top:.25rem; font-size:.56rem; opacity:.64; }
	.bubble:hover .tooltip,.bubble:focus-visible .tooltip { display:block; }
	.map-index { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); margin-top:.7rem; border-block:1px solid color-mix(in srgb,var(--panel-border) 32%,transparent); }
	.map-index span { display:grid; gap:.1rem; padding:.55rem; font-size:.61rem; opacity:.74; }
	.map-index span + span { border-left:1px solid color-mix(in srgb,var(--panel-border) 28%,transparent); }
	.map-index b { font-size:.66rem; }
	.map-index span.focus { color:var(--panel-text); opacity:1; background:color-mix(in srgb,var(--panel-accent) 22%,transparent); }
	footer { display:grid; gap:.22rem; margin-top:.8rem; font-size:.7rem; line-height:1.48; opacity:.66; }
	a { color:inherit; text-underline-offset:.16em; }

	@media(max-width:620px){
		.map-stage{min-height:0;aspect-ratio:3/2}.legend{font-size:.5rem}.bubble{width:calc(var(--bubble-size)*.66);padding:.22rem;border-width:1.5px}.bubble.focus{border-width:2px}.bubble strong{font-size:.55rem}.bubble b{font-size:.46rem}.tooltip{min-width:8.4rem}.map-index{grid-template-columns:repeat(2,minmax(0,1fr))}.map-index span:nth-child(odd){border-left:0}.map-index span:nth-child(n+3){border-top:1px solid color-mix(in srgb,var(--panel-border) 28%,transparent)}
	}
</style>
