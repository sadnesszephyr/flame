<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'

	interface TextInputProps extends Omit<HTMLInputAttributes, 'size'> {
		size?: 'default' | 'small'
	}

	let {
		size,
		value = $bindable(),
		...restProps
	}: TextInputProps = $props()

	let className = $derived(['input', size].join(' '))
</script>

<input class={className} type="text" bind:value {...restProps}/>

<style lang="scss">
	.input {
		padding: 0 1rem;
		height: 3rem;
		border: 1px solid color-mix(in srgb, var(--text) 20%, var(--background));
		background: none;
		border-radius: 0.5rem;
		outline: none;
		color: var(--foreground);
		font-size: 0.875rem;
		transition: 0.2s;
		outline: 1px solid transparent;

		&:focus {
			border-color: var(--accent);
			outline: 1px solid var(--accent);
		}

		&::placeholder {
			color: var(--hint);
		}
	}
</style>
