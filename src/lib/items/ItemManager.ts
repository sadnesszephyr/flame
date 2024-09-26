import type { ItemId } from '$lib/items'
import type { Item, ItemComponent } from '$lib/items/Item'
import * as itemsData from './items'

export class ItemManager {
	items: Item[]

	constructor(items: Record<string, Item>) {
		this.items = Object.values(items)
	}

	get<T extends ItemId>(itemId: T): typeof itemsData[T] | undefined {
		return this.items.find((item) => item.id === itemId)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getWithComponent(component: { new(...args: any[]): ItemComponent }) {
		return this.items.filter((item) => item.components.some((c) => c instanceof component))
	}
}
