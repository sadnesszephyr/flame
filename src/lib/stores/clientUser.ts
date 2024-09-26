import type { RelationStatus } from '$lib/constants'
import type { ItemId } from '$lib/items'
import { writable } from 'svelte/store'

export interface ClientUser {
	id: number,
	username: string,
	name: string,
	coins: number,
	rubies: number,
	level: number,
	exp: number,
	isAdmin: boolean,
	translatorLanguages?: string[],
	inventoryItems: InventoryItem[],
	lastFishedAt?: Date
}

export interface InventoryItem {
	itemId: ItemId,
	quantity: number
}

export interface UserRelation {
	id: number,
	username: string,
	name: string,
	status: RelationStatus
}

export const clientUser = writable<ClientUser | null>(null)
