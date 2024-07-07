<script lang="ts">
	import type { Snippet } from 'svelte'

	interface CellGroupProps {
		heading?: string,
		children: Snippet
	}

	const { heading, children }: CellGroupProps = $props()
</script>

<div class="cell-group">
	{#if heading}
		<span class="header">{heading}</span>
	{/if}
	{@render children()}
</div>

<style lang="scss">
	@import "/src/styles/mixins";

	.cell-group {
		background: var(--background);
		box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.07);
		overflow: hidden;
		
		@include ios {
			margin: 1rem;
			border-radius: 0.625rem;
		}
	}

	.header {
		color: var(--section-header);
		font-weight: 500;
		font-size: 0.9375rem;
		line-height: 1.125rem;
		width: 100%;
		padding: 1.25rem;
		padding-bottom: 0.5rem;
		display: block;
	}
</style>
