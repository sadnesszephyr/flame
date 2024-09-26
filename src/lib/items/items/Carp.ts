import { FishableComponent } from '$lib/items/components'
import { Item } from '$lib/items/Item'

export default new Item({
	id: 'carp',
	components: [
		new FishableComponent({
			chanceWeight: 0.5
		})
	]
})
