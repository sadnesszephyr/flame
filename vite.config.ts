import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
// import { defineConfig } from 'vite'

export default defineVitestConfig({
	plugins: [sveltekit()],
	server: {
		port: 1808,
		host: true
	}
})
