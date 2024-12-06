<script lang="ts">
	import { goto } from '$app/navigation'
	import { PUBLIC_TELEGRAM_BOT_ID } from '$env/static/public'
	import { Button } from '$lib/components'

	if (localStorage.getItem('token')) {
		goto('/')
	}

	function login() {
		window.Telegram.Login.auth(
			{
				bot_id: PUBLIC_TELEGRAM_BOT_ID
			},
			async (data) => {
				if (!data) {
					console.log('Auth failed')
					return
				}

				const res = await fetch('/api/auth', {
					method: 'POST',
					body: JSON.stringify(data)
				})

				const resData = await res.json()
				if (resData.token) {
					localStorage.setItem('token', resData.token)
					goto('/')
				}
			}
		)
	}
</script>

<div class="container">
	<Button onclick={login}>Login with Telegram</Button>
	<Button variant="secondary" href="https://t.me/campfire_game_bot">Continue in Telegram App</Button>
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
</style>
