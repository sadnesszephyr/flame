import { makeEndpoint } from '$lib/server/endpoints'
import { z } from 'zod'

export default makeEndpoint({
	schema:	z.object({
		userId: z.number()
	}),
	handler(data) {
		return { data }
	},
})