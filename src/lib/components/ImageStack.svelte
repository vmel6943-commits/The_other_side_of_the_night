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
					{#if image.city}
						<span class="stack-city-label">{image.city}</span>
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
		position: relative;
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

	.stack-city-label {
		position: absolute;
		left: 0.7rem;
		bottom: 0.7rem;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		gap: 0.38rem;
		padding: 0.38rem 0.68rem;
		border: 1px solid rgba(220, 214, 255, 0.74);
		border-radius: 6px;
		background: linear-gradient(135deg, rgba(17, 25, 62, 0.9), rgba(73, 52, 116, 0.8));
		box-shadow: 0 7px 18px rgba(4, 8, 30, 0.34);
		backdrop-filter: blur(8px);
		color: #fff;
		font-size: 0.84rem;
		font-weight: 900;
		line-height: 1;
		letter-spacing: 0.05em;
		text-transform: none;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.42);
	}

	.stack-city-label::before {
		content: "";
		width: 0.42rem;
		aspect-ratio: 1;
		border-radius: 50%;
		background: #f3ee65;
		box-shadow: 0 0 9px rgba(243, 238, 101, 0.8);
		flex: 0 0 auto;
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
