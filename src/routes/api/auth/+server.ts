import { bot } from '$lib/server/bot'
import { database } from '$lib/server/database'
import { error, json, type RequestEvent } from '@sveltejs/kit'
import { InlineKeyboardMarkup } from 'telescript'

export async function POST(event: RequestEvent) {
	const { t } = event.locals
	const data = await event.request.json()

	const userData = await database.user.findUnique({
		where: {
			id: data.userId
		}
	})

	if(userData?.authCode === data.code) {
		await database.user.update({
			where: {
				id: data.userId
			},
			data: {
				authCode: generatRandomString(8)
			}
		})

		const createdToken = await database.authToken.create({
			data: {
				token: generatRandomString(32),
				userId: data.userId
			}
		})

		return json({
			token: createdToken.token,
			user: {
				...await bot.rest.request('getChat', { chat_id: data.userId }),
			}
		})
	} else {
		throw error(403, {
			message: 'api.auth.error'
		})
	}
}

function generatRandomString(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
    let token = ''
    for (let i = 0; i < length; i++) {
        const characterPosition = Math.floor(Math.random() * (characters.length))
        token += characters[characterPosition]
    }
    return token
}