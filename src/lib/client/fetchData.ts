import { userData } from './store'

export async function fetchData(method: string, body?: any) {
	const res = await fetch('/api/' + method, {
		body: JSON.stringify(body),
		method: 'POST',
		headers: {
			Authorization: window.Telegram.WebApp.initData
		}
	})

	const data = await res.json()

	if(!res.ok) {
		window.Telegram.WebApp.showPopup({
			title: 'An error has occured',
			message: data.message ?? res.statusText
		})

		throw new Error(data.message)
	}

	if(data._updates) {
		userData.update((user) => ({
			...user,
			...data._updates
		}))
	}

	return data
}