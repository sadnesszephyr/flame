<script lang="ts">
	import { fade, fly } from 'svelte/transition'

	interface Props {
		value: number
	}

	const { value }: Props = $props()
	let digits = $derived(value.toString().split(''))
	let width = $state(0)
</script>

<span class="rolling-number" style:width={width ? width + 'px' : 'unset'}>
	<span class="number" bind:clientWidth={width}>
		<span class="invisible-value">{value}</span>
		{#each digits as digit, index (`${index} ${digit}`)}
			<span
				class="digit"
				in:fly={{ duration: 200, y: '-33%' }}
				out:fly={{ duration: 200, y: '33%' }}
				style:right="{digits.length - index - 1}ch"
			>{digit}</span>
		{/each}
	</span>
</span>

<style lang="scss">
	.rolling-number {
		display: inline-flex;
		transition: 0.2s;
	}

	.number {
		display: inline-flex;
		position: relative;
	}

	.invisible-value {
		opacity: 0;
	}

	.digit {
		width: 1ch;
		position: absolute;
		top: 0;
	}
</style>
