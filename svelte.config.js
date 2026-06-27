import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "404.html",
			precompress: false,
			strict: true
		}),
		// GitHub Pages serves project sites under /<repo-name>/.
		// CI sets BASE_PATH from the repo name; local dev/build leaves it empty.
		paths: {
			base: process.env.BASE_PATH ?? ""
		},
		alias: {
			$components: "src/lib/components",
			$data: "src/lib/data",
			$styles: "src/styles"
		}
	}
};

export default config;
