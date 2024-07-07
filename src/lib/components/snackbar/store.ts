import { writable } from 'svelte/store'

export const snackbars = writable<Snackbar[]>([])

export interface Snackbar {
	text: string,
	id: string
}

export function snackbar(data: Omit<Snackbar, 'id'>) {
	snackbars.update((sb) => [...sb, {
		...data,
		id: Math.random().toString()
	}])
}
