<script>
	import { getContext, onMount } from "svelte";
	import { asset } from "$lib/asset.js";

	let {
		nodeId,
		eyebrow = "[CARD EYEBROW]",
		title = "[CARD TITLE]",
		body = "[CARD BODY]",
		image = { label: "[CARD IMAGE PLACEHOLDER]", alt: "[CARD IMAGE ALT]" },
		icon = "",
		caption = ""
	} = $props();
	const { registerNode } = getContext("nodeRegistry");
	let el;

	onMount(() => {
		registerNode(nodeId, el);
	});
</script>

<aside id={nodeId} class="prop-card" bind:this={el}>
	<div class="thumb">
		{#if image?.src}
			<img src={asset(image.src)} alt={image.alt} loading="lazy" />
		{:else if icon}
			<span>{icon}</span>
		{:else}
			<span>{image?.label}</span>
		{/if}
	</div>
	<p class="eyebrow">{eyebrow}</p>
	<h3>{title}</h3>
	<p class="body">{body}</p>
	{#if caption}
		<p class="caption">{caption}</p>
	{/if}
</aside>

<style>
	.prop-card {
		width: min(100%, 520px);
		align-self: center;
		display: grid;
		grid-template-columns: 132px minmax(0, 1fr);
		column-gap: 1rem;
		padding: 1.25rem;
		position: relative;
		z-index: 3;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		background: var(--card-bg, var(--text-bg));
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		transform: rotate(1.5deg);
	}

	.thumb {
		grid-row: span 4;
		aspect-ratio: 4 / 3;
		display: grid;
		place-items: center;
		border: 2px solid var(--border);
		border-radius: calc(var(--radius) * 0.7);
		background:
			repeating-linear-gradient(45deg, rgba(255,255,255,.22) 0 8px, transparent 8px 16px),
			rgba(255, 255, 255, 0.22);
		font-size: 0.8rem;
		font-weight: 900;
		overflow: hidden;
		text-align: center;
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center center;
	}

	.eyebrow {
		margin: 0 0 0.35rem;
		color: currentColor;
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	h3,
	p {
		margin: 0;
	}

	h3 {
		font-family: var(--font-accent);
		font-size: 1.6rem;
		line-height: 1.1;
		text-transform: uppercase;
	}

	.body {
		margin-top: 0.75rem;
		font-size: clamp(16px, 1vw, 18px);
		line-height: 1.6;
		opacity: 0.82;
	}

	.caption {
		margin-top: 0.5rem;
		font-size: 0.78rem;
		line-height: 1.45;
		opacity: 0.7;
	}

	@media (max-width: 600px) {
		.prop-card {
			grid-template-columns: 1fr;
		}

		.thumb {
			width: min(100%, 180px);
			margin-bottom: 1rem;
		}
	}
</style>
