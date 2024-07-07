import type { Method } from '../Method'
import { z } from 'zod'

export default {
	id: 'ping',
	bodySchema: z.null(),
	async handler() {
		return {
			pong: true
		}
	}
} satisfies Method
