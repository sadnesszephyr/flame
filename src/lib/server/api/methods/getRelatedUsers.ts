import database from '$lib/server/database'
import { createMethod } from '../Method'
import { z } from 'zod'
import type { UserRelation } from '$lib/clientUser.svelte'
import { RelationStatus } from '$lib/constants'

export default createMethod({
	id: 'getRelatedUsers',
	bodySchema: z.undefined(),
	async handler({ user }) {
		const friendshipSentRequests = await database.query.friendships.findMany({
			where: (friendships, { eq }) => eq(friendships.initiatorId, user.id),
			with: {
				target: {
					columns: {
						id: true,
						username: true,
						name: true
					}
				}
			}
		})

		const friendshipReceivedRequests = await database.query.friendships.findMany({
			where: (friendships, { eq }) => eq(friendships.targetId, user.id),
			with: {
				initiator: {
					columns: {
						id: true,
						username: true,
						name: true
					}
				}
			}
		})

		const relatedUsers: UserRelation[] = friendshipSentRequests.map((request) => ({
			id: request.targetId,
			username: request.target.username,
			name: request.target.name,
			status: RelationStatus.FriendRequestSent
		}))

		friendshipReceivedRequests.forEach((receivedRequest) => {
			const existingRequest = relatedUsers.find((user) => user.id === receivedRequest.initiatorId)
			if (existingRequest) {
				existingRequest.status = RelationStatus.Friend
			}
			else {
				relatedUsers.push({
					id: receivedRequest.initiatorId,
					username: receivedRequest.initiator.username,
					name: receivedRequest.initiator.name,
					status: RelationStatus.FriendRequestReceived
				})
			}
		})

		return relatedUsers
	}
})
