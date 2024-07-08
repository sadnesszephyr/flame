import { writable } from 'svelte/store'

export type Inventory = InventoryItem[]

export interface InventoryItem {
	itemId: string,
	quantity: number
}

export const inventory = writable<Inventory>([])
