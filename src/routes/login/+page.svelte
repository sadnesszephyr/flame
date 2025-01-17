<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from '$lib/components';
	import { DiscordLogo, TelegramLogo } from '$lib/components/icons';
	import { loginDiscord } from './loginDiscord';
	import { loginTelegram } from './loginTelegram';

	const method = page.url.searchParams.get('method');

	if (method === 'discord') {
		const code = page.url.searchParams.get('code');

		if (code) {
			fetch('/api/auth/discord', {
				method: 'POST',
				body: JSON.stringify({ code }),
			})
				.then((res) => res.json())
				.then((resData) => {
					if (resData.token) {
						localStorage.setItem('token', resData.token);
						goto('/');
					}
				});
		}
	}
</script>

<div class="container">
	<img src="/icons/icon-384x384.png" alt="Campfire Logo" class="logo" draggable="false" />
	<Button --accent="#3390EC" onclick={loginTelegram} prefixIcon={TelegramLogo}>Log in with Telegram</Button>
	<Button --accent="#5865F2" onclick={loginDiscord} prefixIcon={DiscordLogo}>Log in with Discord</Button>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		justify-content: center;
		height: 100%;
	}

	.logo {
		border-radius: 50%;
		max-width: 12rem;
		width: 100%;
		align-self: center;
		margin-bottom: 4rem;
	}
</style>
