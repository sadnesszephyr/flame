<script lang="ts">
	import { ItemSprite } from '$lib/components'
</script>

<div class="container">
	<div class="fields">
		{#each Array(8) as _}
			<button class="field">
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	@import "/src/styles/mixins.scss";

	.container {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.fields {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		padding: 1rem;
	}

	.field {
		@include card;
		background: var(--garden-field-dry);
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1/1;
	}
</style>
