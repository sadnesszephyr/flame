import { createEvent } from '$lib/Event'
import { z } from 'zod'

export default createEvent({
	id: 'ping',
	bodySchema: z.void(),
	async handler({ payload }) {
		console.log('ping', payload)
	}
})