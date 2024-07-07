import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
// import localtunnel from 'localtunnel'
// import type { PluginOption } from 'vite'

// function ltPlugin(): PluginOption {
// 	return {
// 		name: 'localtunnel',
// 		apply: 'serve',
// 		configureServer(devServer) {
// 			return async () => {
// 				console.log('Starting tunnel')

// 				const tunnel = await localtunnel({
// 					port: 1808,
// 					subdomain: 'campfire'
// 				})

// 				console.log(tunnel.url)

// 				devServer.httpServer?.on('close', () => {
// 					tunnel.close()
// 				})

// 				tunnel.on('error', console.log)
// 				tunnel.on('request', console.log)
// 			}
// 		}
// 	}
// }

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: 1808,
		host: true
	}
})
