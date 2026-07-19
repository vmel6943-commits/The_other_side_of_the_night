<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, eyebrow = "北京居民夜间消费", title = "", lead = "", year = "", sample = "", window: timeWindow = "", participation = null, times = [], activities = [], spending = [], transport = [], pulse = null, source = "", sourceUrl = "", pulseSource = "", pulseSourceUrl = "", note = "" } = $props();
	const { registerNode } = getContext("nodeRegistry");
	let el;
	onMount(() => registerNode(nodeId, el));
</script>

<section id={nodeId} class="night-portrait" bind:this={el}>
	<header><p class="eyebrow">{eyebrow}</p><h3>{title}</h3>{#if lead}<p class="lead">{lead}</p>{/if}</header>

	<div class="survey-meta"><span>{year} 年调查</span><span>{sample}</span><span>统计时段 {timeWindow}</span></div>

	<div class="portrait-grid">
		<div class="participation">
			<div class="participation-ring" style={`--share:${participation?.value ?? 0}%;`}>
				<div><strong>{participation?.display}</strong><span>{participation?.label}</span></div>
			</div>
			{#if pulse}<div class="pulse"><strong>{pulse.value}</strong><span>{pulse.label}</span></div>{/if}
		</div>

		<div class="time-field">
			<div class="field-head"><p class="chart-label">夜间消费时段偏好 · 多选</p><span>占受访夜间消费者比例</span></div>
			<div class="time-bars">
				{#each times as item, index}
					<div class={`time-row time-${index + 1}`}>
						<div class="time-copy"><b>{item.label}</b><span>{item.detail}</span></div>
						<div class="time-track"><i style={`--value:${item.value}%`}></i></div>
						<strong>{item.value}%</strong>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="activity-field">
		<div class="field-head"><p class="chart-label">夜里去做什么 · 多选</p><span>按选择比例由高到低排列</span></div>
		<div class="activity-bars">
			{#each activities as item, index}
				<div class={`activity-row activity-${index + 1}`}>
					<span>{item.label}</span>
					<i><b style={`--value:${item.value}%`}></b></i>
					<strong>{item.value}%</strong>
				</div>
			{/each}
		</div>
	</div>

	<div class="detail-row">
		<div class="spending">
			<p class="chart-label">每人每次平均消费</p>
			<div class="spending-ribbon" aria-label="夜间次均消费金额分布">
				{#each spending as item, index}<i class={`spend-${index + 1}`} style={`--spend:${item.value}%`} title={`${item.label}：${item.value}%`}></i>{/each}
			</div>
			<div class="spending-labels">{#each spending as item}<span><b>{item.value}%</b>{item.label}</span>{/each}</div>
		</div>
		<div class="transport">
			<p class="chart-label">夜间消费如何到达 · 多选</p>
			<div>{#each transport as item}<span><b>{item.label}</b><i><em style={`--value:${item.value}%`}></em></i><strong>{item.value}%</strong></span>{/each}</div>
		</div>
	</div>

	<footer>
		<p>来源：{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{source}</a>{:else}{source}{/if}{#if pulseSource} · {#if pulseSourceUrl}<a href={pulseSourceUrl} target="_blank" rel="noreferrer">{pulseSource}</a>{:else}{pulseSource}{/if}{/if}</p>
		{#if note}<p>{note}</p>{/if}
	</footer>
</section>

<style>
	.night-portrait { position:relative; z-index:3; width:min(100%,920px); margin:0 auto; padding:clamp(1.3rem,3vw,2rem); border:2px solid var(--panel-border); border-radius:var(--radius); background:var(--panel-bg); box-shadow:7px 7px 0 color-mix(in srgb,var(--panel-border) 32%,transparent); color:var(--panel-text); }
	p,h3 { margin:0; }
	.eyebrow,.chart-label { font-size:.7rem; font-weight:900; letter-spacing:.1em; text-transform:uppercase; opacity:.68; }
	h3 { max-width:760px; margin-top:.35rem; font-family:var(--font-display); font-size:clamp(1.55rem,3vw,2.25rem); line-height:1.12; text-wrap:balance; }
	.lead { max-width:735px; margin-top:.7rem; font-size:.96rem; line-height:1.58; opacity:.82; text-wrap:pretty; }
	.survey-meta { display:flex; flex-wrap:wrap; margin-top:1.1rem; border-block:1px solid color-mix(in srgb,var(--panel-border) 36%,transparent); }
	.survey-meta span { padding:.48rem .72rem; font-size:.63rem; font-weight:850; }
	.survey-meta span + span { border-left:1px solid color-mix(in srgb,var(--panel-border) 32%,transparent); }
	.portrait-grid { display:grid; grid-template-columns:14rem minmax(0,1fr); gap:1rem; margin-top:1rem; }
	.participation { display:grid; gap:.65rem; }
	.participation-ring { width:min(100%,13rem); aspect-ratio:1; display:grid; place-items:center; margin:auto; border:1.5px solid var(--panel-border); border-radius:50%; background:conic-gradient(var(--panel-accent) 0 var(--share),color-mix(in srgb,var(--panel-border) 10%,transparent) var(--share) 100%); box-shadow:4px 5px 0 color-mix(in srgb,var(--panel-border) 18%,transparent); }
	.participation-ring>div { width:68%; aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; border:1px solid color-mix(in srgb,var(--panel-border) 38%,transparent); border-radius:50%; background:var(--panel-bg); text-align:center; }
	.participation-ring strong { font-family:var(--font-accent); font-size:clamp(1.65rem,4vw,2.5rem); line-height:1; }
	.participation-ring span { max-width:8rem; margin-top:.38rem; font-size:.66rem; font-weight:850; line-height:1.3; }
	.pulse { display:flex; align-items:center; gap:.7rem; padding:.7rem .8rem; border:1px solid color-mix(in srgb,var(--panel-border) 42%,transparent); border-radius:9px; background:color-mix(in srgb,var(--panel-bg) 68%,var(--panel-accent-2) 32%); }
	.pulse strong { flex:0 0 auto; font-family:var(--font-accent); font-size:1.35rem; }
	.pulse span { font-size:.61rem; font-weight:760; line-height:1.35; }
	.time-field { display:flex; flex-direction:column; justify-content:center; gap:.75rem; padding:.9rem 1rem; border:1.5px solid color-mix(in srgb,var(--panel-border) 42%,transparent); border-radius:12px; background:color-mix(in srgb,var(--panel-bg) 88%,var(--panel-accent-2) 12%); }
	.time-bars { display:grid; gap:.82rem; }
	.time-row { display:grid; grid-template-columns:9.2rem minmax(5rem,1fr) 3.15rem; align-items:center; gap:.65rem; }
	.time-copy { display:grid; gap:.12rem; }
	.time-copy b { font-size:.7rem; }
	.time-copy span { font-size:.56rem; line-height:1.28; opacity:.62; }
	.time-track { position:relative; height:.8rem; overflow:hidden; border:1px solid color-mix(in srgb,var(--panel-border) 42%,transparent); border-radius:999px; background:color-mix(in srgb,var(--panel-border) 8%,transparent); }
	.time-track i { display:block; width:var(--value); height:100%; border-right:1px solid var(--panel-border); border-radius:999px; background:var(--panel-accent); }
	.time-row:nth-child(2) .time-track i { background:var(--panel-accent-2); }
	.time-row:nth-child(3) .time-track i { background:color-mix(in srgb,var(--panel-text) 46%,var(--panel-bg) 54%); }
	.time-row>strong { font-family:var(--font-accent); font-size:1rem; text-align:right; }
	.activity-field { margin-top:1rem; padding:.85rem; border:1.5px solid color-mix(in srgb,var(--panel-border) 42%,transparent); border-radius:12px; background:color-mix(in srgb,var(--panel-bg) 90%,var(--panel-text) 10%); }
	.field-head { display:flex; align-items:center; justify-content:space-between; gap:1rem; }
	.field-head span { font-size:.58rem; opacity:.56; }
	.activity-bars { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.58rem 1rem; margin-top:.7rem; }
	.activity-row { display:grid; grid-template-columns:7.6rem minmax(3rem,1fr) 2.8rem; align-items:center; gap:.5rem; }
	.activity-row>span { overflow:hidden; font-size:.61rem; font-weight:800; text-overflow:ellipsis; white-space:nowrap; }
	.activity-row>i { height:.55rem; overflow:hidden; border:1px solid color-mix(in srgb,var(--panel-border) 38%,transparent); border-radius:999px; background:color-mix(in srgb,var(--panel-border) 7%,transparent); }
	.activity-row>i b { display:block; width:var(--value); height:100%; border-right:1px solid var(--panel-border); border-radius:999px; background:var(--panel-accent-2); }
	.activity-row:nth-child(odd)>i b { background:var(--panel-accent); }
	.activity-row>strong { font-family:var(--font-accent); font-size:.76rem; text-align:right; }
	.detail-row { display:grid; grid-template-columns:1.15fr .85fr; gap:.75rem; margin-top:.75rem; }
	.spending,.transport { padding:.8rem; border:1px solid color-mix(in srgb,var(--panel-border) 34%,transparent); border-radius:10px; }
	.spending-ribbon { display:flex; height:1rem; margin-top:.68rem; overflow:hidden; border:1px solid var(--panel-border); border-radius:999px; }
	.spending-ribbon i { width:var(--spend); background:var(--panel-accent-2); }
	.spending-ribbon i:nth-child(2) { background:var(--panel-accent); }
	.spending-ribbon i:nth-child(3) { background:color-mix(in srgb,var(--panel-accent) 45%,var(--panel-accent-2) 55%); }
	.spending-ribbon i:nth-child(4) { background:color-mix(in srgb,var(--panel-text) 44%,var(--panel-bg) 56%); }
	.spending-labels { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:.35rem; margin-top:.55rem; }
	.spending-labels span { display:grid; gap:.08rem; font-size:.5rem; line-height:1.25; }
	.spending-labels b { font-family:var(--font-accent); font-size:.7rem; }
	.transport>div { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.4rem .65rem; margin-top:.52rem; }
	.transport span { display:grid; grid-template-columns:3.4rem minmax(2rem,1fr) 2.25rem; align-items:center; gap:.35rem; font-size:.52rem; }
	.transport span>b { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
	.transport span>i { height:.42rem; overflow:hidden; border-radius:999px; background:color-mix(in srgb,var(--panel-border) 10%,transparent); }
	.transport span>i em { display:block; width:var(--value); height:100%; border-radius:999px; background:var(--panel-accent); }
	.transport strong { font-family:var(--font-accent); font-size:.66rem; text-align:right; }
	footer { display:grid; gap:.2rem; margin-top:.85rem; font-size:.68rem; line-height:1.48; opacity:.65; }
	a { color:inherit; text-underline-offset:.16em; }
	@media(max-width:680px){
		.portrait-grid{grid-template-columns:1fr}.participation{grid-template-columns:1fr 1fr;align-items:center}.participation-ring{width:min(100%,10.5rem)}.pulse{align-self:stretch;flex-direction:column;align-items:flex-start;justify-content:center}.activity-bars{grid-template-columns:1fr}.detail-row{grid-template-columns:1fr}.survey-meta span{width:100%;border-left:0!important}.survey-meta span+span{border-top:1px solid color-mix(in srgb,var(--panel-border) 28%,transparent)}
	}
	@media(max-width:440px){
		.time-row{grid-template-columns:7rem minmax(3rem,1fr) 2.8rem}.time-copy span{display:none}.activity-row{grid-template-columns:6.3rem minmax(2rem,1fr) 2.55rem}.spending-labels{grid-template-columns:repeat(2,minmax(0,1fr))}.transport>div{grid-template-columns:1fr}
	}
</style>
