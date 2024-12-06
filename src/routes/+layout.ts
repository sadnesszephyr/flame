import { request } from '$lib/request'
import { ClientUser } from '$lib/clientUser.svelte'
import type { LayoutLoad } from './$types'

export const ssr = false
export const trailingSlash = 'never'

export const load: LayoutLoad = async () => {
	// const clientUserData = await request('getMe')
	// ClientUser.init(clientUserData)
}
