import { goto } from '$app/navigation'
import type { RelationStatus } from '$lib/constants'
import type { ItemId } from '$lib/items'
import type { serverResponse } from '$lib/request'

export class ClientUser {
	readonly id!: number
	readonly username: string = $state()!
	readonly name: string = $state()!
	readonly level: number = $state()!
	readonly exp: number = $state()!
	readonly coins: number = $state()!
	readonly rubies: number = $state()!
	readonly isAdmin: boolean = $state()!
	readonly translatorLanguages?: string[] = $state()!
	lastFishedAt?: Date = $state()

	constructor(data: serverResponse<'getMe'> | false) {
		if (!data) return
		this.id = data.id
		this.username = data.username
		this.name = data.name
		this.level = data.level
		this.exp = data.exp
		this.coins = data.coins
		this.rubies = data.rubies
		this.isAdmin = data.isAdmin
		this.translatorLanguages = data.translatorLanguages
		this.lastFishedAt = data.lastFishedAt ? new Date(data.lastFishedAt) : undefined
	}

	logOut() {
		localStorage.removeItem('token')
		clientUser = null
		goto('/login')
	}

	static init(data: serverResponse<'getMe'>) {
		clientUser = new ClientUser(data)
	}
}

let clientUser: ClientUser | null = $state(null)

export function useClientUser(): ClientUser {
	if (!clientUser) {
		throw new Error('Client user not initialized')
	}
	return clientUser
}

export function useClientUserUnsafe(): ClientUser | null {
	return clientUser
}

// export interface ClientUser {
// 	id: number,
// 	username: string,
// 	name: string,
// 	coins: number,
// 	rubies: number,
// 	level: number,
// 	exp: number,
// 	isAdmin: boolean,
// 	translatorLanguages?: string[],
// 	inventoryItems: InventoryItem[],
// 	lastFishedAt?: Date
// }

// export interface InventoryItem {
// 	itemId: ItemId,
// 	quantity: number
// }

// export interface UserRelation {
// 	id: number,
// 	username: string,
// 	name: string,
// 	status: RelationStatus
// }
