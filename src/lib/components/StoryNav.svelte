<script>
	import { asset } from "$lib/asset.js";

	let { sections = [], brand = "[STORY BRAND]", brandImage = "" } = $props();

	const scrollTo = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};
</script>

<header class="story-nav" aria-label="Story navigation">
	<button class="brand" onclick={() => scrollTo("top")} aria-label={brand}>
		{#if brandImage}
			<img src={asset(brandImage)} alt={brand} />
		{:else}
			<span>{brand}</span>
		{/if}
	</button>
	<nav>
		{#each sections as section}
			<button onclick={() => scrollTo(section.id)}>
				<span class="num">{section.num}</span>
				<span>{section.kicker}</span>
			</button>
		{/each}
	</nav>
</header>

<style>
	.story-nav {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 40;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 1rem;
		width: 100%;
		min-height: var(--nav-height);
		padding: 1rem 1rem 4rem;
		background-image: linear-gradient(to bottom, #f9458e, #fd6766 30%, rgba(253, 103, 102, 0));
		pointer-events: none;
	}

	.brand {
		justify-self: start;
		pointer-events: auto;
		transform: rotate(-4deg);
		padding: 0;
		border: 0;
		background: transparent;
		filter: drop-shadow(4px 4px 0 rgba(38, 38, 38, 0.42));
		color: #262626;
		font-weight: 800;
		letter-spacing: 0;
		text-transform: uppercase;
		white-space: nowrap;
		cursor: pointer;
		transition:
			transform 180ms ease,
			box-shadow 180ms ease;
	}

	.brand:hover {
		transform: rotate(0deg) scale(1.04);
		filter: drop-shadow(2px 2px 0 rgba(38, 38, 38, 0.5));
	}

	.brand img {
		display: block;
		width: clamp(110px, 11vw, 170px);
		height: auto;
	}

	.brand span {
		display: block;
		padding: 0.55rem 0.7rem;
		border: 2px solid #262626;
		border-radius: var(--radius);
		background: #f2fafe;
		box-shadow: 4px 4px 0 rgba(38, 38, 38, 0.45);
	}

	nav {
		justify-self: end;
		display: flex;
		gap: 0.75rem;
		overflow-x: auto;
		pointer-events: auto;
	}

	button {
		font: inherit;
	}

	nav button {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0;
		border: 0;
		background: transparent;
		color: #f2fafe;
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		white-space: nowrap;
		opacity: 0.64;
		cursor: pointer;
		transition: opacity 180ms ease, transform 180ms ease;
	}

	nav button:hover {
		opacity: 1;
		transform: translateY(-1px);
	}

	.num {
		width: 32px;
		height: 32px;
		display: grid;
		place-items: center;
		border: 2px solid currentColor;
		border-radius: 50%;
		font-family: var(--font-display);
		font-size: 1rem;
		line-height: 1;
	}

	@media (max-width: 720px) {
		.story-nav {
			grid-template-columns: 1fr;
			padding-inline: 0.75rem;
		}

		.brand {
			display: none;
		}

		nav {
			justify-self: center;
			width: 100%;
			justify-content: center;
			gap: 0.45rem;
		}

		nav button span:last-child {
			display: none;
		}
	}
</style>
