<script lang="ts">
	import Button from '$lib/client/components/Button.svelte'
	import Snackbar from '$lib/client/components/Snackbar/Snackbar.svelte'


</script>

<div class="wrapper">
	<Button variant="primary">Primary button</Button>
	<Button variant="secondary">Secondary button</Button>
	<Button variant="link">Link button</Button>
	<Button variant="secondary" on:click={() => alert('hi')}>Open alert</Button>
	<Snackbar>Hi im a snackbar</Snackbar>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}
</style>