import { error, json, type RequestEvent } from '@sveltejs/kit'
import cryptoEs from 'crypto-es'
import { TELEGRAM_BOT_TOKEN } from '$env/static/private'
import database from '$lib/server/database'
import { authTokens } from '$lib/server/database/schema'

export async function POST(event: RequestEvent) {
	const body = await event.request.json()

	// TODO: maybe extract this to function, because its also used in TMA initData validation
	const { hash } = body
	delete body.hash

	const v = Array.from(Object.entries(body))
	v.sort(([keyA], [keyB]) => keyA.localeCompare(keyB))

	const dataCheckString = v.map(([k, v]) => `${k}=${v}`).join('\n')
	const secretKey = cryptoEs.SHA256(TELEGRAM_BOT_TOKEN)
	const key = cryptoEs.HmacSHA256(dataCheckString, secretKey).toString(cryptoEs.enc.Hex)
	console.log(key)
	console.log(hash)

	const isValid = key === hash

	if (!isValid) {
		throw error(401, {
			message: 'Couldn\'t validate your login data'
		})
	}

	const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	const tokenLength = 64

	let token = ''

	for (let i = 0; i < tokenLength; i++) {
		token += alphabet[Math.floor(Math.random() * alphabet.length)]
	}

	await database
		.insert(authTokens)
		.values({
			userId: body.id,
			token
		})
	
	return json({ token })
}
