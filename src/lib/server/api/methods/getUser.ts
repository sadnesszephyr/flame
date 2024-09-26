import database from '$lib/server/database'
import { error } from '@sveltejs/kit'
import { createMethod } from '../Method'
import { z } from 'zod'
import { RelationStatus } from '$lib/constants'

export default createMethod({
	id: 'getUser',
	bodySchema: z.object({
		id: z.number()
	}),
	async handler({ user, body }) {
		const userData = await database.query.users.findFirst({
			where: (users, { eq }) => eq(users.id, body.id),
			columns: {
				id: true,
				username: true,
				name: true,
				level: true,
				isAdmin: true,
				bio: true
			}
		})

		if (!userData) {
			error(404)
		}

		const friendshipSentRequest = await database.query.friendships.findFirst({
			where: (friendships, { eq, and }) => and(
				eq(friendships.initiatorId, user.id), eq(friendships.targetId, body.id)
			)
		})

		const friendshipReceivedRequest = await database.query.friendships.findFirst({
			where: (friendships, { eq, and }) => and(
				eq(friendships.initiatorId, body.id), eq(friendships.targetId, user.id)
			)
		})

		let relationStatus: RelationStatus = RelationStatus.None

		if (friendshipSentRequest && friendshipReceivedRequest) {
			relationStatus = RelationStatus.Friend
		}
		else if (friendshipSentRequest && !friendshipReceivedRequest) {
			relationStatus = RelationStatus.FriendRequestSent
		}
		else if (!friendshipSentRequest && friendshipReceivedRequest) {
			relationStatus = RelationStatus.FriendRequestRecieved
		}

		return {
			...userData,
			relationStatus
		}
	}
})
