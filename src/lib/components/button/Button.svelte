<script lang="ts">
	import { ripple } from '$lib/actions/ripple'
	import type { Snippet } from 'svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'

	interface ButtonProps extends HTMLButtonAttributes {
		children: Snippet,
		href?: string,
		variant?: 'primary' | 'secondary' | 'link',
		size?: 'small' | 'default',
		square?: boolean
	}

	const {
		href,
		variant = 'primary',
		size,
		square,
		children,
		...restProps
	}: ButtonProps = $props()

	let className = $derived(['button', variant, size].join(' '))
</script>

<svelte:element
	role="button"
	tabindex="0"
	this={href ? 'a' : 'button'}
	class={className}
	class:square
	draggable={false}
	{...restProps}
	{href}
	use:ripple
>
	{@render children()}
</svelte:element>

<style lang="scss">
	.button {
		height: 3rem;
		background: var(--button-background);
		padding: 0 3rem;
		font-size: 14px;
		line-height: 1.4;
		font-weight: 500;
		color: var(--button-label);
		border: none;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5ch;
		flex-shrink: 0;
		text-wrap: nowrap;
		text-decoration: none;
		--ripple-color: rgba(0, 0, 0, 0.2);
		font-family: var(--font);
		outline: none;
		transition: 0.2s;
		// flex: 1;

		&:disabled {
			cursor: default;
			opacity: 0.5;
			--ripple-color: transparent;
		}

		&:active {
			scale: 0.98;
		}
	}

	// Variants

	.primary {
		--button-background: var(--accent);
		--button-label: white;
	}

	.secondary {
		--button-background: var(--muted);
		--button-label: var(--foreground);
	}

	.link {
		background: transparent;
		color: var(--link);
		--ripple-color: color-mix(in srgb, var(--link) 20%, transparent)
	}


	// Sizes
	
	.small {
		height: 2rem;
		padding: 0 1rem;
	}


	// Square

	.square {
		aspect-ratio: 1/1;
		padding: 0;
	}
</style>
