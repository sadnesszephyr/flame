import { type RequestEvent, json } from '@sveltejs/kit'
import { database } from '$lib/server/database'

const possibleDrops = [
	{ coins: 20 },
	{ coins: 30 },
	{ coins: 40 },
	{ coins: 50 },
	{ coins: 60 },
	{ rubies: 2 },
	{ rubies: 5 }
]

export async function POST(event: RequestEvent) {
	const { t, initData, user } = event.locals
	if(!event.locals.user.inventoryItems.find((item) => item.itemId === 'envelope' && item.quantity > 0)) {
		return json({
			message: t('items.envelope.use.absence')
		}, {
			status: 400
		})
	}

	const drop = possibleDrops[Math.floor(Math.random() * possibleDrops.length)]

	await database.inventoryItem.update({
		data: {
			quantity: {
				decrement: 1
			}
		},
		where: {
			userId_itemId: {
				userId: user.id,
				itemId: 'envelope'
			}
		}
	})

	const updatedUser = await database.user.update({
		data: {
			coins: {
				increment: drop.coins ?? 0
			},
			rubies: {
				increment: drop.rubies ?? 0
			}
		},
		where: {
			id: user.id
		}
	})

    return json({
		_updates: {
			coins: updatedUser.coins,
			rubies: updatedUser.rubies
		}
	})
}