# Night Economy Pudding Shell

Blank SvelteKit story shell extracted from the public structure of `the-pudding/kpop-generations`.

This project keeps the reusable architecture and high-level style system: a data-driven story index, fixed top navigation, hero title stage, two narrator cards, five chapter covers, alternating narrator text blocks, image blocks, image groups, prop cards, chart containers, methodology, and footer. It intentionally does not include the original article text, data, images, audio, fonts, logos, analytics, or visual assets.

## Run

```bash
pnpm install
pnpm run dev
```

If your environment does not have `pnpm`, use the bundled Codex runtime path or install with another compatible package manager.

## Content Entry

All placeholder content lives in:

```text
src/lib/data/story.js
```

Replace bracketed placeholder strings such as `[PAGE TITLE]`, `[TEXT BLOCK PLACEHOLDER]`, and `[IMAGE PLACEHOLDER]` with your own material.

## Component Mapping

The original project's K-pop-specific component names were generalized:

| Source component | Shell component | Purpose |
| --- | --- | --- |
| `Header.svelte` | `StoryNav.svelte` | Sticky story navigation |
| `Index.svelte` | `StoryIndex.svelte` | Page composition |
| `Title.svelte` | `Hero.svelte` | Hero and narrator intro |
| `Section.svelte` | `Chapter.svelte` | Chapter cover and intro |
| `Nodes.svelte` | `Nodes.svelte` | Data-driven block renderer |
| `Section.Text.svelte` | `TextBlock.svelte` | Narrator text block |
| `Section.Image.svelte` | `ImageBlock.svelte` | Single image placeholder |
| `Section.Images.svelte` | `ImageStack.svelte` | Image group placeholder |
| `Section.Chart.svelte` | `ChartBlock.svelte` | Chart/data container |
| `Song.svelte` | `PropCard.svelte` | Side card/prop card |
| `Methods.svelte` | `Methodology.svelte` | Methods and notes |
| `Footer.svelte` | `Footer.svelte` | Credits/footer |

## Style Extraction Notes

The shell now keeps closer teaching-reference details from the source implementation:

- chapter theme variables: gradients, heading colors, text colors, borders, box shadows, and connection-line colors
- fixed top navigation with a fading gradient background and circular chapter markers
- hero title stage with large asset-sized placeholder blocks, bubble labels, sparkle shapes, bounce-pop timing, and floating motion
- chapter cover rhythm with framed image placeholder, large rotated number badge, year label, and twinkling accents
- alternating narrator text blocks with overhanging speaker labels, thick borders, inset shadows, and left/right slide-in
- SVG node connection paths between content blocks
- image and image-group placeholder blocks with framed/polaroid-like treatment
- prop card and chart containers using the active chapter theme variables

Intentional substitutions:

- original title art is represented by editable CSS placeholder blocks
- original photos, covers, album art, videos, and audio are represented by placeholder panels
- original fonts are replaced by system display/sans fonts
- original chart content is represented by placeholder chart data
- original analytics and external tracking are omitted

## Extraction Notes

- The source repo was downloaded from GitHub after `git clone` failed due to network resets.
- The original project dependency install reached package installation, but `pnpm` 11 repeatedly entered a non-interactive `node_modules` rebuild flow in this Windows/Codex environment. That issue was recorded rather than allowed to block the shell extraction.
- This shell uses a smaller SvelteKit dependency set and avoids original analytics, fonts, image/audio assets, and data files.
