import type { Chat } from 'telescript'
import { getXpForNextLevel } from '../shared/leveling'
import { database } from './database'
import type { User as DatabaseUser } from '@prisma/client'

class User {
	id: number

	constructor(chatData: Chat, userData: DatabaseUser) {
		this.id = chatData.id
	}
}

async function createUser(chatData: Chat) {
	const userData = await database.user.create({
		data: {
			id: chatData.id,
			authCode: '123',
			username: chatData.username ?? 'user' + chatData.id,
		}
	})

	return new User(chatData, userData)
}

export async function giveUserXp(userId: number, xp: number) {
	const user = await database.user.findUnique({
		where: {
			id: userId
		},
		select: {
			level: true,
			xp: true
		}
	})

	if(!user) return

	let newLevel = user.level
	let newXp = user.xp + xp
	let xpToNextLevel = getXpForNextLevel(user.level)

	while (newXp >= xpToNextLevel) {
		newXp -= xpToNextLevel
		newLevel++
		xpToNextLevel = getXpForNextLevel(newLevel)
	}

	await database.user.update({
		where: {
			id: userId
		},
		data: {
			level: newLevel,
			xp: newXp
		}
	})

	await giveUserItem(userId, 'envelope', newLevel - user.level)

	return {
		level: newLevel,
		xp: newXp
	}
}

export async function giveUserItem(userId: number, itemId: string, quantity: number = 1) {
	return await database.inventoryItem.upsert({
		where: {
			userId_itemId: {
				userId, itemId
			}
		},
		create: {
			userId, itemId, quantity
		},
		update: {
			quantity: {
				increment: quantity
			}
		}
	})
}