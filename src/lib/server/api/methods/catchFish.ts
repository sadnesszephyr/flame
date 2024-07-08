import { updateInventory } from '$lib/server/services/user'
import type { Method } from '../Method'
import { z } from 'zod'

export default {
	id: 'catchFish',
	bodySchema: z.object({
		release: z.boolean()
	}),
	async handler({ userId, body }) {
		try {
			updateInventory(userId, 'carp', body.release ? -1 : 1)
		}
		catch (e) {
			console.log(e)
		}

		return {}
	}
} satisfies Method
