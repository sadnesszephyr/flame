import { error, json, type RequestEvent } from '@sveltejs/kit'
import { database } from '$lib/server/database'
import type { Prisma } from '@prisma/client'

export async function POST(event: RequestEvent) {
	const [levelTop, coinsTop, rubiesTop] = await Promise.all([
		getTopByFilter([{
			level: 'desc'
		}, {
			xp: 'desc'
		}]),
		getTopByFilter({ coins: 'desc' }),
		getTopByFilter({ rubiesTop: 'desc' })
	])

	return json({
		level: levelTop,
		coins: coinsTop,
		rubies: rubiesTop
	})
}

async function getTopByFilter(orderBy: Prisma.UserFindManyArgs['orderBy']) {
	return await database.user.findMany({
		orderBy,
		take: 20,
		select: {
			username: true,
			level: true,
			xp: true,
			coins: true,
			rubies: true,
			profilePhoto: true
		}
	})
}