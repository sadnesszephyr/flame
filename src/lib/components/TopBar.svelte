<script lang="ts">
	const { leadingIcon = false } = $props()
</script>

<header class="top-bar">
	{#if leadingIcon}
		<button class="icon" aria-label="Back">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M18.295 7.115C18.6844 6.72564 18.6844 6.09436 18.295 5.705C17.9056
					5.31564 17.2744 5.31564 16.885 5.705L12 10.59L7.115 5.705C6.72564 5.31564
					6.09436 5.31564 5.705 5.705C5.31564 6.09436 5.31564 6.72564 5.705 7.115L10.59
					12L5.705 16.885C5.31564 17.2744 5.31564 17.9056 5.705 18.295C6.09436 18.6844
					6.72564 18.6844 7.115 18.295L12 13.41L16.885 18.295C17.2744 18.6844 17.9056
					18.6844 18.295 18.295C18.6844 17.9056 18.6844 17.2744 18.295 16.885L13.41 12L18.295 7.115Z"
					fill="currentColor"
				/>
			</svg>
		</button>
	{/if}
	<span class="headline">Campfire</span>
</header>

<style lang="scss">
	.top-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		background: var(--background);
		color: var(--foreground);
		width: 100%;
		height: 3.5rem;
		padding: 0 0.25rem;
		// view-transition-name: top-bar;
	}

	.headline {
		padding: 0 1.25rem;
		font-size: 1.25rem;
		line-height: 1.5rem;
		font-weight: 500;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		margin: 0.25rem;
		background: none;
		border: none;
		border-radius: 50%;
	}
</style>
