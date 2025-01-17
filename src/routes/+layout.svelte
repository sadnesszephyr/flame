<script lang="ts">
	import '/src/styles/global.scss';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Default page title -->
	<title>Campfire</title>
</svelte:head>

{@render children()}
