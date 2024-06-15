import { defineConfig, type Plugin } from 'vite'
import { imagetools } from 'vite-imagetools'
import { sveltekit } from '@sveltejs/kit/vite'
import localtunnel from 'localtunnel'
import colors from 'picocolors'

export default defineConfig({
	plugins: [
		imagetools(),
		sveltekit(),
		// myPlugin()
	],
	server: {
		host: true,
		port: 1808
	},
	resolve: {
		alias: {
			'$': '/src'
		}
	}
})

// function myPlugin(): Plugin {
// 	let config: any
// 	//                     ^?
// 	return {
// 		name: 'localtunnel',
// 		apply: 'serve',
// 		configResolved(resolvedConfig) {
// 			config = resolvedConfig
// 		},
// 		configureServer(devServer) {
// 			return async () => {
// 				const tunnel = await localtunnel({
// 					port: 1808,
// 					subdomain: 'campfire',
// 				})

// 				devServer.config.logger.info((`\n ${colors.red(colors.bold('CAMPFIRE'))}  ${colors.dim('ready')}\n\n ${colors.green('➜')}  ${colors.bold('Tunnel')}: ${colors.cyan(tunnel.url)}`))

// 				devServer.httpServer?.on('close', () => {
// 					tunnel.close()
// 				})
// 			}
// 		},
// 	}
// }