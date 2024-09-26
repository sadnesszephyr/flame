import type { ItemId } from '$lib/items'
import { writable } from 'svelte/store'

export type Inventory = InventoryItem[]

export interface InventoryItem {
	itemId: ItemId,
	quantity: number
}

export const inventory = writable<Inventory>([])
