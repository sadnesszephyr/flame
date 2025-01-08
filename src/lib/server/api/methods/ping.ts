import { sendEvent } from '../../services/user'
import { createMethod } from '../Method'
import { z } from 'zod'

export default createMethod({
	id: 'ping',
	bodySchema: z.null(),
	async handler({ user }) {
		await sendEvent(user.id, 'ping', {
			pong: true
		})

		return {
			pong: true
		}
	}
})
