import { json, type RequestEvent } from '@sveltejs/kit'
import { database } from '$lib/server/database'
import { giveUserXp } from '../../../lib/server/user'

export async function POST(event: RequestEvent) {
	let items = await database.inventoryItem.findMany({
		where: {
			userId: event.locals.initData.user.id
		},
		select: {
			itemId: true,
			quantity: true
		}
	})

	items = items
		.sort((itemA, itemB) => itemB.quantity - itemA.quantity)
		.filter((item) => item.quantity > 0)

	return json(items)
}
