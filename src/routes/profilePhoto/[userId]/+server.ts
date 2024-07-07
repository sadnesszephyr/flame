import { error, type RequestEvent } from '@sveltejs/kit'
import { getUserProfilePhoto } from '$lib/server/bot'

export async function GET(event: RequestEvent) {
	const profilePhotoBuffer = await getUserProfilePhoto(Number(event.params.userId)).catch((e) => {
		console.log(e)
		throw error(404)
	})

	return new Response(profilePhotoBuffer, {
		headers: {
			'Content-Type': 'image/png'
		}
	})
}
