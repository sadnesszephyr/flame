<script lang="ts">
	import { useClientUser } from '$lib/clientUser.svelte'
	import { Cell, CellGroup, ProfilePhoto } from '$lib/components'
	import { Logout, Settings, Shield } from '$lib/components/icons'

	const clientUser = useClientUser()

	window.Telegram.WebApp.BackButton.hide()
</script>

<div class="container">
	<div class="profile-card">
		<ProfilePhoto userId={clientUser.id} size="8rem"/>
		<span class="username">@{clientUser.username}</span>
	</div>
	
	<CellGroup>
		<Cell type="link" title="Settings" href="/settings" icon={Settings}/>
		{#if clientUser.isAdmin}
			<Cell type="link" title="Admin page" href="/admin" icon={Shield}/>
		{/if}
		<Cell type="default" onclick={() => clientUser.logOut()} title="Log out" variant="danger" icon={Logout}/>
	</CellGroup>
</div>

<style lang="scss">
	@import "src/styles/mixins.scss";

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.profile-card {
		@include full-card;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem 1rem;
	}

	.username {
		font-size: 2rem;
		font-family: var(--font-heading);
	}
</style>
