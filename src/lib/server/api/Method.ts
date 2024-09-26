import type database from '$lib/server/database'
import type { users } from '$lib/server/database/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { ZodSchema, z } from 'zod'

export interface Method<T extends ZodSchema, I extends string, R> {
	id: I,
	bodySchema: T,
	public?: boolean,
	handler: (context: {
		user: InferSelectModel<typeof users>,
		body: z.infer<T>
	}) => Promise<R>
}

export function createMethod<T extends ZodSchema, I extends string, R>(method: Method<T, I, R>) {
	return method as Method<T, I, R>
}
