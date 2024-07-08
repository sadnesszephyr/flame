import { writable } from 'svelte/store'

export interface ClientUser {
	coins: number,
	rubies: number,
	level: number,
	exp: number
}

export const clientUser = writable<ClientUser | null>(null)
