import { bot } from '$lib/server/bot'
import { InlineKeyboardButton, InlineKeyboardMarkup } from 'tgkit'
import { createMethod } from '../Method'
import { z } from 'zod'
import database from '$lib/server/database'
import { relationships } from '$lib/server/database/schema'
import { json } from '@sveltejs/kit'

export default createMethod({
	id: 'suggestRelationship',
	bodySchema: z.object({
		userId: z.number()
	}),
	async handler({ user, body }) {
		const [relationship] = await database
			.insert(relationships)
			.values({
				initiatorId: user.id,
				responderId: body.userId
			})
			.returning()

		await bot.sendMessage(body.userId, `💞 User ${user.username} wants to start a relationship with you!`, {
			replyMarkup: new InlineKeyboardMarkup()
				.setKeyboard([[
					new InlineKeyboardButton({
						text: '💖 Accept',
						callbackData: `acceptRelationship:${relationship.id}`
					}),
					new InlineKeyboardButton({
						text: '💔 Reject',
						callbackData: `rejectRelationship:${relationship.id}`
					})
				]])
		})
		
		return {}
	}
})
