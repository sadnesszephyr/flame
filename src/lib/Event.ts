import type { ClientUser } from '$lib/clientUser.svelte'
import type { z, ZodSchema } from 'zod'

export interface Event<T extends ZodSchema, I extends string> {
	id: I,
	bodySchema: T,
	handler: (context: {
		user: ClientUser,
		payload: z.infer<T>
	}) => Promise<void>
}

export function createEvent<T extends ZodSchema, I extends string>(method: Event<T, I>) {
	return method as Event<T, I>
}