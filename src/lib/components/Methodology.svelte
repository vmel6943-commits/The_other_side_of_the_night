<script>
	let { methodology, footer } = $props();
</script>

<section id="methodology" class="methodology">
	<div class="inner">
		{#if footer}
			<div class="team">
				{#if footer.lab}
					<strong>{footer.lab}</strong>
				{/if}
				{#if footer.members}
					<span class="members">成员：{footer.members}</span>
				{/if}
				{#if footer.email}
					<a class="email" href={`mailto:${footer.email}`}>{footer.email}</a>
				{/if}
			</div>
		{/if}
		<div class="head">
			<h2>{methodology.title}</h2>
			{#if methodology.note}
				<p class="note"><span class="tag">修改阶段</span>{methodology.note}</p>
			{/if}
		</div>
		<div class="items">
			{#each methodology.items as item}
				<section>
					<h3>{item.label}</h3>
					<p>{item.body}</p>
				</section>
			{/each}
		</div>
		{#if methodology.source}
			<div class="source">
				<h3>{methodology.source.label}</h3>
				<p>{methodology.source.body}</p>
				{#if methodology.source.repoUrl}
					<a href={methodology.source.repoUrl} target="_blank" rel="noreferrer">
						{methodology.source.repoText}
					</a>
				{:else}
					<span class="repo-placeholder">{methodology.source.repoText}</span>
				{/if}
			</div>
		{/if}
		{#if footer?.credits}
			<p class="credits">{footer.credits}</p>
		{/if}
	</div>
</section>

<style>
	.methodology {
		padding: clamp(5rem, 12vw, 9rem) clamp(1rem, 4vw, 3rem) clamp(3rem, 6vw, 4.5rem);
		background: transparent;
		color: #f2fafe;
	}

	.inner {
		width: min(100%, var(--content));
		margin: 0 auto;
	}

	.head {
		max-width: var(--measure);
	}

	.team {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem 1rem;
		margin-bottom: clamp(1.75rem, 4vw, 2.75rem);
		color: rgba(242, 250, 254, 0.82);
	}

	.credits {
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		font-size: 0.74rem;
		letter-spacing: 0.02em;
		color: rgba(242, 250, 254, 0.55);
	}

	.team strong {
		font-family: var(--font-display);
		font-size: 1.15rem;
		letter-spacing: 0.01em;
		color: #f2fafe;
	}

	.team .members {
		font-size: 0.82rem;
	}

	.team .email {
		font-size: 0.82rem;
		color: #ccffed;
		text-decoration: none;
	}

	h2 {
		margin: 0;
		font-family: var(--font-serif);
		font-size: clamp(1.5rem, 3vw, 2.2rem);
		line-height: 1.1;
		color: #f2fafe;
	}

	.note {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin: 0.75rem 0 0;
		font-size: 0.82rem;
		line-height: 1.6;
		color: rgba(242, 250, 254, 0.78);
	}

	.tag {
		padding: 0.1rem 0.5rem;
		border: 1px solid rgba(242, 250, 254, 0.5);
		border-radius: 999px;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		white-space: nowrap;
		color: #f2fafe;
	}

	.items {
		margin-top: clamp(1.5rem, 3vw, 2.25rem);
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.items section {
		padding: 0.9rem 1rem;
		border: 1px solid rgba(242, 250, 254, 0.32);
		border-radius: var(--radius);
		background: rgba(255, 255, 255, 0.08);
	}

	h3,
	.items p {
		margin: 0;
	}

	h3 {
		font-size: 0.9rem;
		color: #f2fafe;
	}

	.items p {
		margin-top: 0.4rem;
		color: rgba(242, 250, 254, 0.74);
		font-size: 0.78rem;
		line-height: 1.6;
	}

	.source {
		margin-top: 1.5rem;
		padding: 1rem 1.1rem;
		border: 1px solid rgba(242, 250, 254, 0.3);
		border-radius: var(--radius);
		background: rgba(0, 0, 0, 0.16);
	}

	.source p {
		margin: 0.4rem 0 0.75rem;
		color: rgba(242, 250, 254, 0.74);
		font-size: 0.78rem;
		line-height: 1.6;
	}

	.source a,
	.repo-placeholder {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.75rem;
		border-radius: 999px;
		font-size: 0.78rem;
		font-weight: 700;
		text-decoration: none;
	}

	.source a {
		border: 1px solid #ccffed;
		color: #ccffed;
	}

	.repo-placeholder {
		border: 1px dashed rgba(242, 250, 254, 0.5);
		color: rgba(242, 250, 254, 0.7);
	}

	.repo-placeholder::before,
	.source a::before {
		content: "↗";
		font-weight: 700;
	}

	@media (max-width: 900px) {
		.items {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 520px) {
		.items {
			grid-template-columns: 1fr;
		}
	}
</style>
