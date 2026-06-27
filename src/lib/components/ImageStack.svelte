<script>
	import { getContext, onMount } from "svelte";
	import { asset } from "$lib/asset.js";

	let { nodeId, images = [], caption = "" } = $props();
	const { registerNode } = getContext("nodeRegistry");
	let el;

	onMount(() => {
		registerNode(nodeId, el);
	});
</script>

<section id={nodeId} class="image-stack-wrap" aria-label="Image group" bind:this={el}>
	<div class="image-stack">
		{#each images as image}
			<figure>
				<div class="stack-frame" role="img" aria-label={image.alt}>
					{#if image.src}
						<img src={asset(image.src)} alt={image.alt} loading="lazy" />
					{:else}
						<span>{image.label}</span>
					{/if}
				</div>
				{#if image.caption}
					<figcaption>{image.caption}</figcaption>
				{/if}
			</figure>
		{/each}
	</div>
	{#if caption}
		<p class="group-caption">{caption}</p>
	{/if}
</section>

<style>
	.image-stack-wrap {
		position: relative;
		z-index: 3;
	}

	.image-stack {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
		gap: 1rem;
	}

	figure {
		margin: 0;
	}

	.stack-frame {
		aspect-ratio: 4 / 3;
		display: grid;
		place-items: center;
		overflow: hidden;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		background:
			radial-gradient(circle at 80% 20%, rgba(255,255,255,.45), transparent 24%),
			var(--text-bg);
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		font-size: 0.9rem;
		font-weight: 900;
		text-align: center;
		text-transform: uppercase;
		transform: rotate(-3deg);
		animation: bounce-pop 700ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}

	.stack-frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}

	figure:nth-child(2) .stack-frame {
		transform: rotate(2deg) translateY(1rem);
		animation-delay: 120ms;
	}

	figure:nth-child(3) .stack-frame {
		transform: rotate(-1deg);
		animation-delay: 240ms;
	}

	figcaption {
		margin-top: 0.45rem;
		color: var(--text-color);
		font-size: 0.74rem;
		line-height: 1.4;
		opacity: 0.78;
		text-align: center;
	}

	.group-caption {
		margin: 0.9rem auto 0;
		color: var(--text-color);
		font-size: 0.82rem;
		font-weight: 700;
		line-height: 1.45;
		opacity: 0.86;
		text-align: center;
	}

	@media (max-width: 760px) {
		.image-stack {
			grid-template-columns: 1fr;
		}
	}
</style>
