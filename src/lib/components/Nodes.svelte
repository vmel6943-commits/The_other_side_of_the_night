<script>
	import { setContext } from "svelte";
	import TextBlock from "$components/TextBlock.svelte";
	import ImageBlock from "$components/ImageBlock.svelte";
	import ImageStack from "$components/ImageStack.svelte";
	import ChartBlock from "$components/ChartBlock.svelte";
	import PropCard from "$components/PropCard.svelte";

	let { sectionId, nodes = [] } = $props();
	let svgEl;
	let anchors = $state({});
	let nodeEls = $state(new Map());

	const components = {
		Text: TextBlock,
		Image: ImageBlock,
		Images: ImageStack,
		Chart: ChartBlock,
		Card: PropCard
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
			{/if}
		{/each}
	</svg>

	{#each nodes as node, i}
		{@const Component = components[node.type]}
		{@const nodeProps = {
			...(node.value ?? {}),
			speaker: node.speaker ?? node.value?.speaker,
			speakerAvatar: node.speakerAvatar ?? node.value?.speakerAvatar,
			variant: node.variant ?? node.value?.variant,
			align: node.align ?? node.value?.align,
			isFirstSpeaker: node.isFirstSpeaker ?? node.value?.isFirstSpeaker
		}}
		{#if Component}
			<Component sectionId={sectionId} nodeId={`${sectionId}-${i}`} {...nodeProps} />
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
		stroke: var(--line-stroke);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-dasharray: 8 8;
		opacity: 0.58;
	}
</style>
