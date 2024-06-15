import { error, type Handle } from '@sveltejs/kit'
import cryptoEs from 'crypto-es'
import { database } from '$lib/server/database'
import { getT } from '$lib/shared/localization'
import { TELEGRAM_BOT_TOKEN } from '$env/static/private'

export const handle: Handle = async ({ event, resolve }) => {
	if(
		event.url.pathname.startsWith('/api')
		&& event.url.pathname !== '/api/webhook'
		&& event.url.pathname !== '/api/auth'
	) {
		const authorizationString = event.request.headers.get('Authorization')
		
		if (!authorizationString) {
			throw error(401)
		}

		if (authorizationString.startsWith('Standalone ')) {
			const databaseToken = await database.authToken.findUnique({
				where: {
					token: authorizationString.split(' ')[1]
				},
				include: {
					user: {
						include: {
							inventoryItems: true
						}
					}
				}
			})

			if (!databaseToken) {
				throw error(403)
			}

			event.locals.t = getT('en')
			// 	event.locals.initData = initData
			event.locals.user = databaseToken.user
		} else if (authorizationString.startsWith('TMA ')) {
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

			if(!isValid) {
				throw error(401, {
					message: 'Couldn\'t validate your init data. Make sure you\'ve sent this request from Telegram Mini App.'
				})
			}

			const initDataRaw = Object.fromEntries(params)
			const initDataUserRaw = JSON.parse(initDataRaw.user)

			const userData = await database.user.upsert({
				create: {
					id: Number(initDataUserRaw.id),
					authCode: 'code',
					username: initDataUserRaw.username ?? 'user' + initDataUserRaw.id
				},
				where: {
					id: Number(initDataUserRaw.id)
				},
				update: {},
				include: {
					inventoryItems: true
				}
			})

			event.locals.user = userData
			event.locals.t = getT(initDataUserRaw.language_code)
		}
	}

	const response = await resolve(event)
	return response
}