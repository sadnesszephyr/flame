import { activeRequests, userData } from './store'

export async function request(method: string, body?: any) {
	let requestId = Math.round(Math.random() * 100000)

	activeRequests.update((requests) => {
		return [...requests, requestId]
	})

	const isOnTma = Boolean(window.Telegram.WebApp.initData)

	let autorizationString = ''
	if (isOnTma) {
		autorizationString = 'TMA ' + window.Telegram.WebApp.initData
	}
	else if (localStorage.getItem('token')) {
		autorizationString = 'Standalone ' + localStorage.getItem('token')
	}

	const res = await fetch('/api/' + method, {
		body: JSON.stringify(body),
		method: 'POST',
		headers: {
			Authorization: autorizationString
		}
	})

	const data = await res.json()

	if(!res.ok) {
		if (isOnTma) {
			window.Telegram.WebApp.showPopup({
				title: 'An error has occured',
				message: data.message ?? res.statusText
			})
		}
		else {
			alert('An error has occured! \n' + (data.message ?? res.statusText))
		}

		throw new Error(data.message)
	}

	if(data._updates) {
		userData.update((user) => ({
			...user,
			...data._updates
		}))
	}

	activeRequests.update((requests) => {
		return requests.filter((id) => id !== requestId)
	})

	return data
}