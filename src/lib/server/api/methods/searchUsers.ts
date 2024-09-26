import database from '$lib/server/database'
import { createMethod } from '../Method'
import { z } from 'zod'

export default createMethod({
	id: 'getUser',
	bodySchema: z.object({
		query: z.string()
	}),
	async handler({ body }) {
		const foundUsers = await database.query.users.findMany({
			where: (users, { eq, or, ilike }) => or(
				eq(users.id, isNaN(Number(body.query)) ? 0 : Number(body.query)),
				ilike(users.name, `%${body.query}%`),
				ilike(users.username, `%${body.query}%`)
			),
			columns: {
				id: true,
				username: true,
				name: true
			}
		})

		return foundUsers
	}
})
