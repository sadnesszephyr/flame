<script lang="ts">
	import Header from '$lib/client/components/Header.svelte'
	import { fetchData } from '$lib/client/fetchData'
	import { userData } from '$lib/client/store'
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
	import '../styles/global.scss'

	const isOpenedFromTelegram = Boolean(window.Telegram.WebView.initParams.tgWebAppThemeParams)

	fetchData('getMe').then((data) => {
		userData.set(data)
	})

	window.Telegram.WebApp.onEvent('themeChanged', () => {
		const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background')
		window.Telegram.WebApp.setHeaderColor(backgroundColor)
	})
</script>

{#if isOpenedFromTelegram}
	<Header />
	<main>
		<slot />
	</main>
{:else}
	<div class="error">
		<LottiePlayer src="/animations/flame/no.json" autoplay loop width={192} />

		<span>Something went wrong. Make sure you've opened this app from Telegram.</span>
	</div>
{/if}

<style lang="scss">
	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		height: 100vh;
		font-size: 1.5rem;
		text-align: center;
		max-width: 24rem;
		margin: 0 auto;
		text-wrap: balance;
		line-height: 1.35;
	}
</style>
