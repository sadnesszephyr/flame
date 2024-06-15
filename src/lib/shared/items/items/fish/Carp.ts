import { Item } from '$lib/shared/items/Item'

export class Carp extends Item {
	constructor() {
		super({
			id: 'carp',
			price: 10
		})
	}
}