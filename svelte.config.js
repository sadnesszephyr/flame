import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import * as childProcess from 'node:child_process'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter(),
		version: {
			name: childProcess.execSync('git rev-parse HEAD').toString().trim()
		},
		csrf: {
			checkOrigin: false
		}
	}
}

export default config
