<script lang="ts">
	import { goto } from '$app/navigation'

	import { ripple } from '$lib/client/actions/ripple'
	import { request } from '$lib/client/request'
	import { clientLanguage, t, userLanguage } from '$lib/shared/localization'
	import Drawer from '$lib/client/components/Drawer.svelte'
	import { items, type Item } from '$lib/shared/items'
	import Await from '$lib/client/components/Await.svelte'
	import type { PageData } from './$types'
	import Button from '$lib/client/components/Button.svelte'
	import { onMount } from 'svelte'

	const webApp = window.Telegram.WebApp
	webApp.expand()
	webApp.BackButton.show()
	webApp.BackButton.onClick(() => goto('/'))
	webApp.MainButton.hide()

	let inventory: {
		itemId: string
		quantity: number
	}[] = []
	let loaded = false

	onMount(async () => {
		inventory = await request('getInventory')
		loaded = true
	})
</script>

<div class="list">
	<div class="item-list">
		{#if !loaded}
			{#each Array(6) as _}
				<div class="item-skeleton" />
			{/each}
		{:else}
			{#each inventory as item}
				<button class="item-card" use:ripple>
					<span class="item-image-wrapper">
						<img class="item-image" src={`/items/${item.itemId}.webp`} alt={item.itemId} />
						{#if item.quantity !== 1}
							<span class="item-quantity-badge">{item.quantity}</span>
						{/if}
					</span>
					<!-- <span>{$t(`items.${item.itemId}.name`)}</span> -->
				</button>
				<!-- <button
					class="item-card"
					use:ripple
				>
					<img class="item-image" src={`/items/${item.itemId}.webp`} alt={item.itemId} />
					<span class="item-quantity-badge">{item.quantity}</span>
				</button> -->
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../../styles/mixins';

	.item-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding: 1rem;
		gap: 1rem;

		.item-skeleton {
			height: 8rem;
		}
	}

	.item-skeleton {
		@include skeleton;
	}

	.item-card {
		@include card;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		border: none;
		position: relative;
		// overflow: visible;
		aspect-ratio: 1/1;
	}

	.item-image-wrapper {
		pointer-events: none;
		position: absolute;

		.item-image {
			width: 4rem;
			height: 4rem;
		}
	}

	.item-quantity-badge {
		position: absolute;
		bottom: -0.5rem;
		right: -0.5rem;
		height: 1.5rem;
		min-width: 1.5rem;
		background: var(--text);
		border-radius: 0.75rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 0.375rem;
		color: var(--accent-foreground);
	}

	.item-selected-info {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;
		margin-bottom: 4.5rem;
		margin-top: 4rem;
		text-align: center;
	}

	.item-selected-image {
		position: relative;

		img {
			width: 8rem;
		}
	}

	.item-selected-name {
		font-size: 1.5rem;
		line-height: 1.75rem;
		margin-top: 2rem;
	}

	.item-selected-description {
		font-size: 0.875rem;
		line-height: 130%;
		margin-top: 1rem;
		color: var(--text);
	}

	.item-actions {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(0, 1fr);
		gap: 1rem;
	}

	.price-input {
		display: flex;
		gap: 1rem;
		margin: 4rem 0;

		input[type='number'] {
			border-radius: 0.5rem;
			padding: 0 0.875rem;
			border: 1px solid var(--muted);
			background: none;
			color: var(--foreground);
			font-size: 1.25rem;
			outline: none;
			width: 100%;
			flex-shrink: 1;
			transition: 0.2s;

			&:focus {
				border-color: var(--accent);
			}

			// Hide spin buttons
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
	}
</style>
