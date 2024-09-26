<script lang="ts">
	import { page } from '$app/stores'
	import { Button, Cell, CellGroup, ProfilePhoto } from '$lib/components'
	import { request, type serverResponse } from '$lib/request'
	import { RelationStatus } from '$lib/constants'
	import { onMount, tick } from 'svelte'

	let userData = $state<serverResponse<'getUser'>>()
 
	onMount(async () => {
		userData = await request('getUser', { id: Number($page.params.id) })
	})

	async function befriend() {
		if (!userData) return

		if (userData.relationStatus === RelationStatus.FriendRequestRecieved) {
			userData.relationStatus = RelationStatus.Friend
		}
		else {
			userData.relationStatus = RelationStatus.FriendRequestSent
		}

		await tick()

		await request('befriend', { id: Number($page.params.id) }).catch(() => {
			if (userData!.relationStatus === RelationStatus.Friend) {
				userData!.relationStatus = RelationStatus.FriendRequestRecieved
			}
			else {
				userData!.relationStatus = RelationStatus.None
			}
		})
	}

	async function unfriend() {
		if (!userData) return

		if (userData.relationStatus === RelationStatus.Friend) {
			userData.relationStatus = RelationStatus.FriendRequestRecieved
		}
		else {
			userData.relationStatus = RelationStatus.None
		}

		await tick()

		await request('befriend', { id: Number($page.params.id), revoke: true }).catch(() => {
			if (userData!.relationStatus === RelationStatus.FriendRequestRecieved) {
				userData!.relationStatus = RelationStatus.Friend
			}
			else {
				userData!.relationStatus = RelationStatus.FriendRequestSent
			}
		})
	}
</script>

<div class="cover">
	{#if userData}
		<ProfilePhoto userId={Number($page.params.id)} size="6rem"/>
		<span class="name">{userData?.name}</span>
		<div class="actions">
			<Button
				variant="secondary"
				onclick={
					[RelationStatus.FriendRequestRecieved, RelationStatus.None].includes(userData?.relationStatus)
						? befriend
						: unfriend
				}
			>
				{#if userData?.relationStatus === RelationStatus.FriendRequestRecieved}
					Accept friend request
				{:else if userData?.relationStatus === RelationStatus.FriendRequestSent}
					Cancel friend request
				{:else if userData?.relationStatus === RelationStatus.Friend}
					Unfriend
				{:else}
					Add to friends
				{/if}
			</Button>
		</div>
	{/if}
</div>
{#if userData}
	<div class="container">
		<CellGroup heading="Info">
			{#if userData.bio}
				<Cell title={userData.bio} subtitle="Bio" type="default"/>
			{/if}
			<Cell title={userData.level.toString()} subtitle="Level" type="default"/>
		</CellGroup>
	</div>
{/if}

<style lang="scss">
	@import "/src/styles/mixins.scss";

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: -1rem;
		border-radius: 1rem 1rem 0 0;
		overflow: hidden;
	}

	.cover {
		background: url("/images/cover.svg");
		background-position: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 2rem 1rem 2rem 1rem;
	}

	.name {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		line-height: 1.75rem;
		font-weight: 500;
		color: white;
	}

	.actions {
		margin-top: 1rem;
		display: flex;
		width: 100%;
		justify-content: center;
		gap: 1rem;
	}

	.info-card {
		@include full-card;
	}
</style>
