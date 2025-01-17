import { PUBLIC_BASE_URL, PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';

export function loginDiscord() {
	window.location.href =
		'https://discord.com/oauth2/authorize?client_id=' +
		PUBLIC_DISCORD_CLIENT_ID +
		'&response_type=code&redirect_uri=' +
		encodeURIComponent(PUBLIC_BASE_URL) +
		'%2Flogin%3Fmethod%3Ddiscord&scope=identify';
}
