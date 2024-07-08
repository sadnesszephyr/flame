import database from '$lib/server/database'
import { inventoryItems, users } from '$lib/server/database/schema'
import { supabase } from '$lib/supabase'
import type { WebAppUser } from '@twa-dev/types'
import { and, eq } from 'drizzle-orm'

export async function createUser(initData: WebAppUser) {
	const userData = await database
		.insert(users)
		.values({
			id: initData.id,
			username: initData.username ?? `user${initData.id}`,
			coins: 100,
			rubies: 0
		})
	
	return userData
}

export async function updateInventory(userId: number, itemId: string, quantity: number) {
	const itemData = await database.query.inventoryItems.findFirst({
		where: and(
			eq(inventoryItems.userId, userId),
			eq(inventoryItems.itemId, itemId)
		)
	})

	if (!itemData) {
		if (quantity < 0) {
			// throw new Error('Not enough items')
			return
		}

		await database
			.insert(inventoryItems)
			.values({
				userId,
				itemId,
				quantity
			})
		
		await sendEvent(userId, 'inventoryUpdate', [{
			itemId,
			quantity
		}])
	}
	else {
		if (itemData.quantity + quantity < 0) {
			// throw new Error('Not enough items')
			return
		}
		else if (itemData.quantity + quantity === 0) {
			await database
				.delete(inventoryItems)
				.where(and(
					eq(inventoryItems.userId, userId),
					eq(inventoryItems.itemId, itemId)
				))
			
			await sendEvent(userId, 'inventoryUpdate', [{
				itemId,
				quantity: 0
			}])
		}
		else {
			await database
				.update(inventoryItems)
				.set({
					quantity: itemData.quantity + quantity
				})
				.where(and(
					eq(inventoryItems.userId, userId),
					eq(inventoryItems.itemId, itemId)
				))
			
			await sendEvent(userId, 'inventoryUpdate', [{
				itemId,
				quantity: itemData.quantity + quantity
			}])
		}
	}
}

async function sendEvent(userId: number, name: string, payload: unknown) {
	const channel = supabase.channel(`events-${userId}`)

	channel.subscribe(async (status) => {
		if (status !== 'SUBSCRIBED') {
			return
		}

		await channel.send({
			event: name,
			type: 'broadcast',
			payload
		})

		channel.unsubscribe()
	})
}
