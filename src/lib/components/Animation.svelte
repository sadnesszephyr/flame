<script lang="ts">
	import { localSettings } from '$lib/stores/localSettings'
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'

	interface Props {
		size?: number | string,
		src: string
	}

	const { size, src }: Props = $props()
	const stringifiedSrc = $derived(typeof src === 'string' ? src : JSON.stringify(src))
</script>

<div class="animation" style:width={size}>
	<LottiePlayer
		src={stringifiedSrc}
		autoplay={!$localSettings}
		width={size}
	/>
</div>

<style lang="scss">
	.animation {
		aspect-ratio: 1/1;
	}
</style>
