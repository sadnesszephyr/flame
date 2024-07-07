import { ZodSchema, z } from 'zod'

export interface Method<T extends ZodSchema = ZodSchema> {
	id: string,
	bodySchema: T,
	// eslint-disable-next-line no-unused-vars
	handler: (context: {
		userId: number,
		body: z.infer<T>
	}) => Promise<unknown>
}
