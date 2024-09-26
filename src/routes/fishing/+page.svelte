<script lang="ts">
	import { ItemSprite, Progress, RollingNumber } from '$lib/components'
	import { itemComponents, itemManager, Item } from '$lib/items'
	import { onMount, onDestroy } from 'svelte'
	import { selectWeightedRandom } from '$lib/random'
	import { FishableComponent } from '$lib/items/components'
	import { clientUser } from '$lib/stores/clientUser'
	import { request } from '$lib/request'
	import { fade, fly } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'
	import { t } from '$lib/localization'

	let deviceAngle = $state(0)
	let fishingRodCasted = $state(false)
	let fishingTimeRemained = $state(
		$clientUser!.lastFishedAt?.getTime()
			? $clientUser!.lastFishedAt.getTime() + 30_000 - new Date().getTime()
			: 0
	)
	let tookTheBait = $state(false)
	const fishableItems = itemManager.getWithComponent(itemComponents.FishableComponent)
	let fishedItem: Item | null = $state(null)
	let timeout: ReturnType<typeof setTimeout> | null = $state(null)
	

	async function handleClick() {
		if (fishingTimeRemained > 0) return

		if (tookTheBait) {
			fishingRodCasted = false
			tookTheBait = false

			fishedItem = selectWeightedRandom(
				fishableItems,
				(item) => item.components.find((c) => c instanceof FishableComponent)!.chanceWeight,
				$clientUser!.lastFishedAt?.getTime() ?? $clientUser!.id
			)

			const catchData = await request('catchFish')
			$clientUser!.lastFishedAt = new Date(catchData.catchedAt)
			fishingTimeRemained = catchData.catchedAt + 30_000 - new Date().getTime()

			return
		}

		if (fishingRodCasted) {
			fishingRodCasted = false
			clearTimeout(timeout!)
		}

		if (!fishingRodCasted) {
			fishingRodCasted = true

			setTimeout(async () => {
				tookTheBait = true

				setTimeout(async () => {
					tookTheBait = false
					fishingRodCasted = false
				}, 5_000)
			}, 15_000)
		}
	}

	function handleOrientationChange(orientation: DeviceOrientationEvent) {
		deviceAngle = orientation.gamma!
	}

	onMount(() => {
		window.addEventListener('deviceorientation', handleOrientationChange)
	})

	onDestroy(() => {
		window.removeEventListener('deviceorientation', handleOrientationChange)
	})

	function elasticOut(t: number) {
		return Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(20.0, -4.0 * t) + 1.0
	}

	function updateFishingProgress() {
		requestAnimationFrame(updateFishingProgress)

		if ($clientUser!.lastFishedAt) {
			fishingTimeRemained = $clientUser!.lastFishedAt.getTime() + 30_000 - new Date().getTime()
		}
		else {
			fishingTimeRemained = 0
		}
	}

	updateFishingProgress()
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="container" onclick={handleClick}>
	<span class="exclamation-mark" class:visible={tookTheBait}>!</span>
	<svg class="bobber" style:--rotation={Math.round(deviceAngle) + 'deg'} width="24" height="54" viewBox="0 0 24 54" fill="none" xmlns="http://www.w3.org/2000/svg">
		<mask id="mask" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="54">
			<g class="mask">
				<rect opacity="0.25" y="24" width="24" height="30" fill="white"/>
				<path d="M24 0H0V24C0 27.3137 5.37259 30 12 30C18.6274 30 24 27.3137 24 24V0Z" fill="#D9D9D9"/>
			</g>
		</mask>
		{#if fishingRodCasted}
			<g
				mask="url(#mask)"
				class="boyk"
				in:fly={{ duration: 2000, y: '-200%', easing: elasticOut }}
				out:fly={{ duration: 750, y: '-200%', easing: cubicOut }}
			>
				<circle cx="12" cy="27" r="12" fill="#DE0015"/>
				<path d="M0 27C0 20.3726 5.37258 15 12 15C18.6274 15 24
				20.3726 24 27C24 30.3137 18.6274 33 12 33C5.37258 33 0 30.3137 0 27Z" fill="#E7E7E7"/>
			</g>
		{/if}
	</svg>
	
	<div class="bottom">
		{#if fishingTimeRemained > 0}
			<div in:fly={{ y: -16 }} out:fly={{ y: 16 }} class="bottom-content">
				<span>
					Wait <RollingNumber value={Math.ceil(fishingTimeRemained / 1000)}/>s
				</span>
				<Progress value={fishingTimeRemained / 1000} max={30} variant="glass"/>
			</div>
		{:else if tookTheBait}
			<div in:fly={{ y: -16 }} out:fly={{ y: 16 }} class="bottom-content">
				<span>Catch!</span>
			</div>
		{:else if fishingRodCasted}
			<div in:fly={{ y: -16 }} out:fly={{ y: 16 }} class="bottom-content">
				<span>Wait fish to bait...</span>
			</div>
		{:else}
			<div in:fly={{ y: -16 }} out:fly={{ y: 16 }} class="bottom-content">
				<span>Press to cast a fishing rod</span>
			</div>
		{/if}
	</div>

	{#if fishedItem}
		<div transition:fade={{ duration: 200 }} class="overlay" onclick={() => fishedItem = null}>
			<div class="drop" in:fly={{ y: -32 }}>
				<ItemSprite id={fishedItem.sprite} size="10rem"/>
			</div>
			<span class="drop-name">{$t(`items.${fishedItem.id}.name`)}</span>
			<span class="drop-description">{$t(`items.${fishedItem.id}.description`)}</span>
		</div>
	{/if}
</div>

<style lang="scss">
	.overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;

		.drop-name {
			font-size: 1.25rem;
			font-family: var(--font-heading);
			color: white;
		}

		.drop-description {
			font-size: 1rem;
			color: rgba(255, 255, 255, 0.75);
		}
	}

	.container {
		background: url("/images/water.svg");
		background-size: 4rem;
		height: 100%;
		animation: water-flow 120s linear infinite;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.bobber {
		animation: bobber 5s alternate infinite ease-in-out;
		position: relative;

		.mask {
			rotate: calc(-1 * var(--rotation));
			transform-origin: center;
			animation: bobber-water 5s alternate ease-in-out infinite;
		}
		.boyk {
			transform-origin: center;
			rotate: var(--rotation);
		}
	}

	.exclamation-mark {
		opacity: 0;
		font: 2rem var(--font-heading);
		color: #f03e1f;
		animation: exclamation-mark 2s infinite ease-in-out;
		font-weight: 600;
		text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,
             1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;

		&.visible {
			opacity: 1;
		}
	}

	.bottom {
		position: absolute;
		gap: 1rem;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		height: 6rem;
		background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));

		.bottom-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			gap: 1rem;
			position: absolute;
			inset: 0;
			padding: 0 1rem;
		}
	}

	@keyframes water-flow {
		from {
			background-position: 0 0;
		}

		to {
			background-position: -100% -100%;
		}
	}

	@keyframes bobber {
		from {
			translate: 0 1rem ;
		}

		to {
			translate: 0 -1rem;
		}
	}

	@keyframes exclamation-mark {
		0% {
			translate: 0 1rem;
		}

		25% {
			translate: 0 0rem;
			rotate: -10deg;
		}

		50% {
			translate: 0 1rem;
		}

		75% {
			translate: 0 0rem;
			rotate: 10deg;
		}

		100% {
			translate: 0 1rem;
		}
	}

	@keyframes bobber-water {
		from {
			translate: 0 -0.125rem;
		}

		to {
			translate: 0 0.125rem;
		}
	}
</style>
