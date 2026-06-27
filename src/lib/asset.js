import { base } from "$app/paths";

/**
 * Prefix an absolute asset path (e.g. "/assets/...") with SvelteKit's base path
 * so images resolve correctly when the site is served from a subpath, such as a
 * GitHub Pages project site at /<repo-name>/.
 *
 * Empty values pass through unchanged so callers can keep their placeholder logic.
 */
export const asset = (src) => {
	if (!src) return src;
	if (/^([a-z]+:)?\/\//i.test(src) || src.startsWith("data:")) return src;
	return `${base}${src.startsWith("/") ? "" : "/"}${src}`;
};
