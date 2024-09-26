import database from '$lib/server/database'
import { error, json } from '@sveltejs/kit'
import { createMethod } from '../Method'
import { z } from 'zod'
import { friendships } from '$lib/server/database/schema'
import { bot } from '$lib/server/bot'
import { InlineKeyboardButton, InlineKeyboardMarkup, ParseMode } from 'tgkit'
import { and, eq } from 'drizzle-orm'

export default createMethod({
	id: 'befriend',
	bodySchema: z.object({
		id: z.number(),
		revoke: z.boolean().optional(),
		silent: z.boolean().optional()
	}),
	async handler({ user, body }) {
		if (user.id === body.id) {
			error(400)
		}

		const existingFriendship = await database.query.friendships.findFirst({
			where: (friendships, { eq, and }) => and(
				eq(friendships.initiatorId, user.id),
				eq(friendships.targetId, body.id)
			)
		})

		if (!body.revoke) {
			if (existingFriendship) {
				error(409)
			}
	
			await database
				.insert(friendships)
				.values({
					initiatorId: user.id,
					targetId: body.id
				})
	
			if (!body.silent) {
				if (!existingFriendship) {
					await bot.sendMessage(
						body.id,
						`🍃 [${user.name}](https://t.me/campfire_dev_bot/app?r=/profile/${user.id}) sent you a friend request\\!`,
						{
							parseMode: ParseMode.MarkdownV2,
							replyMarkup: new InlineKeyboardMarkup()
								.setKeyboard([[
									new InlineKeyboardButton({
										text: 'Accept',
										callbackData: `acceptFriendRequest:${user.id}`
									})
								]])
						}
					)
				}
				else {
					await bot.sendMessage(
						body.id,
						`🍃 [${user.name}](https://t.me/campfire_dev_bot/app?r=/profile/${user.id}) accepted your friend request`,
						{
							parseMode: ParseMode.MarkdownV2
						}
					)
				}
			}
		}
		else {
			if (!existingFriendship) {
				error(409)
			}

			await database
				.delete(friendships)
				.where(
					and(
						eq(friendships.initiatorId, user.id),
						eq(friendships.targetId, body.id)
					)
				)
		}
	}
})
