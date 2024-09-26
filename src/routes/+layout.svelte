<script lang="ts">
	import { dev } from '$app/environment'
	import { goto, onNavigate } from '$app/navigation'
	import { base } from '$app/paths'
	import { page } from '$app/stores'
	import { appManager } from '$lib/AppManager'
	import { NavigationBar, Snackbars, Header, AppLoader } from '$lib/components'
	import { snackbar } from '$lib/components/snackbar/store'
	import { request } from '$lib/request'
	import { clientUser } from '$lib/stores/clientUser'
	import { inventory, type Inventory } from '$lib/stores/inventory'
	import { supabase } from '$lib/supabase'
	import '../styles/global.scss'
	import { tick } from 'svelte'
	import { fade } from 'svelte/transition'

	let { children } = $props()

	if (appManager.isStandalone) {
		if (!localStorage.getItem('token')) {
			goto('login', {
				replaceState: true
			})
		}
	}
	else {
		window.Telegram.WebApp.setHeaderColor(window.Telegram.WebApp.themeParams.bg_color)
	}

	if (!$clientUser) {
		request('getMe').then(async (userData) => {
			userData.lastFishedAt = userData.lastFishedAt ? new Date(userData.lastFishedAt) : undefined
			clientUser.set(userData)
			inventory.set(userData.inventoryItems)
			await tick()

			supabase
				.channel(`events-${userData.id}`)
				.on(
					'broadcast',
					{
						event: 'inventoryUpdate'
					},
					({ payload }: { payload: { data: Inventory } }) => {
						inventory.update((inv) => {
							const added = payload.data
								.filter((item) => !$inventory.find((i) => i.itemId === item.itemId))
							const updatedAndDeleted = inv.map((item) => {
								const newItem = payload.data.find((i) => i.itemId === item.itemId)

								if (!newItem) return item
								if (newItem.quantity === 0) return null
								return {
									...item,
									quantity: newItem.quantity
								}
							}).filter((item) => item !== null)
							return [...added, ...updatedAndDeleted]
						})
					}
				)
				.subscribe()
		})
	}

	onNavigate(async (navigation) => {
		if (!('startViewTransition' in document)) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})


	if (!appManager.isStandalone) {
		const channel = supabase.channel(`notifications-${window.Telegram.WebApp.initDataUnsafe.user!.id}`)
	
		channel
			.on('broadcast', { event: 'n' }, (notification) => {
				snackbar({
					text: notification.payload.message
				})
			})
			.subscribe()
	}
</script>

<svelte:head>
	<link rel="manifest" href={`${base}/${dev ? 'site-dev' : 'site'}.webmanifest`}>
	<title>Campfire</title>
</svelte:head>

<svelte:body data-class="hi"/>

<div class="app">
	{#if $page.url.pathname === '/login'}
	<!--  -->
		{@render children()}
	{:else if $clientUser}
		<Header/>
		<main class="main" transition:fade={{ duration: 200 }}>
			{@render children()}
		</main>
		<NavigationBar/>
		<Snackbars/>
	{:else}
		<AppLoader/>
	{/if}
</div>

<style lang="scss">
	.app {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: var(--background-secondary);
		position: relative;
	}

	.main {
		position: relative;
		flex: 1;
		overflow-y: scroll;
	}
</style>
