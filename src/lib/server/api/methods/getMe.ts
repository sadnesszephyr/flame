import database from '$lib/server/database'
import type { Method } from '../Method'
import { z } from 'zod'

export default {
	id: 'getMe',
	bodySchema: z.null(),
	async handler({ userId }) {
		const userData = await database.query.users.findFirst({
			where: (users, { eq }) => eq(users.id, userId),
			with: {
				inventoryItems: true
			}
		})

		return userData
	}
} satisfies Method
