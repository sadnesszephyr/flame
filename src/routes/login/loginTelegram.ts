import { goto } from '$app/navigation'
import { PUBLIC_TELEGRAM_BOT_ID } from '$env/static/public'

export function loginTelegram() {
	window.Telegram.Login.auth(
		{
			bot_id: PUBLIC_TELEGRAM_BOT_ID,
		},
		async (data) => {
			if (!data) {
				console.log('Auth failed');
				return;
			}

			const res = await fetch('/api/auth/telegram', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			const resData = await res.json();
			if (resData.token) {
				localStorage.setItem('token', resData.token);
				goto('/');
			}
		},
	);
}