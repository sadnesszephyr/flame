<script lang="ts">
	import { ripple } from '$lib/client/actions/ripple'
	import { t } from '$lib/shared/localization'
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
	import { userData } from '$lib/client/store'

	window.Telegram.WebApp.BackButton.hide()
	window.Telegram.WebApp.MainButton.hide()

	let fishingTimeRemained: number
	let frame
	let lastTime = window.performance.now()

	function updateFishingProgress() {
		frame = requestAnimationFrame(updateFishingProgress);

		const time = window.performance.now();
		fishingTimeRemained -= time - lastTime;

		lastTime = time;
	}
	updateFishingProgress()

	userData.subscribe(value => {
		fishingTimeRemained = new Date(value?.lastTimeFished ?? 0).getTime() + 30_000 - new Date().getTime()
		if(fishingTimeRemained < 0) fishingTimeRemained = 0
	})
</script>

<div class="nav-card-list">
	<a class="nav-card" href="/inventory" use:ripple> 
		<img src="/icons/bag.webp" alt="inventory"/>
		{$t('home.inventory')}
	</a>
	<a class="nav-card" href="/fishing" use:ripple draggable="false">
		<img src="/icons/fish.webp" alt="fishing"/>
		{$t('home.fishing')}
		<span class="progress" style:width={`${fishingTimeRemained / 30000 * 100}%`}/>
	</a>
	<a class="nav-card small" href="https://t.me/+0PEHgfl8IKIwZjky" use:ripple>
		<img src="/icons/megaphone.webp" alt="news"/>
		{$t('home.news')}
	</a>
	<div class="nav-card small disabled">
		<img src="/icons/clipboard.webp" alt="top"/>
		{$t('home.top')}
	</div>
	<a class="nav-card small" href="/settings" use:ripple>
		<img src="/icons/gear.webp" alt="settings"/>
		{$t('home.settings')}
	</a>
</div>

<style lang="scss">
	@import '../styles/mixins';

	.nav-card {
		@include card;

		display: flex;
		aspect-ratio: 1/1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		color: var(--foreground);
		font-size: 1rem;
		line-height: 22px;
		grid-column: span 3;

		&.small {
			grid-column: span 2;
			gap: 1rem;

			img {
				width: 2rem;
			}
		}

		&.disabled {
			opacity: 0.5;
		}

		img {
			width: 4rem;
		}
	}

	.nav-card-list {
		padding: 1rem;
		gap: 1rem;
		display: grid;
		grid-template-columns: repeat(6, 1fr);
	}

	.progress {
		position: absolute;
		bottom: 0;
		left: 0;
		background: var(--accent);
		height: 0.25rem;
		border-radius: 0.125rem;
	}
</style>
