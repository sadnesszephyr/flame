import befriend from '$lib/server/api/methods/befriend'
import catchFish from '$lib/server/api/methods/catchFish'
import getMe from '$lib/server/api/methods/getMe'
import ping from '$lib/server/api/methods/ping'
import setChatMainButton from '$lib/server/api/methods/setChatMainButton'
import suggestRelationship from '$lib/server/api/methods/suggestRelationship'
import getRelatedUsers from '$lib/server/api/methods/getRelatedUsers'
import getUser from '$lib/server/api/methods/getUser'
import type { Method } from './Method'
import type { InferSelectModel } from 'drizzle-orm'
import type { users } from '$lib/server/database/schema'
import type { ZodSchema } from 'zod'
import searchUsers from '$lib/server/api/methods/searchUsers'

export type methodId = keyof typeof ApiManager['methods']

export class ApiManager {
	// TODO
	static methods = {
		getMe,
		ping,
		catchFish,
		setChatMainButton,
		suggestRelationship,
		getRelatedUsers,
		getUser,
		searchUsers,
		befriend
	} as const

	static handle(methodId: keyof typeof ApiManager['methods'], user: InferSelectModel<typeof users>, body: unknown) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const method = this.methods[methodId] as unknown as Method<ZodSchema, string, any>
		if (!method) throw Error('Method not found')
		
		try {
			return method.handler({
				user,
				body
			})
		}
		catch (e) {
			console.log(e)
		}
	}
}
