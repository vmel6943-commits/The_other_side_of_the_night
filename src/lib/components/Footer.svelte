<script>
	let { footer } = $props();
</script>

<footer>
	<div class="footer-inner">
		<p class="credits">{footer.credits}</p>
		{#if footer.instructor || footer.members || footer.email}
			<div class="lab-card">
				{#if footer.instructor}
					<span>指导老师：{footer.instructor}</span>
				{/if}
				{#if footer.members}
					<span>成员：{footer.members}</span>
				{/if}
				{#if footer.email}
					<a href={`mailto:${footer.email}`}>{footer.email}</a>
				{/if}
			</div>
		{/if}
	</div>
</footer>

<style>
	footer {
		padding: clamp(2.5rem, 5vw, 4rem) clamp(1rem, 4vw, 3rem);
		background:
			radial-gradient(circle at 18% 18%, rgba(255, 169, 255, 0.2), transparent 28%),
			linear-gradient(135deg, #262626, #3c315f 58%, #1d4950);
		color: #f2fafe;
	}

	.footer-inner {
		width: min(100%, var(--content));
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	p {
		margin: 0;
		color: rgba(242, 250, 254, 0.76);
	}

	.lab-card {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;
		gap: 0.45rem 0.75rem;
		padding: 0.75rem 1rem;
		border: 1.5px solid rgba(242, 250, 254, 0.45);
		border-radius: var(--radius);
		background: rgba(242, 250, 254, 0.1);
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.24);
		font-weight: 800;
	}

	.lab-card span,
	.lab-card a {
		font-size: 0.84rem;
		font-weight: 800;
	}

	a {
		color: #ccffed;
		text-decoration: none;
	}

	@media (max-width: 760px) {
		.footer-inner {
			align-items: flex-start;
			flex-direction: column;
		}

		.lab-card {
			justify-content: flex-start;
		}
	}
</style>
