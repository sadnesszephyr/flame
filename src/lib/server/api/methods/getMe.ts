import database from '$lib/server/database'
import { users } from '$lib/server/database/schema'
import { eq } from 'drizzle-orm'
import type { Method } from '../Method'
import { z } from 'zod'

export default {
	id: 'getMe',
	bodySchema: z.null(),
	async handler({ userId }) {
		const userData = await database.query.users.findFirst({
			where: eq(users.id, userId)
		})
		return userData
	}
} satisfies Method
