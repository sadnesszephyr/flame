import { ItemManager } from '$lib/items/ItemManager'
export { Item, ItemComponent } from '$lib/items/Item'
import * as itemsData from './items'

export * as itemComponents from './components'

export const itemManager = new ItemManager(itemsData)

export type ItemId = keyof typeof itemsData
