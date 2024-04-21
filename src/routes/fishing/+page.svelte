<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { drawResult, getCatenaryCurve, type CatenaryCurveQuadraticResult } from 'catenary-curve'

	let canvas: HTMLCanvasElement
	let context: CanvasRenderingContext2D
	let touchX: number
	let touchY: number
	let fishX: number
	let fishY: number
	let waterElement: HTMLDivElement
	let mousePressed: boolean = false

	function drawRope(): void {
		if(!context) return
		context.clearRect(0, 0, canvas.width, canvas.height)

		context.beginPath()
		context.lineWidth = 2
		context.strokeStyle = '#d3dbe3'
	
		const result = getCatenaryCurve({
			x: touchX,
			y: touchY
		}, {
			x: fishX,
			y: fishY
		}, 250)
		drawResult(result, context)

		context.stroke()
	}

	function onMouseMove(e: MouseEvent) {
		if(!mousePressed) return
		touchX = e.clientX
		touchY = e.clientY - waterElement.getBoundingClientRect().y

		drawRope()
	}

	function average(array: number[]) {
		return array.reduce((a, b) => a + b, 0) / array.length
	}

	function onTouchMove(e: TouchEvent) {
		const touches = Array.from(e.touches)
		touchX = average(touches.map((t) => t.clientX))
		touchY = average(touches.map((t) => t.clientY))
			- waterElement.getBoundingClientRect().y
		
		drawRope()
	}

	function resizeCanvas() {
		canvas.width = canvas.parentElement!.clientWidth
		canvas.height = canvas.parentElement!.clientHeight
	}

	onMount(async () => {
		resizeCanvas()
		context = canvas.getContext('2d')!
		
		fishX = canvas.width / 2
		fishY = canvas.height / 2
	})

	const webApp = window.Telegram.WebApp

	webApp.expand()
	webApp.BackButton.show()
	webApp.BackButton.onClick(() => goto('/'))
	webApp.MainButton.hide()

	// let currentDrop: FishDrop | null = null

	// let myData: User | undefined = undefined
	// let fishingState: 'timeout' | 'idle' | 'waiting' | 'biting' | 'caught' | 'missed' = 'timeout'
	// let timeout: NodeJS.Timeout
	// let catchButtonPressed = false

	// $: if (myData) {
	// 	console.log(myData)
	// 	const timeUntilCanFish = new Date(myData.lastTimeFished ?? 0).getTime() + 30_000 - new Date().getTime()
	// 	setTimeout(
	// 		() => {
	// 			fishingState = 'idle'
	// 		},
	// 		timeUntilCanFish > 0 ? timeUntilCanFish : 0
	// 	)
	// }

	// function caughtItemTransition(node: HTMLElement) {
	// 	if (currentDrop?.isJunk) {
	// 		return fly(node, { y: 64 })
	// 	}
	// 	return flyIntoInventory(node, { duration: 750 })
	// }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	bind:this={waterElement}
	class="water"
	on:touchmove={onTouchMove}
	on:mousemove={onMouseMove}
	on:mousedown={() => (mousePressed = true)}
	on:mouseup={() => (mousePressed = false)}
>
	<canvas class="canvas" bind:this={canvas} />
	<svg class="bobber" style:left={fishX + 'px'} style:top={fishY + 'px'} width="36" height="18" viewBox="0 0 36 18" fill="none" xmlns="http://www.w3.org/2000/svg">
		<ellipse cx="18.5" cy="9" rx="6.5" ry="4" fill="white"/>
		<path d="M5 7C5 5 8 1 12 1" stroke="white" stroke-width="2" stroke-linecap="round"/>
		<path d="M1 5C1 6 1.00015 8 1.99998 9M21 17C24.0001 17 29.0001 16 29.0001 11M35 13C35 14 35 15 34 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
	</svg>
</div>

<style lang="scss">
	.water {
		height: 100%;
		width: 100%;
		background: url('/images/water.webp');
		background-size: 16rem 16rem;
		animation: 120s linear water-flow infinite;
		position: relative;
	}

	.canvas {
		position: absolute;
		inset: 0;
		z-index: 10;
	}

	.bobber {
		position: absolute;
		translate: -50% -50%;
		opacity: 50%;
	}

	@keyframes water-flow {
		from {
			background-position: 0 0;
		}

		to {
			background-position: 32rem 16rem;
		}
	}
</style>
