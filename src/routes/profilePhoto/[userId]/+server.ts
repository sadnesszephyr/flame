import { getUserProfilePhoto } from '$lib/server/bot';
import database from '$lib/server/database';
import { users } from '$lib/server/database/schema';
import { error, type RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET(event: RequestEvent) {
	if (!event.params.userId) throw error(400);

	const userData = await database.query.users.findFirst({
		where: eq(users.id, +event.params.userId),
	});

	if (!userData || !userData.telegramId) throw error(404);

	const profilePhotoBuffer = await getUserProfilePhoto(userData.telegramId).catch(() => {
		throw error(404);
	});

	return new Response(profilePhotoBuffer, {
		headers: {
			'Content-Type': 'image/png',
		},
	});
}
