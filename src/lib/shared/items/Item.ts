import type { Component } from './Component'

interface ItemData {
	id: string,
	price?: number,
	components?: Component[]
}

export abstract class Item {
	id: string
	price: number
	components: Component[] = []

	constructor(data: ItemData) {
		this.id = data.id
		this.price = data.price ?? 0
		this.components = data.components ?? []
	}

	get sellable() {
		return this.price > 0
	}

	hasComponent(tag: typeof Component) {
		return this.components.some((t) => t instanceof tag)
	}
}