<script>
	import { getContext, onMount } from "svelte";

	let {
		nodeId,
		eyebrow = "北京夜生活供给图谱",
		title = "",
		lead = "",
		total = 0,
		overview = [],
		tiers = [],
		tierFilters = {},
		catalogue = [],
		featuredNames = [],
		map = null,
		source = "",
		sourceUrl = "",
		note = ""
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	const tierNames = { landmark: "特色消费地标", checkin: "夜间消费打卡地", life: "品质消费生活圈" };
	const subtypeDescriptions = {
		夜游: "城市景观、滨水空间与夜间游览",
		夜食: "餐饮、夜市与深夜消费",
		夜购: "商业街区、零售与主题活动",
		夜动: "演出、体育与夜间娱乐",
		餐饮美食: "突出夜间餐饮与特色风味",
		旅游景区: "景区、公园与夜间游览活动",
		融合消费: "购物、文化、娱乐等多业态叠加",
		"特色园区/街区": "园区更新、街区漫步与复合体验",
		主题市集: "夜市、文创与阶段性主题活动",
		品质生活圈: "社区周边的便民、文化与休闲服务"
	};
	let visible = $state(false);
	let activeTier = $state("all");
	let activeSubtype = $state("all");
	let activePoint = $state(null);
	let mapScale = $state(1.12);
	let panX = $state(0);
	let panY = $state(0);
	let dragging = $state(false);
	let dragOrigin = { x: 0, y: 0, panX: 0, panY: 0 };
	let el;

	const subtypeOptions = $derived(activeTier === "all" ? [] : (tierFilters?.[activeTier] ?? []));
	const filteredPoints = $derived(catalogue.filter((point) => {
		if (activeTier !== "all" && point.tier !== activeTier) return false;
		if (activeSubtype !== "all" && !(point.tags ?? [point.subtype]).includes(activeSubtype) && point.subtype !== activeSubtype) return false;
		return true;
	}));
	const filteredIds = $derived(new Set(filteredPoints.map((point) => point.id)));

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
		}, { threshold: 0.16 });
		observer.observe(el);
		return () => observer.disconnect();
	});

	function setTier(key) {
		activeTier = key;
		activeSubtype = "all";
		activePoint = null;
	}

	function setSubtype(value) {
		activeSubtype = value;
		activePoint = null;
	}

	function pointStyle(point, index) {
		const zoom = map?.zoom ?? 8;
		const columns = map?.columns ?? [209, 210, 211];
		const rows = map?.rows ?? [96, 97];
		const scale = 2 ** zoom;
		const lon = Number(point.lon);
		const lat = Math.max(-85.0511, Math.min(85.0511, Number(point.lat)));
		const worldX = ((lon + 180) / 360) * scale;
		const latRad = lat * Math.PI / 180;
		const worldY = (1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2 * scale;
		const x = Math.max(1, Math.min(99, ((worldX - columns[0]) / columns.length) * 100));
		const y = Math.max(1, Math.min(99, ((worldY - rows[0]) / rows.length) * 100));
		return `--x:${x}%;--y:${y}%;--point-delay:${Math.min(index, 48) * 18}ms;`;
	}

	function pointDescription(point) {
		return subtypeDescriptions[point?.subtype] ?? subtypeDescriptions[point?.tags?.[0]] ?? "官方夜间消费点位";
	}

	function precisionText(point) {
		if (point?.accuracy === "poi") return "可核验场所坐标";
		if (point?.accuracy === "area") return "街区 / 生活圈中心";
		return "城区层级位置";
	}

	function zoomBy(step) {
		mapScale = Math.max(1.12, Math.min(2.35, Number((mapScale + step).toFixed(2))));
		if (mapScale === 1.12) {
			panX = 0;
			panY = 0;
		}
	}

	function resetMap() {
		mapScale = 1.12;
		panX = 0;
		panY = 0;
	}

	function beginPan(event) {
		if (event.button !== 0 || event.target.closest("button, a")) return;
		dragging = true;
		dragOrigin = { x: event.clientX, y: event.clientY, panX, panY };
		event.currentTarget.setPointerCapture?.(event.pointerId);
	}

	function movePan(event) {
		if (!dragging) return;
		panX = Math.max(-260, Math.min(260, dragOrigin.panX + event.clientX - dragOrigin.x));
		panY = Math.max(-190, Math.min(190, dragOrigin.panY + event.clientY - dragOrigin.y));
	}

	function endPan(event) {
		dragging = false;
		event.currentTarget.releasePointerCapture?.(event.pointerId);
	}

	function wheelZoom(event) {
		event.preventDefault();
		zoomBy(event.deltaY < 0 ? 0.14 : -0.14);
	}
</script>

<section id={nodeId} class="hotspot-map" class:visible bind:this={el}>
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h3>{title}</h3>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</header>

	<div class="supply-summary" aria-label={`北京共有 ${total} 个夜间消费点位`}>
		<div class="total-cell"><strong>{total}</strong><span>个夜间消费点位</span><small>覆盖 16 区与经开区</small></div>
		{#each overview as item, index}
			<div class="summary-cell" style={`--summary-delay:${index * 90}ms`}>
				<div><strong>{item.value}</strong><span>个</span></div>
				<b>{item.label}</b><small>{item.detail}</small>
			</div>
		{/each}
	</div>

	<div class="point-controls">
		<div class="tier-tabs" role="tablist" aria-label="点位层级筛选">
			{#each tiers as tier}
				<button type="button" class:active={activeTier === tier.key} role="tab" aria-selected={activeTier === tier.key} onclick={() => setTier(tier.key)}>
					<i class={`tier-${tier.key}`}></i><span>{tier.label}</span><b>{tier.count}</b>
				</button>
			{/each}
		</div>
		{#if subtypeOptions.length}
			<div class="subtype-tabs" aria-label="业态分类筛选">
				<button type="button" class:active={activeSubtype === "all"} onclick={() => setSubtype("all")}>全部业态</button>
				{#each subtypeOptions as subtype}<button type="button" class:active={activeSubtype === subtype} onclick={() => setSubtype(subtype)}>{subtype}</button>{/each}
			</div>
		{/if}
	</div>

	<div
		class="map-stage"
		class:dragging
		role="group"
		aria-label={`${title}。共展示 ${catalogue.length} 个官方点位，底图与点位使用同一地图投影；支持缩放与拖动平移`}
		onpointerdown={beginPan}
		onpointermove={movePan}
		onpointerup={endPan}
		onpointercancel={endPan}
		onwheel={wheelZoom}
	>
		<div class="geo-layer" style={`--geo-scale:${mapScale};--pan-x:${panX}px;--pan-y:${panY}px`}>
			<div class="tiles" aria-hidden="true">
				{#each map?.rows ?? [] as row}
					{#each map?.columns ?? [] as column}
						<img src={`https://tile.openstreetmap.org/${map.zoom}/${column}/${row}.png`} alt="" loading="eager" />
					{/each}
				{/each}
			</div>
			<div class="map-shade" aria-hidden="true"></div>

			{#each catalogue as point, index}
				<button
					type="button"
					class={`point-dot tier-${point.tier} accuracy-${point.accuracy}`}
					class:featured={featuredNames.includes(point.name)}
					class:dimmed={!filteredIds.has(point.id)}
					class:selected={activePoint?.id === point.id}
					style={pointStyle(point, index)}
					tabindex={filteredIds.has(point.id) ? 0 : -1}
					aria-label={`${point.name}，${point.district}，${tierNames[point.tier]}，${precisionText(point)}，${(point.tags ?? [point.subtype]).join("、")}`}
					onmouseenter={() => activePoint = point}
					onfocus={() => activePoint = point}
					onclick={() => activePoint = point}
				></button>
			{/each}
		</div>
		<div class="map-count"><strong>{filteredPoints.length}</strong><span>当前显示</span></div>
		<div class="interaction-hint"><strong>点位可筛选与缩放</strong><span>点圆点查看 · 滚轮缩放 · 拖动平移</span></div>
		<div class="zoom-controls" aria-label="地图缩放控制">
			<button type="button" aria-label="缩小地图" onclick={() => zoomBy(-0.2)}>−</button>
			<button type="button" class="zoom-reset" aria-label="恢复地图全貌" onclick={resetMap}>{Math.round(mapScale / 1.12 * 100)}%</button>
			<button type="button" aria-label="放大地图" onclick={() => zoomBy(0.2)}>+</button>
		</div>

		<div class="point-detail" class:has-point={Boolean(activePoint)} aria-live="polite">
			{#if activePoint}
				<div class="detail-head"><span>{activePoint.district} · {tierNames[activePoint.tier]} · {precisionText(activePoint)}</span><strong>{activePoint.name}</strong></div>
				<div class="detail-tags">{#each activePoint.tags ?? [activePoint.subtype] as tag}<i>{tag}</i>{/each}</div>
				<p>{pointDescription(activePoint)}</p>
			{:else}
				<div class="detail-head"><span>全量点位已载入</span><strong>悬停或点击一个圆点</strong></div>
				<p>查看名称、城区、点位层级与夜间业态；上方可切换 22 个地标、73 个打卡地和 34 个生活圈。</p>
			{/if}
		</div>

		<a class="attribution" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© {map?.attribution ?? "OpenStreetMap contributors"}</a>
	</div>

	<div class="map-note"><span><i class="tier-landmark"></i>特色地标</span><span><i class="tier-checkin"></i>打卡地</span><span><i class="tier-life"></i>生活圈</span><span><i class="accuracy-area"></i>范围中心</span><span><i class="accuracy-district"></i>城区层级</span><b>底图与点位共用 Web Mercator 投影</b></div>

	<footer>
		{#if source}<p>数据来源：{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{source}</a>{:else}{source}{/if}</p>{/if}
		{#if note}<p>{note}</p>{/if}
	</footer>
</section>

<style>
	.hotspot-map { --tier-landmark:#f4d35e; --tier-checkin:#52c7d9; --tier-life:#a78bfa; position:relative; z-index:3; width:min(100%,930px); margin:0 auto; padding:clamp(1.3rem,3vw,2rem); border:2px solid var(--panel-border); border-radius:var(--radius); background:var(--panel-bg); box-shadow:7px 7px 0 color-mix(in srgb,var(--panel-border) 32%,transparent); color:var(--panel-text); }
	p,h3 { margin:0; }
	.eyebrow { font-size:.72rem; font-weight:900; letter-spacing:.12em; text-transform:uppercase; opacity:.66; }
	h3 { max-width:760px; margin-top:.35rem; font-family:var(--font-display); font-size:clamp(1.55rem,3vw,2.25rem); line-height:1.12; text-wrap:balance; }
	.lead { max-width:750px; margin-top:.7rem; font-size:.96rem; line-height:1.58; text-wrap:pretty; opacity:.82; }

	.supply-summary { display:grid; grid-template-columns:1.15fr repeat(3,1fr); margin-top:1.25rem; border-block:1.5px solid color-mix(in srgb,var(--panel-border) 52%,transparent); }
	.supply-summary>div { min-width:0; padding:.82rem .75rem; }
	.supply-summary>div+div { border-left:1px solid color-mix(in srgb,var(--panel-border) 34%,transparent); }
	.total-cell strong { display:block; font-family:var(--font-accent); font-size:clamp(2rem,4vw,3.2rem); line-height:.9; color:var(--panel-accent); }
	.total-cell span,.summary-cell b { display:block; margin-top:.35rem; font-size:.72rem; font-weight:900; }
	.total-cell small,.summary-cell small { display:block; margin-top:.18rem; font-size:.58rem; line-height:1.35; opacity:.62; }
	.summary-cell { opacity:0; transform:translateY(.45rem); transition:opacity 460ms ease var(--summary-delay),transform 560ms cubic-bezier(.22,1,.36,1) var(--summary-delay); }
	.visible .summary-cell { opacity:1; transform:none; }
	.summary-cell>div { display:flex; align-items:baseline; gap:.18rem; }
	.summary-cell strong { font-family:var(--font-accent); font-size:clamp(1.35rem,3vw,2rem); line-height:1; }
	.summary-cell>div span { font-size:.6rem; font-weight:900; opacity:.7; }

	.point-controls { display:grid; gap:.45rem; margin-top:.82rem; }
	.tier-tabs,.subtype-tabs { display:flex; align-items:center; gap:.38rem; overflow-x:auto; scrollbar-width:none; }
	.tier-tabs::-webkit-scrollbar,.subtype-tabs::-webkit-scrollbar { display:none; }
	.tier-tabs button,.subtype-tabs button { flex:0 0 auto; border:1px solid color-mix(in srgb,var(--panel-border) 38%,transparent); border-radius:999px; background:color-mix(in srgb,var(--panel-bg) 86%,var(--panel-text) 14%); color:inherit; font:inherit; font-size:.61rem; font-weight:900; cursor:pointer; }
	.tier-tabs button { display:flex; align-items:center; gap:.3rem; padding:.32rem .48rem; }
	.subtype-tabs button { padding:.27rem .45rem; opacity:.72; }
	.tier-tabs button.active,.subtype-tabs button.active { border-color:var(--panel-border); background:var(--panel-accent); color:color-mix(in srgb,var(--panel-text) 88%,black 12%); opacity:1; box-shadow:2px 2px 0 color-mix(in srgb,var(--panel-border) 24%,transparent); }
	.tier-tabs i,.map-note i { display:block; width:.58rem; aspect-ratio:1; border:1px solid currentColor; border-radius:50%; }
	.tier-tabs b { font-family:var(--font-accent); font-size:.72rem; }
	.tier-landmark { background:var(--tier-landmark)!important; }
	.tier-checkin { background:var(--tier-checkin)!important; }
	.tier-life { background:var(--tier-life)!important; }
	.tier-all { background:linear-gradient(135deg,var(--tier-landmark) 0 33%,var(--tier-checkin) 33% 66%,var(--tier-life) 66%)!important; }

	.map-stage { position:relative; aspect-ratio:3/2; min-height:390px; margin-top:.7rem; overflow:hidden; border:1.5px solid color-mix(in srgb,var(--panel-border) 58%,transparent); border-radius:calc(var(--radius)*.82); background:color-mix(in srgb,var(--panel-bg) 82%,var(--panel-accent-2) 18%); cursor:grab; }
	.map-stage.dragging { cursor:grabbing; }
	.geo-layer { --base-pan:-70px; position:absolute; inset:0; transform:translate(calc(var(--base-pan) + var(--pan-x)),var(--pan-y)) scale(calc(var(--geo-scale) + .06)); transform-origin:center; transition:transform 900ms cubic-bezier(.22,1,.36,1); }
	.visible .geo-layer { transform:translate(calc(var(--base-pan) + var(--pan-x)),var(--pan-y)) scale(var(--geo-scale)); transition-duration:260ms; }
	.map-stage.dragging .geo-layer { transition:none; }
	.tiles { position:absolute; inset:0; display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:repeat(2,1fr); opacity:0; transition:opacity 620ms ease; }
	.visible .tiles { opacity:1; }
	.tiles img { width:100%; height:100%; object-fit:cover; filter:grayscale(.55) saturate(.48) contrast(.86) brightness(1.12); }
	.map-shade { position:absolute; inset:0; background:linear-gradient(145deg,color-mix(in srgb,var(--panel-bg) 38%,transparent),color-mix(in srgb,var(--panel-accent-2) 12%,transparent)); box-shadow:inset 0 0 74px color-mix(in srgb,var(--panel-bg) 38%,transparent); pointer-events:none; }
	.map-count { position:absolute; left:.65rem; top:.58rem; z-index:42; display:flex; align-items:baseline; gap:.32rem; padding:.34rem .48rem; border:1px solid color-mix(in srgb,var(--panel-border) 48%,transparent); border-radius:8px; background:color-mix(in srgb,var(--panel-bg) 90%,transparent); backdrop-filter:blur(6px); }
	.map-count strong { font-family:var(--font-accent); font-size:1.05rem; }
	.map-count span { font-size:.54rem; font-weight:900; opacity:.62; }
	.interaction-hint { position:absolute; right:.65rem; top:.58rem; z-index:42; display:grid; gap:.05rem; padding:.34rem .5rem; border:1px solid color-mix(in srgb,var(--panel-border) 48%,transparent); border-radius:8px; background:color-mix(in srgb,var(--panel-bg) 90%,transparent); box-shadow:0 0 0 0 color-mix(in srgb,var(--panel-accent) 42%,transparent); backdrop-filter:blur(6px); opacity:0; transform:translateY(-.28rem); }
	.visible .interaction-hint { opacity:1; transform:none; transition:opacity 420ms ease 820ms,transform 520ms cubic-bezier(.22,1,.36,1) 820ms; animation:hint-ring 1.1s ease 1.25s 2; }
	.interaction-hint strong { font-size:.57rem; }
	.interaction-hint span { font-size:.5rem; opacity:.62; }
	.zoom-controls { position:absolute; right:.65rem; top:3.15rem; z-index:48; display:flex; align-items:stretch; overflow:hidden; border:1px solid color-mix(in srgb,var(--panel-border) 52%,transparent); border-radius:8px; background:color-mix(in srgb,var(--panel-bg) 92%,transparent); box-shadow:2px 3px 0 color-mix(in srgb,var(--panel-border) 18%,transparent); backdrop-filter:blur(7px); }
	.zoom-controls button { min-width:1.8rem; height:1.7rem; padding:0 .38rem; border:0; background:transparent; color:inherit; font:900 .85rem/1 var(--font-display); cursor:pointer; }
	.zoom-controls button+button { border-left:1px solid color-mix(in srgb,var(--panel-border) 35%,transparent); }
	.zoom-controls button:hover,.zoom-controls button:focus-visible { background:var(--panel-accent); outline:none; }
	.zoom-controls .zoom-reset { min-width:2.75rem; font-family:var(--font-accent); font-size:.58rem; }
	@keyframes hint-ring { 50% { box-shadow:0 0 0 5px color-mix(in srgb,var(--panel-accent) 0%,transparent); } }
	.attribution { position:absolute; right:.3rem; bottom:.22rem; z-index:46; padding:.16rem .28rem; border-radius:3px; background:rgba(255,255,255,.86); color:#243047; font-size:.48rem; text-decoration:none; }

	.point-dot { position:absolute; left:var(--x); top:var(--y); z-index:20; width:.72rem; aspect-ratio:1; padding:0; border:1.5px solid var(--panel-border); border-radius:50%; box-shadow:1px 2px 0 color-mix(in srgb,var(--panel-border) 24%,transparent); opacity:0; transform:translate(-50%,-50%) scale(.35); transition:opacity 280ms ease var(--point-delay),transform 480ms cubic-bezier(.22,1,.36,1) var(--point-delay),filter 150ms ease; cursor:pointer; }
	.point-dot.tier-landmark { width:.94rem; z-index:24; }
	.point-dot.tier-life { width:.6rem; }
	.point-dot.accuracy-area::after { content:""; position:absolute; inset:-.28rem; border:1px dashed color-mix(in srgb,var(--panel-text) 78%,transparent); border-radius:50%; pointer-events:none; }
	.point-dot.accuracy-district { border-style:dashed; border-radius:3px; }
	.point-dot.accuracy-district::after { content:""; position:absolute; inset:-.24rem; border:1px solid color-mix(in srgb,var(--panel-text) 38%,transparent); border-radius:4px; pointer-events:none; }
	.visible .point-dot:not(.dimmed) { opacity:.9; transform:translate(-50%,-50%) scale(1); }
	.point-dot.featured { box-shadow:0 0 0 3px color-mix(in srgb,var(--panel-bg) 72%,transparent),0 0 0 5px color-mix(in srgb,var(--panel-border) 52%,transparent); }
	.point-dot.dimmed { opacity:.055; transform:translate(-50%,-50%) scale(.65); pointer-events:none; transition-delay:0ms; }
	.point-dot:hover,.point-dot:focus-visible,.point-dot.selected { z-index:50; opacity:1!important; transform:translate(-50%,-50%) scale(1.75)!important; outline:2px solid var(--panel-text); outline-offset:2px; filter:saturate(1.2); transition-delay:0ms; }

	.point-detail { position:absolute; left:.65rem; bottom:.62rem; z-index:44; width:min(25rem,58%); min-height:4.25rem; display:grid; grid-template-columns:minmax(0,1fr) auto; gap:.22rem .65rem; align-content:center; padding:.58rem .68rem; border:1.5px solid color-mix(in srgb,var(--panel-border) 62%,transparent); border-radius:10px; background:color-mix(in srgb,var(--panel-bg) 91%,transparent); box-shadow:3px 4px 0 color-mix(in srgb,var(--panel-border) 24%,transparent); backdrop-filter:blur(9px); }
	.detail-head { display:grid; gap:.08rem; min-width:0; }
	.detail-head span { font-size:.52rem; font-weight:900; opacity:.58; }
	.detail-head strong { overflow:hidden; font-family:var(--font-display); font-size:.78rem; line-height:1.15; text-overflow:ellipsis; white-space:nowrap; }
	.detail-tags { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:.2rem; }
	.detail-tags i { padding:.12rem .28rem; border-radius:999px; background:var(--panel-accent); color:color-mix(in srgb,var(--panel-text) 86%,black 14%); font-size:.5rem; font-style:normal; font-weight:900; }
	.point-detail p { grid-column:1/-1; font-size:.56rem; line-height:1.35; opacity:.68; }

	.map-note { display:flex; flex-wrap:wrap; align-items:center; gap:.38rem .7rem; margin-top:.62rem; font-size:.57rem; }
	.map-note span { display:flex; align-items:center; gap:.25rem; font-weight:900; }
	.map-note i.accuracy-area { background:transparent; border-style:dashed; }
	.map-note i.accuracy-district { background:transparent; border-style:dashed; border-radius:2px; }
	.map-note b { margin-left:auto; font-size:.54rem; opacity:.56; }
	footer { display:grid; gap:.22rem; margin-top:.72rem; font-size:.68rem; line-height:1.46; opacity:.66; }
	a { color:inherit; text-underline-offset:.16em; }

	@media(max-width:680px){
		.supply-summary{grid-template-columns:repeat(3,minmax(0,1fr))}.total-cell{grid-column:1/-1;border-bottom:1px solid color-mix(in srgb,var(--panel-border) 34%,transparent)}.supply-summary>div:nth-child(2){border-left:0}.summary-cell{padding:.65rem .45rem!important}.map-stage{min-height:0;aspect-ratio:3/2}.geo-layer{--base-pan:-24px}.tier-tabs,.subtype-tabs{margin-inline:-.1rem;padding:.1rem}.point-dot{width:.54rem;border-width:1px}.point-dot.tier-landmark{width:.7rem}.point-dot.tier-life{width:.46rem}.point-detail{left:.38rem;bottom:.38rem;width:72%;min-height:3.5rem;padding:.45rem .5rem}.detail-head strong{font-size:.66rem}.point-detail p{display:none}.detail-tags i{font-size:.44rem}.map-note b{width:100%;margin-left:0}.interaction-hint{right:.38rem;top:.38rem;padding:.28rem .38rem}.interaction-hint strong{font-size:.5rem}.interaction-hint span{display:none}.zoom-controls{right:.38rem;top:2.75rem}.zoom-controls button{min-width:1.55rem;height:1.5rem}.zoom-controls .zoom-reset{min-width:2.35rem}.map-count{left:.38rem;top:.38rem}.attribution{font-size:.4rem}
	}
	@media(prefers-reduced-motion:reduce){
		.geo-layer,.tiles,.summary-cell,.point-dot,.interaction-hint{transition:none!important;animation:none!important}.geo-layer{transform:translate(calc(var(--base-pan) + var(--pan-x)),var(--pan-y)) scale(var(--geo-scale))}.tiles{opacity:1}.summary-cell,.interaction-hint{opacity:1;transform:none}.point-dot:not(.dimmed){opacity:.9;transform:translate(-50%,-50%)}
	}
</style>
