<script>
	import { ripple } from '$lib/actions'
	import { Button, ItemSprite } from '$lib/components'
	import { itemManager } from '$lib/items'
	import { request } from '$lib/request'
	import { inventory } from '$lib/stores/inventory'
	import { flip } from 'svelte/animate'
	import { fade } from 'svelte/transition'
</script>

<div class="item-list">
	{#each $inventory as item (item.itemId)}
		{@const itemData = itemManager.get(item.itemId)}
		<div class="item-card" use:ripple animate:flip={{ duration: 200 }} transition:fade={{ duration: 200 }}>
			<ItemSprite id={itemData?.sprite ?? ''} size="5rem"/>
			<div class="item-quantity-badge">{item.quantity}</div>
		</div>
	{/each}
</div>

<style lang="scss">
	@import "/src/styles/mixins.scss";

	.item-list {
		display: grid;
		padding: 1rem;
		gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
	}

	.item-card {
		@include card;
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1/1;
	}

	.item-quantity-badge {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		background: var(--hint);
		color: white;
		height: 1.5rem;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.375rem;
		min-width: 1.5rem;
		font-size: 1rem;
		font-weight: 500;
		line-height: 1rem;
	}
</style>
