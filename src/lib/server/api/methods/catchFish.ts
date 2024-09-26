import database from '$lib/server/database'
import { users } from '$lib/server/database/schema'
import { updateInventory } from '$lib/server/services/user'
import { eq } from 'drizzle-orm'
import { createMethod } from '../Method'
import { z } from 'zod'
import { error } from '@sveltejs/kit'
import { selectWeightedRandom } from '$lib/random'
import { itemComponents, itemManager } from '$lib/items'

const expReward = 2
const cooldown = 30_000
const waitMinTime = 15_000

export default createMethod({
	id: 'catchFish',
	bodySchema: z.null(),
	async handler({ user }) {
		const newFishingDate = new Date()
		const lastFishedAtTimestamp = user.lastFishedAt?.getTime() ?? 0

		if (lastFishedAtTimestamp + cooldown > newFishingDate.getTime()) {
			error(400)
		}

		await database
			.update(users)
			.set({
				lastFishedAt: newFishingDate,
				exp: user.exp + expReward
			})
			.where(eq(users.id, user.id))

		const fishableItems = itemManager.getWithComponent(itemComponents.FishableComponent)
		
		const fishedItem = selectWeightedRandom(
			fishableItems,
			(item) => item.components.find((c) => c instanceof itemComponents.FishableComponent)!.chanceWeight,
			user.lastFishedAt?.getTime() ?? user.id
		)

		await updateInventory(user.id, fishedItem.id, 1)

		return {
			fishedItem: fishedItem.id,
			catchedAt: newFishingDate.getTime()
		}
	}
})
