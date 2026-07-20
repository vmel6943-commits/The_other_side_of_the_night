<script>
	import { getContext, onMount } from "svelte";

	let { nodeId, eyebrow = "街巷承载", title = "", lead = "", days = [], facts = [], visitorFacts = [], sources = [], source = "", sourceUrl = "", contextSource = "", contextSourceUrl = "", note = "" } = $props();
	const { registerNode } = getContext("nodeRegistry");
	let visible = $state(false);
	let el;
	onMount(() => {
		registerNode(nodeId, el);
		if (typeof IntersectionObserver === "undefined") {
			visible = true;
			return;
		}
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				visible = true;
				observer.disconnect();
			}
		}, { threshold: 0.18 });
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<section id={nodeId} class="street-pressure" class:visible bind:this={el}>
	<header><p class="eyebrow">{eyebrow}</p><h3>{title}</h3>{#if lead}<p class="lead">{lead}</p>{/if}</header>

	<div class="street-stage">
		<div class="street-facts" aria-label="南锣鼓巷空间尺度">
			{#each facts as fact, index}<div style={`--fact-delay:${index * 85}ms`}><strong>{fact.value}</strong><span>{fact.label}</span></div>{/each}
		</div>
		<div class="street-strip" aria-hidden="true"><span>南口</span><i></i><b>主街空间</b><i></i><span>北口</span></div>

		<div class="dot-compare" role="group" aria-label="每个圆点代表一万人次，对比南锣鼓巷平日与节假日日均客流">
			<div class="dot-key"><i></i><span>1 个圆点 = 1 万人次</span><strong>节假日比平日约高 38.5%</strong></div>
			{#each days as day, dayIndex}
				<div class:holiday={dayIndex === 1} class="dot-row">
					<div class="dot-label"><strong>{day.label}</strong><span>{day.detail}</span><b>{day.display}</b></div>
					<div class="dots">
						{#each Array(day.value) as _, index}
							{@const visitorFact = visitorFacts[(day.factOffset ?? 0) + index]}
							<button
								type="button"
								class="visitor-dot"
								style={`--dot-delay:${120 + Math.min(dayIndex * 9 + index, 24) * 34}ms`}
								aria-label={`${day.label}第 ${index + 1} 个万人次单元；${day.display}；${visitorFact?.title ?? day.density} ${visitorFact?.value ?? ""}`}
							>
								<span class="dot-tip">
									<strong class="unit-title">第 {index + 1} 个万人次单元</strong>
									<small>{day.label} · {day.year} · {day.scope}</small>
									<span class="row-context"><b>{day.display}</b><em>{day.density}</em></span>
									{#if visitorFact}
										<span class="visitor-fact"><b>{visitorFact.value}</b><strong>{visitorFact.title}</strong><em>{visitorFact.detail}</em></span>
										<small class="fact-source">{visitorFact.source}</small>
									{/if}
									<i>{day.delta}</i>
								</span>
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<footer>
		{#if sources.length}<p>来源：{#each sources as item, index}{#if index > 0} · {/if}<a href={item.url} target="_blank" rel="noreferrer">{item.label}</a>{/each}</p>{:else if source || contextSource}<p>来源：{#if source}{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{source}</a>{:else}{source}{/if}{/if}{#if source && contextSource} · {/if}{#if contextSource}{#if contextSourceUrl}<a href={contextSourceUrl} target="_blank" rel="noreferrer">{contextSource}</a>{:else}{contextSource}{/if}{/if}</p>{/if}
		{#if note}<p>{note}</p>{/if}
	</footer>
</section>

<style>
	.street-pressure { position: relative; z-index: 3; width: min(100%, 860px); margin: 0 auto; padding: clamp(1.3rem,3vw,2rem); border: 2px solid var(--panel-border); border-radius: var(--radius); background: var(--panel-bg); box-shadow: 7px 7px 0 color-mix(in srgb,var(--panel-border) 32%,transparent); color:var(--panel-text); }
	p,h3 { margin:0; }
	.eyebrow { font-size:.72rem; font-weight:900; letter-spacing:.12em; text-transform:uppercase; opacity:.66; }
	h3 { max-width:720px; margin-top:.35rem; font-family:var(--font-display); font-size:clamp(1.55rem,3vw,2.25rem); line-height:1.12; text-wrap:balance; }
	.lead { max-width:700px; margin-top:.7rem; font-size:.96rem; line-height:1.58; text-wrap:pretty; opacity:.82; }
	.street-stage { margin-top:1.45rem; padding:1rem; border:1.5px solid color-mix(in srgb,var(--panel-border) 58%,transparent); border-radius:calc(var(--radius)*.82); background:color-mix(in srgb,var(--panel-bg) 90%,var(--panel-text) 10%); }
	.street-facts { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); border-block:1px solid color-mix(in srgb,var(--panel-border) 45%,transparent); }
	.street-facts div { padding:.8rem; text-align:center; opacity:0; transform:translateY(.4rem); transition:opacity 400ms ease var(--fact-delay),transform 520ms cubic-bezier(.22,1,.36,1) var(--fact-delay); }
	.visible .street-facts div { opacity:1; transform:none; }
	.street-facts div + div { border-left:1px solid color-mix(in srgb,var(--panel-border) 45%,transparent); }
	.street-facts strong { display:block; font-family:var(--font-accent); font-size:clamp(1.25rem,3vw,1.8rem); line-height:1; }
	.street-facts span { display:block; margin-top:.35rem; font-size:.69rem; font-weight:800; opacity:.72; }
	.street-strip { display:grid; grid-template-columns:auto minmax(18px,1fr) auto minmax(18px,1fr) auto; align-items:center; gap:.5rem; margin:1rem 0; padding:.55rem .7rem; border:2px solid var(--panel-border); border-radius:999px; background:var(--panel-accent); color:color-mix(in srgb,var(--panel-text) 86%,black 14%); font-size:.68rem; font-weight:900; }
	.street-strip i { border-top:2px dashed currentColor; opacity:.45; }
	.dot-compare { display:grid; gap:.85rem; }
	.dot-key { display:flex; flex-wrap:wrap; align-items:center; gap:.38rem; font-size:.65rem; font-weight:800; }
	.dot-key i { width:.72rem; aspect-ratio:1; border:1.5px solid var(--panel-border); border-radius:50%; background:var(--panel-accent-2); }
	.dot-key strong { margin-left:auto; padding:.25rem .46rem; border-radius:999px; background:color-mix(in srgb,var(--panel-accent) 70%,var(--panel-bg) 30%); color:color-mix(in srgb,var(--panel-text) 82%,black 18%); }
	.dot-row { display:grid; grid-template-columns:8.5rem minmax(0,1fr); gap:.9rem; align-items:center; padding:.82rem; border:1px solid color-mix(in srgb,var(--panel-border) 30%,transparent); border-radius:10px; }
	.dot-label { display:grid; gap:.08rem; }
	.dot-label strong { font-family:var(--font-display); font-size:.9rem; }
	.dot-label span { font-size:.62rem; opacity:.58; }
	.dot-label b { margin-top:.22rem; font-family:var(--font-accent); font-size:.86rem; }
	.dots { display:grid; grid-template-columns:repeat(9,minmax(14px,1fr)); gap:.42rem; }
	.visitor-dot { position:relative; width:100%; max-width:1.65rem; aspect-ratio:1; padding:0; border:1.5px solid var(--panel-border); border-radius:50%; background:var(--panel-accent-2); box-shadow:2px 2px 0 color-mix(in srgb,var(--panel-border) 24%,transparent); cursor:help; opacity:0; transform:translateY(.5rem) scale(.55); transition:opacity 360ms ease var(--dot-delay),transform 520ms cubic-bezier(.22,1,.36,1) var(--dot-delay),box-shadow 140ms ease; }
	.visible .visitor-dot { opacity:1; transform:none; }
	.dot-row.holiday .visitor-dot { background:var(--panel-accent); }
	.visitor-dot:hover,.visitor-dot:focus-visible { z-index:20; transform:translateY(-3px) scale(1.12); box-shadow:3px 5px 0 color-mix(in srgb,var(--panel-border) 30%,transparent); outline:2px solid var(--panel-text); outline-offset:2px; }
	.dot-tip { position:absolute; left:50%; bottom:calc(100% + .6rem); display:none; width:14rem; padding:.7rem .75rem; border:1.5px solid var(--panel-border); border-radius:8px; background:var(--panel-bg); box-shadow:4px 4px 0 color-mix(in srgb,var(--panel-border) 28%,transparent); color:var(--panel-text); text-align:left; transform:translateX(-50%); pointer-events:none; }
	.dot-tip::after { content:""; position:absolute; left:50%; top:100%; width:.55rem; aspect-ratio:1; border-right:1.5px solid var(--panel-border); border-bottom:1.5px solid var(--panel-border); background:var(--panel-bg); transform:translate(-50%,-50%) rotate(45deg); }
	.visitor-dot:hover .dot-tip,.visitor-dot:focus-visible .dot-tip { display:grid; gap:.18rem; }
	.dot-tip .unit-title { font-size:.7rem; line-height:1.2; }
	.dot-tip small { font-size:.58rem; opacity:.58; }
	.row-context { display:grid; grid-template-columns:auto minmax(0,1fr); gap:.5rem; align-items:baseline; margin-top:.18rem; }
	.row-context b { font-family:var(--font-accent); font-size:.82rem; }
	.row-context em { font-size:.56rem; font-style:normal; line-height:1.3; opacity:.7; }
	.visitor-fact { display:grid; grid-template-columns:auto minmax(0,1fr); gap:.08rem .48rem; margin-top:.28rem; padding:.45rem .5rem; border:1px solid color-mix(in srgb,var(--panel-border) 32%,transparent); border-radius:6px; background:color-mix(in srgb,var(--panel-accent-2) 18%,transparent); }
	.visitor-fact b { grid-row:1/3; align-self:center; font-family:var(--font-accent); font-size:1rem; color:var(--panel-accent); }
	.visitor-fact strong { font-size:.62rem; }
	.visitor-fact em { font-size:.55rem; font-style:normal; line-height:1.32; opacity:.68; }
	.fact-source { justify-self:start; margin-top:.05rem; padding:.12rem .28rem; border-radius:999px; background:color-mix(in srgb,var(--panel-border) 9%,transparent); font-size:.5rem!important; font-weight:800; opacity:.62!important; }
	.dot-tip i { margin-top:.15rem; padding:.18rem .3rem; border-radius:4px; background:color-mix(in srgb,var(--panel-accent) 26%,transparent); font-size:.56rem; font-style:normal; font-weight:900; }
	footer { display:grid; gap:.2rem; margin-top:.9rem; font-size:.7rem; line-height:1.48; opacity:.65; }
	a { color:inherit; text-underline-offset:.16em; }
	@media(max-width:560px){
		.street-facts{grid-template-columns:1fr}.street-facts div + div{border-left:0;border-top:1px solid color-mix(in srgb,var(--panel-border) 45%,transparent)}
		.dot-row{grid-template-columns:1fr;gap:.55rem}.dots{grid-template-columns:repeat(9,1fr);gap:.32rem}.dot-key strong{width:100%;margin-left:0}
		.visitor-dot:nth-child(9n+1) .dot-tip,.visitor-dot:nth-child(9n+2) .dot-tip,.visitor-dot:nth-child(9n+3) .dot-tip{left:0;transform:none}
		.visitor-dot:nth-child(9n+1) .dot-tip::after,.visitor-dot:nth-child(9n+2) .dot-tip::after,.visitor-dot:nth-child(9n+3) .dot-tip::after{left:1.1rem}
		.visitor-dot:nth-child(9n+7) .dot-tip,.visitor-dot:nth-child(9n+8) .dot-tip,.visitor-dot:nth-child(9n+9) .dot-tip{right:0;left:auto;transform:none}
		.visitor-dot:nth-child(9n+7) .dot-tip::after,.visitor-dot:nth-child(9n+8) .dot-tip::after,.visitor-dot:nth-child(9n+9) .dot-tip::after{right:.75rem;left:auto}
	}
	@media(prefers-reduced-motion:reduce){
		.street-facts div,.visitor-dot{opacity:1;transform:none;transition:none!important}
	}
</style>
