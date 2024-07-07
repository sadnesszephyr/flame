import { TELEGRAM_BOT_TOKEN } from '$env/static/private'
import { ApiManager } from '$lib/server/api/ApiManager'
import { bot } from '$lib/server/bot'
import database from '$lib/server/database'
import { users } from '$lib/server/database/schema'
import { error, json, type RequestEvent } from '@sveltejs/kit'
import cryptoEs from 'crypto-es'
import { eq } from 'drizzle-orm'

export async function POST(event: RequestEvent) {
	const authorizationString = event.request.headers.get('Authorization')
		
	if (!authorizationString) {
		throw error(401)
	}

	if (authorizationString.startsWith('TMA ')) {
		const paramsRaw = authorizationString.split(' ')[1]

		const params = new URLSearchParams(paramsRaw)
		const hash = params.get('hash')
		params.delete('hash')

		const v = Array.from(params.entries())
		v.sort(([keyA], [keyB]) => keyA.localeCompare(keyB))

		const dataCheckString = v.map(([k, v]) => `${k}=${v}`).join('\n')
		const secretKey = cryptoEs.HmacSHA256(TELEGRAM_BOT_TOKEN, 'WebAppData')
		const key = cryptoEs.HmacSHA256(dataCheckString, secretKey).toString(cryptoEs.enc.Hex)

		const isValid = key === hash

		if (!isValid) {
			throw error(401, {
				message: 'Couldn\'t validate your init data'
			})
		}

		const initDataRaw = Object.fromEntries(params)
		const initDataUserRaw = JSON.parse(initDataRaw.user)

		let userData = await database.query.users.findFirst({
			where: eq(users.id, initDataUserRaw.id)
		})

		// create user if not exists yet
		if (!userData) {
			userData = (await database
				.insert(users)
				.values({
					id: initDataUserRaw.id,
					username: initDataUserRaw.username,
					coins: 100,
					rubies: 0
				}))[0]
			await bot.log(`🧡 User ${initDataUserRaw.id} joined Campfire`)
		}
		
		const data = await ApiManager.handle(event.params.method!, initDataUserRaw.id, null)

		return json(data)
	}
}
