<script>
	import { getContext, onMount } from "svelte";

	let {
		nodeId,
		eyebrow = "DATA",
		title = "[CHART TITLE]",
		dek = "",
		chartType = "",
		confidence = "",
		source = "",
		note = "",
		bars = [],
		columns = [],
		legend = [],
		layers = [],
		spaceMetrics = [],
		impactMetrics = [],
		spotlights = [],
		aSide = [],
		bSide = [],
		calculated = [],
		beijingALens = null,
		chainTitle = "三种夜晚，三种守护方式",
		chainColumns = [],
		guardChains = [],
		points = [],
		badge = "",
		mainComparison = [],
		dailyBeijing = [],
		spaceBase = [],
		contentTypes = [],
		growthBars = [],
		beyondTheater = [],
		beyondTitle = "剧场之外的夜内容",
		sourceNote = "",
		beijingDensity = null,
		nightContentFormats = null,
		holidayNote = null,
		beijing2024 = null,
		national2024 = null,
		nationalHoliday2024 = null,
		routes = [],
		busStats = [],
		nightDistrictCoverage = [],
		supportServices = [],
		intervals = [],
		timeNote = "",
		mapNote = "",
		axes = null,
		batchSummary = [],
		cities = []
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	let activeRiverIndex = $state(0);
	let activeRiverMetric = $state("");
	let riverHasHover = $state(false);
	let activeGuardIndex = $state(0);
	let activeGuardKey = $state("");
	let guardHasHover = $state(false);
	let activePerformanceId = $state("beijing");
	let activePerformanceMetric = $state("");
	let performanceHasHover = $state(false);
	let activeNightFormatKey = $state("");
	let nightFormatHasHover = $state(false);
	let activeServiceRoute = $state("");
	let serviceRouteHasHover = $state(false);
	let activeServiceCard = $state("");
	let activeServiceInterval = $state("");
	let activeMatrixCityName = $state("");
	let activeLiangmaTopic = $state("");
	let visible = $state(false);

	const confidenceLabels = {
		A: "A 官方/权威",
		B: "B 可核查",
		C: "C 侧栏参考"
	};

	const numericBars = $derived(bars.filter((bar) => Number.isFinite(Number(bar.value))));
	const max = $derived(Math.max(...numericBars.map((bar) => Number(bar.value)), 1));
	const visitorDots = $derived(dots(Math.round(Number(aSide[0]?.value ?? 0)), 42));
	const barDots = $derived(dots(Number(aSide[1]?.value ?? 0), 70));
	const outdoorDots = $derived(dots(Number(aSide[2]?.value ?? 0), 14));
	const alertDots = $derived(
		dots(Math.round(Number(bSide.find((item) => item.label.includes("警情"))?.value ?? 0)), 80)
	);
	const policeDots = $derived(dots(Number(bSide[0]?.value ?? 0), 70));
	const performanceGroups = $derived([
		{
			label: "演出场次",
			totalLabel: "全国约48.84万场",
			beijingLabel: "北京5.7万场",
			share: 11.7,
			dots: dots(49, 49),
			active: 6
		},
		{
			label: "观众人次",
			totalLabel: "全国17618.16万人次",
			beijingLabel: "北京1280万人次",
			share: 7.3,
			bar: true
		},
		{
			label: "票房收入",
			totalLabel: "全国579.54亿元",
			beijingLabel: "北京39亿元",
			share: 6.7,
			bar: true
		}
	]);
	const perDayLine = $derived(
		beijing2024 ? "北京每天约 156 场 / 3.5 万观众 / 1068 万元票房" : "日均换算待补充"
	);
	const cityLegend = $derived(cities.map((city) => city.city));
	const activeRiverCity = $derived(cities[activeRiverIndex] ?? cities[0]);
	const activeGuardChain = $derived(guardChains[activeGuardIndex] ?? guardChains[0]);
	const activePerformancePoint = $derived(points.find((point) => point.id === activePerformanceId) ?? points[0]);
	const spaceBaseMax = $derived(maxValue(spaceBase));
	const contentTypesMax = $derived(maxValue(contentTypes));
	const growthBarsMax = $derived(maxValue(growthBars));
	const beyondTheaterMax = $derived(maxValue(beyondTheater));
	const impactMetricsMax = $derived(maxValue(impactMetrics));
	const impactMetricsScaleMax = $derived(Math.max(80, impactMetricsMax));
	const activeServiceRouteData = $derived(routes.find((route) => route.slug === activeServiceRoute) ?? null);
	const defaultServiceRouteSummary = "夜班公交把长安街、环路与居住区接回城市。";
	const routeDrawOrder = $derived(
		["night30", "night20", "night2", "night27", "night38", "night1"]
			.map((slug) => routes.find((route) => route.slug === slug))
			.filter(Boolean)
	);
	const maxCoverageValue = $derived(
		Math.max(
			...nightDistrictCoverage.flatMap((group) => group.items?.map((item) => Number(item.value) || 0) ?? []),
			1
		)
	);
	const activeMatrixCity = $derived(cities.find((city) => city.city === activeMatrixCityName) ?? null);

	onMount(() => {
		registerNode(nodeId, el);

		if (typeof IntersectionObserver === "undefined") {
			visible = true;
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.22 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	});

	function dots(count, limit = 100) {
		return Array.from({ length: Math.max(0, Math.min(Math.round(count), limit)) });
	}

	function metric(item) {
		if (item?.value === null || item?.value === undefined || item?.value === "") return "待补充";
		return `${item.value}${item.unit ? item.unit : ""}`;
	}

	function maxValue(items = []) {
		return Math.max(...items.map((item) => Number(item.value) || 0), 1);
	}

	function widthStyle(value, maxValueForSet) {
		const raw = Number(value) || 0;
		const pct = Math.max(4, Math.min(100, (raw / Math.max(Number(maxValueForSet) || 1, 1)) * 100));
		return `--w: ${pct}%;`;
	}

	function comparisonMax(item) {
		return Math.max(Number(item?.beijing) || 0, Number(item?.nationalAverage) || 0, 1);
	}

	function setActivePerformanceMetric(label) {
		activePerformanceMetric = label;
		performanceHasHover = true;
	}

	function clearPerformanceMetricHover() {
		activePerformanceMetric = "";
		performanceHasHover = false;
	}

	function layerItem(layerName, labelPart) {
		const layer = layers.find((entry) => entry.layer === layerName);
		return layer?.items?.find((item) => item.label.includes(labelPart));
	}

	function nodeStyle(x, y) {
		return `--x: ${x}%; --y: ${y}%;`;
	}

	function cityStyle(city, index = 0) {
		const size = Number(city.clusterCount) > 0
			? Math.max(48, Math.min(86, 32 + Number(city.clusterCount) * 3.2))
			: 60;
		const labelOffsets = new Map([
			["\u5317\u4eac", ["54px", "-14px"]],
			["\u4e0a\u6d77", ["-50px", "2px"]],
			["\u91cd\u5e86", ["-48px", "-8px"]],
			["\u676d\u5dde", ["50px", "0px"]],
			["\u6210\u90fd", ["38px", "-2px"]],
			["\u957f\u6c99", ["-18px", "10px"]],
			["\u6df1\u5733", ["44px", "-22px"]],
			["\u897f\u5b89", ["92px", "4px"]]
		]);
		const [labelX = "0px", labelY = "14px"] = labelOffsets.get(city.city) ?? [];
		const adjustedY = 24 + Number(city.y ?? 50) * 0.66;
		return `--x: ${city.x}%; --y: ${adjustedY}%; --size: ${size}px; --label-x: ${labelX}; --label-y: ${labelY}; --city-delay: ${index * 75}ms;`;
	}

	function setActiveMatrixCity(cityName) {
		activeMatrixCityName = cityName;
	}

	function clearActiveMatrixCity() {
		activeMatrixCityName = "";
	}

	function setActiveLiangmaTopic(topic) {
		activeLiangmaTopic = topic ?? "";
	}

	function clearActiveLiangmaTopic() {
		activeLiangmaTopic = "";
	}
	function riverBarStyle(value, cityIndex, columnIndex) {
		const index = Math.max(0, Math.min(100, Number(value?.index ?? 0)));
		return `--h: ${index}%; --delay: ${cityIndex * 85 + columnIndex * 45}ms;`;
	}

	function riverStatusLabel(status) {
		return {
			hard: "可核查数值",
			partial: "阶段 / 历史",
			context: "类型证据"
		}[status ?? "context"];
	}

	function setActiveRiver(index, metricKey = "") {
		activeRiverIndex = index;
		activeRiverMetric = metricKey;
		riverHasHover = true;
	}

	function clearRiverHover() {
		riverHasHover = false;
		activeRiverMetric = "";
	}

	function setActiveGuard(index, key = "") {
		activeGuardIndex = index;
		activeGuardKey = key;
		guardHasHover = true;
	}

	function clearGuardNode() {
		activeGuardKey = "";
	}

	function setActivePerformance(id) {
		activePerformanceId = id;
		performanceHasHover = true;
	}

	function clearPerformanceHover() {
		activePerformanceId = "beijing";
		performanceHasHover = false;
	}

	function setActiveNightFormat(key) {
		activeNightFormatKey = key;
		nightFormatHasHover = true;
	}

	function clearNightFormatHover() {
		activeNightFormatKey = "";
		nightFormatHasHover = false;
	}

	function setActiveServiceRoute(slug) {
		activeServiceRoute = slug;
		serviceRouteHasHover = true;
	}

	function clearActiveServiceRoute() {
		activeServiceRoute = "";
		serviceRouteHasHover = false;
	}

	function setActiveServiceCard(role) {
		activeServiceCard = role;
	}

	function clearActiveServiceCard() {
		activeServiceCard = "";
	}

	function setActiveServiceInterval(label) {
		activeServiceInterval = label;
	}

	function clearActiveServiceInterval() {
		activeServiceInterval = "";
	}

	function stationDelay(routeIndex, stationIndex) {
		return `--i: ${routeIndex}; --j: ${stationIndex};`;
	}

	function routeDelay(routeIndex) {
		return `--i: ${routeIndex};`;
	}

	function routeClass(route) {
		return `${route.type ?? ""} ${route.emphasis ?? ""} ${activeServiceRoute === route.slug ? "is-active" : ""} ${
			serviceRouteHasHover && activeServiceRoute !== route.slug ? "is-muted" : ""
		}`;
	}

	function routeStations(route) {
		return route.type === "ring" ? [] : (route.nodes ?? []);
	}

	function intervalWidth(interval) {
		const total = Math.max(
			intervals.reduce((sum, entry) => sum + (Number(entry.interval) || 0), 0),
			1
		);
		const pct = ((Number(interval.interval) || 0) / total) * 100;
		return `--w: ${pct}%;`;
	}

	function performancePointStyle(point) {
		const xAxis = axes?.x ?? {};
		const yAxis = axes?.y ?? {};
		const xMin = Number(xAxis.min ?? 0);
		const xMax = Number(xAxis.max ?? 1);
		const yMin = Number(yAxis.min ?? 0);
		const yMax = Number(yAxis.max ?? 1);
		const rawX = Math.max(xMin, Math.min(xMax, Number(point?.audiencePerShow ?? 0)));
		const rawY = Math.max(yMin, Math.min(yMax, Number(point?.ticketPerAudience ?? 0)));
		const x = 8 + ((Math.sqrt(rawX) - Math.sqrt(xMin)) / (Math.sqrt(xMax) - Math.sqrt(xMin))) * 84;
		const y = 8 + (1 - (rawY - yMin) / (yMax - yMin)) * 82;
		const size = Math.max(34, Math.min(94, Number(point?.radiusIndex ?? 36)));
		return `--x: ${Math.max(8, Math.min(92, x))}%; --y: ${Math.max(8, Math.min(90, y))}%; --size: ${size}px;`;
	}

	function performanceLabelClass(id) {
		return {
			large: "label-top-right",
			theater: "label-bottom-left",
			tourism: "label-bottom-right",
			national: "label-top-left",
			beijing: "label-bottom-right"
		}[id] ?? "label-top-right";
	}

</script>

<section id={nodeId} class={`chart-shell ${chartType || "fallback"} ${visible ? "is-visible" : ""}`} bind:this={el}>
	<header class="chart-head">
		<div class="chart-kicker">
			<p>{eyebrow}</p>
			{#if confidence}
				<span class="confidence">{confidenceLabels[confidence] ?? confidence}</span>
			{/if}
		</div>
		<h3>{title}</h3>
		{#if dek}
			<p class="dek">{dek}</p>
		{/if}
	</header>

	<div class={`chart-canvas ${chartType || "bars-canvas"}`}>
		{#if chartType === "liangmaheMetrics"}
			<div class:has-topic={activeLiangmaTopic} class="liangma-metrics-stage visual-stage" aria-label={title}>
				<div class="liangma-system-grid">
					<section class="liangma-space-panel">
						<div class="liangma-subhead">
							<span>01 / 空间骨架</span>
							<strong>一条河先被重新连起来</strong>
						</div>
						<div class="liangma-space-grid">
							{#each spaceMetrics as item, i}
								<button
									type="button"
									class="liangma-space-card"
									class:is-related={activeLiangmaTopic === item.topic}
									class:is-dimmed={Boolean(activeLiangmaTopic) && activeLiangmaTopic !== item.topic}
									data-topic={item.topic}
									style={`--i: ${i};`}
									onmouseenter={() => setActiveLiangmaTopic(item.topic)}
									onmouseleave={clearActiveLiangmaTopic}
									onfocus={() => setActiveLiangmaTopic(item.topic)}
									onclick={() => setActiveLiangmaTopic(item.topic)}
									onblur={clearActiveLiangmaTopic}
								>
									<strong>{item.value}<small>{item.unit}</small></strong>
									<span>{item.label}</span>
									<p>{item.detail}</p>
								</button>
							{/each}
						</div>
					</section>

					<section class="liangma-impact-panel">
						<div class="liangma-subhead">
							<span>02 / 治理后变化 · 统一尺度 0%—80%</span>
							<strong>公共空间把人流与商业带回岸边</strong>
						</div>
						<div class="liangma-impact-bars">
							{#each impactMetrics as item}
								<button
									type="button"
									class="liangma-impact-row"
									class:is-related={activeLiangmaTopic === item.topic}
									class:is-dimmed={Boolean(activeLiangmaTopic) && activeLiangmaTopic !== item.topic}
									data-topic={item.topic}
									onmouseenter={() => setActiveLiangmaTopic(item.topic)}
									onmouseleave={clearActiveLiangmaTopic}
									onfocus={() => setActiveLiangmaTopic(item.topic)}
									onclick={() => setActiveLiangmaTopic(item.topic)}
									onblur={clearActiveLiangmaTopic}
								>
									<div><span>{item.label}</span><small>{item.period}</small></div>
									<i><i style={widthStyle(item.value, impactMetricsScaleMax)}></i></i>
									<strong>{item.displayValue}</strong>
								</button>
							{/each}
						</div>
						<p class="liangma-impact-note">每条数据都在左侧标出观察期；条长只比较增幅，不比较客流、销售额与收入的绝对量。</p>
					</section>
				</div>

				<div class="liangma-spotlights" aria-label="亮马河年度节点数据">
					{#each spotlights as item}
						<button
							type="button"
							class="liangma-spotlight"
							class:is-related={activeLiangmaTopic === item.topic}
							class:is-dimmed={Boolean(activeLiangmaTopic) && activeLiangmaTopic !== item.topic}
							data-topic={item.topic}
							onmouseenter={() => setActiveLiangmaTopic(item.topic)}
							onmouseleave={clearActiveLiangmaTopic}
							onfocus={() => setActiveLiangmaTopic(item.topic)}
							onclick={() => setActiveLiangmaTopic(item.topic)}
							onblur={clearActiveLiangmaTopic}
						>
							<strong>{item.value}</strong>
							<span>{item.label}</span>
							<small>{item.note}</small>
						</button>
					{/each}
				</div>
			</div>
		{:else if chartType === "riverGroupedBars"}
			<div
				class={`river-bars-stage visual-stage ${riverHasHover ? "river-bars-has-hover" : ""}`}
				aria-label={title}
				role="group"
				onmouseleave={clearRiverHover}
			>
				<div class="river-bars-layout">
					<div class="river-bars-chart">
						<div class="river-bars-legend" aria-label="指标维度">
							{#each columns as column}
								<span title={column.description}>
									<i class={`legend-dot ${column.key}`}></i>
									{column.shortLabel}
								</span>
							{/each}
						</div>

						<div class="river-bars-plot">
							{#each cities as city, cityIndex}
								<button
									type="button"
									class={`river-city-group ${city.accent ? "is-accent" : ""} ${activeRiverIndex === cityIndex ? "is-active" : ""}`}
									onmouseenter={() => setActiveRiver(cityIndex)}
									onfocus={() => setActiveRiver(cityIndex)}
									aria-pressed={riverHasHover && activeRiverIndex === cityIndex}
								>
									<span class="river-city-head">
										<span class="city-name">{city.city}</span>
										<span class="project-name">{city.project}</span>
										<span class="type-tag">{city.type}</span>
									</span>
									<span class="bar-cluster">
										{#each columns as column, columnIndex}
											{@const value = city.values?.[column.key]}
											<span
												class={`river-bar ${column.key} status-${value?.status ?? "context"} ${activeRiverMetric === column.key ? "is-metric-active" : ""}`}
												title={`${column.label}: ${value?.raw ?? "待补充"}`}
												role="presentation"
												onmouseenter={() => setActiveRiver(cityIndex, column.key)}
											>
												<span class="bar-track">
													<span class="bar-fill" style={riverBarStyle(value, cityIndex, columnIndex)}></span>
												</span>
												<span class="bar-label">{column.shortLabel}</span>
											</span>
										{/each}
									</span>
								</button>
							{/each}
						</div>

						<div class="river-status-legend" aria-label="数据口径说明">
							{#each legend as item}
								<span class={`status-key ${item.key}`} title={item.description}>
									<i></i>
									<strong>{item.label}</strong>
								</span>
							{/each}
						</div>
					</div>

					{#if activeRiverCity}
						<aside class="river-hover-panel">
							<p class="panel-eyebrow">当前说明</p>
							<h4>{activeRiverCity.hoverTitle ?? `${activeRiverCity.city}｜${activeRiverCity.project}`}</h4>
							<p class="panel-type">{activeRiverCity.type}</p>
							<div class="raw-grid">
								{#each columns as column}
									{@const value = activeRiverCity.values?.[column.key]}
									<div class:active={activeRiverMetric === column.key}>
										<strong>{column.label}</strong>
										<span>{value?.raw ?? "待补充"}</span>
										{#if value?.note}
											<small>{value.note}</small>
										{/if}
										<em>{riverStatusLabel(value?.status)}</em>
									</div>
								{/each}
							</div>
							{#if activeRiverCity.hoverContext?.length}
								<div class="context-chips">
									{#each activeRiverCity.hoverContext as item}
										<span>{item}</span>
									{/each}
								</div>
							{/if}
							{#if activeRiverCity.sourceLabel}
								<small class="source-label">{activeRiverCity.sourceLabel}</small>
							{/if}
						</aside>
					{/if}
				</div>
			</div>
		{:else if chartType === "waterfrontSystem"}
			<div class="river-stage visual-stage" aria-label={title}>
				<svg class="river-svg" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
					<path class="river-path wide" d="M 40 210 C 180 60 330 300 480 170 S 760 110 960 225" />
					<path class="river-path core" d="M 40 210 C 180 60 330 300 480 170 S 760 110 960 225" />
				</svg>
				<div class="layer-label l1">水岸空间</div>
				<div class="layer-label l2">夜航消费</div>
				<div class="layer-label l3">公共生活</div>
				<div class="layer-label l4">国际街区</div>
				<div class="layer-label l5">夜间运维</div>

				<div class="river-node callout major" style={nodeStyle(18, 60)}>
					<strong>{metric(layerItem("水岸空间", "风情水岸"))}</strong>
					<span>{layerItem("水岸空间", "风情水岸")?.label}</span>
				</div>
				<div class="river-node callout major" style={nodeStyle(43, 42)}>
					<strong>{metric(layerItem("夜航消费", "通航"))}</strong>
					<span>旅游通航</span>
				</div>
				<div class="river-node callout major" style={nodeStyle(66, 65)}>
					<strong>{metric(layerItem("公共生活", "绿道"))}</strong>
					<span>滨水绿道</span>
				</div>
				<div class="river-node callout" style={nodeStyle(78, 35)}>
					<strong>{metric(layerItem("公共生活", "景观结构"))}</strong>
					<span>景观结构</span>
				</div>
				<div class="river-node pin" style={nodeStyle(26, 30)}>第二使馆区</div>
				<div class="river-node pin" style={nodeStyle(48, 76)}>第三使馆区</div>
				<div class="river-node pin" style={nodeStyle(71, 28)}>蓝港 / 燕莎</div>
				<div class="river-node pin" style={nodeStyle(84, 72)}>朝阳公园</div>
				{#each ["码头", "票务", "安保", "保洁"] as item, i}
					<div class="river-node pending-dot" style={nodeStyle(10 + i * 10, 82)}>{item}</div>
				{/each}
			</div>
		{:else if chartType === "nightGuardChain"}
			<div
				class={`guard-stage visual-stage ${guardHasHover ? "guard-has-hover" : ""}`}
				aria-label={title}
				role="group"
				onmouseleave={clearGuardNode}
			>
				{#if beijingALens}
					<section class="guard-lens">
						<div class="guard-section-title">
							<p>{beijingALens.type}</p>
							<h4>{beijingALens.title}</h4>
							<span>{beijingALens.subtitle}</span>
						</div>
						<div class="guard-lens-track">
							<span class="guard-lens-line" aria-hidden="true"></span>
							{#each beijingALens.items as item, i}
								<span class={`lens-node status-${item.status ?? "context"}`} style={`--i: ${i};`}>
									<strong>{item.value}<small>{item.unit}</small></strong>
									<span>{item.label}</span>
								</span>
							{/each}
						</div>
						<p class="lens-conclusion">{beijingALens.conclusion}</p>
					</section>
				{/if}

				<section class="guard-chain-section">
					<div class="guard-section-title compact">
						<p>B SIDE CHAIN</p>
						<h4>{chainTitle}</h4>
					</div>

					<div class="guard-chain-layout">
						<div class="guard-route-map">
							<div class="guard-column-heads" aria-hidden="true">
								<span></span>
								<div class="guard-node-heads">
									{#each chainColumns as column}
										<span title={column.description}>{column.label}</span>
									{/each}
								</div>
							</div>
							<div class="guard-routes">
								{#each guardChains as chain, chainIndex}
									<div
										class={`guard-route ${chain.accent ? "is-accent" : ""} ${activeGuardIndex === chainIndex ? "is-active" : ""}`}
										style={`--i: ${chainIndex};`}
										role="group"
										onmouseenter={() => setActiveGuard(chainIndex)}
										onfocusin={() => setActiveGuard(chainIndex)}
									>
										<div class="guard-route-label">
											<strong>{chain.city}</strong>
											<span>{chain.district}</span>
											<small>{chain.type}</small>
										</div>
										<div class="guard-route-line">
											{#each chainColumns as column, nodeIndex}
												{@const guardNode = chain.nodes?.[column.key]}
												<button
													type="button"
													class={`guard-node status-${guardNode?.status ?? "context"} ${activeGuardIndex === chainIndex && activeGuardKey === column.key ? "is-node-active" : ""}`}
													style={`--i: ${chainIndex}; --j: ${nodeIndex};`}
													title={`${column.label}: ${guardNode?.detail ?? ""}`}
													onmouseenter={() => setActiveGuard(chainIndex, column.key)}
													onfocus={() => setActiveGuard(chainIndex, column.key)}
													aria-label={`${chain.city}${chain.district}，${column.label}，${guardNode?.value ?? ""}`}
												>
													<span>{guardNode?.label}</span>
													<strong>{guardNode?.value}</strong>
												</button>
											{/each}
										</div>
									</div>
								{/each}
							</div>
						</div>

						{#if activeGuardChain}
							<aside class="guard-detail-panel">
								<p class="panel-eyebrow">链路说明</p>
								<h4>{activeGuardChain.hoverTitle}</h4>
								<p class="panel-type">{activeGuardChain.type}</p>
								<p class="guard-summary">{activeGuardChain.summary}</p>
								<p class="guard-hover-text">{activeGuardChain.hoverText}</p>
								<div class="guard-detail-grid">
									{#each chainColumns as column}
										{@const guardNode = activeGuardChain.nodes?.[column.key]}
										<div class:active={activeGuardKey === column.key}>
											<strong>{column.label}</strong>
											<span>{guardNode?.value}</span>
											{#if activeGuardKey === column.key}
												<small>{guardNode?.detail}</small>
											{/if}
											<em>{riverStatusLabel(guardNode?.status)}</em>
										</div>
									{/each}
								</div>
								{#if activeGuardChain.sourceLabel}
									<small class="source-label">{activeGuardChain.sourceLabel}</small>
								{/if}
							</aside>
						{/if}
					</div>

					<div class="guard-status-legend" aria-label="数据口径说明">
						{#each legend as item}
							<span class={`status-key ${item.key}`} title={item.description}>
								<i></i>
								<strong>{item.label}</strong>
							</span>
						{/each}
					</div>
				</section>
			</div>
		{:else if chartType === "complexityDotMatrix"}
			<div class="dot-matrix-stage visual-stage" aria-label={title}>
				<div class="split-label left">A 面：热闹被看见</div>
				<div class="split-label right">B 面：压力被分担</div>
				<div class="split-line" aria-hidden="true"></div>

				<section class="dot-side a-side">
					<div class="dot-cloud visitors">
						{#each visitorDots as _}
							<i class="data-dot"></i>
						{/each}
					</div>
					<p class="callout-label large">39.7 万人次<span>太古里春节假期客流，每点约 1 万人次</span></p>
					<div class="mini-cloud bars">
						{#each barDots as _}
							<i></i>
						{/each}
					</div>
					<p class="callout-label">70+ 酒吧</p>
					<div class="outdoor-row">
						{#each outdoorDots as _}
							<i></i>
						{/each}
					</div>
					<p class="area-label">750㎡ 外摆面积 / 14 家现有外摆 / 16 家规划新增</p>
				</section>

				<section class="dot-side b-side">
					<div class="dot-cloud alerts">
						{#each alertDots as _}
							<i class="data-dot"></i>
						{/each}
					</div>
					<p class="callout-label large">80+ 起/日<span>日均接报警情</span></p>
					<div class="mini-cloud police">
						{#each policeDots as _}
							<i></i>
						{/each}
					</div>
					<p class="callout-label">70+ 民警</p>
					<div class="layer-stack">使馆 / 酒吧街 / 写字楼 / 商业区叠加</div>
					{#if calculated?.[0]}
						<p class="annotation-note">{metric(calculated[0])}：{calculated[0].note}</p>
					{/if}
				</section>
			</div>
		{:else if chartType === "performanceBubbleMap"}
			<div
				class={`performance-collection-stage visual-stage ${performanceHasHover ? "performance-has-hover" : ""}`}
				aria-label={title}
				role="group"
				onmouseleave={clearPerformanceMetricHover}
			>
				<div class="performance-collection-layout">
					<section class="performance-main-panel">
						<div class="performance-collection-top">
							{#if badge}
								<span class="performance-badge">{badge}</span>
							{/if}
							<p>北京 vs 全国省级平均：营业性演出供给量级对比</p>
						</div>

						<div class="main-comparison-chart" aria-label="北京与全国省级平均对比">
							{#each mainComparison as item, i}
								<button
									type="button"
									class={`comparison-row ${activePerformanceMetric === item.label ? "is-active" : ""}`}
									style={`--i: ${i};`}
									onmouseenter={() => setActivePerformanceMetric(item.label)}
									onfocus={() => setActivePerformanceMetric(item.label)}
									aria-label={`${item.label}：北京${item.beijingLabel}，全国省级平均${item.nationalLabel}，${item.ratio}`}
								>
									<span class="comparison-label">
										<strong>{item.label}</strong>
										<small>{item.unit}</small>
									</span>
									<span class="comparison-bars" aria-hidden="true">
										<span class="comparison-bar-line beijing">
											<span>北京</span>
											<i class="comparison-track">
												<i class="comparison-fill" style={widthStyle(item.beijing, comparisonMax(item))}></i>
											</i>
											<em>{item.beijingLabel}</em>
										</span>
										<span class="comparison-bar-line national">
											<span>省均</span>
											<i class="comparison-track">
												<i
													class="comparison-fill"
													style={widthStyle(item.nationalAverage, comparisonMax(item))}
												></i>
											</i>
											<em>{item.nationalLabel}</em>
										</span>
									</span>
									<span class="ratio-pill" title={item.note}>{item.ratio}</span>
									<span class="comparison-note">{item.note}</span>
								</button>
							{/each}
						</div>

						<p class="comparison-footnote">
							这里的全国省均为全国总量按31个省级行政区折算，只用于观察量级差异。
						</p>
						{#if dailyBeijing.length}
							<section class="daily-summary-strip">
								<h4>北京每天都在上演</h4>
								<div class="daily-summary-grid">
									{#each dailyBeijing as item}
										<div title={item.formula}>
											<strong>{item.value}<small>{item.unit}</small></strong>
											<span>{item.label}</span>
										</div>
									{/each}
								</div>
							</section>
						{/if}
					</section>

					<aside class="performance-cluster-panel" aria-label="北京夜晚内容图表集群">
						{#if growthBars.length}
							<section class="mini-chart-card growth-card">
								<h4>增长把夜晚继续推高</h4>
								<div class="mini-bar-list growth-list">
									{#each growthBars as item}
										<div class="mini-bar-row growth-row" title={`${item.label} ${item.displayValue}`}>
											<span>{item.label}</span>
											<i><i style={widthStyle(item.value, growthBarsMax)}></i></i>
											<strong>{item.displayValue}</strong>
										</div>
									{/each}
								</div>
							</section>
						{/if}

						{#if spaceBase.length}
							<section class="mini-chart-card space-card">
								<h4>北京演出空间底盘</h4>
								<div class="mini-bar-list">
									{#each spaceBase as item}
										<div class="mini-bar-row" title={`${item.label} ${item.value}${item.unit ?? ""}`}>
											<span>{item.label}</span>
											<i><i style={widthStyle(item.value, spaceBaseMax)}></i></i>
											<strong>{item.value}{item.unit}</strong>
										</div>
									{/each}
								</div>
							</section>
						{/if}

						{#if contentTypes.length}
							<section class="mini-chart-card content-card">
								<h4>内容类型多点开花</h4>
								<div class="mini-bar-list compact">
									{#each contentTypes as item}
										<div class="mini-bar-row" title={`${item.label} ${item.displayValue}`}>
											<span>{item.label}</span>
											<i><i style={widthStyle(item.value, contentTypesMax)}></i></i>
											<strong>{item.displayValue}</strong>
										</div>
									{/each}
								</div>
							</section>
						{/if}

						{#if beyondTheater.length}
							<section class="mini-chart-card beyond-card">
								<h4>{beyondTitle}</h4>
								<div class="mini-bar-list compact two-col-bars">
									{#each beyondTheater as item}
										<div class="mini-bar-row" title={`${item.label} ${item.value}${item.unit ?? ""}`}>
											<span>{item.label}</span>
											<i><i style={widthStyle(item.value, beyondTheaterMax)}></i></i>
											<strong>{item.value}{item.unit}</strong>
										</div>
									{/each}
								</div>
								<small>平台榜单样本，不代表全量门店数。</small>
							</section>
						{/if}
					</aside>
				</div>
			</div>
		{:else if chartType === "performanceBubbleMapLegacy"}
			<div
				class={`performance-map-stage visual-stage ${performanceHasHover ? "performance-has-hover" : ""}`}
				aria-label={title}
				role="group"
				onmouseleave={clearPerformanceHover}
			>
				<div class="performance-map-layout">
					<section class="performance-plot-wrap">
						<div class="performance-plot">
							<div class="plot-grid" aria-hidden="true"></div>
							<div class="plot-axis x-axis">
								<span>{axes?.x?.label}</span>
								<small>{axes?.x?.unit}，横轴采用压缩比例</small>
							</div>
							<div class="plot-axis y-axis">
								<span>{axes?.y?.label}</span>
								<small>{axes?.y?.unit}</small>
							</div>
							{#each points as point, i}
								<button
									type="button"
									class={`performance-bubble ${point.status ?? "type"} ${point.accent ? "is-accent" : ""} ${activePerformanceId === point.id ? "is-active" : ""}`}
									style={`${performancePointStyle(point)} --i: ${i};`}
									onmouseenter={() => setActivePerformance(point.id)}
									onfocus={() => setActivePerformance(point.id)}
									aria-label={`${point.name}，单场平均观众${point.audiencePerShow}人，人均票房${point.ticketPerAudience}元`}
								>
									<span class="bubble-core"></span>
									<span class={`bubble-label ${performanceLabelClass(point.id)}`}>{point.name}</span>
								</button>
							{/each}
						</div>
						<div class="performance-legend">
							{#each legend as item}
								<span class={`performance-key ${item.key}`} title={item.description}>
									<i></i>
									{item.label}
								</span>
							{/each}
						</div>
					</section>

					<aside class="performance-side">
						{#if activePerformancePoint}
							<section class="performance-hover-detail">
								<p class="panel-eyebrow">当前点位</p>
								<h4>{activePerformancePoint.hoverTitle}</h4>
								<div class="performance-stat-chips">
									{#each activePerformancePoint.hoverStats ?? [] as stat}
										<span>{stat}</span>
									{/each}
								</div>
								<p>{activePerformancePoint.hoverText}</p>
								{#if activePerformancePoint.sourceLabel}
									<small class="source-label">{activePerformancePoint.sourceLabel}</small>
								{/if}
							</section>
						{/if}

						{#if beijingDensity}
							<section class="beijing-density">
								<h4>{beijingDensity.title}</h4>
								<div class="density-list">
									{#each beijingDensity.items as item, i}
										<div style={`--i: ${i};`}>
											<strong>{item.value}<small>{item.unit}</small></strong>
											<span>{item.label}</span>
											<em>{item.detail}</em>
										</div>
									{/each}
								</div>
							</section>
						{/if}

						{#if nightContentFormats}
							<section
								class={`night-formats ${nightFormatHasHover ? "night-format-has-hover" : ""}`}
								role="group"
								onmouseleave={clearNightFormatHover}
							>
								<div class="night-format-head">
									<h4>{nightContentFormats.title}</h4>
									<p>{nightContentFormats.intro}</p>
								</div>
								<div class="night-format-tags" aria-label="夜晚内容标签">
									{#each nightContentFormats.tags ?? [] as tag}
										<span>{tag}</span>
									{/each}
								</div>
								<div class="night-format-groups">
									{#each nightContentFormats.groups ?? [] as group}
										<section
											class={`night-format-group ${group.status ?? "platform"} ${activeNightFormatKey === group.key ? "is-active" : ""}`}
											role="group"
											onmouseenter={() => setActiveNightFormat(group.key)}
											onfocusin={() => setActiveNightFormat(group.key)}
										>
											<h5>{group.label}</h5>
											<div class="night-format-items">
												{#each group.items as item, i}
													{#if activeNightFormatKey === group.key || i < 3}
														<div>
															<strong>{item.value}<small>{item.unit ?? ""}</small></strong>
															<span>{item.label}</span>
															{#if activeNightFormatKey === group.key}
																<em>{item.detail}</em>
																<i>{item.confidence}</i>
															{/if}
														</div>
													{/if}
												{/each}
											</div>
											<p>{group.takeaway}</p>
										</section>
									{/each}
								</div>
								{#if nightContentFormats.note}
									<small class="night-format-note">{nightContentFormats.note}</small>
								{/if}
							</section>
						{/if}
					</aside>
				</div>

				{#if holidayNote}
					<p class="performance-holiday-note">
						<strong>{holidayNote.title}</strong>
						<span>{holidayNote.text}</span>
					</p>
				{/if}
			</div>
		{:else if chartType === "performanceComparison"}
			<div class="stage-compare visual-stage" aria-label={title}>
				{#each performanceGroups as group}
					<section class="stage-group">
						<h4>{group.label}</h4>
						{#if group.dots}
							<div class="performance-dots">
								{#each group.dots as _, i}
									<i class:active={i < group.active}></i>
								{/each}
							</div>
						{:else}
							<div class="proportion-track">
								<i style={`--w: ${group.share}%`}></i>
							</div>
						{/if}
						<p class="callout-label">{group.share}%<span>北京占全国</span></p>
						<small>{group.beijingLabel} / {group.totalLabel}</small>
					</section>
				{/each}
				<p class="daily-sticker">{perDayLine}</p>
				{#if nationalHoliday2024}
					<p class="annotation-note holiday">
						参考：{nationalHoliday2024.period}全国演出 {nationalHoliday2024.performances} 场，观众
						{nationalHoliday2024.audience}{nationalHoliday2024.audienceUnit}
					</p>
				{/if}
			</div>
		{:else if chartType === "servicePeopleNetwork"}
			<div
				class={`service-routes-stage visual-stage ${serviceRouteHasHover ? "route-has-hover" : ""} ${
					activeServiceInterval ? "timeline-is-active" : ""
				}`}
				aria-label={title}
				role="group"
				onmouseleave={() => {
					clearActiveServiceRoute();
					clearActiveServiceInterval();
				}}
			>
				<div class="service-routes-layout">
					<section class="route-map-panel" aria-label={"\u62bd\u8c61\u591c\u73ed\u516c\u4ea4\u7ebf\u8def\u56fe"}>
						<div class="route-map-head">
							<p>{"\u591c\u73ed\u516c\u4ea4\u62bd\u8c61\u7ebf\u8def"}</p>
							<strong>{mapNote}</strong>
						</div>
						<svg class="route-map-svg" viewBox="-4 8 108 82" role="img" aria-label={"\u591c\u73ed\u516c\u4ea4\u7ebf\u8def\u62bd\u8c61\u793a\u610f\u56fe"}>
							<defs>
								<filter id={`route-glow-${nodeId}`} x="-20%" y="-20%" width="140%" height="140%">
									<feGaussianBlur stdDeviation="0.55" result="blur" />
									<feMerge>
										<feMergeNode in="blur" />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
								</filter>
							</defs>
							{#each routeDrawOrder as route, routeIndex}
								<g
									class={`service-route ${route.slug} ${routeClass(route)}`}
									role="group"
									onmouseenter={() => setActiveServiceRoute(route.slug)}
									onpointerenter={() => setActiveServiceRoute(route.slug)}
									onmouseleave={clearActiveServiceRoute}
									onfocusin={() => setActiveServiceRoute(route.slug)}
								>
									<path
										id={`route-${nodeId}-${route.slug}`}
										class="service-route-halo"
										d={route.path}
										pathLength="1"
									/>
									<path
										class="service-route-line"
										d={route.path}
										pathLength="1"
										style={routeDelay(routeIndex)}
										filter={`url(#route-glow-${nodeId})`}
									/>
									{#each routeStations(route) as station, stationIndex}
										<circle
											class={`route-station ${station.major ? "major" : ""}`}
											cx={station.x}
											cy={station.y}
											r={station.major ? 1.45 : 0.95}
											style={stationDelay(routeIndex, stationIndex)}
										>
											<title>{station.label}</title>
										</circle>
									{/each}
									<text class="route-label" x={route.labelX} y={route.labelY}>{route.id} - {route.name}</text>
								</g>
							{/each}
						</svg>
						<div class="route-map-metrics">
							<section class="route-data-band">
								<div class="bus-stat-card">
									<h4>{"\u591c\u73ed\u516c\u4ea4\u5e95\u76d8"}</h4>
									<div class="bus-stat-grid">
										{#each busStats as stat}
											<div>
												<strong>{stat.value}</strong>
												<span>{stat.label}</span>
											</div>
										{/each}
									</div>
								</div>
							</section>
						</div>
						<div class="route-chip-row" aria-label={"\u591c\u73ed\u7ebf\u8def\u9009\u62e9"}>
							{#each routes as route}
								<button
									type="button"
									class={`route-chip ${activeServiceRoute === route.slug ? "is-active" : ""}`}
									onmouseenter={() => setActiveServiceRoute(route.slug)}
									onmouseleave={clearActiveServiceRoute}
									onfocus={() => setActiveServiceRoute(route.slug)}
									onclick={() => setActiveServiceRoute(route.slug)}
								>
									<strong>{route.id}</strong>
									<span>{route.name}</span>
								</button>
							{/each}
						</div>
					</section>

					<aside class="service-data-panel" aria-label={"\u591c\u95f4\u670d\u52a1\u8865\u4f4d\u6570\u636e"}>
						<section class="support-services-card">
							<h4>{"\u516c\u4ea4\u4e4b\u5916\uff0c\u8fd8\u6709\u8c01\u5728\u8def\u4e0a\uff1f"}</h4>
							<div class="support-services-grid">
								{#each supportServices as service}
									<article
										class={`support-service-card ${activeServiceCard === service.role ? "is-active" : ""}`}
										onmouseenter={() => setActiveServiceCard(service.role)}
										onmouseleave={clearActiveServiceCard}
										onfocusin={() => setActiveServiceCard(service.role)}
									>
										<strong>{service.role}</strong>
										<span>{service.metric}</span>
										<small>{service.subMetric}</small>
										<em>{service.note}</em>
									</article>
								{/each}
							</div>
						</section>
						{#if nightDistrictCoverage.length}
							<section class="coverage-card">
								<h4>{"\u591c\u4eac\u57ce\u8986\u76d6"}</h4>
								{#each nightDistrictCoverage as group}
									<div class="coverage-group">
										<p>{group.area}</p>
										{#each group.items as item}
											<div class="coverage-row">
												<span>{item.label}</span>
												<i style={widthStyle(item.value, maxCoverageValue)}></i>
												<strong>{item.display ?? `${item.value}${item.unit}`}</strong>
											</div>
										{/each}
									</div>
								{/each}
							</section>
						{/if}
						<section class="route-detail-card">
							{#if activeServiceRouteData}
								<p>{activeServiceRouteData.id} / {activeServiceRouteData.name}</p>
								<strong>{activeServiceRouteData.note}</strong>
							{:else}
								<p>{"\u591c\u73ed\u516c\u4ea4\u7f51\u7edc"}</p>
								<strong>{defaultServiceRouteSummary}</strong>
							{/if}
						</section>
					</aside>
				</div>

				<section class="service-timeline" aria-label={"\u591c\u73ed\u516c\u4ea4\u8fd0\u884c\u65f6\u95f4\u8f74"} onmouseleave={clearActiveServiceInterval}>
					<div class="timeline-head">
						<h4>23:20-04:50 {"\u8fd0\u884c\u95f4\u9694"}</h4>
						<p>{timeNote}</p>
					</div>
					<div class="timeline-track">
						{#each intervals as interval}
							<button
								type="button"
								class={`timeline-segment ${activeServiceInterval === interval.label ? "is-active" : ""}`}
								style={intervalWidth(interval)}
								title={`${interval.start}-${interval.end} ${interval.label}`}
								onmouseenter={() => setActiveServiceInterval(interval.label)}
								onfocus={() => setActiveServiceInterval(interval.label)}
							>
								<span>{interval.start}</span>
								<i></i>
								<strong>{interval.label}</strong>
								<em>{interval.end}</em>
							</button>
						{/each}
					</div>
				</section>
			</div>
		{:else if chartType === "cityMatrix"}
			<div class="axis-stage visual-stage" aria-label={title}>
				{#if batchSummary.length}
					<div class="matrix-summary" aria-label="三批国家级夜间文化和旅游消费集聚区数量">
						{#each batchSummary as item}
							<div class:total={item.label.includes("合计")}>
								<span>{item.year ? `${item.year}年` : ""}{item.label}</span>
								<strong>{item.value}<small>个</small></strong>
							</div>
						{/each}
					</div>
				{/if}
				<div class="axis-line x"></div>
				<div class="axis-line y"></div>
				<div class="axis-label axis-label-x x-left">← {axes?.x?.[0]}</div>
				<div class="axis-label axis-label-x x-right">{axes?.x?.[1]} →</div>
				<div class="axis-label axis-label-y y-top">↑ {axes?.y?.[1]}</div>
				<div class="axis-label axis-label-y y-bottom">{axes?.y?.[0]} ↓</div>
				{#each cities as city, cityIndex}
					<button
						type="button"
						class="bubble-point"
						class:is-active={activeMatrixCityName === city.city}
						class:is-muted={activeMatrixCityName && activeMatrixCityName !== city.city}
						style={cityStyle(city, cityIndex)}
						onmouseenter={() => setActiveMatrixCity(city.city)}
						onmouseleave={clearActiveMatrixCity}
						onfocus={() => setActiveMatrixCity(city.city)}
						onclick={() => setActiveMatrixCity(city.city)}
						onblur={clearActiveMatrixCity}
						aria-label={`${city.city}三批累计${city.clusterCount}个集聚区`}
					>
						<i>{city.clusterCount ?? city.shortName ?? city.index}</i>
						<span>{city.city}</span>
						<small>{city.type}</small>
					</button>
				{/each}
				<p class="matrix-legend">
					{#if activeMatrixCity}
						<strong>{activeMatrixCity.city} {activeMatrixCity.clusterCount} 个</strong>
						<span>第一批 {activeMatrixCity.batches?.[0] ?? 0} / 第二批 {activeMatrixCity.batches?.[1] ?? 0} / 第三批 {activeMatrixCity.batches?.[2] ?? 0}</span>
					{:else}
						圆内数字与圆点大小 = 三批国家级夜间文旅消费集聚区累计数量；悬浮城市可查看分批构成，坐标位置为编辑归纳。
					{/if}
				</p>
			</div>
		{:else}
			<div class="bars" aria-label={title}>
				{#each numericBars as bar}
					<div class="bar-row">
						<span>{bar.label}</span>
						<div>
							<i style={`width: ${(Number(bar.value) / max) * 100}%`}></i>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	{#if source || note}
		<footer class="chart-footnotes">
			{#if source}
				<p><strong>来源</strong><span>{source}</span></p>
			{/if}
			{#if note}
				<p><strong>说明</strong><span>{note}</span></p>
			{/if}
		</footer>
	{/if}
</section>

<style>
	.chart-shell {
		position: relative;
		z-index: 3;
		display: grid;
		gap: 1rem;
		padding: clamp(1rem, 2vw, 1.5rem);
		border: 2px solid var(--border);
		border-radius: var(--radius);
		background: var(--text-bg);
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		overflow: hidden;
	}

	.chart-head {
		display: grid;
		gap: 0.55rem;
		max-width: 860px;
	}

	.chart-kicker {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.chart-kicker p,
	h3,
	h4,
	p {
		margin: 0;
	}

	.chart-kicker p {
		font-size: 0.78rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	.confidence,
	.layer-label,
	.callout-label,
	.daily-sticker,
	.axis-label {
		border: 1.5px solid var(--border);
		border-radius: 999px;
		background: var(--text-bg);
		box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.14);
		font-weight: 900;
	}

	.confidence {
		padding: 0.15rem 0.45rem;
		font-size: 0.68rem;
	}

	h3 {
		font-family: var(--font-display);
		font-size: clamp(1.65rem, 4vw, 2.65rem);
		line-height: 1.02;
		text-transform: uppercase;
	}

	.dek {
		max-width: var(--measure);
		font-size: clamp(16px, 1vw, 18px);
		line-height: 1.58;
		opacity: 0.84;
	}

	.chart-canvas {
		position: relative;
		min-width: 0;
	}

	.visual-stage {
		position: relative;
		min-height: 380px;
		border: 1.5px dashed color-mix(in srgb, currentColor 56%, transparent);
		border-radius: calc(var(--radius) * 0.9);
		background:
			radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.18) 0 8%, transparent 9%),
			radial-gradient(circle at 84% 72%, rgba(255, 255, 255, 0.16) 0 10%, transparent 11%);
		overflow: hidden;
	}

	.liangma-metrics-stage {
		display: grid;
		gap: clamp(0.75rem, 1.5vw, 1rem);
		min-height: 0;
		padding: clamp(0.75rem, 1.5vw, 1rem);
		background:
			radial-gradient(circle at 18% 34%, color-mix(in srgb, var(--line-stroke) 20%, transparent), transparent 34%),
			linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.035));
	}

	.liangma-system-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.08fr) minmax(300px, 0.92fr);
		gap: clamp(0.85rem, 1.7vw, 1.25rem);
		align-items: stretch;
	}

	.liangma-space-panel,
	.liangma-impact-panel {
		position: relative;
		display: grid;
		gap: 0.6rem;
		min-width: 0;
		padding: clamp(0.85rem, 1.6vw, 1.15rem);
		border-radius: calc(var(--radius) * 0.65);
		background: rgba(255, 255, 255, 0.09);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 12%, transparent);
	}

	.liangma-space-panel {
		overflow: hidden;
		background:
			linear-gradient(135deg, color-mix(in srgb, var(--line-stroke) 15%, transparent), transparent 58%),
			rgba(255, 255, 255, 0.075);
	}

	.liangma-subhead {
		position: relative;
		z-index: 2;
		display: grid;
		gap: 0.12rem;
	}

	.liangma-subhead span {
		font-size: 0.68rem;
		font-weight: 950;
		opacity: 0.62;
		text-transform: uppercase;
	}

	.liangma-subhead strong {
		font-family: var(--font-display);
		font-size: clamp(1rem, 1.55vw, 1.28rem);
		line-height: 1.08;
	}

	.liangma-space-grid {
		position: relative;
		z-index: 2;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-auto-rows: 1fr;
		gap: 0.65rem;
	}

	.liangma-space-card,
	.liangma-impact-row,
	.liangma-spotlight {
		border: 0;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.liangma-space-card {
		display: grid;
		grid-template-rows: auto auto 1fr;
		align-content: stretch;
		gap: 0.18rem;
		min-height: 96px;
		padding: 0.62rem 0.68rem;
		border-radius: 12px;
		background: color-mix(in srgb, var(--text-bg) 72%, transparent);
		box-shadow: 3px 4px 0 color-mix(in srgb, currentColor 12%, transparent);
		transform: translateY(0);
		transition: opacity 220ms ease, transform 220ms ease, background 220ms ease, box-shadow 220ms ease;
	}

	.liangma-space-card > strong {
		font-family: var(--font-accent);
		font-size: clamp(1.55rem, 2.65vw, 2.25rem);
		font-weight: 400;
		line-height: 0.9;
		white-space: nowrap;
	}

	.liangma-space-card > strong small {
		margin-left: 0.2rem;
		font-family: var(--font-sans);
		font-size: 0.64rem;
		font-weight: 900;
	}

	.liangma-space-card > span {
		font-size: 0.78rem;
		font-weight: 950;
	}

	.liangma-space-card p {
		font-size: 0.66rem;
		font-weight: 700;
		line-height: 1.35;
		opacity: 0.7;
	}

	.liangma-impact-panel {
		grid-template-rows: auto minmax(0, 1fr) auto;
		align-content: start;
		background:
			linear-gradient(155deg, rgba(255, 169, 255, 0.13), transparent 62%),
			rgba(255, 255, 255, 0.065);
	}

	.liangma-impact-bars {
		display: grid;
		grid-template-rows: repeat(6, minmax(0, 1fr));
		gap: 0.35rem;
		align-content: center;
	}

	.liangma-impact-row {
		display: grid;
		grid-template-columns: 10.25rem minmax(0, 1fr) 7.15rem;
		gap: 0.55rem;
		align-items: center;
		width: 100%;
		min-height: 48px;
		padding: 0.16rem 0;
		background: transparent;
	}

	.liangma-impact-row > div {
		display: grid;
		gap: 0.05rem;
	}

	.liangma-impact-row span {
		font-size: 0.73rem;
		font-weight: 950;
		line-height: 1.2;
	}

	.liangma-impact-row small {
		font-size: 0.58rem;
		font-weight: 800;
		opacity: 0.58;
	}

	.liangma-impact-row > i {
		display: block;
		height: 14px;
		border-radius: 4px;
		background: color-mix(in srgb, currentColor 10%, transparent);
		overflow: hidden;
	}

	.liangma-impact-row > i > i {
		display: block;
		width: var(--w);
		height: 100%;
		border-radius: inherit;
		background: linear-gradient(90deg, var(--line-stroke), rgba(255, 169, 255, 0.92));
	}

	.liangma-impact-row > strong {
		width: 100%;
		font-family: var(--font-accent);
		font-size: clamp(1.15rem, 1.8vw, 1.55rem);
		font-weight: 400;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		text-align: right;
		white-space: nowrap;
	}

	.liangma-impact-note {
		padding-top: 0.48rem;
		border-top: 1px dashed color-mix(in srgb, currentColor 24%, transparent);
		font-size: 0.66rem;
		font-weight: 750;
		line-height: 1.45;
		opacity: 0.68;
	}

	.liangma-spotlights {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		grid-auto-rows: 1fr;
		gap: 0.65rem;
	}

	.liangma-spotlight {
		display: grid;
		grid-template-rows: 1.65rem minmax(2.2rem, auto) 1rem;
		gap: 0.12rem;
		align-content: stretch;
		min-width: 0;
		min-height: 80px;
		padding: 0.55rem 0.75rem;
		border-radius: 10px;
		background: color-mix(in srgb, var(--text-bg) 62%, transparent);
		transition: opacity 220ms ease, transform 220ms ease, background 220ms ease, box-shadow 220ms ease;
	}

	.liangma-spotlight strong {
		font-family: var(--font-display);
		font-size: clamp(1.05rem, 1.65vw, 1.35rem);
		white-space: nowrap;
	}

	.liangma-spotlight span {
		font-size: 0.68rem;
		font-weight: 900;
		line-height: 1.2;
	}

	.liangma-spotlight small {
		font-size: 0.6rem;
		font-weight: 850;
		opacity: 0.62;
		line-height: 1.25;
	}

	.liangma-space-card,
	.liangma-spotlight {
		opacity: 0;
	}

	.chart-shell.is-visible .liangma-space-card {
		animation: liangma-card-in 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(var(--i) * 65ms);
	}

	.chart-shell.is-visible .liangma-spotlight {
		animation: liangma-card-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.chart-shell.is-visible .liangma-spotlight:nth-child(2) { animation-delay: 70ms; }
	.chart-shell.is-visible .liangma-spotlight:nth-child(3) { animation-delay: 140ms; }
	.chart-shell.is-visible .liangma-spotlight:nth-child(4) { animation-delay: 210ms; }
	.chart-shell.is-visible .liangma-spotlight:nth-child(5) { animation-delay: 280ms; }

	.liangma-impact-row > i > i {
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 820ms cubic-bezier(0.22, 1, 0.36, 1), filter 220ms ease;
	}

	.chart-shell.is-visible .liangma-impact-row > i > i { transform: scaleX(1); }

	.liangma-metrics-stage .is-dimmed {
		opacity: 0.22 !important;
		filter: saturate(0.55);
	}

	.liangma-metrics-stage .is-related {
		opacity: 1 !important;
		box-shadow:
			0 0 0 2px color-mix(in srgb, var(--line-stroke) 66%, transparent),
			4px 5px 0 color-mix(in srgb, currentColor 13%, transparent);
	}

	.liangma-space-card:hover,
	.liangma-space-card:focus-visible,
	.liangma-spotlight:hover,
	.liangma-spotlight:focus-visible {
		transform: translateY(-3px);
		background: color-mix(in srgb, var(--text-bg) 86%, var(--line-stroke) 14%);
	}

	.liangma-impact-row { transition: opacity 220ms ease, transform 220ms ease; }
	.liangma-impact-row:hover { transform: translateX(3px); }
	.liangma-impact-row:hover > i > i { filter: brightness(1.16) saturate(1.14); }
	.liangma-space-card:focus-visible,
	.liangma-impact-row:focus-visible,
	.liangma-spotlight:focus-visible { outline: 2px dashed currentColor; outline-offset: 3px; }

	@keyframes liangma-card-in {
		from { opacity: 0; transform: translateY(18px) scale(0.98); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	}

	.chart-shell.liangmaheMetrics h3 {
		font-size: clamp(1.65rem, 3.3vw, 2.35rem);
	}

	.chart-shell.liangmaheMetrics .dek {
		font-size: clamp(15px, 0.95vw, 17px);
	}

	.river-bars-stage {
		min-height: 0;
		padding: clamp(0.75rem, 2vw, 1rem);
	}

	.river-bars-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.65fr) minmax(320px, 0.85fr);
		gap: clamp(1rem, 2.4vw, 1.75rem);
		align-items: start;
	}

	.river-bars-chart {
		display: grid;
		gap: 0.65rem;
		min-width: 0;
	}

	.river-bars-legend,
	.river-status-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.36rem;
		align-items: center;
	}

	.river-bars-legend span,
	.river-status-legend span {
		display: inline-flex;
		gap: 0.32rem;
		align-items: center;
		padding: 0.2rem 0.42rem;
		border: 1.5px solid var(--border);
		border-radius: 999px;
		background: var(--text-bg);
		box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.12);
		font-size: 0.68rem;
		font-weight: 900;
	}

	.legend-dot,
	.status-key i {
		display: inline-block;
		width: 0.62rem;
		aspect-ratio: 1;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: var(--line-stroke);
	}

	.river-bars-plot {
		position: relative;
		display: grid;
		grid-template-columns: repeat(5, minmax(92px, 1fr));
		column-gap: clamp(0.75rem, 1.8vw, 1.35rem);
		align-items: end;
		min-height: 0;
		padding: 0.45rem 0.2rem 0.2rem;
		border-bottom: 2px solid currentColor;
	}

	.river-bars-plot::before,
	.river-bars-plot::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		border-top: 1px dashed currentColor;
		opacity: 0.2;
		pointer-events: none;
	}

	.river-bars-plot::before {
		top: 31%;
	}

	.river-bars-plot::after {
		top: 62%;
	}

	.river-city-group {
		appearance: none;
		display: grid;
		grid-template-rows: 76px 250px;
		gap: 0.45rem;
		align-self: end;
		min-width: 0;
		padding: 0;
		border: 0;
		background: transparent;
		color: currentColor;
		font: inherit;
		text-align: center;
		cursor: default;
		transition:
			opacity 180ms ease,
			transform 180ms ease;
	}

	.river-city-group:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 4px;
	}

	.river-bars-has-hover .river-city-group:not(.is-active) {
		opacity: 0.86;
		filter: saturate(0.94);
	}

	.river-bars-has-hover .river-city-group.is-active {
		opacity: 1;
		transform: translateY(-2px);
	}

	.river-city-group.is-accent .city-name,
	.river-bars-has-hover .river-city-group.is-active .type-tag,
	.river-bars-has-hover .river-city-group.is-active .city-name {
		border-style: solid;
		box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.16);
	}

	.river-city-head {
		display: grid;
		align-content: start;
		justify-items: center;
		gap: 0.18rem;
		min-height: 76px;
	}

	.city-name {
		justify-self: center;
		padding: 0.12rem 0.42rem;
		border: 1.5px solid var(--border);
		border-radius: 999px;
		background: var(--text-bg);
		font-family: var(--font-display);
		font-size: clamp(0.95rem, 1.8vw, 1.25rem);
		line-height: 1;
	}

	.project-name,
	.type-tag,
	.bar-label {
		overflow-wrap: anywhere;
		font-size: 0.65rem;
		font-weight: 900;
		line-height: 1.16;
	}

	.project-name {
		min-height: 2.2em;
		opacity: 0.86;
	}

	.type-tag {
		justify-self: center;
		max-width: 100%;
		padding: 0.12rem 0.3rem;
		border: 1px dashed currentColor;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.16);
	}

	.bar-cluster {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.28rem;
		align-items: end;
		height: 250px;
		margin-top: 0;
	}

	.river-bar {
		display: grid;
		grid-template-rows: 1fr auto;
		gap: 0.2rem;
		align-items: end;
		min-width: 0;
		height: 100%;
	}

	.bar-track {
		display: flex;
		align-items: end;
		height: 100%;
		min-height: 0;
		border: 1.5px solid var(--border);
		border-radius: 999px 999px 4px 4px;
		background: rgba(255, 255, 255, 0.2);
		overflow: hidden;
		transition:
			box-shadow 180ms ease,
			border-color 180ms ease,
			filter 180ms ease;
	}

	.bar-fill {
		display: block;
		width: 100%;
		height: var(--h);
		min-height: 4px;
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform 720ms cubic-bezier(0.2, 0.72, 0.18, 1);
		transition-delay: var(--delay);
	}

	.is-visible .bar-fill {
		transform: scaleY(1);
	}

	.status-hard .bar-fill {
		background: var(--line-stroke);
	}

	.river-bars-has-hover .river-city-group.is-active .status-hard .bar-fill {
		background: color-mix(in srgb, var(--line-stroke) 84%, currentColor);
		filter: saturate(1.25);
	}

	.status-partial .bar-fill {
		background: repeating-linear-gradient(
			45deg,
			var(--line-stroke) 0 6px,
			rgba(255, 255, 255, 0.42) 6px 10px
		);
	}

	.river-bars-has-hover .river-city-group.is-active .status-partial .bar-fill {
		background: repeating-linear-gradient(
			45deg,
			color-mix(in srgb, var(--line-stroke) 84%, currentColor) 0 6px,
			rgba(255, 255, 255, 0.48) 6px 10px
		);
		filter: saturate(1.25);
	}

	.status-context .bar-track {
		border-style: dashed;
		opacity: 0.78;
	}

	.status-context .bar-fill {
		background: rgba(255, 255, 255, 0.16);
		box-shadow: inset 0 0 0 2px var(--line-stroke);
		opacity: 0.72;
	}

	.river-bars-has-hover .river-city-group.is-active .bar-track,
	.river-bars-has-hover .river-city-group.is-active .river-bar.is-metric-active .bar-track {
		box-shadow:
			0 0 0 2px color-mix(in srgb, currentColor 70%, transparent),
			0 0 12px rgba(255, 255, 255, 0.26);
	}

	.river-bars-has-hover .river-city-group.is-active .river-bar.is-metric-active .bar-fill {
		filter: saturate(1.45) brightness(1.04);
	}

	.bar-label {
		display: grid;
		place-items: start center;
		min-height: 22px;
	}

	.river-hover-panel {
		align-self: start;
		display: grid;
		gap: 0.42rem;
		min-width: 0;
		max-height: 380px;
		padding-left: 0.9rem;
		border-left: 3px solid currentColor;
		overflow: auto;
	}

	.panel-eyebrow {
		font-size: 0.7rem;
		font-weight: 900;
		text-transform: uppercase;
		opacity: 0.72;
	}

	.river-hover-panel h4 {
		font-family: var(--font-display);
		font-size: clamp(1.05rem, 1.8vw, 1.45rem);
		line-height: 1.05;
		text-transform: uppercase;
	}

	.panel-type,
	.source-label {
		font-size: 0.76rem;
		font-weight: 900;
		line-height: 1.35;
		opacity: 0.84;
	}

	.raw-grid {
		display: grid;
		gap: 0.26rem;
	}

	.raw-grid div {
		display: grid;
		grid-template-columns: minmax(4.8em, auto) minmax(0, 1fr) auto;
		gap: 0.12rem 0.45rem;
		align-items: baseline;
		padding-bottom: 0.28rem;
		border-bottom: 1px dashed color-mix(in srgb, currentColor 36%, transparent);
	}

	.raw-grid div.active {
		padding-left: 0.3rem;
		border-left: 3px solid currentColor;
	}

	.raw-grid strong {
		font-size: 0.7rem;
		font-weight: 900;
	}

	.raw-grid span {
		font-size: 0.88rem;
		font-weight: 900;
		line-height: 1.18;
	}

	.raw-grid small,
	.context-chips span {
		font-size: 0.7rem;
		line-height: 1.32;
		opacity: 0.82;
	}

	.raw-grid small {
		grid-column: 2 / -1;
	}

	.raw-grid em {
		justify-self: start;
		font-style: normal;
		font-size: 0.64rem;
		font-weight: 900;
		opacity: 0.72;
	}

	.context-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.24rem;
		margin: 0;
	}

	.context-chips span {
		padding: 0.14rem 0.34rem;
		border: 1px dashed currentColor;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.14);
		font-weight: 800;
	}

	.river-status-legend {
		margin-top: -0.15rem;
		font-size: 0.64rem;
	}

	.river-status-legend span {
		box-shadow: none;
		padding-block: 0.16rem;
	}

	.status-key.partial i {
		background: repeating-linear-gradient(
			45deg,
			var(--line-stroke) 0 4px,
			rgba(255, 255, 255, 0.42) 4px 7px
		);
	}

	.status-key.context i {
		border-style: dashed;
		background: rgba(255, 255, 255, 0.16);
	}

	.guard-stage {
		display: grid;
		gap: clamp(1.2rem, 2.6vw, 1.65rem);
		min-height: 0;
		padding: clamp(0.7rem, 2vw, 1rem);
		border: 0;
		background: transparent;
		overflow: visible;
	}

	.guard-lens,
	.guard-chain-section {
		display: grid;
		gap: 0.72rem;
		min-width: 0;
	}

	.guard-section-title {
		display: grid;
		gap: 0.22rem;
	}

	.guard-section-title p {
		font-size: 0.68rem;
		font-weight: 900;
		letter-spacing: 0;
		text-transform: uppercase;
		opacity: 0.72;
	}

	.guard-section-title h4 {
		font-family: var(--font-display);
		font-size: clamp(1.18rem, 2.2vw, 1.7rem);
		line-height: 1.05;
		text-transform: uppercase;
	}

	.guard-section-title span,
	.lens-conclusion,
	.guard-summary,
	.guard-hover-text {
		max-width: 860px;
		font-size: 0.78rem;
		font-weight: 800;
		line-height: 1.38;
		opacity: 0.84;
	}

	.guard-lens-track {
		position: relative;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: clamp(0.45rem, 1.5vw, 0.85rem);
		align-items: center;
		min-height: 138px;
		padding: 1.1rem 0.35rem 0.45rem;
	}

	.guard-lens-line {
		position: absolute;
		left: 2%;
		right: 2%;
		top: 50%;
		height: 3px;
		border-radius: 999px;
		background: currentColor;
		opacity: 0.58;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 760ms cubic-bezier(0.2, 0.72, 0.18, 1);
	}

	.is-visible .guard-lens-line {
		transform: scaleX(1);
	}

	.lens-node {
		position: relative;
		z-index: 2;
		display: grid;
		justify-items: center;
		gap: 0.16rem;
		min-width: 0;
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 360ms ease,
			transform 360ms ease;
		transition-delay: calc(160ms + var(--i) * 95ms);
		text-align: center;
	}

	.is-visible .lens-node {
		opacity: 1;
		transform: translateY(0);
	}

	.lens-node::before {
		content: "";
		width: 18px;
		aspect-ratio: 1;
		border: 2px solid var(--border);
		border-radius: 50%;
		background: var(--line-stroke);
		box-shadow: 0 0 0 5px var(--text-bg);
	}

	.lens-node.status-partial::before {
		background: repeating-linear-gradient(
			45deg,
			var(--line-stroke) 0 5px,
			rgba(255, 255, 255, 0.42) 5px 8px
		);
	}

	.lens-node strong {
		font-family: var(--font-display);
		font-size: clamp(1.2rem, 2.5vw, 1.85rem);
		line-height: 1;
	}

	.lens-node small {
		margin-left: 0.08rem;
		font-family: var(--font-sans);
		font-size: 0.62rem;
		font-weight: 900;
	}

	.lens-node span {
		font-size: 0.68rem;
		font-weight: 900;
		line-height: 1.18;
		overflow-wrap: anywhere;
	}

	.guard-chain-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.72fr) minmax(280px, 0.78fr);
		gap: clamp(0.9rem, 2vw, 1.35rem);
		align-items: start;
	}

	.guard-route-map {
		display: grid;
		gap: 0.36rem;
		min-width: 0;
	}

	.guard-column-heads,
	.guard-route {
		display: grid;
		grid-template-columns: minmax(108px, 0.42fr) minmax(0, 1fr);
		gap: 0.75rem;
		align-items: center;
	}

	.guard-column-heads {
		font-size: 0.64rem;
		font-weight: 900;
		line-height: 1.18;
		opacity: 0.78;
	}

	.guard-node-heads {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(0.45rem, 1.4vw, 0.8rem);
		text-align: center;
	}

	.guard-routes {
		display: grid;
		gap: 0.62rem;
	}

	.guard-route {
		opacity: 1;
		transition:
			opacity 180ms ease,
			transform 180ms ease,
			filter 180ms ease;
	}

	.guard-has-hover .guard-route:not(.is-active) {
		opacity: 0.86;
		filter: saturate(0.94);
	}

	.guard-has-hover .guard-route.is-active {
		transform: translateX(2px);
	}

	.guard-route-label {
		display: grid;
		gap: 0.08rem;
		align-content: center;
		min-width: 0;
	}

	.guard-route-label strong {
		font-family: var(--font-display);
		font-size: clamp(1rem, 1.7vw, 1.28rem);
		line-height: 1;
	}

	.guard-route-label span,
	.guard-route-label small {
		font-size: 0.68rem;
		font-weight: 900;
		line-height: 1.2;
		opacity: 0.84;
	}

	.guard-route-line {
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(0.45rem, 1.4vw, 0.8rem);
		align-items: center;
		min-width: 0;
	}

	.guard-route-line::before {
		content: "";
		position: absolute;
		left: 6%;
		right: 6%;
		top: 23px;
		height: 2px;
		border-radius: 999px;
		background: currentColor;
		opacity: 0.4;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 640ms cubic-bezier(0.2, 0.72, 0.18, 1);
		transition-delay: calc(240ms + var(--i, 0) * 120ms);
	}

	.is-visible .guard-route-line::before {
		transform: scaleX(1);
	}

	.guard-route.is-active .guard-route-line::before {
		height: 3px;
		opacity: 0.68;
	}

	.guard-node {
		position: relative;
		z-index: 2;
		appearance: none;
		display: grid;
		gap: 0.12rem;
		justify-items: center;
		min-width: 0;
		min-height: 74px;
		padding: 0 0.16rem;
		border: 0;
		border-radius: 0;
		background: transparent;
		color: currentColor;
		font: inherit;
		text-align: center;
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 360ms ease,
			transform 360ms ease,
			box-shadow 180ms ease,
			filter 180ms ease;
		transition-delay: calc(310ms + var(--i, 0) * 120ms + var(--j, 0) * 65ms);
	}

	.is-visible .guard-node {
		opacity: 1;
		transform: translateY(0);
	}

	.guard-node::before {
		content: "";
		width: 18px;
		aspect-ratio: 1;
		border: 2px solid var(--border);
		border-radius: 50%;
		background: var(--line-stroke);
		box-shadow: 0 0 0 5px var(--text-bg);
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			filter 180ms ease;
	}

	.guard-node.status-partial::before {
		background: repeating-linear-gradient(
			45deg,
			var(--line-stroke) 0 4px,
			rgba(255, 255, 255, 0.42) 4px 7px
		);
	}

	.guard-node.status-context::before {
		border-style: dashed;
		background: rgba(255, 255, 255, 0.16);
	}

	.guard-route.is-active .guard-node,
	.guard-node.is-node-active {
		filter: saturate(1.14);
	}

	.guard-route.is-active .guard-node::before {
		box-shadow:
			0 0 0 5px var(--text-bg),
			0 0 0 8px color-mix(in srgb, currentColor 26%, transparent);
	}

	.guard-node.is-node-active {
		transform: translateY(-2px);
	}

	.guard-node.is-node-active::before {
		transform: scale(1.18);
		filter: saturate(1.28) brightness(1.04);
		box-shadow:
			0 0 0 5px var(--text-bg),
			0 0 0 9px color-mix(in srgb, currentColor 38%, transparent),
			0 0 14px rgba(255, 255, 255, 0.28);
	}

	.guard-node span,
	.guard-node strong {
		max-width: 100%;
		overflow-wrap: anywhere;
		line-height: 1.14;
	}

	.guard-node span {
		font-size: 0.6rem;
		font-weight: 900;
		opacity: 0.8;
	}

	.guard-node strong {
		font-size: 0.82rem;
		font-weight: 900;
	}

	.guard-detail-panel {
		align-self: start;
		display: grid;
		gap: 0.34rem;
		max-height: 340px;
		padding-left: 0.9rem;
		border-left: 3px solid currentColor;
		overflow: auto;
		scrollbar-color: currentColor transparent;
		scrollbar-width: thin;
	}

	.guard-detail-panel::-webkit-scrollbar {
		width: 6px;
	}

	.guard-detail-panel::-webkit-scrollbar-track {
		background: transparent;
	}

	.guard-detail-panel::-webkit-scrollbar-thumb {
		border-radius: 999px;
		background: color-mix(in srgb, currentColor 58%, transparent);
	}

	.guard-detail-panel h4 {
		font-family: var(--font-display);
		font-size: clamp(1.06rem, 1.8vw, 1.45rem);
		line-height: 1.05;
		text-transform: uppercase;
	}

	.guard-detail-grid {
		display: grid;
		gap: 0.28rem;
	}

	.guard-detail-grid div {
		display: grid;
		grid-template-columns: minmax(5.5em, auto) minmax(0, 1fr) auto;
		gap: 0.1rem 0.44rem;
		align-items: baseline;
		padding-bottom: 0.22rem;
		border-bottom: 1px dashed color-mix(in srgb, currentColor 36%, transparent);
	}

	.guard-detail-grid div.active {
		padding-left: 0.3rem;
		border-left: 3px solid currentColor;
	}

	.guard-detail-grid strong,
	.guard-detail-grid em {
		font-size: 0.68rem;
		font-weight: 900;
		font-style: normal;
	}

	.guard-detail-grid span {
		font-size: 0.82rem;
		font-weight: 900;
	}

	.guard-detail-grid small {
		grid-column: 2 / -1;
		font-size: 0.68rem;
		line-height: 1.3;
		opacity: 0.82;
	}

	.guard-status-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.36rem;
		align-items: center;
		margin-top: -0.2rem;
		font-size: 0.64rem;
	}

	.guard-status-legend span {
		display: inline-flex;
		gap: 0.32rem;
		align-items: center;
		padding: 0.16rem 0.42rem;
		border: 1.5px solid var(--border);
		border-radius: 999px;
		background: var(--text-bg);
		font-weight: 900;
	}

	.chart-shell.nightGuardChain {
		gap: 0.55rem;
		padding: clamp(0.85rem, 1.55vw, 1.12rem);
	}

	.chart-shell.nightGuardChain .chart-head {
		gap: 0.32rem;
	}

	.chart-shell.nightGuardChain h3 {
		font-size: clamp(1.58rem, 3vw, 2.12rem);
	}

	.chart-shell.nightGuardChain .dek {
		max-width: min(76%, 900px);
		font-size: clamp(14px, 0.9vw, 16px);
		line-height: 1.38;
	}

	.chart-shell.nightGuardChain .chart-footnotes {
		gap: 0.12rem;
		padding-top: 0.42rem;
		font-size: 0.6rem;
		line-height: 1.28;
		opacity: 0.7;
	}

	.guard-stage {
		gap: clamp(0.62rem, 1.4vw, 0.9rem);
		padding: clamp(0.42rem, 1vw, 0.65rem);
	}

	.guard-lens,
	.guard-chain-section {
		gap: 0.46rem;
	}

	.guard-section-title {
		gap: 0.12rem;
	}

	.guard-section-title p {
		font-size: 0.58rem;
		opacity: 0.68;
	}

	.guard-section-title h4 {
		font-size: clamp(1rem, 1.85vw, 1.34rem);
		line-height: 1;
	}

	.guard-section-title span,
	.lens-conclusion,
	.guard-summary,
	.guard-hover-text {
		font-size: 0.68rem;
		line-height: 1.3;
	}

	.guard-lens-track {
		min-height: 98px;
		padding: 0.68rem 0.2rem 0.18rem;
		gap: clamp(0.32rem, 1vw, 0.55rem);
	}

	.guard-lens-line {
		height: 2px;
		opacity: 0.5;
	}

	.lens-node {
		gap: 0.08rem;
	}

	.lens-node::before {
		width: 14px;
		border-width: 1.5px;
		box-shadow: 0 0 0 4px var(--text-bg);
	}

	.lens-node strong {
		font-size: clamp(1rem, 1.8vw, 1.42rem);
	}

	.lens-node small {
		font-size: 0.5rem;
	}

	.lens-node span {
		font-size: 0.58rem;
		line-height: 1.12;
	}

	.guard-chain-layout {
		grid-template-columns: minmax(0, 1.56fr) minmax(245px, 0.72fr);
		gap: clamp(0.62rem, 1.4vw, 0.9rem);
	}

	.guard-route-map {
		gap: 0.22rem;
	}

	.guard-column-heads,
	.guard-route {
		grid-template-columns: minmax(86px, 0.32fr) minmax(0, 1fr);
		gap: 0.5rem;
	}

	.guard-column-heads {
		font-size: 0.56rem;
	}

	.guard-node-heads,
	.guard-route-line {
		gap: clamp(0.28rem, 0.9vw, 0.48rem);
	}

	.guard-routes {
		gap: 0.34rem;
	}

	.guard-route-label {
		gap: 0.02rem;
	}

	.guard-route-label strong {
		font-size: clamp(0.85rem, 1.35vw, 1.05rem);
	}

	.guard-route-label span,
	.guard-route-label small {
		font-size: 0.56rem;
		line-height: 1.12;
	}

	.guard-route-line::before {
		top: 18px;
		height: 1.5px;
		opacity: 0.34;
	}

	.guard-route.is-active .guard-route-line::before {
		height: 2px;
	}

	.guard-node {
		gap: 0.06rem;
		min-height: 58px;
		padding: 0 0.08rem;
	}

	.guard-node::before {
		width: 14px;
		border-width: 1.5px;
		box-shadow: 0 0 0 4px var(--text-bg);
	}

	.guard-route.is-active .guard-node::before {
		box-shadow:
			0 0 0 4px var(--text-bg),
			0 0 0 6px color-mix(in srgb, currentColor 22%, transparent);
	}

	.guard-node.is-node-active::before {
		box-shadow:
			0 0 0 4px var(--text-bg),
			0 0 0 7px color-mix(in srgb, currentColor 34%, transparent),
			0 0 10px rgba(255, 255, 255, 0.24);
	}

	.guard-node span {
		font-size: 0.52rem;
		line-height: 1.08;
	}

	.guard-node strong {
		font-size: 0.7rem;
		line-height: 1.08;
	}

	.guard-detail-panel {
		gap: 0.22rem;
		max-height: 255px;
		padding-left: 0.62rem;
		border-left-width: 2px;
		scrollbar-width: none;
	}

	.guard-detail-panel::-webkit-scrollbar {
		width: 0;
	}

	.guard-detail-panel h4 {
		font-size: clamp(0.88rem, 1.35vw, 1.08rem);
	}

	.guard-detail-grid {
		gap: 0.16rem;
	}

	.guard-detail-grid div {
		grid-template-columns: minmax(4.6em, auto) minmax(0, 1fr) auto;
		gap: 0.06rem 0.3rem;
		padding-bottom: 0.14rem;
	}

	.guard-detail-grid strong,
	.guard-detail-grid em {
		font-size: 0.56rem;
	}

	.guard-detail-grid span {
		font-size: 0.68rem;
	}

	.guard-detail-grid small {
		font-size: 0.56rem;
		line-height: 1.22;
	}

	.guard-status-legend {
		gap: 0.24rem;
		margin-top: -0.1rem;
		font-size: 0.56rem;
	}

	.guard-status-legend span {
		gap: 0.22rem;
		padding: 0.1rem 0.34rem;
		border-color: color-mix(in srgb, currentColor 42%, transparent);
		box-shadow: none;
	}

	.performance-collection-stage {
		display: grid;
		gap: 0.82rem;
		min-height: 0;
		padding: clamp(0.75rem, 2vw, 1rem);
		border: 0;
		background: transparent;
		overflow: visible;
	}

	.performance-collection-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(320px, 0.84fr);
		gap: clamp(0.9rem, 2vw, 1.35rem);
		align-items: start;
	}

	.performance-main-panel,
	.performance-cluster-panel {
		min-width: 0;
	}

	.performance-main-panel {
		display: grid;
		gap: 0.84rem;
		padding: clamp(0.7rem, 1.8vw, 0.95rem);
		border: 1.5px solid color-mix(in srgb, currentColor 42%, transparent);
		border-radius: calc(var(--radius) * 0.62);
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.16), transparent 42%),
			color-mix(in srgb, var(--text-bg) 50%, transparent);
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.12),
			0 12px 24px rgba(0, 0, 0, 0.1);
	}

	.performance-collection-top {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem 0.6rem;
		align-items: center;
		justify-content: space-between;
	}

	.performance-collection-top p,
	.comparison-footnote,
	.performance-source-note {
		margin: 0;
		font-size: 0.7rem;
		font-weight: 900;
		line-height: 1.35;
		opacity: 0.82;
	}

	.performance-badge {
		display: inline-flex;
		align-items: center;
		width: fit-content;
		padding: 0.16rem 0.48rem;
		border: 1.5px solid var(--border);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.12);
		font-size: 0.66rem;
		font-weight: 1000;
		letter-spacing: 0;
	}

	.main-comparison-chart {
		display: grid;
		gap: 0.72rem;
	}

	.comparison-row {
		appearance: none;
		display: grid;
		grid-template-columns: minmax(5.8rem, 0.27fr) minmax(0, 1fr) minmax(4.15rem, auto);
		gap: 0.72rem;
		align-items: center;
		width: 100%;
		padding: 0.72rem 0.78rem;
		border: 1.5px solid color-mix(in srgb, currentColor 34%, transparent);
		border-radius: calc(var(--radius) * 0.48);
		background: rgba(255, 255, 255, 0.09);
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: default;
		opacity: 0;
		transform: translateY(10px);
		transition:
			opacity 360ms ease,
			transform 360ms ease,
			border-color 180ms ease,
			background 180ms ease;
		transition-delay: calc(160ms + var(--i) * 80ms);
	}

	.is-visible .comparison-row {
		opacity: 1;
		transform: translateY(0);
	}

	.performance-has-hover .comparison-row:not(.is-active) {
		opacity: 0.64;
	}

	.comparison-row.is-active,
	.comparison-row:focus-visible {
		border-color: var(--border);
		background: rgba(255, 255, 255, 0.15);
		outline: 0;
	}

	.comparison-label {
		display: grid;
		gap: 0.12rem;
		align-content: center;
	}

	.comparison-label strong {
		font-family: var(--font-display);
		font-size: clamp(0.92rem, 1.3vw, 1.18rem);
		line-height: 0.95;
	}

	.comparison-label small,
	.comparison-note {
		font-size: 0.62rem;
		font-weight: 900;
		opacity: 0.72;
	}

	.comparison-bars {
		display: grid;
		gap: 0.4rem;
		min-width: 0;
	}

	.comparison-bar-line {
		display: grid;
		grid-template-columns: 2.25rem minmax(0, 1fr) minmax(5rem, auto);
		gap: 0.48rem;
		align-items: center;
	}

	.comparison-bar-line > span,
	.comparison-bar-line em {
		font-size: 0.64rem;
		font-weight: 1000;
		font-style: normal;
		line-height: 1;
	}

	.comparison-track {
		position: relative;
		display: block;
		height: 1.08rem;
		border: 1px solid color-mix(in srgb, currentColor 32%, transparent);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
		overflow: hidden;
	}

	.comparison-fill {
		position: absolute;
		inset: 0 auto 0 0;
		width: var(--w);
		border-radius: inherit;
		background: linear-gradient(90deg, var(--line-stroke), rgba(255, 255, 255, 0.92));
		box-shadow:
			inset -8px -6px 0 rgba(0, 0, 0, 0.14),
			0 0 14px color-mix(in srgb, var(--line-stroke) 28%, transparent);
		transform-origin: left center;
		transform: scaleX(0);
		transition: transform 620ms cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.national .comparison-fill {
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.72));
		box-shadow: inset -7px -5px 0 rgba(0, 0, 0, 0.1);
	}

	.is-visible .comparison-fill {
		transform: scaleX(1);
	}

	.ratio-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 4.7rem;
		padding: 0.18rem 0.42rem;
		border: 1.5px solid var(--border);
		border-radius: 999px;
		background: color-mix(in srgb, var(--line-stroke) 28%, transparent);
		font-family: var(--font-display);
		font-size: clamp(0.82rem, 1.12vw, 1.02rem);
		line-height: 1;
	}

	.comparison-note {
		grid-column: 2 / 4;
		margin-top: -0.18rem;
	}

	.mini-bar-row > i {
		position: relative;
		display: block;
		height: 0.64rem;
		border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
		overflow: hidden;
	}

	.mini-bar-row > i > i {
		position: absolute;
		inset: 0 auto 0 0;
		width: var(--w);
		border-radius: inherit;
		background: color-mix(in srgb, var(--line-stroke) 76%, white 12%);
	}

	.performance-cluster-panel {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.62rem;
	}

	.mini-chart-card {
		display: grid;
		gap: 0.46rem;
		min-width: 0;
		padding: 0.6rem;
		border: 1.5px solid color-mix(in srgb, currentColor 38%, transparent);
		border-radius: calc(var(--radius) * 0.5);
		background:
			linear-gradient(145deg, rgba(255, 255, 255, 0.14), transparent 48%),
			color-mix(in srgb, var(--text-bg) 48%, transparent);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
	}

	.mini-chart-card h4 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(0.74rem, 0.95vw, 0.92rem);
		line-height: 0.98;
	}

	.mini-chart-card small {
		font-size: 0.6rem;
		font-weight: 900;
		font-style: normal;
		line-height: 1.25;
		opacity: 0.76;
	}

	.mini-bar-list {
		display: grid;
		gap: 0.44rem;
	}

	.mini-bar-list.compact {
		gap: 0.34rem;
	}

	.mini-bar-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 0.12rem 0.42rem;
		align-items: center;
	}

	.mini-bar-row span,
	.mini-bar-row strong {
		font-size: 0.58rem;
		font-weight: 1000;
		line-height: 1.15;
	}

	.mini-bar-row span {
		grid-column: 1;
		grid-row: 1;
		overflow-wrap: anywhere;
	}

	.mini-bar-row strong {
		grid-column: 2;
		grid-row: 1;
		justify-self: end;
		white-space: nowrap;
	}

	.mini-bar-row > i {
		grid-column: 1 / -1;
		grid-row: 2;
		width: 100%;
	}

	.performance-source-note {
		padding-top: 0.62rem;
		border-top: 1px dashed color-mix(in srgb, currentColor 38%, transparent);
	}

	.chart-shell.performanceBubbleMap {
		gap: 0.48rem;
		padding: clamp(0.85rem, 1.55vw, 1.12rem);
	}

	.chart-shell.performanceBubbleMap .chart-head {
		gap: 0.34rem;
		max-width: none;
	}

	.chart-shell.performanceBubbleMap .chart-kicker {
		opacity: 0.78;
	}

	.chart-shell.performanceBubbleMap .chart-kicker p {
		font-size: 0.7rem;
	}

	.chart-shell.performanceBubbleMap .confidence {
		padding: 0.1rem 0.38rem;
		font-size: 0.62rem;
		box-shadow: none;
	}

	.chart-shell.performanceBubbleMap h3 {
		font-size: clamp(1.62rem, 3.2vw, 2.22rem);
	}

	.chart-shell.performanceBubbleMap .dek {
		max-width: min(72%, 860px);
		font-size: clamp(14px, 0.92vw, 16px);
		line-height: 1.38;
	}

	.chart-shell.performanceBubbleMap .chart-canvas {
		display: grid;
	}

	.performance-collection-stage {
		padding: clamp(0.44rem, 1vw, 0.66rem);
	}

	.performance-collection-layout {
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: clamp(0.75rem, 1.45vw, 1rem);
		align-items: stretch;
	}

	.performance-main-panel {
		grid-template-rows: auto minmax(0, 1fr) auto;
		gap: 0.38rem;
		height: 100%;
		padding: clamp(0.5rem, 0.9vw, 0.68rem);
		border-color: color-mix(in srgb, currentColor 18%, transparent);
		background:
			linear-gradient(145deg, rgba(255, 255, 255, 0.11), transparent 44%),
			linear-gradient(180deg, rgba(127, 205, 190, 0.13), rgba(255, 255, 255, 0.04));
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
	}

	.performance-collection-top p {
		font-size: 0.64rem;
		opacity: 0.76;
	}

	.performance-badge {
		border-color: color-mix(in srgb, currentColor 32%, transparent);
		background: rgba(255, 255, 255, 0.08);
		box-shadow: none;
	}

	.main-comparison-chart {
		align-content: stretch;
		gap: 0.16rem;
		min-height: 0;
	}

	.comparison-row {
		position: relative;
		grid-template-columns: minmax(4rem, 0.18fr) minmax(0, 1fr) minmax(3.25rem, auto);
		gap: 0.4rem;
		align-content: center;
		min-height: 0;
		padding: 0.42rem 0.12rem 0.42rem 0.52rem;
		border: 0;
		border-radius: calc(var(--radius) * 0.35);
		background: transparent;
		box-shadow: none;
	}

	.comparison-row + .comparison-row {
		border-top: 1px dashed color-mix(in srgb, currentColor 16%, transparent);
	}

	.comparison-row::before {
		content: "";
		position: absolute;
		left: 0.1rem;
		top: 0.56rem;
		bottom: 0.56rem;
		width: 0.2rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--line-stroke) 78%, white 12%);
		opacity: 0.86;
	}

	.comparison-row:nth-child(2)::before {
		background: rgba(210, 188, 255, 0.9);
	}

	.comparison-row:nth-child(3)::before {
		background: rgba(255, 200, 136, 0.9);
	}

	.comparison-row.is-active,
	.comparison-row:focus-visible {
		background: rgba(255, 255, 255, 0.08);
	}

	.comparison-label strong {
		font-size: clamp(0.78rem, 1.05vw, 1rem);
	}

	.comparison-label small,
	.comparison-note {
		font-size: 0.56rem;
		opacity: 0.62;
	}

	.comparison-bars {
		gap: 0.3rem;
	}

	.comparison-bar-line {
		grid-template-columns: 1.85rem minmax(0, 1fr) minmax(4.15rem, auto);
		gap: 0.3rem;
	}

	.comparison-track {
		height: 0.96rem;
		border-color: color-mix(in srgb, currentColor 18%, transparent);
		background: rgba(255, 255, 255, 0.07);
	}

	.beijing .comparison-track {
		height: 1.2rem;
	}

	.national .comparison-track {
		height: 0.9rem;
	}

	.ratio-pill {
		min-width: 0;
		padding: 0;
		border: 0;
		background: transparent;
		color: color-mix(in srgb, var(--line-stroke) 82%, white 16%);
		font-size: clamp(0.9rem, 1.4vw, 1.18rem);
		text-shadow: 0 0 12px color-mix(in srgb, var(--line-stroke) 34%, transparent);
	}

	.comparison-note {
		grid-column: 2 / 4;
		margin-top: -0.22rem;
	}

	.comparison-footnote {
		padding-top: 0.22rem;
		font-size: 0.6rem;
		opacity: 0.66;
	}

	.daily-summary-strip {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.45rem;
		align-items: center;
		padding: 0.42rem 0.5rem;
		border-radius: calc(var(--radius) * 0.34);
		background: linear-gradient(90deg, rgba(255, 158, 196, 0.14), rgba(196, 175, 255, 0.1));
	}

	.daily-summary-strip h4 {
		max-width: 5.5rem;
		font-size: clamp(0.72rem, 0.95vw, 0.9rem);
		line-height: 0.98;
	}

	.daily-summary-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.28rem;
	}

	.daily-summary-grid div {
		display: grid;
		gap: 0.08rem;
		min-width: 0;
	}

	.daily-summary-grid strong {
		font-family: var(--font-display);
		font-size: clamp(0.94rem, 1.35vw, 1.2rem);
		line-height: 0.95;
	}

	.daily-summary-grid small {
		margin-left: 0.08rem;
		font-family: var(--font-body);
		font-size: 0.5rem;
		font-weight: 1000;
	}

	.daily-summary-grid span {
		font-size: 0.54rem;
		font-weight: 900;
		line-height: 1.15;
		opacity: 0.72;
	}

	.performance-cluster-panel {
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		grid-template-rows: auto minmax(0, 1fr) auto;
		gap: 0.48rem;
		height: 100%;
		align-items: stretch;
	}

	.mini-chart-card {
		align-content: start;
		height: 100%;
		padding: 0.5rem;
		border-color: color-mix(in srgb, currentColor 14%, transparent);
		background:
			linear-gradient(145deg, rgba(255, 255, 255, 0.11), transparent 54%),
			rgba(255, 255, 255, 0.055);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.055);
	}

	.growth-card {
		grid-column: 1 / -1;
	}

	.beyond-card {
		grid-column: 1 / -1;
	}

	.growth-card {
		background:
			linear-gradient(135deg, rgba(255, 142, 171, 0.18), transparent 58%),
			rgba(255, 255, 255, 0.055);
	}

	.beyond-card {
		background:
			linear-gradient(135deg, rgba(182, 160, 255, 0.16), transparent 58%),
			rgba(255, 255, 255, 0.055);
	}

	.growth-list {
		gap: 0.26rem;
	}

	.growth-row > i > i {
		background: linear-gradient(90deg, rgba(255, 151, 116, 0.98), color-mix(in srgb, var(--line-stroke) 82%, white 14%));
		box-shadow: 0 0 12px rgba(255, 151, 116, 0.22);
	}

	.two-col-bars {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.28rem 0.5rem;
	}

	.mini-bar-row > i {
		height: 0.82rem;
		border-color: color-mix(in srgb, currentColor 18%, transparent);
	}

	.growth-row > i {
		height: 1rem;
	}

	.two-col-bars .mini-bar-row > i {
		height: 0.72rem;
	}

	.mini-bar-row > i > i {
		background: linear-gradient(90deg, rgba(216, 191, 255, 0.78), rgba(255, 255, 255, 0.82));
	}

	.space-card .mini-bar-row > i > i {
		background: linear-gradient(90deg, rgba(255, 237, 251, 0.9), color-mix(in srgb, var(--line-stroke) 76%, white 18%));
	}

	.content-card .mini-bar-row > i > i {
		background: linear-gradient(90deg, rgba(204, 225, 255, 0.78), rgba(255, 255, 255, 0.82));
	}

	.chart-shell.performanceBubbleMap .chart-footnotes {
		gap: 0.12rem;
		padding-top: 0.42rem;
		border-top-color: color-mix(in srgb, currentColor 20%, transparent);
		font-size: 0.6rem;
		line-height: 1.28;
		opacity: 0.68;
	}

	.chart-shell.performanceBubbleMap .chart-footnotes p {
		grid-template-columns: 3.7em minmax(0, 1fr);
		gap: 0.38rem;
	}

	.performance-map-stage {
		display: grid;
		gap: 0.8rem;
		min-height: 0;
		padding: clamp(0.75rem, 2vw, 1rem);
		border: 0;
		background: transparent;
		overflow: visible;
	}

	.performance-map-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.55fr) minmax(300px, 0.85fr);
		gap: clamp(1rem, 2.4vw, 1.75rem);
		align-items: start;
	}

	.performance-plot-wrap {
		display: grid;
		gap: 0.52rem;
		min-width: 0;
	}

	.performance-plot {
		position: relative;
		min-height: 430px;
		padding: 1.1rem 1.1rem 2.2rem 2.55rem;
		border-left: 2px solid currentColor;
		border-bottom: 2px solid currentColor;
		overflow: visible;
	}

	.plot-grid {
		position: absolute;
		inset: 1.1rem 1.1rem 2.2rem 2.55rem;
		background:
			linear-gradient(to right, color-mix(in srgb, currentColor 16%, transparent) 1px, transparent 1px),
			linear-gradient(to bottom, color-mix(in srgb, currentColor 16%, transparent) 1px, transparent 1px);
		background-size: 25% 25%;
		opacity: 0;
		transition: opacity 520ms ease;
		pointer-events: none;
	}

	.is-visible .plot-grid {
		opacity: 0.58;
	}

	.plot-axis {
		position: absolute;
		display: grid;
		gap: 0.08rem;
		font-size: 0.68rem;
		font-weight: 900;
		line-height: 1.2;
		opacity: 0.84;
	}

	.plot-axis small {
		font-size: 0.6rem;
		opacity: 0.72;
	}

	.x-axis {
		right: 1rem;
		bottom: 0.25rem;
		text-align: right;
	}

	.y-axis {
		left: -0.2rem;
		top: 1rem;
		max-width: 7.5rem;
		transform: translateX(-18%) rotate(-90deg);
		transform-origin: left top;
	}

	.performance-bubble {
		position: absolute;
		left: var(--x);
		top: var(--y);
		z-index: 3;
		appearance: none;
		display: grid;
		place-items: center;
		width: var(--size);
		aspect-ratio: 1;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: transparent;
		color: currentColor;
		font: inherit;
		opacity: 0;
		transform: translate(-50%, -50%) scale(0.72);
		transition:
			opacity 360ms ease,
			transform 360ms ease,
			filter 180ms ease;
		transition-delay: calc(140ms + var(--i) * 85ms);
	}

	.is-visible .performance-bubble {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}

	.performance-has-hover .performance-bubble:not(.is-active) {
		opacity: 0.84;
		filter: saturate(0.9);
	}

	.performance-bubble.is-active {
		z-index: 6;
		transform: translate(-50%, -50%) scale(1.08);
		filter: saturate(1.2);
	}

	.bubble-core {
		width: 100%;
		aspect-ratio: 1;
		border: 2px solid var(--border);
		border-radius: 50%;
		background: color-mix(in srgb, var(--line-stroke) 74%, transparent);
		box-shadow:
			inset -8px -8px 0 rgba(0, 0, 0, 0.12),
			0 0 0 5px color-mix(in srgb, var(--text-bg) 78%, transparent);
		opacity: 0.72;
	}

	.performance-bubble.national .bubble-core {
		background: rgba(255, 255, 255, 0.22);
	}

	.performance-bubble.type .bubble-core {
		background: color-mix(in srgb, var(--line-stroke) 54%, transparent);
	}

	.performance-bubble.city .bubble-core,
	.performance-bubble.is-accent .bubble-core {
		background: var(--line-stroke);
		opacity: 0.95;
		box-shadow:
			inset -8px -8px 0 rgba(0, 0, 0, 0.14),
			0 0 0 6px color-mix(in srgb, currentColor 24%, transparent),
			0 0 18px rgba(255, 255, 255, 0.28);
	}

	.performance-bubble.is-active .bubble-core {
		box-shadow:
			inset -8px -8px 0 rgba(0, 0, 0, 0.14),
			0 0 0 7px color-mix(in srgb, currentColor 32%, transparent),
			0 0 20px rgba(255, 255, 255, 0.32);
	}

	.bubble-label {
		position: absolute;
		width: max-content;
		max-width: 8.8rem;
		padding: 0.12rem 0.34rem;
		border: 1.5px solid var(--border);
		border-radius: 999px;
		background: var(--text-bg);
		font-size: 0.68rem;
		font-weight: 900;
		line-height: 1.1;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.12);
		pointer-events: none;
	}

	.performance-bubble.is-accent .bubble-label {
		font-size: 0.78rem;
	}

	.label-top-right {
		left: 70%;
		bottom: 70%;
	}

	.label-top-left {
		right: 70%;
		bottom: 70%;
	}

	.label-bottom-left {
		right: 62%;
		top: 72%;
	}

	.label-bottom-right {
		left: 66%;
		top: 70%;
	}

	.performance-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.38rem;
		align-items: center;
	}

	.performance-key {
		display: inline-flex;
		gap: 0.32rem;
		align-items: center;
		padding: 0.16rem 0.42rem;
		border: 1.5px solid var(--border);
		border-radius: 999px;
		background: var(--text-bg);
		font-size: 0.64rem;
		font-weight: 900;
	}

	.performance-key i {
		width: 0.62rem;
		aspect-ratio: 1;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: var(--line-stroke);
	}

	.performance-key.national i {
		background: rgba(255, 255, 255, 0.22);
	}

	.performance-key.type i {
		background: color-mix(in srgb, var(--line-stroke) 54%, transparent);
	}

	.performance-side {
		display: grid;
		gap: 0.85rem;
		min-width: 0;
		max-height: 560px;
		padding-right: 0.35rem;
		overflow: auto;
		scrollbar-color: currentColor transparent;
		scrollbar-width: thin;
	}

	.performance-side::-webkit-scrollbar {
		width: 6px;
	}

	.performance-side::-webkit-scrollbar-track {
		background: transparent;
	}

	.performance-side::-webkit-scrollbar-thumb {
		border-radius: 999px;
		background: color-mix(in srgb, currentColor 58%, transparent);
	}

	.performance-hover-detail {
		display: grid;
		gap: 0.42rem;
		padding-left: 0.9rem;
		border-left: 3px solid currentColor;
	}

	.performance-hover-detail h4,
	.beijing-density h4 {
		font-family: var(--font-display);
		font-size: clamp(1.04rem, 1.8vw, 1.45rem);
		line-height: 1.05;
		text-transform: uppercase;
	}

	.performance-hover-detail p {
		font-size: 0.75rem;
		font-weight: 800;
		line-height: 1.36;
		opacity: 0.84;
	}

	.performance-stat-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.performance-stat-chips span {
		padding: 0.14rem 0.34rem;
		border: 1px dashed currentColor;
		border-radius: 999px;
		font-size: 0.68rem;
		font-weight: 900;
		background: rgba(255, 255, 255, 0.12);
	}

	.beijing-density {
		display: grid;
		gap: 0.48rem;
	}

	.density-list {
		display: grid;
		gap: 0.42rem;
	}

	.density-list div {
		display: grid;
		grid-template-columns: minmax(5.5rem, auto) minmax(0, 1fr);
		gap: 0.08rem 0.55rem;
		align-items: baseline;
		padding-bottom: 0.34rem;
		border-bottom: 1px dashed color-mix(in srgb, currentColor 36%, transparent);
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 360ms ease,
			transform 360ms ease;
		transition-delay: calc(260ms + var(--i) * 70ms);
	}

	.is-visible .density-list div {
		opacity: 1;
		transform: translateY(0);
	}

	.density-list strong {
		font-family: var(--font-display);
		font-size: clamp(1.2rem, 2.2vw, 1.7rem);
		line-height: 1;
	}

	.density-list small {
		margin-left: 0.1rem;
		font-family: var(--font-sans);
		font-size: 0.62rem;
		font-weight: 900;
	}

	.density-list span {
		font-size: 0.75rem;
		font-weight: 900;
	}

	.density-list em {
		grid-column: 2;
		font-size: 0.66rem;
		font-style: normal;
		font-weight: 800;
		line-height: 1.22;
		opacity: 0.72;
	}

	.night-formats {
		display: grid;
		gap: 0.55rem;
		padding-top: 0.7rem;
		border-top: 1px dashed currentColor;
	}

	.night-format-head {
		display: grid;
		gap: 0.28rem;
	}

	.night-format-head h4,
	.night-format-group h5 {
		margin: 0;
		font-family: var(--font-display);
		line-height: 1.05;
		text-transform: uppercase;
	}

	.night-format-head h4 {
		font-size: clamp(1.04rem, 1.8vw, 1.42rem);
	}

	.night-format-head p,
	.night-format-group p,
	.night-format-note {
		font-size: 0.68rem;
		font-weight: 800;
		line-height: 1.34;
		opacity: 0.82;
	}

	.night-format-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.22rem;
	}

	.night-format-tags span {
		padding: 0.12rem 0.32rem;
		border: 1px dashed currentColor;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.12);
		font-size: 0.62rem;
		font-weight: 900;
		line-height: 1.1;
	}

	.night-format-groups {
		display: grid;
		gap: 0.42rem;
	}

	.night-format-group {
		display: grid;
		gap: 0.3rem;
		padding-bottom: 0.42rem;
		border-bottom: 1px dashed color-mix(in srgb, currentColor 34%, transparent);
		transition:
			opacity 180ms ease,
			filter 180ms ease;
	}

	.night-format-has-hover .night-format-group:not(.is-active) {
		opacity: 0.86;
		filter: saturate(0.94);
	}

	.night-format-group.is-active {
		padding-left: 0.35rem;
		border-left: 3px solid currentColor;
	}

	.night-format-group h5 {
		font-size: 0.88rem;
	}

	.night-format-items {
		display: grid;
		gap: 0.22rem;
	}

	.night-format-items div {
		display: grid;
		grid-template-columns: minmax(4.3rem, auto) minmax(0, 1fr) auto;
		gap: 0.08rem 0.42rem;
		align-items: baseline;
	}

	.night-format-items strong {
		font-family: var(--font-display);
		font-size: 1.05rem;
		line-height: 1;
	}

	.night-format-items small {
		margin-left: 0.08rem;
		font-family: var(--font-sans);
		font-size: 0.58rem;
		font-weight: 900;
	}

	.night-format-items span {
		font-size: 0.68rem;
		font-weight: 900;
		line-height: 1.22;
	}

	.night-format-items em {
		grid-column: 2 / -1;
		font-size: 0.64rem;
		font-style: normal;
		font-weight: 800;
		line-height: 1.3;
		opacity: 0.8;
	}

	.night-format-items i {
		justify-self: end;
		padding: 0.06rem 0.22rem;
		border: 1px solid currentColor;
		border-radius: 999px;
		font-size: 0.56rem;
		font-style: normal;
		font-weight: 900;
		opacity: 0.72;
	}

	.performance-holiday-note {
		display: grid;
		grid-template-columns: minmax(8rem, auto) minmax(0, 1fr);
		gap: 0.5rem;
		padding-top: 0.6rem;
		border-top: 1px dashed currentColor;
		font-size: 0.72rem;
		font-weight: 800;
		line-height: 1.36;
	}

	.performance-holiday-note strong {
		font-weight: 900;
	}

	.river-stage {
		min-height: 360px;
	}

	.river-svg,
	.network-links {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.river-path {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.river-path.wide {
		stroke: rgba(255, 255, 255, 0.38);
		stroke-width: 76;
	}

	.river-path.core {
		stroke: var(--line-stroke);
		stroke-width: 14;
		stroke-dasharray: 12 12;
		opacity: 0.82;
	}

	.layer-label {
		position: absolute;
		z-index: 3;
		padding: 0.32rem 0.62rem;
		font-size: 0.72rem;
	}

	.l1 { left: 5%; top: 12%; transform: rotate(-6deg); }
	.l2 { right: 16%; top: 16%; transform: rotate(5deg); }
	.l3 { left: 54%; bottom: 10%; transform: rotate(-4deg); }
	.l4 { left: 26%; top: 5%; transform: rotate(4deg); }
	.l5 { left: 6%; bottom: 10%; transform: rotate(5deg); opacity: 0.8; }

	.river-node,
	.bubble-point {
		position: absolute;
		left: var(--x);
		top: var(--y);
		z-index: 4;
		transform: translate(-50%, -50%);
	}

	.callout {
		display: grid;
		gap: 0.12rem;
		padding: 0.42rem 0.58rem;
		max-width: 160px;
		font-size: 0.72rem;
		line-height: 1.2;
	}

	.callout strong,
	.callout-label.large {
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 3vw, 2rem);
		line-height: 1;
	}

	.callout span,
	.callout-label span {
		font-family: var(--font-sans);
		font-size: 0.68rem;
		font-weight: 800;
		line-height: 1.2;
		opacity: 0.82;
	}

	.pin,
	.pending-dot {
		padding: 0.28rem 0.48rem;
		border: 1.5px solid var(--border);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.3);
		font-size: 0.72rem;
		font-weight: 900;
	}

	.pending-dot {
		border-style: dashed;
		opacity: 0.72;
	}

	.dot-matrix-stage {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		padding: 3rem 1rem 1rem;
	}

	.split-label {
		position: absolute;
		top: 0.75rem;
		z-index: 3;
		font-size: 0.8rem;
		font-weight: 900;
	}

	.split-label.left { left: 1rem; }
	.split-label.right { right: 1rem; }

	.split-line {
		position: absolute;
		top: 3rem;
		bottom: 1rem;
		left: 50%;
		border-left: 2px dashed currentColor;
		opacity: 0.36;
	}

	.dot-side {
		position: relative;
		min-width: 0;
	}

	.dot-cloud {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		gap: 0.23rem;
		min-height: 110px;
		max-width: 300px;
	}

	.data-dot,
	.mini-cloud i {
		width: 10px;
		aspect-ratio: 1;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: var(--line-stroke);
		animation: dot-in 520ms ease both;
	}

	.alerts .data-dot {
		width: 8px;
		background: currentColor;
		opacity: 0.78;
	}

	.callout-label {
		display: inline-grid;
		gap: 0.1rem;
		margin: 0.45rem 0;
		padding: 0.34rem 0.55rem;
		font-size: 0.9rem;
	}

	.mini-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.16rem;
		max-width: 210px;
		margin-top: 0.45rem;
	}

	.mini-cloud i {
		width: 6px;
	}

	.outdoor-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.22rem;
		margin-top: 0.5rem;
	}

	.outdoor-row i {
		width: 18px;
		height: 9px;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: var(--line-stroke);
	}

	.area-label,
	.layer-stack,
	.annotation-note,
	.mini-note,
	.matrix-legend {
		max-width: 420px;
		font-size: 0.76rem;
		line-height: 1.35;
		font-weight: 800;
		opacity: 0.84;
	}

	.layer-stack {
		margin-top: 0.6rem;
		padding: 0.45rem 0.55rem;
		border-left: 4px solid currentColor;
		background: rgba(255, 255, 255, 0.14);
	}

	.annotation-note {
		margin-top: 0.55rem;
	}

	.stage-compare {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.9rem;
		min-height: 360px;
		padding: 1rem;
	}

	.stage-group {
		position: relative;
		display: grid;
		align-content: center;
		gap: 0.55rem;
		min-width: 0;
	}

	.stage-group h4 {
		font-size: 0.82rem;
		text-align: center;
	}

	.performance-dots {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.22rem;
	}

	.performance-dots i {
		width: 11px;
		aspect-ratio: 1;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.26);
	}

	.performance-dots i.active,
	.proportion-track i {
		background: var(--line-stroke);
	}

	.proportion-track {
		position: relative;
		height: 42px;
		border: 2px solid var(--border);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.26);
		overflow: hidden;
	}

	.proportion-track i {
		display: block;
		width: var(--w);
		height: 100%;
		box-shadow: inset -6px -6px 0 rgba(0, 0, 0, 0.14);
	}

	.stage-group small {
		font-size: 0.72rem;
		line-height: 1.25;
		text-align: center;
		opacity: 0.8;
	}

	.daily-sticker {
		position: absolute;
		left: 50%;
		bottom: 1rem;
		z-index: 4;
		padding: 0.45rem 0.7rem;
		transform: translateX(-50%) rotate(-1deg);
		font-size: 0.86rem;
		white-space: nowrap;
	}

	.holiday {
		position: absolute;
		left: 1rem;
		bottom: 1rem;
		max-width: 300px;
	}

	.chart-shell.servicePeopleNetwork {
		gap: 0.42rem;
		padding: clamp(0.58rem, 1.05vw, 0.82rem);
	}

	.chart-shell.servicePeopleNetwork .chart-head {
		gap: 0.22rem;
		max-width: none;
	}

	.chart-shell.servicePeopleNetwork h3 {
		font-size: clamp(1.45rem, 3vw, 2.75rem);
		line-height: 0.94;
		white-space: nowrap;
	}

	.chart-shell.servicePeopleNetwork .dek {
		max-width: 680px;
		font-size: clamp(0.74rem, 1.18vw, 0.94rem);
		line-height: 1.26;
	}

	.service-routes-stage {
		display: grid;
		gap: clamp(0.55rem, 0.95vw, 0.8rem);
		min-height: 0;
		padding: clamp(0.55rem, 0.95vw, 0.75rem);
		border: 1px solid rgba(255, 255, 255, 0.22);
		background:
			radial-gradient(circle at 22% 18%, rgba(255, 170, 236, 0.12), transparent 28%),
			radial-gradient(circle at 86% 24%, rgba(126, 204, 255, 0.1), transparent 32%),
			rgba(255, 255, 255, 0.055);
		overflow: visible;
	}

	.service-routes-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.62fr) minmax(280px, 1fr);
		gap: clamp(0.75rem, 1.15vw, 1rem);
		align-items: stretch;
		min-height: 0;
	}

	.route-map-panel,
	.bus-stat-card,
	.route-detail-card,
	.coverage-card,
	.support-services-card,
	.service-timeline {
		min-width: 0;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.055);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.11);
	}

	.route-map-panel {
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto auto;
		gap: clamp(0.45rem, 0.8vw, 0.65rem);
		padding: clamp(0.7rem, 1.05vw, 0.9rem);
	}

	.route-map-head {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: baseline;
		font-weight: 900;
	}

	.route-map-head p,
	.route-map-head strong,
	.bus-stat-card h4,
	.coverage-card h4,
	.support-services-card h4,
	.timeline-head h4 {
		margin: 0;
		font-size: 0.72rem;
		line-height: 1.1;
		letter-spacing: 0;
		text-transform: uppercase;
	}

	.route-map-head strong,
	.timeline-head p {
		font-size: 0.66rem;
		font-weight: 900;
		line-height: 1.25;
		opacity: 0.72;
		text-align: right;
	}

	.route-map-svg {
		width: 100%;
		height: clamp(220px, 23vw, 300px);
		min-height: 0;
		border-radius: 14px;
		overflow: visible;
		background:
			linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px),
			linear-gradient(0deg, rgba(255,255,255,0.012) 1px, transparent 1px),
			rgba(10, 18, 40, 0.085);
		background-size: 20% 20%;
	}

	.service-route {
		color: var(--line-stroke);
		transition:
			opacity 180ms ease,
			filter 180ms ease;
	}

	.service-route.night1 { color: #ffd4f2; }
	.service-route.night2 { color: #bfe7ff; }
	.service-route.night20 { color: #f7b6ff; }
	.service-route.night30 { color: #ffe29a; }
	.service-route.night27 { color: #ffaca0; }
	.service-route.night38 { color: #bff7d1; }

	.route-has-hover .service-route.is-muted {
		opacity: 0.46;
		filter: saturate(0.72);
	}

	.service-route-halo,
	.service-route-line {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		pointer-events: stroke;
	}

	.service-route-halo {
		stroke: transparent;
		stroke-width: 6;
	}

	.service-route-line {
		stroke: currentColor;
		stroke-width: 2;
		stroke-dasharray: none;
		stroke-dashoffset: 0;
		opacity: 0.76;
	}

	.service-route.primary .service-route-line {
		stroke-width: 2.28;
		opacity: 0.84;
	}

	.service-route.night1 .service-route-line {
		stroke-width: 2.45;
		opacity: 0.88;
		filter: none;
	}

	.service-route.night2 .service-route-line {
		stroke-width: 2.55;
		opacity: 0.94;
		filter: drop-shadow(0 0 1px currentColor);
	}

	.service-route.night2 .route-label {
		opacity: 1;
	}

	.service-route.secondary .service-route-line {
		opacity: 0.66;
	}

	.service-route.ring .service-route-line {
		stroke-width: 1.45;
		opacity: 0.46;
		filter: none;
	}

	.timeline-is-active .service-route-line {
		opacity: 0.95;
	}

	.service-route.is-active .service-route-line {
		stroke-width: 3.15;
		opacity: 1;
		filter: drop-shadow(0 0 2px currentColor);
	}

	.service-route.is-active .route-label {
		opacity: 1;
	}

	.route-station {
		fill: var(--text-bg);
		stroke: currentColor;
		stroke-width: 0.48;
		opacity: 0;
		animation: station-light 460ms ease forwards;
		animation-delay: calc(620ms + var(--i, 0) * 115ms + var(--j, 0) * 60ms);
	}

	.route-station.major {
		fill: currentColor;
		stroke: rgba(255, 255, 255, 0.8);
		stroke-width: 0.48;
	}

	.route-label {
		font-family: var(--font-sans);
		font-size: 2.08px;
		font-weight: 900;
		fill: currentColor;
		paint-order: stroke;
		stroke: rgba(45, 20, 42, 0.32);
		stroke-width: 0.2px;
	}

	.route-chip-row {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 0.28rem;
	}

	.route-chip {
		appearance: none;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.22rem;
		align-items: center;
		min-width: 0;
		padding: 0.24rem 0.36rem;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.065);
		color: currentColor;
		font: inherit;
		font-size: 0.62rem;
		font-weight: 900;
		text-align: left;
		cursor: pointer;
		transition:
			background 160ms ease,
			box-shadow 160ms ease,
			transform 160ms ease;
	}

	.route-chip strong {
		font-family: var(--font-display);
		font-size: 0.8rem;
		line-height: 1;
	}

	.route-chip span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.route-chip:hover,
	.route-chip:focus-visible,
	.route-chip.is-active {
		background: rgba(255, 255, 255, 0.2);
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12);
		transform: translateY(-1px);
	}

	.route-map-metrics {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		align-items: stretch;
	}

	.route-data-band {
		display: grid;
		gap: 0.42rem;
		padding: clamp(0.55rem, 0.9vw, 0.75rem);
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.055);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
	}

	.route-map-metrics .coverage-card {
		min-height: 0;
	}

	.route-map-metrics .bus-stat-card {
		grid-column: 1 / -1;
	}

	.service-data-panel {
		display: grid;
		grid-template-rows: minmax(0, 1fr) auto;
		gap: clamp(0.55rem, 0.9vw, 0.75rem);
		padding: 0;
		align-content: start;
		background: transparent;
		box-shadow: none;
	}

	.bus-stat-card,
	.route-detail-card,
	.coverage-card,
	.support-services-card,
	.service-timeline {
		padding: clamp(0.55rem, 0.9vw, 0.75rem);
	}

	.bus-stat-card {
		background: rgba(134, 219, 190, 0.075);
	}

	.route-data-band .bus-stat-card,
	.route-data-band .coverage-card {
		padding: 0;
		border-radius: 0;
		background: transparent;
		box-shadow: none;
	}

	.bus-stat-grid {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 0.28rem;
		margin-top: 0.28rem;
	}

	.bus-stat-grid div {
		display: grid;
		gap: 0.06rem;
		padding: 0.2rem 0.24rem;
		border-radius: 7px;
		background: rgba(255, 255, 255, 0.045);
	}

	.bus-stat-grid strong,
	.route-detail-card strong,
	.support-service-card span {
		font-family: var(--font-display);
		font-size: clamp(0.9rem, 1.25vw, 1.15rem);
		line-height: 1;
	}

	.bus-stat-grid span,
	.coverage-row span,
	.support-service-card small,
	.support-service-card em,
	.route-detail-card span {
		font-size: 0.68rem;
		font-weight: 900;
		line-height: 1.22;
		opacity: 0.78;
	}

	.route-detail-card {
		display: grid;
		gap: 0.1rem;
		align-content: center;
		background: rgba(255, 198, 245, 0.095);
	}

	.route-detail-card p,
	.coverage-group p {
		margin: 0;
		font-size: 0.7rem;
		font-weight: 900;
		line-height: 1.2;
		opacity: 0.72;
	}

	.coverage-card {
		display: grid;
		gap: 0.26rem;
		background: rgba(191, 231, 255, 0.07);
	}

	.coverage-group {
		display: grid;
		gap: 0.16rem;
	}

	.coverage-row {
		display: grid;
		grid-template-columns: minmax(3rem, 0.32fr) minmax(0, 1fr) minmax(3.4rem, auto);
		gap: 0.28rem;
		align-items: center;
	}

	.coverage-row i {
		display: block;
		height: 6px;
		border-radius: 999px;
		background: linear-gradient(90deg, rgba(255, 205, 248, 0.8), rgba(255, 234, 172, 0.74));
		box-shadow: inset -2px -1px 0 rgba(0, 0, 0, 0.1);
		width: var(--w);
	}

	.coverage-row strong {
		font-size: 0.78rem;
		line-height: 1;
	}

	.support-services-card {
		display: grid;
		grid-template-rows: auto minmax(0, 1fr);
		gap: 0.4rem;
		align-content: start;
		height: 100%;
	}

	.support-services-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: repeat(3, minmax(0, 1fr));
		gap: 0.32rem;
	}

	.support-service-card {
		display: grid;
		gap: 0.1rem;
		align-content: center;
		min-height: 72px;
		padding: 0.42rem 0.48rem;
		border: 1px solid rgba(255, 255, 255, 0.075);
		border-radius: 9px;
		background: rgba(255, 255, 255, 0.044);
		transition:
			background 160ms ease,
			box-shadow 160ms ease,
			transform 160ms ease;
	}

	.support-service-card strong {
		font-size: 0.78rem;
		line-height: 1.16;
	}

	.support-service-card span {
		font-size: clamp(1.05rem, 1.5vw, 1.35rem);
	}

	.support-service-card em {
		display: none;
	}

	.support-service-card.is-active,
	.support-service-card:hover,
	.support-service-card:focus-within {
		background: rgba(255, 255, 255, 0.15);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
		transform: translateY(-1px);
	}

	.service-timeline {
		position: relative;
		display: grid;
		gap: 0.28rem;
		padding-top: 0.45rem;
		padding-bottom: 0.45rem;
	}

	.timeline-head {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.7rem;
		align-items: baseline;
	}

	.timeline-head p {
		margin: 0;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.timeline-track {
		position: relative;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 0;
		min-height: 42px;
		padding-top: 0.2rem;
	}

	.timeline-track::before {
		content: "";
		position: absolute;
		left: 2%;
		right: 2%;
		top: 15px;
		height: 2px;
		border-radius: 999px;
		background: linear-gradient(90deg, rgba(255, 217, 247, 0.75), rgba(255, 229, 166, 0.54));
		box-shadow: 0 0 10px rgba(255, 198, 245, 0.16);
	}

	.timeline-segment {
		appearance: none;
		position: relative;
		z-index: 2;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto auto;
		gap: 0.1rem;
		align-items: start;
		justify-items: center;
		min-width: 0;
		padding: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
		color: currentColor;
		font: inherit;
		font-size: 0.72rem;
		font-weight: 900;
		cursor: pointer;
		transition:
			color 160ms ease,
			transform 160ms ease;
	}

	.timeline-segment i {
		display: block;
		grid-row: 2;
		width: 11px;
		aspect-ratio: 1;
		border: 1px solid rgba(255, 255, 255, 0.72);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.24);
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.05);
	}

	.timeline-segment strong {
		grid-row: 3;
		font-family: var(--font-display);
		font-size: clamp(0.82rem, 1.05vw, 0.98rem);
		line-height: 1;
	}

	.timeline-segment span,
	.timeline-segment em {
		grid-row: 1;
		font-style: normal;
		opacity: 0.64;
	}

	.timeline-segment em {
		display: none;
	}

	.timeline-segment:hover,
	.timeline-segment:focus-visible,
	.timeline-segment.is-active {
		transform: translateY(-1px);
	}

	.timeline-segment:hover i,
	.timeline-segment:focus-visible i,
	.timeline-segment.is-active i {
		background: linear-gradient(90deg, rgba(255, 217, 247, 0.94), rgba(255, 229, 166, 0.86));
		box-shadow: 0 0 12px rgba(255, 198, 245, 0.3);
	}

	@keyframes route-draw {
		to { stroke-dashoffset: 0; }
	}

	@keyframes station-light {
		from {
			opacity: 0;
			transform: scale(0.72);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.axis-stage {
		min-height: 610px;
		padding: 7rem 2rem 4rem;
		background:
			radial-gradient(circle at 30% 68%, rgba(204, 255, 237, 0.28), transparent 22%),
			radial-gradient(circle at 72% 34%, rgba(255, 169, 255, 0.16), transparent 24%),
			rgba(242, 250, 254, 0.42);
	}

	.matrix-summary {
		position: absolute;
		left: 1rem;
		right: 1rem;
		top: 0.9rem;
		z-index: 6;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.55rem;
	}

	.matrix-summary div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		min-width: 0;
		padding: 0.65rem 0.8rem;
		border: 1px solid rgba(38, 38, 38, 0.18);
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.72);
	}

	.matrix-summary div.total {
		background: linear-gradient(120deg, rgba(204, 255, 237, 0.92), rgba(255, 169, 255, 0.42));
	}

	.matrix-summary span {
		font-size: 0.74rem;
		font-weight: 850;
		line-height: 1.2;
	}

	.matrix-summary strong {
		font-family: var(--font-accent);
		font-size: clamp(1.55rem, 2.6vw, 2.2rem);
		font-weight: 400;
		line-height: 1;
	}

	.matrix-summary small {
		margin-left: 0.12rem;
		font-family: var(--font-sans);
		font-size: 0.68rem;
		font-weight: 800;
	}

	.axis-line {
		position: absolute;
		background: currentColor;
		opacity: 0.62;
	}

	.axis-line.x {
		left: 9%;
		right: 9%;
		top: 59%;
		height: 2px;
	}

	.axis-line.y {
		top: 25%;
		bottom: 14%;
		left: 50%;
		width: 2px;
	}

	.axis-label {
		position: absolute;
		z-index: 4;
		padding: 0.32rem 0.58rem;
		border: 1px dashed color-mix(in srgb, currentColor 52%, transparent);
		border-radius: 6px;
		background: color-mix(in srgb, var(--line-stroke) 28%, rgba(255, 255, 255, 0.78));
		box-shadow: none;
		font-size: 0.92rem;
		font-weight: 900;
		letter-spacing: 0.035em;
	}

	.x-left { left: 1.3rem; top: 60%; }
	.x-right { right: 1.3rem; top: 60%; }

	.axis-label-y {
		padding: 0.26rem 0.48rem;
		border-color: color-mix(in srgb, currentColor 34%, transparent);
		background: rgba(255, 255, 255, 0.68);
		font-size: 0.84rem;
		letter-spacing: 0.02em;
		line-height: 1.1;
		white-space: nowrap;
	}

	.y-top {
		left: 50%;
		top: calc(25% - 0.55rem);
		transform: translate(-50%, -100%);
	}

	.y-bottom {
		left: 50%;
		right: auto;
		top: calc(86% + 0.55rem);
		bottom: auto;
		transform: translateX(-50%);
	}

	.bubble-point {
		display: block;
		width: var(--size);
		height: var(--size);
		padding: 0;
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
		pointer-events: auto;
		transition: opacity 220ms ease, filter 220ms ease;
	}

	.bubble-point i {
		width: var(--size);
		aspect-ratio: 1;
		display: grid;
		place-items: center;
		border: 2.5px solid var(--border);
		border-radius: 50%;
		background: var(--line-stroke);
		color: #20302c;
		font-style: normal;
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 1.65vw, 1.65rem);
		font-weight: 900;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
		box-shadow:
			5px 6px 0 rgba(0, 0, 0, 0.18),
			0 0 20px rgba(204, 255, 237, 0.28),
			inset 0 0 0 4px rgba(255, 255, 255, 0.35);
		transition: transform 220ms ease, box-shadow 220ms ease;
	}

	.chart-shell.is-visible .bubble-point i {
		animation: matrix-bubble-in 560ms cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: var(--city-delay);
	}

	@keyframes matrix-bubble-in {
		from { opacity: 0; filter: blur(4px); }
		to { opacity: 1; filter: blur(0); }
	}

	.bubble-point.is-muted { opacity: 0.42; filter: saturate(0.72); }
	.bubble-point.is-active i,
	.bubble-point:hover i,
	.bubble-point:focus-visible i {
		transform: scale(1.08);
		box-shadow:
			7px 8px 0 rgba(0, 0, 0, 0.16),
			0 0 28px rgba(204, 255, 237, 0.5),
			inset 0 0 0 4px rgba(255, 255, 255, 0.5);
	}

	.bubble-point:focus-visible { outline: 2px dashed currentColor; outline-offset: 7px; }

	.bubble-point span {
		position: absolute;
		left: 50%;
		top: calc(50% + var(--size) / 2 + 6px);
		z-index: 2;
		padding: 0.14rem 0.46rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.92);
		border: 1px solid rgba(38, 38, 38, 0.18);
		font-size: 1.03rem;
		font-weight: 900;
		line-height: 1.05;
		white-space: nowrap;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.12);
		transform: translate(calc(-50% + var(--label-x)), var(--label-y));
	}

	.bubble-point small {
		position: absolute;
		left: 50%;
		top: calc(50% + var(--size) / 2 + 34px);
		z-index: 2;
		width: max-content;
		max-width: 165px;
		padding: 0.08rem 0.3rem;
		border-radius: 8px;
		background: rgba(239, 249, 252, 0.84);
		font-size: 0.77rem;
		line-height: 1.22;
		text-align: center;
		white-space: normal;
		word-break: keep-all;
		overflow-wrap: normal;
		opacity: 0.92;
		transform: translate(calc(-50% + var(--label-x)), var(--label-y));
	}

	.matrix-legend {
		position: absolute;
		left: 1.6rem;
		right: 1.6rem;
		bottom: 0.95rem;
		max-width: none;
		text-align: center;
		padding: 0.28rem 0.7rem;
		border: 0;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.54);
		font-size: 0.78rem;
		line-height: 1.35;
		z-index: 3;
	}

	.matrix-legend strong { margin-right: 0.6rem; font-size: 0.9rem; }
	.matrix-legend span { font-weight: 750; }

	.bars {
		display: grid;
		gap: 0.8rem;
	}

	.bar-row {
		display: grid;
		grid-template-columns: 64px minmax(0, 1fr);
		gap: 0.75rem;
		align-items: center;
	}

	.bar-row div {
		height: 24px;
		border: 2px solid var(--border);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.24);
		overflow: hidden;
	}

	.bar-row i {
		display: block;
		height: 100%;
		background: var(--line-stroke);
	}

	.chart-footnotes {
		display: grid;
		gap: 0.35rem;
		padding-top: 0.85rem;
		border-top: 1px dashed currentColor;
		font-size: 0.74rem;
		line-height: 1.45;
	}

	.chart-footnotes p {
		display: grid;
		grid-template-columns: 4.5em minmax(0, 1fr);
		gap: 0.55rem;
	}

	.chart-footnotes strong {
		font-weight: 900;
	}

	.chart-footnotes span {
		opacity: 0.86;
	}

	.chart-shell.servicePeopleNetwork .chart-footnotes {
		gap: 0.18rem;
		padding-top: 0.42rem;
		font-size: 0.58rem;
		line-height: 1.28;
	}

	.chart-shell.servicePeopleNetwork .chart-footnotes p {
		grid-template-columns: 3.6em minmax(0, 1fr);
		gap: 0.38rem;
	}

	@keyframes dot-in {
		from {
			opacity: 0;
			transform: scale(0.4);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (max-width: 880px) {
		.liangma-system-grid { grid-template-columns: 1fr; }
		.liangma-spotlights { grid-template-columns: repeat(3, minmax(0, 1fr)); }

		.matrix-summary {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.axis-stage {
			min-height: 680px;
			padding-top: 10.5rem;
		}

		.y-top {
			top: 9.8rem;
		}

		.stage-compare,
		.dot-matrix-stage,
		.river-bars-layout {
			grid-template-columns: 1fr;
		}

		.river-bars-plot {
			grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
		}

		.river-hover-panel {
			padding-top: 0.75rem;
			padding-left: 0;
			border-top: 3px solid currentColor;
			border-left: 0;
		}

		.guard-chain-layout {
			grid-template-columns: 1fr;
		}

		.guard-detail-panel {
			max-height: 320px;
			padding-top: 0.75rem;
			padding-left: 0;
			border-top: 3px solid currentColor;
			border-left: 0;
		}

		.performance-map-layout {
			grid-template-columns: 1fr;
		}

		.performance-collection-layout {
			grid-template-columns: 1fr;
		}

		.performance-cluster-panel {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.performance-side {
			grid-template-columns: 1fr;
		}

		.split-line {
			display: none;
		}

		.axis-stage {
			min-height: 560px;
		}

		.service-routes-layout {
			grid-template-columns: 1fr;
		}

		.route-map-panel {
			grid-template-rows: auto minmax(300px, 52vw) auto;
		}

		.service-data-panel {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-template-rows: auto;
			align-items: stretch;
		}

		.bus-stat-card,
		.support-services-card {
			grid-column: 1 / -1;
		}

		.daily-sticker {
			white-space: normal;
			text-align: center;
		}
	}

	@media (max-width: 560px) {
		.liangma-space-grid,
		.liangma-spotlights { grid-template-columns: 1fr; }
		.liangma-impact-row { grid-template-columns: minmax(0,1fr) auto; grid-template-rows:auto auto; gap:.28rem .55rem; min-height:0; padding:.42rem 0; }
		.liangma-impact-row > div { grid-column:1; grid-row:1; }
		.liangma-impact-row > strong { grid-column:2; grid-row:1; width:auto; font-size:1.1rem; }
		.liangma-impact-row > i { grid-column:1/-1; grid-row:2; width:100%; }

		.chart-shell {
			padding: 1rem;
		}

		.chart-shell.servicePeopleNetwork h3 {
			white-space: normal;
		}

		.chart-shell.servicePeopleNetwork .chart-head,
		.chart-shell.servicePeopleNetwork .chart-canvas,
		.chart-shell.servicePeopleNetwork .chart-footnotes,
		.service-routes-stage,
		.service-routes-layout,
		.route-map-panel,
		.service-data-panel {
			width: 100%;
			min-width: 0;
		}

		.visual-stage {
			min-height: 460px;
		}

		.river-stage {
			min-height: 520px;
		}

		.river-bars-stage {
			min-height: 0;
		}

		.guard-stage {
			min-height: 0;
		}

		.guard-lens-track {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			min-height: 0;
			padding-top: 0.35rem;
		}

		.guard-lens-line {
			display: none;
		}

		.lens-node {
			padding: 0.35rem;
			border: 1px dashed currentColor;
			border-radius: 16px;
			background: rgba(255, 255, 255, 0.12);
		}

		.river-bars-plot {
			grid-template-columns: 1fr;
			gap: 0.7rem;
			border-bottom: 0;
		}

		.river-city-group {
			grid-template-columns: minmax(82px, 0.5fr) minmax(0, 1fr);
			grid-template-rows: auto;
			align-items: center;
			gap: 0.65rem;
			text-align: left;
		}

		.river-city-head {
			justify-items: start;
			min-height: 0;
		}

		.city-name,
		.project-name,
		.type-tag {
			justify-self: start;
		}

		.bar-cluster {
			grid-column: 2;
			grid-row: 1;
			height: 132px;
			margin-top: 0;
		}

		.guard-column-heads {
			display: none;
		}

		.guard-route {
			grid-template-columns: 1fr;
			gap: 0.38rem;
		}

		.guard-route-line {
			grid-template-columns: 1fr;
			gap: 0.36rem;
		}

		.guard-route-line::before {
			display: none;
		}

		.guard-node {
			justify-items: start;
			min-height: 0;
			padding: 0.42rem 0.55rem;
			border-radius: 16px;
			text-align: left;
		}

		.guard-detail-grid div {
			grid-template-columns: 1fr auto;
		}

		.guard-detail-grid small {
			grid-column: 1 / -1;
		}

		.performance-plot {
			min-height: 360px;
			padding-left: 1.6rem;
		}

		.performance-cluster-panel {
			grid-template-columns: 1fr;
		}

		.comparison-row {
			grid-template-columns: 1fr;
			gap: 0.48rem;
		}

		.comparison-note {
			grid-column: 1;
		}

		.comparison-bar-line,
		.mini-bar-row {
			grid-template-columns: minmax(3.6rem, 0.55fr) minmax(0, 1fr) minmax(3.2rem, auto);
		}

		.plot-grid {
			left: 1.6rem;
		}

		.y-axis {
			transform: none;
			left: 0;
			top: 0;
			max-width: 9rem;
		}

		.bubble-label {
			max-width: 6.5rem;
			font-size: 0.62rem;
		}

		.performance-holiday-note {
			grid-template-columns: 1fr;
		}

		.axis-stage {
			min-height: 680px;
		}

		.service-routes-stage {
			padding: 0.65rem;
		}

		.route-map-panel {
			grid-template-rows: auto minmax(250px, 64vw) auto;
		}

		.route-chip-row,
		.bus-stat-grid,
		.service-data-panel,
		.support-services-grid,
		.timeline-head {
			grid-template-columns: 1fr;
		}

		.timeline-track {
			display: grid;
		}

		.timeline-segment {
			flex-basis: auto;
		}

		.chart-footnotes p {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.liangma-space-card,
		.liangma-spotlight { opacity: 1; animation: none !important; transform: none !important; }
		.liangma-impact-row > i > i { transform: scaleX(1); transition: none; }
		.bubble-point i { animation: none !important; }
		.data-dot,
		.mini-cloud i {
			animation: none;
		}

		.bar-fill {
			transition: none;
			transform: scaleY(1);
		}

		.guard-lens-line,
		.guard-route-line::before,
		.lens-node,
		.guard-node,
		.comparison-row,
		.comparison-fill,
		.plot-grid,
		.performance-bubble,
		.density-list div {
			transition: none;
			transform: none;
			opacity: 1;
		}

		.performance-bubble {
			transform: translate(-50%, -50%) scale(1);
		}

		.service-route-line,
		.route-station {
			animation: none;
			stroke-dashoffset: 0;
			opacity: 1;
		}
	}
</style>
