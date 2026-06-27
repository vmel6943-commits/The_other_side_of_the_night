<script>
	import { getContext, onMount } from "svelte";
	import { asset } from "$lib/asset.js";

	let {
		nodeId,
		speaker = "[SPEAKER PLACEHOLDER]",
		speakerAvatar = null,
		variant = "body",
		text = "[TEXT BLOCK PLACEHOLDER]",
		align = "left",
		isFirstSpeaker = false
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	let visible = $state(false);
	const paragraphs = $derived(Array.isArray(text) ? text : [text]);
	const variantClass = $derived(`variant-${variant || "body"}`);

	onMount(() => {
		registerNode(nodeId, el);
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) visible = true;
			},
			{ threshold: 0.28 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<section
	id={nodeId}
	class={`text-block ${align} ${variantClass}`}
	class:is-visible={visible}
	bind:this={el}
>
	<div class="speaker">
		{#if speakerAvatar || isFirstSpeaker}
			<span class="avatar">
				{#if speakerAvatar?.src}
					<img src={asset(speakerAvatar.src)} alt={speakerAvatar.alt} />
				{:else}
					<span>{speakerAvatar?.label ?? "[SPEAKER IMAGE]"}</span>
				{/if}
			</span>
		{/if}
		<span>{speaker}</span>
	</div>
	{#each paragraphs as paragraph}
		<p>{paragraph}</p>
	{/each}
</section>

<style>
	.text-block {
		width: min(100%, 660px);
		position: relative;
		z-index: 3;
		padding: 1.8rem;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		background: var(--text-bg);
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		opacity: 0;
		transition:
			opacity 600ms ease,
			transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.text-block.right {
		align-self: flex-end;
		transform: translateX(36px);
	}

	.text-block.left {
		align-self: flex-start;
		transform: translateX(-36px);
	}

	.text-block.is-visible {
		opacity: 1;
		transform: translateX(0);
	}

	.speaker {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
		padding: 0.3rem 0.55rem;
		position: absolute;
		top: 0;
		transform: translateY(-58%);
		border: 2px solid var(--border);
		border-radius: 999px;
		background: var(--text-bg);
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		font-size: 0.8rem;
		font-weight: 800;
		text-transform: uppercase;
		backdrop-filter: blur(10px);
	}

	.left .speaker {
		left: 1rem;
	}

	.right .speaker {
		right: 1rem;
	}

	.avatar {
		width: 28px;
		height: 28px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.34);
		font-size: 0.58rem;
		overflow: hidden;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	p {
		margin: 0;
		font-size: clamp(16px, 1.05vw, 18px);
		line-height: 1.62;
		letter-spacing: 0.015em;
		font-weight: 500;
	}

	p + p {
		margin-top: 0.8em;
	}

	@media (prefers-reduced-motion: reduce) {
		.text-block {
			opacity: 1;
			transform: none;
		}
	}
</style>
