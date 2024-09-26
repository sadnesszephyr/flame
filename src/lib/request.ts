import type { ApiManager, methodId } from '$lib/server/api/ApiManager'
import type { z } from 'zod'

export type serverResponse<T extends methodId> = Awaited<ReturnType<typeof ApiManager['methods'][T]['handler']>>

export async function request<T extends methodId>(
	method: T,
	body?: z.infer<typeof ApiManager['methods'][T]['bodySchema']>
): Promise<serverResponse<T>> {
	// let requestId = Math.round(Math.random() * 100000)

	// activeRequests.update((requests) => {
	// 	return [...requests, requestId]
	// })

	const isOnTma = Boolean(window.Telegram.WebApp.initData)

	let autorizationString = ''
	if (isOnTma) {
		autorizationString = 'TMA ' + window.Telegram.WebApp.initData
	}
	else if (localStorage.getItem('token')) {
		autorizationString = 'Standalone ' + localStorage.getItem('token')
	}

	const res = await fetch('/api/method/' + method, {
		body: JSON.stringify(body ?? {}),
		method: 'POST',
		headers: {
			Authorization: autorizationString
		}
	})

	const data = await res.json().catch(() => {
		if (!res.ok) {
			throw new Error('Unknown error')
		}
		return
	})

	if (!res.ok) {
		throw new Error(data.message)
	}

	// if (data._updates) {
	// 	userData.update((user) => ({
	// 		...user,
	// 		...data._updates
	// 	}))
	// }

	// activeRequests.update((requests) => {
	// 	return requests.filter((id) => id !== requestId)
	// })

	return data
}
