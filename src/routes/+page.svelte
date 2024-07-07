<script>
	import { appManager } from '$lib/AppManager'
	import { Button } from '$lib/components'
	import { clientUser } from '$lib/stores/clientUser'
</script>

<div class="wrapper">
	<div class="card">
		<a href="/admin">admin</a>
	</div>
	<div class="card">
		<pre>{JSON.stringify($clientUser, null, 2)}</pre>

		<Button onclick={() => appManager.openPopup('hi')}>open popup</Button>
	</div>
</div>

<style lang="scss">
	@import "/src/styles/mixins.scss";

	.wrapper {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.card {
		@include card;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	pre {
		overflow-x: scroll;
		padding: 0 1rem;
		margin: 0 -1rem;
	}
</style>
