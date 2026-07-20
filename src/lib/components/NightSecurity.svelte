<script>
	import { getContext, onMount } from "svelte";
	import { asset } from "$lib/asset.js";

	let {
		nodeId,
		eyebrow = "北京夜巡",
		title = "",
		lead = "",
		cityMetrics = [],
		caseStudy = {},
		zones = [],
		response = [],
		routeProfile = {},
		actionMetrics = [],
		outcomes = [],
		serviceResults = [],
		caseNote = "",
		takeaway = "",
		sources = [],
		note = ""
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let activeView = $state("risk");
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
		}, { threshold: 0.12 });
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<section id={nodeId} class="night-security" class:visible bind:this={el}>
	<div class="security-intro-card">
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>

	<section class="network-plot" aria-label="北京基层夜间巡防网络规模">
		<div class="subhead">
			<span>全市夜巡底盘 / 2026</span>
			<h4>两类基层节点，撑起夜间求助与巡逻网络</h4>
		</div>
		<div class="network-bars">
			{#each cityMetrics as item, index}
				<div class="network-row" style={`--fill:${item.percent}%; --bar-delay:${160 + index * 130}ms`}>
					<div class="metric-label"><b>{item.label}</b><span>{item.detail}</span></div>
					<div class="bar-rail"><i></i></div>
					<strong>{item.value}<small>{item.unit}</small></strong>
				</div>
			{/each}
		</div>
		<div class="network-axis"><span>0</span><span>节点数量</span><span>594</span></div>
	</section>

	<figure class="night-scene">
		<div class="photo-wrap">
			<img src={asset(caseStudy.image?.src)} alt={caseStudy.image?.alt ?? "什刹海夜巡现场"} loading="lazy" referrerpolicy="no-referrer" />
			<div class="time-overlay">
				<span>{caseStudy.eyebrow}</span>
				<div><strong>{caseStudy.start}</strong><i></i><strong>{caseStudy.end}</strong></div>
				<b>{caseStudy.label}</b>
			</div>
		</div>
		<figcaption>
			<div class="caption-copy">
				<span>{caseStudy.image?.caption}</span>
				<small>图片：<a href={caseStudy.image?.sourceUrl} target="_blank" rel="noreferrer">{caseStudy.image?.source}</a></small>
			</div>
			<div class="scene-context" aria-label="什刹海夜巡场景规模">
				{#each caseStudy.context ?? [] as item}
					<div><strong>{item.value}<small>{item.unit}</small></strong><span>{item.label}</span></div>
				{/each}
			</div>
		</figcaption>
	</figure>
	</div>

	<div class="security-data-card">
	<div class="story-tabs" role="tablist" aria-label="夜间巡防数据视图">
		<button type="button" class:active={activeView === "risk"} role="tab" aria-selected={activeView === "risk"} onclick={() => activeView = "risk"}>
			<span>01</span><b>风险分区</b><small>警情集中度与三级巡控</small>
		</button>
		<button type="button" class:active={activeView === "route"} role="tab" aria-selected={activeView === "route"} onclick={() => activeView = "route"}>
			<span>02</span><b>巡防链路</b><small>车辆、线路与社区网格</small>
		</button>
		<button type="button" class:active={activeView === "results"} role="tab" aria-selected={activeView === "results"} onclick={() => activeView = "results"}>
			<span>03</span><b>行动结果</b><small>清整数量与警情变化</small>
		</button>
	</div>

	{#if activeView === "risk"}
	<section class="risk-section" aria-label="什刹海夜间警情构成与三级巡控">
		<div class="risk-chart">
			<div class="subhead vertical">
				<span>警情集中度 / 什刹海</span>
				<h4>七成夜间警情，集中在最热闹的一类区域</h4>
			</div>
			<div class="donut-wrap">
				<div class="donut" role="img" aria-label="一级巡控区域占辖区夜间警情的百分之七十">
					<div><strong>70%</strong><span>一级区域<br />警情占比</span></div>
				</div>
				<div class="cadence"><strong>15</strong><span>分钟一轮<br />重点巡查</span></div>
			</div>
			<p>前海酒吧街、银锭桥、金锭桥等高密度点位，采用“定点驻守＋高频巡查”。</p>
		</div>

		<div class="zone-plot">
			<div class="subhead vertical"><span>按风险分区</span><h4>不同空间，对应不同巡控密度</h4></div>
			<small class="hover-hint">悬停或键盘聚焦，查看风险与巡控动作</small>
			<ol>
				{#each zones as item, index}
					<li style={`--zone:${index}`}>
						<button type="button" class="zone-row" aria-label={`${item.level}：${item.place}。${item.risk}。${item.action}`}>
							<div class="zone-level"><i>{String(index + 1).padStart(2, "0")}</i><strong>{item.level}</strong></div>
							<div class="zone-copy"><b>{item.place}</b><span>{item.risk}</span></div>
							<p>{item.action}</p>
						</button>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<section class="response-line" aria-label="夜间三级联动机制">
		<div class="subhead"><span>协作链</span><h4>风险被识别后，三类力量接力响应</h4></div>
		<ol>
			{#each response as item}
				<li>
					<span>{item.step}</span>
					<div><strong>{item.title}</strong><p>{item.detail}</p></div>
				</li>
			{/each}
		</ol>
	</section>
	{/if}

	{#if activeView === "route" && routeProfile?.points?.length}
		<section class="route-plot" aria-label="昌平夜间巡逻部署链">
			<div class="subhead vertical"><span>{routeProfile.eyebrow}</span><h4>{routeProfile.title}</h4></div>
			<p class="route-intro">{routeProfile.intro}</p>
			<ol>
				{#each routeProfile.points as item}
					<li><i></i><strong>{item.value}<small>{item.unit}</small></strong><span>{item.label}</span></li>
				{/each}
			</ol>
			<p class="weekend-note">{routeProfile.weekend}</p>
		</section>
	{/if}

	{#if activeView === "results"}
	<section class="analysis-grid">
		<div class="action-plot" aria-label="2025年北京夏夜巡防清整行动数据">
			<div class="subhead vertical"><span>十波次夏夜清整 / 2025</span><h4>一次专项行动，重点清理了什么</h4></div>
			<div class="action-bars">
				{#each actionMetrics as item, index}
					<div class="action-row" style={`--fill:${item.percent}%; --bar-delay:${index * 110}ms`}>
						<div><b>{item.label}</b><strong>{item.value}</strong></div>
						<div class="action-rail"><i></i></div>
					</div>
				{/each}
			</div>
			<p class="chart-note">横条按公开数量线性绘制；三项均为十个行动波次累计值。</p>
		</div>

		<div class="trend-plot" aria-label="2026年北京夜间治安相关警情变化">
			<div class="subhead vertical"><span>同期公开结果 / 2026</span><h4>警情变化，用同一条百分比刻度呈现</h4></div>
			<div class="trend-axis"><span>0%</span><span>-10%</span><span>-20%</span><span>-30%</span></div>
			<div class="trend-bars">
				{#each outcomes as item, index}
					<div class="trend-row" style={`--fill:${(item.magnitude / 35) * 100}%; --bar-delay:${index * 110}ms`}>
						<div><b>{item.label}</b><span>{item.detail}</span></div>
						<div class="trend-rail"><i></i></div>
						<strong>{item.value}</strong>
					</div>
				{/each}
			</div>
			<p class="chart-note">{caseNote}</p>
		</div>
	</section>

	<div class="service-strip" aria-label="什刹海夜间安全服务结果">
		{#each serviceResults as item}
			<div><strong>{item.value}<small>{item.unit}</small></strong><span>{item.label}</span></div>
		{/each}
	</div>
	{/if}

	{#if takeaway}<p class="takeaway">{takeaway}</p>{/if}
	<details class="source-details">
		<summary>数据说明与来源 <span>{sources.length} 项</span></summary>
		<footer>
			{#if sources.length}
				<p>来源：{#each sources as item, index}{#if index > 0}<span> · </span>{/if}<a href={item.url} target="_blank" rel="noreferrer">{item.label}</a>{/each}</p>
			{/if}
			{#if note}<p>{note}</p>{/if}
		</footer>
	</details>
	</div>
</section>

<style>
	@property --risk { syntax:"<percentage>"; inherits:true; initial-value:0%; }
	.night-security {
		position: relative;
		z-index: 3;
		width: min(100%, 980px);
		margin: 0 auto;
		color: var(--panel-text);
	}
	.security-intro-card,.security-data-card {
		padding: clamp(1.25rem,2.7vw,2rem);
		border: 2px solid var(--panel-border);
		border-radius: var(--radius);
		background:
			radial-gradient(circle at 92% 5%,color-mix(in srgb,var(--panel-accent) 17%,transparent),transparent 27%),
			var(--panel-bg);
		box-shadow: 7px 7px 0 color-mix(in srgb,var(--panel-accent-2) 28%,transparent);
	}
	.security-data-card {
		margin-top: 1rem;
		background:
			radial-gradient(circle at 8% 0%,color-mix(in srgb,var(--panel-accent-2) 15%,transparent),transparent 30%),
			var(--panel-bg);
		box-shadow: 7px 7px 0 color-mix(in srgb,var(--panel-accent) 22%,transparent);
	}
	p,h3,h4,ol,figure { margin: 0; }
	a { color: inherit; text-underline-offset: .16em; }
	.eyebrow { font-size: .74rem; font-weight: 950; letter-spacing: .13em; text-transform: uppercase; color: var(--panel-accent); }
	h3 { max-width: 820px; margin-top: .42rem; font-family: var(--font-display); font-size: clamp(1.7rem,3vw,2.55rem); line-height: 1.12; text-wrap: balance; }
	.lead { max-width: 800px; margin-top: .78rem; font-size: 1rem; font-weight: 610; line-height: 1.68; opacity: .9; text-wrap: pretty; }

	.subhead { display: flex; align-items: baseline; gap: .7rem; }
	.subhead.vertical { display: grid; gap: .3rem; }
	.subhead>span { flex: 0 0 auto; font-size: .72rem; font-weight: 950; letter-spacing: .09em; text-transform: uppercase; color: var(--panel-accent); }
	.subhead h4 { font-family: var(--font-display); font-size: 1.05rem; line-height: 1.28; }

	.network-plot { margin-top: 1.35rem; padding: 1rem 0 .82rem; border-block: 1px solid color-mix(in srgb,var(--panel-border) 40%,transparent); }
	.network-bars { display: grid; gap: .8rem; margin-top: .95rem; }
	.network-row { display: grid; grid-template-columns: minmax(10.5rem,13rem) minmax(0,1fr) 5.2rem; gap: .85rem; align-items: center; }
	.metric-label b,.metric-label span { display: block; }
	.metric-label b { font-size: .84rem; }
	.metric-label span { margin-top: .18rem; font-size: .72rem; opacity: .65; }
	.bar-rail { position: relative; height: 1.05rem; overflow: hidden; border-radius: 999px; background: color-mix(in srgb,var(--panel-text) 10%,transparent); }
	.bar-rail::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(90deg,transparent 0 calc(20% - 1px),color-mix(in srgb,var(--panel-text) 18%,transparent) calc(20% - 1px) 20%); }
	.bar-rail i { position: relative; z-index: 1; display: block; width: var(--fill); height: 100%; border-radius: inherit; background: linear-gradient(90deg,var(--panel-accent),var(--panel-accent-2)); transform:scaleX(0); transform-origin:left center; transition:transform 900ms cubic-bezier(.22,1,.36,1) var(--bar-delay); }
	.visible .bar-rail i { transform:scaleX(1); }
	.network-row>strong { justify-self:end; min-width:5.2rem; font-family: var(--font-accent); font-size: 1.55rem; font-variant-numeric:tabular-nums; line-height: 1; text-align: right; }
	.network-row small,.service-strip small,.route-plot small,.scene-context small { margin-left: .2em; font-family: var(--font-body); font-size: .42em; font-weight: 850; }
	.network-axis { display: grid; grid-template-columns: 13rem minmax(0,1fr) 5.2rem; gap: .85rem; margin-top: .36rem; font-size: .66rem; opacity: .55; }
	.network-axis span:nth-child(2) { text-align: center; }
	.network-axis span:last-child { text-align: right; }

	.night-scene { margin-top: 1.1rem; overflow: hidden; border: 1.5px solid color-mix(in srgb,var(--panel-border) 58%,transparent); border-radius: 16px; background: color-mix(in srgb,var(--panel-bg) 82%,black 18%); }
	.photo-wrap { position: relative; aspect-ratio: 16 / 8.6; overflow: hidden; background: color-mix(in srgb,var(--panel-bg) 80%,black 20%); }
	.photo-wrap::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg,rgba(8,8,18,.78) 0%,rgba(8,8,18,.18) 48%,transparent 76%),linear-gradient(to top,rgba(8,8,18,.52),transparent 42%); pointer-events: none; }
	.photo-wrap img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center 52%; }
	.time-overlay { position: absolute; z-index: 2; left: clamp(1rem,3vw,1.65rem); top: 50%; width: min(42%,20rem); color: #fffafc; transform: translateY(-50%); text-shadow: 0 2px 12px rgba(0,0,0,.5); }
	.time-overlay>span { font-size: .76rem; font-weight: 950; letter-spacing: .12em; color: #ffd27f; }
	.time-overlay>div { display: flex; align-items: center; gap: .6rem; margin-top: .4rem; }
	.time-overlay strong { font-family: var(--font-accent); font-size: clamp(1.75rem,3.4vw,2.55rem); }
	.time-overlay i { position: relative; flex: 1; border-top: 2px solid #ffd27f; }
	.time-overlay i::after { content: ""; position: absolute; right: 0; top: -4px; width: 6px; height: 6px; border-top: 2px solid #ffd27f; border-right: 2px solid #ffd27f; transform: rotate(45deg); }
	.time-overlay>b { display: block; margin-top: .25rem; font-size: .78rem; }
	.night-scene figcaption { display: grid; grid-template-columns: 1.12fr .88fr; align-items: stretch; }
	.caption-copy { padding: .82rem .92rem; }
	.caption-copy span,.caption-copy small { display: block; }
	.caption-copy span { font-size: .76rem; font-weight: 720; line-height: 1.5; }
	.caption-copy small { margin-top: .3rem; font-size: .68rem; opacity: .66; }
	.scene-context { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); border-left: 1px solid color-mix(in srgb,var(--panel-border) 30%,transparent); }
	.scene-context>div { min-width: 0; padding: .8rem .65rem; }
	.scene-context>div+div { border-left: 1px solid color-mix(in srgb,var(--panel-border) 24%,transparent); }
	.scene-context strong,.scene-context span { display: block; }
	.scene-context strong { font-family: var(--font-accent); font-size: 1.22rem; }
	.scene-context span { margin-top: .22rem; font-size: .7rem; font-weight: 800; opacity: .7; }

	.story-tabs { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: .45rem; padding: .35rem; border: 1px solid color-mix(in srgb,var(--panel-border) 32%,transparent); border-radius: 14px; background: color-mix(in srgb,var(--panel-bg) 80%,black 20%); }
	.story-tabs button { display: grid; grid-template-columns: 2rem minmax(0,1fr); gap: .12rem .55rem; align-items: center; min-width: 0; padding: .7rem .76rem; border: 1px solid transparent; border-radius: 10px; background: transparent; color: var(--panel-text); font: inherit; text-align: left; cursor: pointer; transition: background .2s ease,border-color .2s ease,transform .2s ease; }
	.story-tabs button:hover,.story-tabs button:focus-visible { border-color: color-mix(in srgb,var(--panel-accent) 55%,transparent); background: color-mix(in srgb,var(--panel-bg) 74%,var(--panel-accent) 26%); outline: none; }
	.story-tabs button.active { border-color: color-mix(in srgb,var(--panel-accent) 70%,transparent); background: linear-gradient(120deg,color-mix(in srgb,var(--panel-bg) 70%,var(--panel-accent) 30%),color-mix(in srgb,var(--panel-bg) 76%,var(--panel-accent-2) 24%)); transform: translateY(-1px); }
	.story-tabs span { grid-row: span 2; display: grid; place-items: center; width: 1.8rem; height: 1.8rem; border-radius: 50%; background: color-mix(in srgb,var(--panel-text) 10%,transparent); font-family: var(--font-accent); font-size: .62rem; }
	.story-tabs .active span { background: var(--panel-accent); }
	.story-tabs b,.story-tabs small { display: block; min-width: 0; }
	.story-tabs b { font-size: .82rem; }
	.story-tabs small { overflow: hidden; font-size: .68rem; line-height: 1.35; text-overflow: ellipsis; white-space: nowrap; opacity: .62; }

	.risk-section { display: grid; grid-template-columns: .72fr 1.28fr; gap: 1.2rem; margin-top: 1.25rem; padding-block: 1.15rem; border-block: 1px solid color-mix(in srgb,var(--panel-border) 36%,transparent); }
	.risk-chart { padding-right: 1.1rem; border-right: 1px solid color-mix(in srgb,var(--panel-border) 30%,transparent); }
	.donut-wrap { display: flex; align-items: center; gap: 1.1rem; margin-top: 1rem; }
	.donut { --risk:0%; display: grid; place-items: center; width: 9.3rem; aspect-ratio: 1; flex: 0 0 auto; border-radius: 50%; background: conic-gradient(var(--panel-accent) 0 var(--risk),color-mix(in srgb,var(--panel-accent-2) 52%,transparent) var(--risk) 100%); box-shadow: inset 0 0 0 1px color-mix(in srgb,var(--panel-border) 30%,transparent); transition:--risk 1050ms cubic-bezier(.22,1,.36,1) 180ms,transform 700ms cubic-bezier(.22,1,.36,1) 180ms; transform:scale(.9); }
	.visible .donut { --risk:70%; transform:none; }
	.donut>div { display: grid; place-items: center; width: 70%; aspect-ratio: 1; border-radius: 50%; background: var(--panel-bg); text-align: center; }
	.donut strong,.donut span { display: block; }
	.donut strong { font-family: var(--font-accent); font-size: 2rem; line-height: 1; }
	.donut span { margin-top: .35rem; font-size: .68rem; font-weight: 800; line-height: 1.35; opacity: .72; }
	.cadence { padding-left: 1rem; border-left: 3px solid var(--panel-accent-2); }
	.cadence strong,.cadence span { display: block; }
	.cadence strong { font-family: var(--font-accent); font-size: 2rem; line-height: 1; }
	.cadence span { margin-top: .35rem; font-size: .72rem; font-weight: 780; line-height: 1.4; }
	.risk-chart>p { margin-top: 1rem; font-size: .78rem; line-height: 1.58; opacity: .76; }
	.zone-plot ol { padding: 0; margin-top: .8rem; list-style: none; }
	.zone-plot li { border-left: calc(7px - var(--zone)*1px) solid color-mix(in srgb,var(--panel-accent) calc(84% - var(--zone)*19%),var(--panel-accent-2)); }
	.zone-plot li+li { border-top: 1px solid color-mix(in srgb,var(--panel-border) 24%,transparent); }
	.zone-row { display: grid; grid-template-columns: 3.5rem minmax(0,1fr); gap: .35rem .75rem; width: 100%; padding: .72rem 0 .72rem .72rem; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; cursor: default; }
	.zone-level { grid-row: span 2; }
	.zone-level i,.zone-level strong { display: block; }
	.zone-level i { font-family: var(--font-accent); font-size: .68rem; font-style: normal; opacity: .5; }
	.zone-level strong { margin-top: .24rem; font-size: .82rem; }
	.zone-copy b,.zone-copy span { display: block; }
	.zone-copy b { font-size: .8rem; line-height: 1.4; }
	.zone-copy span { margin-top: .2rem; font-size: .7rem; line-height: 1.4; opacity: .63; }
	.zone-row>p { font-size: .73rem; font-weight: 780; line-height: 1.4; color: var(--panel-accent); }
	.hover-hint { display: block; margin-top: .35rem; font-size: .66rem; opacity: .58; }

	.response-line { margin-top: .15rem; padding: 1rem 0; border-bottom: 1px solid color-mix(in srgb,var(--panel-border) 34%,transparent); }
	.response-line ol { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 1.8rem; padding: 0; margin-top: .9rem; list-style: none; }
	.response-line li { position: relative; display: grid; grid-template-columns: 2rem minmax(0,1fr); gap: .58rem; align-items: center; min-width: 0; }
	.response-line li:not(:last-child)::after { content: ""; position: absolute; left: calc(100% + .35rem); top: 50%; width: 1.1rem; border-top: 2px dashed var(--panel-accent-2); }
	.response-line li>span { display: grid; place-items: center; width: 1.9rem; height: 1.9rem; border: 2px solid var(--panel-border); border-radius: 50%; background: var(--panel-accent); color: var(--panel-text); font-family: var(--font-accent); font-size: .62rem; }
	.response-line strong { display: block; font-size: .8rem; }
	.response-line p { margin-top: .2rem; font-size: .7rem; line-height: 1.45; opacity: .68; }

	.route-plot { margin-top: 1.25rem; padding: 1rem 0 1.15rem; border-bottom: 1px solid color-mix(in srgb,var(--panel-border) 36%,transparent); }
	.route-intro { max-width: 760px; margin-top: .52rem; font-size: .8rem; line-height: 1.55; opacity: .76; }
	.route-plot ol { position: relative; display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); padding: 0; margin-top: 1.25rem; list-style: none; }
	.route-plot ol::before { content: ""; position: absolute; left: 3%; right: 3%; top: .48rem; border-top: 3px solid color-mix(in srgb,var(--panel-accent-2) 60%,var(--panel-accent)); }
	.route-plot li { position: relative; z-index: 1; display: grid; justify-items: center; text-align: center; min-width: 0; }
	.route-plot li i { width: 1rem; height: 1rem; border: 3px solid var(--panel-accent); border-radius: 50%; background: var(--panel-bg); box-shadow: 0 0 0 4px color-mix(in srgb,var(--panel-bg) 82%,transparent); }
	.route-plot li strong { margin-top: .5rem; font-family: var(--font-accent); font-size: 1.4rem; line-height: 1; }
	.route-plot li span { margin-top: .28rem; font-size: .7rem; line-height: 1.35; opacity: .72; }
	.weekend-note { width: fit-content; margin: 1rem auto 0; padding: .5rem .8rem; border-left: 4px solid var(--panel-accent-2); background: color-mix(in srgb,var(--panel-bg) 78%,var(--panel-accent-2) 22%); font-size: .76rem; font-weight: 760; line-height: 1.45; }

	.analysis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 1.25rem; background: linear-gradient(120deg,color-mix(in srgb,var(--panel-bg) 86%,var(--panel-accent) 14%),color-mix(in srgb,var(--panel-bg) 86%,var(--panel-accent-2) 14%)); }
	.action-plot,.trend-plot { padding: 1.1rem; }
	.trend-plot { border-left: 1px solid color-mix(in srgb,var(--panel-border) 32%,transparent); }
	.action-bars,.trend-bars { display: grid; gap: .9rem; margin-top: 1rem; }
	.action-row>div:first-child { display: flex; justify-content: space-between; gap: .6rem; align-items: baseline; }
	.action-row b { font-size: .76rem; }
	.action-row strong { font-family: var(--font-accent); font-size: 1.05rem; }
	.action-rail { height: .72rem; margin-top: .34rem; overflow: hidden; border-radius: 999px; background: color-mix(in srgb,var(--panel-text) 10%,transparent); }
	.action-rail i { display: block; width: var(--fill); min-width: 3px; height: 100%; border-radius: inherit; background: linear-gradient(90deg,var(--panel-accent),var(--panel-accent-2)); transform-origin:left center; animation:bar-grow 850ms cubic-bezier(.22,1,.36,1) var(--bar-delay) both; }
	.trend-axis { display: grid; grid-template-columns: repeat(4,1fr); margin-top: 1rem; padding-bottom: .28rem; border-bottom: 1px solid color-mix(in srgb,var(--panel-border) 28%,transparent); font-size: .64rem; opacity: .56; }
	.trend-axis span:not(:first-child) { text-align: right; }
	.trend-row { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: .25rem .7rem; align-items: end; }
	.trend-row>div:first-child b,.trend-row>div:first-child span { display: block; }
	.trend-row>div:first-child b { font-size: .76rem; line-height: 1.4; }
	.trend-row>div:first-child span { margin-top: .18rem; font-size: .68rem; opacity: .64; }
	.trend-row>strong { grid-row: span 2; min-width:4.2rem; font-family: var(--font-accent); font-size: 1.18rem; font-variant-numeric:tabular-nums; text-align:right; }
	.trend-rail { grid-column: 1 / -1; height: .72rem; overflow: hidden; border-radius: 999px; background: repeating-linear-gradient(90deg,color-mix(in srgb,var(--panel-text) 9%,transparent) 0 calc(28.57% - 1px),color-mix(in srgb,var(--panel-text) 18%,transparent) calc(28.57% - 1px) 28.57%); }
	.trend-rail i { display: block; width: var(--fill); height: 100%; border-radius: inherit; background: linear-gradient(90deg,var(--panel-accent-2),var(--panel-accent)); transform-origin:left center; animation:bar-grow 850ms cubic-bezier(.22,1,.36,1) var(--bar-delay) both; }
	@keyframes bar-grow { from { transform:scaleX(0); opacity:.35; } to { transform:scaleX(1); opacity:1; } }
	.chart-note { margin-top: .9rem; padding-top: .7rem; border-top: 1px dashed color-mix(in srgb,var(--panel-border) 32%,transparent); font-size: .68rem; line-height: 1.5; opacity: .68; }

	.service-strip { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); margin-top: 1rem; border-block: 1px solid color-mix(in srgb,var(--panel-border) 36%,transparent); }
	.service-strip>div { display: grid; grid-template-columns: auto minmax(0,1fr); gap: .65rem; align-items: center; min-width: 0; padding: .82rem .9rem; }
	.service-strip>div+div { border-left: 1px solid color-mix(in srgb,var(--panel-border) 28%,transparent); }
	.service-strip strong { font-family: var(--font-accent); font-size: 1.7rem; line-height: 1; }
	.service-strip span { font-size: .72rem; font-weight: 760; line-height: 1.35; }
	.takeaway { margin-top: 1.05rem; padding: .88rem 1rem; border-left: 4px solid var(--panel-accent); background: color-mix(in srgb,var(--panel-bg) 76%,var(--panel-accent) 24%); font-size: .9rem; font-weight: 730; line-height: 1.62; }
	.source-details { margin-top: .8rem; border-top: 1px solid color-mix(in srgb,var(--panel-border) 34%,transparent); }
	.source-details summary { display: flex; justify-content: space-between; gap: 1rem; padding: .72rem 0; color: var(--panel-text); font-size: .74rem; font-weight: 800; cursor: pointer; list-style: none; }
	.source-details summary::-webkit-details-marker { display: none; }
	.source-details summary::after { content: "+"; margin-left: auto; font-family: var(--font-accent); color: var(--panel-accent); }
	.source-details[open] summary::after { content: "−"; }
	.source-details summary span { font-weight: 650; opacity: .58; }
	footer { display: grid; gap: .3rem; padding-bottom: .25rem; font-size: .72rem; line-height: 1.55; opacity: .7; }

	@media(hover:hover) and (min-width:721px) {
		.zone-row { transition: background .2s ease; }
		.zone-row:hover,.zone-row:focus-visible { background: color-mix(in srgb,var(--panel-bg) 76%,var(--panel-accent-2) 24%); outline: none; }
		.zone-copy span,.zone-row>p { overflow: hidden; max-height: 0; margin-top: 0; opacity: 0; transition: max-height .22s ease,margin .22s ease,opacity .22s ease; }
		.zone-row:hover .zone-copy span,.zone-row:focus-visible .zone-copy span,.zone-row:hover>p,.zone-row:focus-visible>p { max-height: 3.2rem; margin-top: .22rem; opacity: .72; }
		.zone-row:hover>p,.zone-row:focus-visible>p { opacity: 1; }
	}

	@media(max-width:720px) {
		.security-intro-card,.security-data-card { padding: 1.05rem; }
		.eyebrow { font-size: .72rem; }
		h3 { font-size: 1.75rem; }
		.lead { font-size: .94rem; }
		.subhead { align-items: flex-start; flex-direction: column; gap: .25rem; }
		.subhead h4 { font-size: 1rem; }
		.network-row { grid-template-columns: minmax(0,1fr) auto; gap: .45rem .7rem; }
		.metric-label b { font-size: .8rem; }
		.metric-label span { font-size: .75rem; }
		.bar-rail { grid-column: 1 / -1; grid-row: 2; }
		.network-row>strong { grid-column: 2; grid-row: 1; font-size: 1.45rem; }
		.network-axis { grid-template-columns: repeat(3,1fr); }
		.photo-wrap { aspect-ratio: 16 / 10.5; }
		.photo-wrap::after { background: linear-gradient(90deg,rgba(8,8,18,.68),rgba(8,8,18,.06) 78%),linear-gradient(to top,rgba(8,8,18,.52),transparent 48%); }
		.photo-wrap img { object-position: 56% center; }
		.time-overlay { left: .8rem; top: auto; bottom: .8rem; width: 62%; transform: none; }
		.time-overlay>span,.time-overlay>b { font-size: .72rem; }
		.night-scene figcaption { grid-template-columns: 1fr; }
		.caption-copy span { font-size: .78rem; }
		.scene-context { border-left: 0; border-top: 1px solid color-mix(in srgb,var(--panel-border) 28%,transparent); }
		.scene-context span { font-size: .74rem; }
		.story-tabs { gap: .25rem; padding: .28rem; }
		.story-tabs button { grid-template-columns: 1.65rem minmax(0,1fr); gap: .08rem .36rem; padding: .58rem .45rem; }
		.story-tabs span { width: 1.55rem; height: 1.55rem; }
		.story-tabs b { font-size: .76rem; }
		.story-tabs small { display: none; }
		.risk-section { grid-template-columns: 1fr; gap: 1.2rem; }
		.risk-chart { padding-right: 0; padding-bottom: 1.1rem; border-right: 0; border-bottom: 1px solid color-mix(in srgb,var(--panel-border) 30%,transparent); }
		.donut-wrap { justify-content: center; }
		.donut { width: min(9.5rem,50vw); }
		.zone-row { grid-template-columns: 3.2rem minmax(0,1fr); }
		.zone-copy b { font-size: .78rem; }
		.zone-copy span,.zone-row>p { font-size: .76rem; }
		.hover-hint { display: none; }
		.response-line ol { grid-template-columns: 1fr; gap: .8rem; }
		.response-line li:not(:last-child)::after { left: .9rem; top: 2rem; bottom: -.75rem; width: 0; border-top: 0; border-left: 2px dashed var(--panel-accent-2); }
		.response-line strong { font-size: .78rem; }
		.response-line p { font-size: .76rem; }
		.route-plot ol { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem 0; }
		.route-plot ol::before { left: 25%; right: 25%; top: .48rem; bottom: .48rem; border-top: 0; border-left: 3px solid color-mix(in srgb,var(--panel-accent-2) 60%,var(--panel-accent)); }
		.route-plot li { min-height: 4.8rem; }
		.route-plot li span { font-size: .76rem; }
		.weekend-note { font-size: .76rem; }
		.analysis-grid { grid-template-columns: 1fr; }
		.action-plot,.trend-plot { padding: 1rem .85rem; }
		.trend-plot { border-left: 0; border-top: 1px solid color-mix(in srgb,var(--panel-border) 32%,transparent); }
		.action-row b,.trend-row>div:first-child b { font-size: .75rem; }
		.action-row strong,.trend-row>strong { font-size: 1.1rem; }
		.chart-note { font-size: .74rem; }
		.service-strip { grid-template-columns: 1fr; }
		.service-strip>div+div { border-left: 0; border-top: 1px solid color-mix(in srgb,var(--panel-border) 28%,transparent); }
		.service-strip span { font-size: .76rem; }
		.takeaway { font-size: .86rem; }
		.source-details summary,footer { font-size: .74rem; }
	}
	@media(prefers-reduced-motion:reduce){
		.bar-rail i,.action-rail i,.trend-rail i{transform:none;animation:none;transition:none}.donut{--risk:70%;transform:none;transition:none}
	}
</style>
