import { PUBLIC_DISCORD_PUBLIC_KEY } from '$env/static/public';
import database from '$lib/server/database';
import { users } from '$lib/server/database/schema';
import { json, type RequestEvent } from '@sveltejs/kit';
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';
import { eq } from 'drizzle-orm';

export async function POST({ request }: RequestEvent) {
	const body = await request.json();
	const rawBody = JSON.stringify(body);
	const signature = request.headers.get('X-Signature-Ed25519');
	const timestamp = request.headers.get('X-Signature-Timestamp');

	if (!signature || !timestamp) {
		return json({ error: 'Invalid request' }, { status: 401 });
	}

	const isRequestValid = await verifyKey(rawBody, signature, timestamp, PUBLIC_DISCORD_PUBLIC_KEY);

	if (!isRequestValid) {
		return json({ error: 'Invalid request' }, { status: 401 });
	}

	const { type, data, member } = body;

	if (type === InteractionType.PING) {
		return new Response(JSON.stringify({ type: InteractionResponseType.PONG }), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	if (type === InteractionType.APPLICATION_COMMAND) {
		const { name } = data;

		if (name === 'profile') {
			const userData = await database.query.users.findFirst({
				where: eq(users.discordId, member.user.id),
			});

			if (!userData) {
				return json({
					type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
					data: {
						content: "You don't have a Campfire account yet.",
					},
				});
			}

			return json({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					embeds: [
						{
							title: userData.name,
							description: `${userData.coins}<:Coin:1329675138404319262>\n${userData.rubies}<:Ruby:1329675154544136242>`,
						},
					],
				},
			});
		}

		return json({ error: 'Unknown command' }, { status: 400 });
	}

	return json({ error: 'Unknown interaction type' }, { status: 400 });
}
