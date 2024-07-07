import { writable } from 'svelte/store'

export interface ClientUser {
	coins: number,
	rubies: number
}

export const clientUser = writable<ClientUser | null>(null)
