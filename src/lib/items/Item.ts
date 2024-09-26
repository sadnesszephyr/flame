import type * as sprites from '$lib/components/itemSprite/sprites'
import type { ItemId } from '$lib/items'

interface ItemOptions {
	id: ItemId,
	sprite?: keyof typeof sprites,
	components?: ItemComponent[]
}

export class Item {
	id: ItemId
	sprite: keyof typeof sprites
	components: ItemComponent[]

	constructor(options: ItemOptions) {
		this.id = options.id
		this.sprite = options.sprite ?? this.id as keyof typeof sprites
		this.components = options.components ?? []
	}
}

export class ItemComponent {
	id: string

	constructor(id: string) {
		this.id = id
	}
}
