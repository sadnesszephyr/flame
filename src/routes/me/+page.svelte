<script lang="ts">
	import { Cell } from '$lib/client/components/Cell'
	import CellGroup from '$lib/client/components/Cell/CellGroup.svelte'
	import { Settings } from '$lib/client/components/icons';
	import LogOut from '$lib/client/components/icons/LogOut.svelte'
	import { goto } from '$app/navigation'
	import ProfilePhoto from '$lib/client/components/ProfilePhoto.svelte'
	import { userData } from '$lib/client/store'

	function logOut() {
		window.localStorage.removeItem('token')
		goto('/welcome')
	}
</script>


<div class="user-card">
	<ProfilePhoto user={$userData} size="6rem"/>
	<span class="username">{$userData?.username}</span>
</div>

<CellGroup>
	<Cell
		title="Settings"
		href="/me/settings"
	>
		<Settings slot="icon"/>
	</Cell>
	<Cell
		title="Log out"
		variant="danger"
		on:click={logOut}
	>
		<LogOut slot="icon"/>
	</Cell>
</CellGroup>

<style lang="scss">
	.user-card {
		display: flex;
		flex-direction: column;
		background: var(--background);
		padding: 1rem;
		align-items: center;
		gap: 1rem;

		.username {
			font-size: 1.125rem;
		}
	}
</style>