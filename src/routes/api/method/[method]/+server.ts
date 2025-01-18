import { TELEGRAM_BOT_TOKEN } from '$env/static/private';
import { ApiManager, type methodId } from '$lib/server/api/ApiManager';
import database from '$lib/server/database';
import { authTokens, users } from '$lib/server/database/schema';
import { createUser } from '$lib/server/services/user';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import cryptoEs from 'crypto-es';
import { eq } from 'drizzle-orm';

export async function POST(event: RequestEvent) {
	const authString = event.request.headers.get('Authorization');

	if (!authString) {
		throw error(401);
	}

	if (authString.startsWith('TMA ')) {
		const paramsRaw = authString.split(' ')[1];

		const params = new URLSearchParams(paramsRaw);
		const hash = params.get('hash');
		params.delete('hash');

		const v = Array.from(params.entries());
		v.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

		const dataCheckString = v.map(([k, v]) => `${k}=${v}`).join('\n');
		const secretKey = cryptoEs.HmacSHA256(TELEGRAM_BOT_TOKEN, 'WebAppData');
		const key = cryptoEs.HmacSHA256(dataCheckString, secretKey).toString(cryptoEs.enc.Hex);

		const isValid = key === hash;

		if (!isValid) {
			throw error(401, {
				message: "Couldn't validate your init data",
			});
		}

		const initDataRaw = Object.fromEntries(params);
		const initDataUserRaw = JSON.parse(initDataRaw.user);

		let user = await database.query.users.findFirst({
			where: eq(users.id, initDataUserRaw.id),
		});

		user ??= await createUser(initDataUserRaw);

		const body = await event.request.json();

		const data = await ApiManager.handle(event.params.method as methodId, user, body);

		return json(data);
	} else if (authString.startsWith('Standalone ')) {
		const token = await database.query.authTokens.findFirst({
			where: eq(authTokens.token, authString.split(' ')[1]),
			with: {
				user: true,
			},
		});

		if (!token) {
			error(403);
		}

		const body = await event.request.json();

		const data = await ApiManager.handle(event.params.method as methodId, token.user, body);

		return json(data);
	}
}
