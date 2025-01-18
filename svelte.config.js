import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import * as childProcess from 'node:child_process';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), indexPreprocess],
	compilerOptions: {
		runes: true,
	},
	kit: {
		adapter: adapter(),
		version: {
			name: childProcess.execSync('git rev-parse HEAD').toString().trim().slice(0, 7),
		},
		csrf: {
			checkOrigin: false,
		},
		files: {
			serviceWorker: 'src/serviceWorker',
		},
	},
	vitePlugin: {
		dynamicCompileOptions({ filename }) {
			if (filename.includes('node_modules')) {
				return {
					runes: false,
				};
			}
		},
	},
	extensions: ['.svelte', '.svg'],
};

export default config;

async function indexPreprocess(content) {
	return { code: content };
}
