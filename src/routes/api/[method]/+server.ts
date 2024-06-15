import { endpoints } from '$lib/server/endpoints/'
import type { RequestEvent } from '@sveltejs/kit'

export async function POST(event: RequestEvent) {
	const body = await event.request.json()
}