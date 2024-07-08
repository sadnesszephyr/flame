import catchFish from '$lib/server/api/methods/catchFish'
import getMe from '$lib/server/api/methods/getMe'
import ping from '$lib/server/api/methods/ping'
import type { Method } from './Method'
import { type ZodSchema } from 'zod'

export class ApiManager {
	static methods: Method[] = [getMe, ping, catchFish]

	static registerMethod<T extends ZodSchema>(method: Method<T>) {
		// @ts-expect-error TODO
		this.methods.push(method)
	}

	static handle(methodId: string, userId: number, body: unknown) {
		const method = this.methods.find((m) => m.id === methodId)
		if (!method) throw Error('Method not found')
		
		try {
			return method.handler({
				userId,
				body
			})
		}
		catch (e) {
			console.log(e)
		}
	}
}
