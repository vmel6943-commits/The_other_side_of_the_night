<script>
	import { getContext, onMount } from "svelte";

	let {
		nodeId,
		eyebrow = "结语",
		title = "夜晚的另一面",
		lead = "",
		sides = [],
		journey = [],
		synthesis = "",
		closing = "",
		closingIntro = "",
		closingCore = "",
		closingTail = ""
	} = $props();

	const { registerNode } = getContext("nodeRegistry");
	let el;
	let visible = $state(false);

	onMount(() => {
		registerNode(nodeId, el);
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) visible = true;
			},
			{ threshold: 0.12 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<section id={nodeId} class:visible class="conclusion" bind:this={el}>
	<div class="conclusion-thread" aria-hidden="true"></div>

	<article class="conclusion-module left opening" style="--step: 0;">
		<span class="module-label">{eyebrow}</span>
		<h3>{title}</h3>
		{#if lead}<p>{lead}</p>{/if}
	</article>

	{#each sides as side, index}
		<article class={`conclusion-module ${index % 2 === 0 ? "right" : "left"}`} style={`--step: ${index + 1};`}>
			<span class="module-label">{side.label} 面</span>
			<h4>{side.title}</h4>
			<p>{side.text}</p>
		</article>
	{/each}

	{#if journey.length || synthesis}
		<article class="conclusion-module right" style="--step: 3;">
			<span class="module-label">从北京到八城</span>
			{#if journey.length}
				<p>从{journey.map((item) => item.title).join("、")}一路走来，我们看到的不是彼此分散的夜景，而是城市空间、文化供给、公共服务和治理系统共同组成的夜晚。</p>
			{/if}
			{#if synthesis}<p>{synthesis}</p>{/if}
		</article>
	{/if}

	<article class="conclusion-module left closing" style="--step: 4;">
		<span class="module-label">最后一站</span>
		{#if closingIntro}<p>{closingIntro}</p>{/if}
		{#if closingCore}<p><strong>{closingCore}</strong></p>{/if}
		{#if closingTail}<p>{closingTail}</p>{/if}
		{#if closing && !closingIntro && !closingCore && !closingTail}<p>{closing}</p>{/if}
	</article>
</section>

<style>
	.conclusion {
		position: relative;
		z-index: 3;
		display: flex;
		flex-direction: column;
		gap: clamp(2.35rem, 5vw, 3.5rem);
		width: min(100%, 900px);
		margin: clamp(1rem, 3vw, 2.5rem) auto 0;
		padding: 1.25rem 0 0.5rem;
		color: var(--text-color, #181716);
		scroll-margin-top: 7rem;
	}

	.conclusion-thread {
		position: absolute;
		inset: 1.8rem 50% 1.5rem auto;
		width: 2px;
		background: repeating-linear-gradient(to bottom, var(--line-stroke) 0 8px, transparent 8px 16px);
		opacity: 0.62;
	}

	.conclusion-module {
		position: relative;
		z-index: 2;
		display: grid;
		gap: 0.7rem;
		width: min(100%, 660px);
		padding: 1.8rem;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		background: var(--text-bg);
		box-shadow: var(--box-shadow);
		opacity: 0;
		transition:
			opacity 600ms ease calc(var(--step) * 70ms),
			transform 780ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--step) * 70ms);
	}

	.conclusion-module.left {
		align-self: flex-start;
		transform: translateX(-36px);
	}

	.conclusion-module.right {
		align-self: flex-end;
		transform: translateX(36px);
	}

	.conclusion-module::after {
		content: "";
		position: absolute;
		top: 50%;
		width: clamp(1.2rem, 5vw, 4.5rem);
		border-top: 2px dashed var(--line-stroke);
		opacity: 0.62;
	}

	.conclusion-module.left::after { left: 100%; }
	.conclusion-module.right::after { right: 100%; }

	.conclusion.visible .conclusion-module {
		opacity: 1;
		transform: translateX(0);
	}

	.module-label {
		position: absolute;
		top: 0;
		left: 1rem;
		transform: translateY(-58%);
		padding: 0.3rem 0.62rem;
		border: 2px solid var(--border);
		border-radius: 999px;
		background: var(--text-bg);
		box-shadow: var(--box-shadow);
		font-size: 0.78rem;
		font-weight: 850;
		text-transform: uppercase;
	}

	.right .module-label {
		left: auto;
		right: 1rem;
	}

	h3,
	h4,
	p { margin: 0; }

	h3,
	h4 {
		font-family: var(--font-display);
		line-height: 1.12;
	}

	h3 { font-size: clamp(1.35rem, 2.4vw, 1.8rem); }
	h4 { font-size: clamp(1.15rem, 1.8vw, 1.4rem); }

	p {
		font-family: var(--font-body);
		font-size: clamp(16px, 1.05vw, 18px);
		font-weight: 500;
		line-height: 1.62;
		letter-spacing: 0.015em;
	}

	p + p { margin-top: 0.12rem; }
	strong { font-weight: 850; }

	@media (max-width: 760px) {
		.conclusion { gap: 2.6rem; }
		.conclusion-thread { left: 1rem; right: auto; }
		.conclusion-module,
		.conclusion-module.left,
		.conclusion-module.right {
			align-self: stretch;
			width: calc(100% - 2rem);
			margin-left: 2rem;
		}
		.conclusion-module::after {
			right: 100%;
			left: auto;
			width: 1rem;
		}
		.right .module-label {
			left: 1rem;
			right: auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.conclusion-module { opacity: 1; transform: none !important; transition: none; }
	}
</style>
