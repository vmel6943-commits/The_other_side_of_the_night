<script>
	import { asset } from "$lib/asset.js";

	let { hero } = $props();

	const titleImage = "/assets/images/hero/title-night-other-side-final.png";
</script>

<section id="top" class="hero">
	<h1 class="sr-only">{hero.title}</h1>

	<div class="title-stage" aria-hidden="true">
		<div class="title-art">
			<img src={asset(titleImage)} alt="" />
			<i class="sparkle one"></i>
			<i class="sparkle two"></i>
			<i class="sparkle three"></i>
			<i class="sparkle four"></i>
			<i class="sparkle five"></i>
		</div>
	</div>

	<div class="hero-image" role="img" aria-label={hero.image.alt}>
		{#if hero.image?.src}
			<img src={asset(hero.image.src)} alt={hero.image.alt} loading="eager" />
		{:else}
			<span>{hero.image?.label}</span>
		{/if}
		<div class="narrators" aria-label="Narrators">
			{#each hero.narrators as narrator, i}
				<article class={`narrator ${narrator.id} ${i === 0 ? "is-left" : "is-right"}`}>
					<div class="portrait">
						{#if narrator.avatar?.src}
							<img src={asset(narrator.avatar.src)} alt={narrator.avatar.alt} loading="lazy" />
						{:else}
							<span>{narrator.avatar?.label}</span>
						{/if}
					</div>
					<div>
						<p class="role">{narrator.role}</p>
						<h2>{narrator.name}</h2>
						<p>{narrator.bio}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<div class="hero-text">
		<p class="subtitle">{hero.subtitle}</p>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: clamp(1rem, 2vw, 1.7rem);
		align-items: start;
		padding: calc(var(--nav-height) + 0.75rem) clamp(1rem, 4vw, 3rem) clamp(3.5rem, 7vw, 5.5rem);
		background:
			radial-gradient(circle at 18% 31%, rgba(241, 253, 15, 0.24) 0 12%, transparent 24%),
			radial-gradient(circle at 82% 22%, rgba(255, 169, 255, 0.36) 0 11%, transparent 25%),
			radial-gradient(circle at 49% 37%, rgba(204, 255, 237, 0.24), transparent 34%),
			linear-gradient(to bottom, #f65e78 0%, #f4b4c8 12%, #e7e4ff 28%, #c9c0ff 61%, #7db5f4 100%);
		border-bottom: 0;
	}

	.title-stage,
	.hero-text,
	.hero-image {
		width: min(100%, var(--content));
		margin: 0 auto;
	}

	.title-stage {
		position: relative;
		display: grid;
		align-items: center;
		justify-content: center;
		min-height: clamp(220px, 29vw, 390px);
		padding: 0;
		margin-top: clamp(-2rem, -1.7vw, -0.75rem);
		margin-bottom: clamp(1.6rem, 4vw, 3.8rem);
	}

	.title-art {
		position: relative;
		z-index: 2;
		width: min(100%, 1100px);
		aspect-ratio: 2172 / 724;
		display: grid;
		place-items: center;
		transform: rotate(-0.8deg);
		animation:
			title-pop 980ms cubic-bezier(0.34, 1.56, 0.64, 1) both,
			title-hover 5.8s ease-in-out 1.2s infinite;
	}

	.title-art::before,
	.title-art::after {
		content: "";
		position: absolute;
		border-radius: 999px;
		pointer-events: none;
		filter: blur(12px);
	}

	.title-art::before {
		width: clamp(120px, 18vw, 240px);
		aspect-ratio: 1;
		left: -2%;
		bottom: 2%;
		background: rgba(241, 253, 15, 0.32);
	}

	.title-art::after {
		width: clamp(140px, 21vw, 280px);
		aspect-ratio: 1;
		right: -5%;
		top: 2%;
		background: rgba(255, 169, 255, 0.32);
	}

	.title-art img {
		position: relative;
		z-index: 3;
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter:
			drop-shadow(0 0 7px rgba(255, 255, 255, 0.92))
			drop-shadow(0 0 18px rgba(255, 112, 220, 0.72))
			drop-shadow(0 12px 0 rgba(95, 65, 173, 0.22));
	}

	.sparkle {
		position: absolute;
		width: clamp(28px, 4.6vw, 64px);
		aspect-ratio: 1;
		background: #f1fd0f;
		clip-path: polygon(50% 0, 62% 34%, 100% 50%, 62% 66%, 50% 100%, 38% 66%, 0 50%, 38% 34%);
		filter:
			drop-shadow(2px 2px 0 #262626)
			drop-shadow(0 0 12px rgba(255, 255, 255, 0.74));
		animation: twinkle 1.8s ease-in-out infinite;
		animation-delay: calc(900ms + var(--i) * 170ms);
	}

	.sparkle.one {
		top: 15%;
		right: 18%;
	}

	.sparkle.two {
		left: 14%;
		bottom: 19%;
		background: #ccffed;
		animation-delay: calc(1150ms + var(--i) * 160ms);
	}

	.sparkle.three {
		right: 7%;
		bottom: 28%;
		background: #ffa9ff;
		animation-delay: 1450ms;
	}

	.sparkle.four {
		left: 31%;
		top: 12%;
		width: clamp(20px, 3.2vw, 44px);
		background: #ffffff;
		animation-delay: 1220ms;
	}

	.sparkle.five {
		right: 28%;
		bottom: 12%;
		width: clamp(22px, 3.5vw, 48px);
		background: #ccffed;
		animation-delay: 1650ms;
	}

	.hero-text {
		position: relative;
		display: grid;
		justify-items: center;
		width: min(100%, 760px);
		margin-top: clamp(0.5rem, 1.5vw, 1rem);
		padding: clamp(1rem, 2vw, 1.35rem) clamp(1.1rem, 2.8vw, 2rem);
		border: 2.5px solid rgba(38, 38, 38, 0.86);
		border-radius: 18px;
		background:
			radial-gradient(circle at 8% 18%, rgba(241, 253, 15, 0.28), transparent 28%),
			linear-gradient(135deg, rgba(242, 250, 254, 0.82), rgba(218, 218, 255, 0.72));
		box-shadow:
			6px 6px 0 rgba(38, 38, 38, 0.44),
			inset 0 0 0 1px rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(12px);
		text-align: center;
	}

	.hero-text::before,
	.hero-text::after {
		content: "";
		position: absolute;
		width: 24px;
		aspect-ratio: 1;
		background: #f1fd0f;
		clip-path: polygon(50% 0, 62% 34%, 100% 50%, 62% 66%, 50% 100%, 38% 66%, 0 50%, 38% 34%);
		filter: drop-shadow(1.5px 1.5px 0 rgba(38, 38, 38, 0.74));
	}

	.hero-text::before {
		left: -0.85rem;
		top: -0.85rem;
	}

	.hero-text::after {
		right: -0.7rem;
		bottom: -0.55rem;
		width: 18px;
		background: #ffa9ff;
	}

	.role {
		margin: 0 0 0.5rem;
		color: #262626;
		font-size: 0.8rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	.subtitle {
		max-width: 720px;
		margin: 0 auto;
		color: #1f2540;
		font-size: clamp(1.06rem, 1.6vw, 1.34rem);
		line-height: 1.55;
		font-weight: 850;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.68);
	}

	.hero-image {
		position: relative;
		aspect-ratio: 16 / 9;
		max-height: min(54vh, 620px);
		margin-top: clamp(5.5rem, 9vw, 7.5rem);
		margin-bottom: clamp(5.5rem, 9vw, 7.5rem);
		display: grid;
		place-items: center;
		overflow: visible;
		border: 3px solid #262626;
		border-radius: var(--radius);
		background:
			repeating-linear-gradient(45deg, rgba(38, 38, 38, 0.08) 0 12px, transparent 12px 24px),
			linear-gradient(135deg, #f2fafe, #dadaff);
		box-shadow: 8px 8px 0 rgba(38, 38, 38, 0.75);
		color: #262626;
		font-weight: 900;
		text-transform: uppercase;
		animation:
			bounce-pop 760ms cubic-bezier(0.34, 1.56, 0.64, 1) 360ms both,
			floaty 6s ease-in-out 1.2s infinite;
	}

	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		border-radius: calc(var(--radius) - 3px);
		overflow: hidden;
	}

	.narrators {
		position: absolute;
		inset: 0;
		z-index: 4;
		pointer-events: none;
	}

	.narrator {
		position: relative;
		overflow: hidden;
		display: grid;
		grid-template-columns: 82px minmax(0, 1fr);
		gap: 0.85rem;
		padding: 0.82rem 0.92rem;
		width: min(36%, 370px);
		border: 2.5px solid rgba(38, 38, 38, 0.86);
		border-radius: var(--radius);
		background:
			radial-gradient(circle at 94% 18%, rgba(255, 169, 255, 0.28), transparent 32%),
			linear-gradient(135deg, rgba(242, 250, 254, 0.92), rgba(218, 218, 255, 0.78));
		box-shadow:
			5px 5px 0 rgba(38, 38, 38, 0.52),
			inset 0 0 0 1px rgba(255, 255, 255, 0.48);
		backdrop-filter: blur(12px);
		animation: narrator-in 760ms ease 220ms both;
		pointer-events: auto;
	}

	.narrator::after {
		content: "";
		position: absolute;
		right: 0.75rem;
		top: 0.75rem;
		width: 34px;
		aspect-ratio: 1;
		border-radius: 50%;
		background: rgba(241, 253, 15, 0.52);
		box-shadow: inset -4px -4px 0 rgba(38, 38, 38, 0.1);
		pointer-events: none;
	}

	.narrator:nth-child(2) {
		animation-delay: 320ms;
		background:
			radial-gradient(circle at 94% 18%, rgba(204, 255, 237, 0.28), transparent 32%),
			linear-gradient(135deg, rgba(242, 250, 254, 0.9), rgba(255, 232, 241, 0.78));
	}

	.narrator.is-left {
		position: absolute;
		left: 0;
		bottom: 0;
		--tx: -50%;
		--ty: 50%;
		--rot: -5deg;
		transform: translate(var(--tx), var(--ty)) rotate(var(--rot));
	}

	.narrator.is-right {
		position: absolute;
		right: 0;
		top: 0;
		--tx: 50%;
		--ty: -50%;
		--rot: 4deg;
		transform: translate(var(--tx), var(--ty)) rotate(var(--rot));
	}

	.portrait {
		aspect-ratio: 1;
		display: grid;
		place-items: center;
		border: 2.5px solid rgba(38, 38, 38, 0.86);
		border-radius: 50%;
		background: linear-gradient(135deg, #f2fafe, #dadaff 62%, #ccffed);
		color: #262626;
		font-size: 0.72rem;
		font-weight: 800;
		text-align: center;
		overflow: hidden;
	}

	.portrait img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center top;
	}

	h2,
	.narrator p {
		margin: 0;
	}

	.narrator p:last-child {
		color: var(--color-muted);
		line-height: 1.45;
	}

	@keyframes narrator-in {
		0% {
			opacity: 0;
			transform: translate(var(--tx, 0), var(--ty, 0)) scale(0.82) rotate(var(--rot, 0deg));
		}
		100% {
			opacity: 1;
			transform: translate(var(--tx, 0), var(--ty, 0)) scale(1) rotate(var(--rot, 0deg));
		}
	}

	@keyframes title-pop {
		0% {
			opacity: 0;
			transform: translateY(24px) scale(0.9) rotate(-4deg);
		}
		70% {
			opacity: 1;
			transform: translateY(-6px) scale(1.03) rotate(1deg);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1) rotate(-1.2deg);
		}
	}

	@keyframes title-hover {
		0%,
		100% {
			transform: translateY(0) rotate(-1.2deg);
		}
		50% {
			transform: translateY(-8px) rotate(0.8deg);
		}
	}

	@media (max-width: 760px) {
		.title-stage {
			min-height: clamp(180px, 44vw, 280px);
			margin-bottom: clamp(1rem, 5vw, 2rem);
		}

		.title-art {
			width: min(112%, 680px);
		}

		.narrators {
			position: absolute;
			inset: 0;
			display: block;
			padding: 0;
			background: none;
		}

		.narrator {
			grid-template-columns: 64px minmax(0, 1fr);
			width: min(74%, 360px);
			padding: 0.75rem;
			font-size: 0.88rem;
		}

		.hero-image {
			max-height: 42vh;
			margin-top: clamp(4.5rem, 22vw, 6rem);
			margin-bottom: clamp(4.5rem, 22vw, 6rem);
		}
	}
</style>
