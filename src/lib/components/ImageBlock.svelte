<script>
	import { getContext, onMount } from "svelte";
	import { asset } from "$lib/asset.js";

	let {
		nodeId,
		src = "",
		label = "[IMAGE PLACEHOLDER]",
		alt = "[IMAGE ALT PLACEHOLDER]",
		caption = "",
		shape = "rectangle"
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
	}
</style>
