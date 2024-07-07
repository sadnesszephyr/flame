<script>
	import { fade } from 'svelte/transition'
	import { Button } from '..'
	import { snackbars } from './store'

	const slicedSnackbars = $derived($snackbars)
</script>
<div class="snackbars">
	{#each slicedSnackbars as snackbar, i (snackbar.id)}
		<div class="snackbar" style:--index={(slicedSnackbars.length - i - 1).toString()} out:fade={{ duration: 200 }}>
			<span class="text">{snackbar.text}</span>
			<Button
				size="small"
				variant="link"
				onclick={() => snackbars.update((s) => s.filter((sb) => sb.id !== snackbar.id))}
			>
				Close
			</Button>
		</div>
	{/each}
</div>

<style lang="scss">
	.snackbars {
		position: fixed ;
		display: flex;
		flex-direction: column;
		bottom: 1rem;
		left: 1rem;
		right: 1rem;
		view-transition-name: snackbars;

		&:hover .snackbar {
			scale: 1;
			translate: 0 calc(var(--index) * (2.75rem + 0.25rem) * -1);
		}
	}

	.snackbar {
		background: color-mix(in srgb, var(--foreground) 92%, transparent);
		color: var(--background);
		display: flex;
		padding: 0.625rem;
		border-radius: 0.5rem;
		min-height: 2.75rem;
		align-items: center;
		scale: calc(1 - var(--index) * 0.05);
		translate: 0 calc(-1 * 0.875rem * var(--index));
		z-index: calc(999 - var(--index));
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		transition: 0.2s;
		backdrop-filter: blur(0.25rem);
		animation: enter 0.2s ease-out;
	}

	.text {
		flex: 1;
		color: var(--background);
	}

	@keyframes enter {
		from {
			opacity: 0;
			translate: 0 2rem;
		}

		to {
			opacity: 1;
			translate: none;
		}
	}
</style>
