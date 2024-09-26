declare module '@lottiefiles/svelte-lottie-player' {
	import type { Component } from 'svelte'

	export const LottiePlayer: Component<{
		autoplay?: boolean,
		background?: string,
		controls?: boolean,
		controlsLayout?: string[],
		count?: number,
		defaultFrame?: number,
		direction?: number,
		height?: number,
		hover?: boolean,
		loop?: boolean,
		mode?: 'normal' | 'bounce',
		onToggleZoom?: (boolean) => void,
		renderer?: 'svg' | 'canvas',
		speed?: number,
		src?: string,
		style?: string,
		width?: number | string
	}>
}
