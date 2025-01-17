import { json, redirect } from '@sveltejs/kit'
import type { RequestEvent } from '../$types'
import { authTokens } from '$lib/server/database/schema'
import database from '$lib/server/database'
import { authenticateOrCreateUser } from '$lib/server/services/user'
import { PUBLIC_BASE_URL, PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';
import { DISCORD_CLIENT_SECRET } from '$env/static/private'

export async function POST(event: RequestEvent) {
	const body = await event.request.json();

	console.log(body)

	const discordAccessTokenRequestData = {
		grant_type: 'authorization_code',
		code: body.code,
		redirect_uri: `${PUBLIC_BASE_URL}/login?method=discord`,
		client_id: PUBLIC_DISCORD_CLIENT_ID,
		client_secret: DISCORD_CLIENT_SECRET,
	};

	console.log(discordAccessTokenRequestData);

	const discordTokenData = await fetch(`https://discord.com/api/oauth2/token`, {
		body: JSON.stringify(discordAccessTokenRequestData),
		method: 'POST',
	}).then((res) => res.json());

	console.log(discordTokenData);

	const discordToken = discordTokenData?.access_token;

	const discordUserData = await fetch(`https://discord.com/api/users/@me`, {
		headers: {
			Authorization: `Bearer ${discordToken}`
		}
	}).then((res) => res.json());

	console.log(discordUserData);

	const authResult = await authenticateOrCreateUser('discord', discordUserData.user.id, {
		username: discordUserData.user?.username,
		name: discordUserData.user?.global_name
	});
		
	return json(authResult);
}
