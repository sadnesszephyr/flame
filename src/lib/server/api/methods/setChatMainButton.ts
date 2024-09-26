import { bot } from '$lib/server/bot'
import { MenuButtonDefault, MenuButtonWebApp } from 'tgkit'
import { createMethod } from '../Method'
import { z } from 'zod'

export default createMethod({
	id: 'setChatMainButton',
	bodySchema: z.object({
		enabled: z.boolean()
	}),
	async handler({ user, body }) {
		console.log(body)
		if (body.enabled) {
			await bot.setChatMenuButton(user.id, new MenuButtonWebApp({
				text: 'Open!',
				webApp: {
					url: 'https://t.me/campfire_dev_bot/app'
				}
			}))
		}
		else {
			await bot.setChatMenuButton(user.id, new MenuButtonDefault())
		}
	}
})
