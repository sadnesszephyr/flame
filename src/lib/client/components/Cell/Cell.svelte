<script lang="ts">
	import { ripple } from '$lib/client/actions'
	import Toggle from '$lib/client/components/Toggle.svelte'

	export let variant: 'default' | 'danger' | 'active' = 'default'
	export let title: string
	export let subtitle: string | undefined = undefined
	export let value: undefined | string | boolean = undefined
	export let href: string | undefined = undefined

	let element: 'a' | 'label' | 'button'

	$: {
		if (href) {
			element = 'a'
		} else if (value !== undefined) {
			element = 'label'
		} else {
			element = 'button'
		}
	}

	$: className = ['cell', 'variant-' + variant].join(' ')
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element this={element} {href} class={className} on:click use:ripple>
	<hr class="divider"/>
	<slot name="icon"/>
	<div class="info">
		<span class="title">{title}</span>
		{#if subtitle}
			<span class="subtitle">{subtitle}</span>
		{/if}
	</div>
	{#if typeof value === 'boolean'}
		<Toggle bind:checked={value}/>
	{/if}
</svelte:element>

<style lang="scss">
	@import "../../../../styles/mixins";
		
	.cell {
		padding: 0.75rem 1.25rem;
		display: flex;
		align-items: center;
		min-height: 3rem;
		color: var(--text);
		gap: 1.25rem;
		border: none;
		background: none;
		width: 100%;
		text-align: left;
		text-decoration: none;

		&:first-of-type .divider {
			display: none;
		}
	}

	.divider {
		all: unset;
		position: absolute; 
		left: 1.25rem;
		right: 0;
		top: 0;
		margin: 0;
		border-top: 1px solid var(--background-secondary);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		flex: 1;
	}

	.title {
		font-size: 0.9375rem;
		color: var(--foreground);
	}

	.subtitle {
		color: var(--text);
		font-size: 0.75rem;
		line-height: 0.875rem;
	}


	.variant-danger {
		color: var(--danger);

		.title, .description {
			color: var(--danger);
		}
	}
</style>