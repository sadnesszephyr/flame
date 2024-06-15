<script lang="ts">
	import Button from '$lib/client/components/Button.svelte'

	
</script>

<div class="snackbar">
	<slot name="icon"/>
	<span class="text"><slot/></span>
	<Button variant="link" size="small">Undo</Button>
</div>

<style>
	.snackbar {
		background: color-mix(in srgb, var(--foreground) 92%, transparent);
		color: var(--background);
		display: flex;
		padding: 0.625rem;
		border-radius: 0.5rem;
		min-height: 2.75rem;
		align-items: center;
	}

	.text {
		flex: 1;
	}
</style>