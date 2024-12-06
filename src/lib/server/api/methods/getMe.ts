import database from '$lib/server/database'
import { createMethod } from '../Method'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { inventoryItems } from '$lib/server/database/schema'
import type { ItemId } from '$lib/items'

export default createMethod({
	id: 'getMe',
	bodySchema: z.null(),
	async handler({ user }) {
		const items = await database.query.inventoryItems.findMany({
			where: eq(inventoryItems.userId, user.id)
		})

		return {
			id: user.id,
			username: user.username,
			name: user.name,
			coins: user.coins,
			rubies: user.rubies,
			level: user.level,
			isAdmin: user.isAdmin,
			exp: user.exp,
			translatorLanguages: user.translatorLanguages ?? undefined,
			lastFishedAt: user.lastFishedAt?.toString() ?? undefined,
			inventoryItems: items.map((item) => ({
				itemId: item.itemId as ItemId,
				quantity: item.quantity
			}))
		}
	}
})
