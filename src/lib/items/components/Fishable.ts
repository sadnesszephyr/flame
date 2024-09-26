import { ItemComponent } from '$lib/items/Item'

interface FishableComponentOptions {
	isTrash?: boolean,
	chanceWeight: number
}

export class FishableComponent extends ItemComponent {
	chanceWeight: number

	constructor(options: FishableComponentOptions) {
		super('fishable')

		this.chanceWeight = options.chanceWeight
	}
}
