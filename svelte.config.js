import { mdsvex } from "mdsvex";
import sveltePreprocess from "svelte-preprocess";

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [sveltePreprocess(), mdsvex({ extensions: [".svx", ".md"] })],
  extensions: [".svelte", ".svx", ".md"],
};
