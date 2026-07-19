<script>
	import { setContext } from "svelte";
	import TextBlock from "$components/TextBlock.svelte";
	import ImageBlock from "$components/ImageBlock.svelte";
	import ImageStack from "$components/ImageStack.svelte";
	import ChartBlock from "$components/ChartBlock.svelte";
	import PropCard from "$components/PropCard.svelte";
	import ConclusionBlock from "$components/ConclusionBlock.svelte";
	import EvidenceTimeline from "$components/EvidenceTimeline.svelte";
	import DataPanel from "$components/DataPanel.svelte";
	import InsightGrid from "$components/InsightGrid.svelte";
	import RouteOverview from "$components/RouteOverview.svelte";
	import GuideStops from "$components/GuideStops.svelte";
	import NightClock from "$components/NightClock.svelte";
	import HotspotBars from "$components/HotspotBars.svelte";
	import StreetPressure from "$components/StreetPressure.svelte";
	import ServiceRelay from "$components/ServiceRelay.svelte";
	import PerformanceGrowth from "$components/PerformanceGrowth.svelte";
	import SystemFlow from "$components/SystemFlow.svelte";
	import NightSupplyTreemap from "$components/NightSupplyTreemap.svelte";
	import NightSecurity from "$components/NightSecurity.svelte";
	import NightPortrait from "$components/NightPortrait.svelte";

	let { sectionId, nodes = [] } = $props();
	let svgEl;
	let anchors = $state({});
	let nodeEls = $state(new Map());

	const components = {
		Text: TextBlock,
		Image: ImageBlock,
		Images: ImageStack,
		Chart: ChartBlock,
		Card: PropCard,
		Conclusion: ConclusionBlock,
		Timeline: EvidenceTimeline,
		Data: DataPanel,
		Insight: InsightGrid,
		Routes: RouteOverview,
		Guide: GuideStops,
		Clock: NightClock,
		Hotspots: HotspotBars,
		Pressure: StreetPressure,
		Relay: ServiceRelay,
		Growth: PerformanceGrowth,
		System: SystemFlow,
		Supply: NightSupplyTreemap,
		Security: NightSecurity,
		NightPortrait
	};

	const avatarForSpeaker = (speaker) => {
		if (speaker === "晚晚") return { src: "/assets/images/characters/wanwan-avatar.png", alt: "晚晚人物头像" };
		if (speaker === "小夏") return { src: "/assets/images/characters/xia-avatar.png", alt: "小夏人物头像" };
		return null;
	};

	const registerNode = (id, el) => {
		if (!el) return;
		nodeEls.set(id, el);
		nodeEls = new Map(nodeEls);
		requestAnimationFrame(calculateAnchors);
	};

	setContext("nodeRegistry", { registerNode });

	const curvedPath = (start, end, offset = 50) => {
		const radius = 20;
		const startX = start.x;
		const startY = start.y;
		const endX = end.x;
		const endY = end.y;
		const bendY = startY + offset;
		const sweepA = startX < endX ? 0 : 1;
		const sweepB = startX < endX ? 1 : 0;

		return `
			M ${startX},${startY}
			L ${startX},${bendY - radius}
			A ${radius},${radius} 0 0 ${sweepA} ${startX < endX ? startX + radius : startX - radius},${bendY}
			L ${startX < endX ? endX - radius : endX + radius},${bendY}
			A ${radius},${radius} 0 0 ${sweepB} ${endX},${bendY + radius}
			L ${endX},${endY}
		`;
	};

	const calculateAnchors = () => {
		if (!svgEl) return;

		const svgRect = svgEl.getBoundingClientRect();
		const result = {};

		for (const [id, el] of nodeEls) {
			const rect = el.getBoundingClientRect();
			result[id] = {
				top: {
					x: rect.left + rect.width / 2 - svgRect.left,
					y: rect.top - svgRect.top
				},
				bottom: {
					x: rect.left + rect.width / 2 - svgRect.left,
					y: rect.bottom - svgRect.top
				}
			};
		}

		anchors = result;
	};

	$effect(() => {
		if (typeof window === "undefined") return;

		let frame;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(calculateAnchors);
		};
		const resizeObserver =
			typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;

		window.addEventListener("resize", update);
		window.addEventListener("scroll", update, { passive: true });

		if (resizeObserver) {
			if (svgEl?.parentElement) resizeObserver.observe(svgEl.parentElement);
			for (const el of nodeEls.values()) resizeObserver.observe(el);
		}

		update();

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("resize", update);
			window.removeEventListener("scroll", update);
			resizeObserver?.disconnect();
		};
	});

	const orderedIds = $derived(
		nodes.map((_, i) => `${sectionId}-${i}`).filter((id) => anchors[id])
	);
</script>

<div class="nodes">
	<svg bind:this={svgEl} aria-hidden="true">
		{#each orderedIds.slice(0, -1) as id, i}
			{@const next = orderedIds[i + 1]}
			{#if anchors[id] && anchors[next]}
				<path d={curvedPath(anchors[id].bottom, anchors[next].top)} />
				<path class="connector-main" d={curvedPath(anchors[id].bottom, anchors[next].top)} />
				<circle cx={anchors[next].top.x} cy={anchors[next].top.y} r="4" />
			{/if}
		{/each}
	</svg>

	{#each nodes as node, i}
		{@const Component = components[node.type]}
		{@const resolvedSpeaker = node.speaker ?? node.value?.speaker}
		{@const nodeProps = {
			...(node.value ?? {}),
			speaker: resolvedSpeaker,
			speakerAvatar: node.speakerAvatar ?? node.value?.speakerAvatar ?? avatarForSpeaker(resolvedSpeaker),
			variant: node.variant ?? node.value?.variant,
			align: node.align ?? node.value?.align,
			slotSide: i % 2 === 0 ? "left" : "right",
			isFirstSpeaker: node.isFirstSpeaker ?? node.value?.isFirstSpeaker
		}}
		{#if Component}
			<div class={`node-slot ${i % 2 === 0 ? "slot-left" : "slot-right"} type-${node.type.toLowerCase()}`}>
				<Component sectionId={sectionId} nodeId={`${sectionId}-${i}`} {...nodeProps} />
			</div>
		{/if}
	{/each}
</div>

<style>
	.nodes {
		width: min(100%, var(--content));
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		position: relative;
	}

	.node-slot {
		position: relative;
		z-index: 3;
		display: flex;
		width: 100%;
	}

	.slot-left {
		justify-content: flex-start;
		padding-right: clamp(0rem, 6vw, 4rem);
	}

	.slot-right {
		justify-content: flex-end;
		padding-left: clamp(0rem, 6vw, 4rem);
	}

	.type-chart,
	.type-hotspots,
	.type-pressure,
	.type-relay,
	.type-growth,
	.type-system,
	.type-supply,
	.type-security,
	.type-nightportrait,
	.type-clock,
	.type-routes,
	.type-conclusion {
		padding-inline: 0;
		justify-content: center;
	}

	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
		overflow: visible;
	}

	path {
		fill: none;
		stroke: rgba(38, 38, 38, 0.7);
		stroke-width: 5;
		stroke-linecap: round;
		stroke-dasharray: 8 8;
		opacity: 0.22;
	}

	path.connector-main {
		stroke: var(--line-stroke);
		stroke-width: 2;
		opacity: 0.82;
	}

	circle {
		fill: var(--line-stroke);
		stroke: rgba(38, 38, 38, 0.78);
		stroke-width: 1.5;
	}

	@media (max-width: 720px) {
		.node-slot { padding-inline: 0; justify-content: center; }
	}
</style>
