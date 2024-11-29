<script lang="ts">
	import { Cell, CellGroup } from '$lib/components'
	import { request, type serverResponse } from '$lib/request'
	import { RelationStatus } from '$lib/constants'
	import { onMount } from 'svelte'
	// import { activeElement } from 'runed'

	let relatedUsers = $state<serverResponse<'getRelatedUsers'>>()
	let searchText = $state<string>('')
	let searchResult = $state<serverResponse<'searchUsers'>>()
	let debounceTimeout = $state<ReturnType<typeof setTimeout>>()
	let searchActive = $derived(searchText.length >= 3)

	async function onSearchInput() {
		searchResult = undefined
		clearTimeout(debounceTimeout)
		if (searchText.length < 3) return
		debounceTimeout = setTimeout(async () => {
			searchResult = await request('searchUsers', { query: searchText })
		}, 500)
	}
	
	onMount(async () => {
		relatedUsers = await request('getRelatedUsers')
	})
</script>

<div class="container">
	<div class="search-container">
		<input oninput={onSearchInput} type="text" class="search-input" placeholder="Global search" bind:value={searchText}>
	</div>
	{#if searchActive}
		{#if searchResult?.length}
			<CellGroup heading="Search">
				{#each searchResult as user}
					<Cell
						profilehotoUserId={user.id}
						title={user.name}
						subtitle={`@${user.username}`}
						type="link"
						href={`/profile/${user.id}`}
					/>
				{/each}
			</CellGroup>
		{:else if searchResult}
			Nothing found
		{:else}
			Loading...
		{/if}
	{:else}
		{#if relatedUsers}
			<CellGroup heading="Friends">
				{#each relatedUsers.filter((user) => user.status === RelationStatus.Friend) as user}
					<Cell
						profilehotoUserId={user.id}
						title={user.name}
						subtitle={`@${user.username}`}
						type="link"
						href={`/profile/${user.id}`}
					/>
				{/each}
			</CellGroup>
			<CellGroup heading="Followers">
				{#each relatedUsers.filter((user) => user.status === RelationStatus.FriendRequestReceived) as user}
					<Cell
						profilehotoUserId={user.id}
						title={user.name}
						subtitle={`@${user.username}`}
						type="link"
						href={`/profile/${user.id}`}
					/>
				{/each}
			</CellGroup>
			<CellGroup heading="I follow">
				{#each relatedUsers.filter((user) => user.status === RelationStatus.FriendRequestSent) as user}
					<Cell
						profilehotoUserId={user.id}
						title={user.name}
						subtitle={`@${user.username}`}
						type="link"
						href={`/profile/${user.id}`}
					/>
				{/each}
			</CellGroup>
		{/if}
	{/if}
</div>

<style lang="scss">
	@import "/src/styles/mixins.scss";

	.container {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.search-container {
		@include full-card;
		padding: 0;
		display: flex;
	}

	.search-input {
		background: none;
		border: none;
		outline: none;
		font-family: var(--font);
		font-size: 1.0625rem;
		color: var(--foreground);
		height: 3.5rem;
		padding: 0 1.25rem;
		flex: 1;
		
		&::placeholder {
			color: var(--hint);
		}
	}
</style>
