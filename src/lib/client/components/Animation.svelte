<script lang="ts">
	import { localSettings } from '$lib/client/store'
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'

	export let size: number = 192
	export let src: string | Record<string, any>

	$: stringifiedSrc = typeof src === 'string' ? src : JSON.stringify(src)
</script>

<!-- In case animation takes some time to load, wrapper will prevent layout shift -->
<div class="wrapper" style:width={size}>
	<LottiePlayer
		src={stringifiedSrc}
		autoplay={!$localSettings.powerSaving}
		width={size}
	/>
</div>

<style lang="scss">
	.wrapper {
		aspect-ratio: 1/1;
	}
</style>