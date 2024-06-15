<script lang="ts">
	import Button from '$lib/client/components/Button.svelte'
	import { goto } from '$app/navigation'

	if (window.localStorage.getItem('token')) {
		goto('/')
	}
</script>

<div class="container">
	<img class="icon" src="/images/icon.png" alt="Campfire icon"/>

	<h1>Welcome to Campfire!</h1>

	<div class="actions">
		<Button variant="primary" href="https://t.me/campfire_dev_bot?start=auth">Sign in with Campfire bot</Button>
		<Button variant="link" href="https://t.me/campfire_game_bot/app">Continue in Telegram Mini App</Button>
	</div>
</div>

<style lang="scss">
	.container {
		padding: 1rem;
		gap: 4rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100svh;
		align-items: center;
	}

	.icon {
		width: 12rem;
		height: 12rem;
		border-radius: 50%;
	}

	.actions {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 24rem;
	}
</style>
