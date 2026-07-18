<script>
	import { getContext, onMount } from "svelte";
	import { asset } from "$lib/asset.js";

	let {
		nodeId,
		src = "",
		label = "[IMAGE PLACEHOLDER]",
		alt = "[IMAGE ALT PLACEHOLDER]",
		caption = "",
		shape = "rectangle",
		overlays = []
	} = $props();
	const { registerNode } = getContext("nodeRegistry");
	let el;

	onMount(() => {
		registerNode(nodeId, el);
	});
</script>

<figure id={nodeId} class={`image-block ${shape}`} bind:this={el}>
	<div class="image-frame" role="img" aria-label={alt}>
		{#if src}
			<img src={asset(src)} {alt} loading="lazy" />
		{:else}
			<span>{label}</span>
		{/if}
		{#each overlays as overlay, i}
			<span
				class="image-city-label"
				style={`--label-x: ${overlay.x}; --label-y: ${overlay.y}; --label-i: ${i};`}
			>
				{overlay.label}
			</span>
		{/each}
	</div>
	{#if caption}
		<figcaption>{caption}</figcaption>
	{/if}
</figure>

<style>
	.image-block {
		width: min(100%, 640px);
		margin: 0 auto;
		position: relative;
		z-index: 3;
		transform: rotate(-2deg);
		animation: floaty 6s ease-in-out infinite;
	}

	.image-frame {
		position: relative;
		aspect-ratio: 16 / 9;
		max-height: min(52vh, 430px);
		display: grid;
		place-items: center;
		overflow: hidden;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		background:
			repeating-linear-gradient(135deg, rgba(255,255,255,.18) 0 10px, transparent 10px 20px),
			var(--text-bg);
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		font-weight: 900;
		text-transform: uppercase;
	}

	.image-frame img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center center;
	}

	.image-city-label {
		position: absolute;
		left: var(--label-x);
		top: var(--label-y);
		z-index: 2;
		display: inline-flex;
		align-items: center;
		gap: 0.28rem;
		padding: 0.25rem 0.44rem;
		border: 1px solid rgba(220, 214, 255, 0.72);
		border-radius: 5px;
		background: linear-gradient(135deg, rgba(18, 27, 67, 0.88), rgba(63, 52, 114, 0.78));
		box-shadow: 0 5px 14px rgba(4, 8, 30, 0.3);
		backdrop-filter: blur(7px);
		color: #fff;
		font-size: clamp(0.66rem, 1.15vw, 0.78rem);
		font-weight: 900;
		line-height: 1;
		letter-spacing: 0.04em;
		text-transform: none;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.42);
		transform: rotate(calc((var(--label-i) - 3.5) * 0.28deg));
	}

	.image-city-label::before {
		content: "";
		width: 0.34rem;
		aspect-ratio: 1;
		border-radius: 50%;
		background: #f3ee65;
		box-shadow: 0 0 8px rgba(243, 238, 101, 0.78);
		flex: 0 0 auto;
	}

	.image-block.circle .image-frame {
		aspect-ratio: 1;
		border-radius: 50%;
	}

	.image-block.oval .image-frame {
		border-radius: 999px;
	}

	figcaption {
		margin: 0.55rem auto 0;
		max-width: min(100%, var(--measure));
		color: var(--text-color);
		font-size: 0.78rem;
		line-height: 1.45;
		opacity: 0.78;
		text-align: center;
	}

	@media (max-width: 640px) {
		.image-block {
			width: min(100%, 540px);
		}

		.image-frame {
			max-height: 42vh;
		}

		.image-city-label {
			padding: 0.2rem 0.4rem;
			box-shadow: 0 3px 10px rgba(4, 8, 30, 0.28);
		}
	}
</style>
