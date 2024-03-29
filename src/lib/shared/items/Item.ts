abstract class Tag {}

interface ItemData {
	id: string,
	price?: number
}

export class Item {
	id: string
	price: number
	tags: Tag[] = []

	constructor(data: ItemData) {
		this.id = data.id
		this.price = data.price ?? 0
	}


	get sellable() {
		return this.price > 0
	}


	hasTag(tag: typeof Tag) {
		return this.tags.some((t) => t instanceof tag)
	}
}