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
		slotSide = null,
		isFirstSpeaker = false
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	let visible = $state(false);
	const paragraphs = $derived(Array.isArray(text) ? text : [text]);
	const variantClass = $derived(`variant-${variant || "body"}`);
	const speakerClass = $derived(
		speaker === "晚晚" ? "speaker-wanwan" : speaker === "小夏" ? "speaker-xia" : "speaker-editorial"
	);

	onMount(() => {
		registerNode(nodeId, el);
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) visible = true;
			},
			{ threshold: 0.08 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<section
	id={nodeId}
	class={`text-block ${align} side-${slotSide ?? align} ${variantClass} ${speakerClass}`}
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
		opacity: 1;
		transition:
			opacity 600ms ease,
			transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.text-block.speaker-wanwan {
		--speaker-accent: #a92c70;
		border-color: var(--speaker-accent);
		box-shadow: 5px 6px 0 color-mix(in srgb, var(--speaker-accent) 42%, transparent);
	}

	.text-block.speaker-xia {
		--speaker-accent: #0b6b78;
		border-color: var(--speaker-accent);
		box-shadow: 5px 6px 0 color-mix(in srgb, var(--speaker-accent) 42%, transparent);
	}

	.text-block.right {
		align-self: flex-end;
		transform: translateX(18px);
	}

	.text-block.left {
		align-self: flex-start;
		transform: translateX(-18px);
	}

	.text-block.center {
		align-self: center;
		transform: translateY(28px);
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

	.speaker-wanwan .speaker,
	.speaker-xia .speaker {
		border-color: var(--speaker-accent);
		background: color-mix(in srgb, var(--text-bg) 86%, var(--speaker-accent) 14%);
		color: var(--speaker-accent);
	}

	.side-left .speaker {
		left: 1rem;
		right: auto;
	}

	.side-right .speaker {
		right: 1rem;
		left: auto;
	}

	.center .speaker {
		left: 50%;
		transform: translate(-50%, -58%);
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
		text-wrap: pretty;
		line-break: strict;
	}

	.variant-dialogue p,
	.variant-quote p {
		font-family: var(--font-display);
		font-size: clamp(1.08rem, 1.65vw, 1.28rem);
		font-weight: 760;
		line-height: 1.52;
	}

	p + p {
		margin-top: 0.8em;
	}

	.variant-conclusion-intro,
	.variant-conclusion-duality,
	.variant-conclusion-bridge,
	.variant-conclusion-closing {
		isolation: isolate;
		overflow: visible;
	}

	.variant-conclusion-intro {
		background:
			radial-gradient(circle at 88% 18%, rgba(255, 242, 94, 0.42), transparent 22%),
			linear-gradient(135deg, color-mix(in srgb, var(--text-bg) 82%, #ffb9d7 18%), color-mix(in srgb, var(--text-bg) 84%, #c9d9ff 16%));
	}

	.variant-conclusion-intro p:first-of-type {
		font-family: var(--font-display);
		font-size: clamp(1.28rem, 2.2vw, 1.65rem);
		font-weight: 850;
		line-height: 1.2;
	}

	.variant-conclusion-duality {
		background:
			linear-gradient(112deg, rgba(255, 236, 151, 0.62) 0 48.5%, rgba(255, 255, 255, 0.52) 49%, rgba(190, 219, 255, 0.68) 51% 100%),
			var(--text-bg);
		box-shadow: 7px 8px 0 color-mix(in srgb, var(--line-stroke) 42%, rgba(38, 38, 38, 0.16));
	}

	.variant-conclusion-duality p {
		padding: 0.72rem 0.82rem;
		border-radius: 7px;
		font-weight: 650;
	}

	.variant-conclusion-duality p:first-of-type {
		background: rgba(255, 243, 172, 0.4);
		border-left: 4px solid #ef8e87;
	}

	.variant-conclusion-duality p:nth-of-type(2) {
		background: rgba(199, 223, 255, 0.42);
		border-left: 4px solid #728bd9;
	}

	.variant-conclusion-bridge {
		background:
			radial-gradient(circle at 12% 78%, rgba(204, 255, 237, 0.42), transparent 28%),
			color-mix(in srgb, var(--text-bg) 90%, #d5fff1 10%);
	}

	.variant-conclusion-closing {
		background:
			radial-gradient(circle at 88% 74%, rgba(255, 192, 226, 0.34), transparent 28%),
			linear-gradient(135deg, color-mix(in srgb, var(--text-bg) 84%, #d9d0ff 16%), color-mix(in srgb, var(--text-bg) 88%, #bfe7ff 12%));
		box-shadow: 8px 9px 0 color-mix(in srgb, #705f9a 28%, rgba(38, 38, 38, 0.18));
	}

	.variant-conclusion-closing p:nth-of-type(2) {
		padding: 0.78rem 0.88rem;
		border: 1px dashed color-mix(in srgb, var(--text-color) 36%, transparent);
		border-radius: 7px;
		background: rgba(255, 255, 255, 0.32);
		font-weight: 780;
	}

	.variant-conclusion-intro::after,
	.variant-conclusion-duality::before,
	.variant-conclusion-duality::after,
	.variant-conclusion-closing::after {
		position: absolute;
		z-index: 2;
		color: #f2ea44;
		font-size: clamp(1.4rem, 2.4vw, 2rem);
		line-height: 1;
		text-shadow: 2px 2px 0 rgba(86, 69, 130, 0.25);
		pointer-events: none;
	}

	.variant-conclusion-intro::after {
		content: "✦";
		right: 1rem;
		top: 0.8rem;
	}

	.variant-conclusion-duality::before {
		content: "✦";
		left: -1rem;
		top: 22%;
		color: #ff9fd0;
		transform: rotate(-12deg);
	}

	.variant-conclusion-duality::after {
		content: "✦";
		right: -0.9rem;
		bottom: 16%;
		color: #96e8d0;
		transform: rotate(10deg);
	}

	.variant-conclusion-closing::after {
		content: "✦";
		right: 1rem;
		top: 1rem;
		color: #ff9fd0;
	}

	.variant-conclusion-intro .speaker,
	.variant-conclusion-duality .speaker,
	.variant-conclusion-bridge .speaker,
	.variant-conclusion-closing .speaker {
		background: color-mix(in srgb, var(--text-bg) 80%, var(--line-stroke) 20%);
	}

	@media (prefers-reduced-motion: reduce) {
		.text-block {
			opacity: 1;
			transform: none;
		}
	}
</style>
