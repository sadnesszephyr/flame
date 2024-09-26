import { createMethod } from '../Method'
import { z } from 'zod'

export default createMethod({
	id: 'ping',
	bodySchema: z.null(),
	async handler() {
		return {
			pong: true
		}
	}
})
