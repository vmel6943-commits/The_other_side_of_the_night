<script>
	import Nodes from "$components/Nodes.svelte";
	import { asset } from "$lib/asset.js";

	let { section } = $props();

	const themeStyle = `
		--background: ${section.theme.background};
		--heading-color: ${section.theme.headingColor};
		--heading-shadow: ${section.theme.headingShadow};
		--line-stroke: ${section.theme.lineStroke};
		--text-color: ${section.theme.textColor};
		--text-bg: ${section.theme.textBg};
		--border: ${section.theme.border};
		--box-shadow: ${section.theme.boxShadow};
		--card-bg: ${section.theme.cardBg};
	`;
</script>

<section id={section.id} class="chapter" style={themeStyle}>
	<div class="cover">
		<div class="cover-image" role="img" aria-label={section.cover.alt}>
			{#if section.cover?.src}
				<img src={asset(section.cover.src)} alt={section.cover.alt} loading="lazy" />
			{:else}
				<span>{section.cover.label}</span>
			{/if}
		</div>
		<div class="num-badge" aria-hidden="true">
			<span>{section.num}</span>
			<i></i>
			<i></i>
		</div>
		<p class="years">({section.years})</p>
	</div>

	<div class="intro">
		<h2>{section.title}</h2>
		<p>{section.dek}</p>
	</div>

	<Nodes sectionId={section.id} nodes={section.nodes} />
</section>

<style>
	.chapter {
		position: relative;
		isolation: isolate;
		padding: clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
		border-bottom: 0;
		background: linear-gradient(to bottom, var(--background));
		color: var(--text-color);
	}

	.chapter::before {
		content: "";
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background:
			linear-gradient(to bottom, rgba(255, 255, 255, 0.12), transparent 18%, transparent 82%, rgba(255, 255, 255, 0.1)),
			radial-gradient(circle at 14% 12%, rgba(255, 255, 255, 0.1), transparent 30%),
			radial-gradient(circle at 82% 86%, rgba(255, 255, 255, 0.08), transparent 34%);
		opacity: 0.42;
	}

	.cover,
	.intro {
		width: min(100%, var(--content));
		margin: 0 auto;
	}

	.cover {
		position: relative;
		max-width: 842px;
	}

	.cover-image {
		aspect-ratio: 16 / 9;
		max-height: min(58vh, 480px);
		display: grid;
		place-items: center;
		overflow: hidden;
		position: relative;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		background:
			radial-gradient(circle at 20% 22%, rgba(255, 255, 255, 0.8) 0 0.5rem, transparent 0.55rem),
			radial-gradient(circle at 78% 62%, rgba(255, 255, 255, 0.65) 0 0.7rem, transparent 0.75rem),
			repeating-linear-gradient(135deg, rgba(255, 255, 255, .16) 0 12px, transparent 12px 24px),
			linear-gradient(135deg, rgba(255, 255, 255, .18), rgba(0, 0, 0, .14));
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		font-weight: 900;
		text-transform: uppercase;
		text-shadow: 1px 1px 0 var(--border);
	}

	.cover-image::before,
	.cover-image::after {
		content: "";
		position: absolute;
		border: 2px solid var(--border);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.24);
	}

	.cover-image::before {
		width: 34%;
		aspect-ratio: 1;
		left: -9%;
		top: -26%;
	}

	.cover-image::after {
		width: 24%;
		aspect-ratio: 1;
		right: -7%;
		bottom: -20%;
	}

	.cover-image img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center center;
	}

	.num-badge {
		position: absolute;
		left: -1.8rem;
		bottom: 1.2rem;
		width: clamp(76px, 10vw, 132px);
		aspect-ratio: 1;
		display: grid;
		place-items: center;
		transform: rotate(-7deg);
		animation: bounce-pop 850ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}

	.num-badge span {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		border: 3px solid var(--border);
		border-radius: 50%;
		background: var(--text-bg);
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		font-family: var(--font-display);
		font-size: clamp(2.6rem, 7vw, 6rem);
		line-height: 1;
	}

	.num-badge i {
		position: absolute;
		width: 24%;
		aspect-ratio: 1;
		background: var(--heading-color);
		clip-path: polygon(50% 0, 62% 34%, 100% 50%, 62% 66%, 50% 100%, 38% 66%, 0 50%, 38% 34%);
		filter: drop-shadow(1px 1px 0 var(--border));
		animation: twinkle 1.8s ease-in-out infinite;
	}

	.num-badge i:first-of-type {
		right: 0;
		top: 10%;
	}

	.num-badge i:last-of-type {
		left: 8%;
		bottom: 7%;
		animation-delay: 500ms;
	}

	.years {
		position: absolute;
		left: 1rem;
		bottom: 0;
		margin: 0;
		transform: translateY(50%);
		padding: 0.45rem 0.75rem;
		border: 2px solid var(--border);
		border-radius: var(--radius);
		background: var(--text-bg);
		box-shadow: var(--box-shadow);
		color: var(--text-color);
		font-weight: 800;
		text-transform: uppercase;
	}

	.intro {
		padding: 3rem 0 1rem;
		text-align: center;
	}

	h2 {
		max-width: 920px;
		margin: 0 auto;
		font-family: var(--font-display);
		font-size: clamp(3rem, 9vw, 6.5rem);
		line-height: 0.98;
		letter-spacing: 0;
		color: var(--heading-color);
		text-shadow: var(--heading-shadow);
		text-transform: uppercase;
	}

	.intro p {
		max-width: var(--measure);
		margin: 1rem auto 0;
		color: var(--text-color);
		font-size: 1.1rem;
		font-weight: 700;
	}

	@media (max-width: 640px) {
		.chapter {
			padding-block: clamp(3rem, 10vw, 4.25rem);
		}

		.cover-image {
			max-height: 46vh;
		}

		.num-badge {
			left: -0.75rem;
			bottom: 0.75rem;
		}
	}
</style>
