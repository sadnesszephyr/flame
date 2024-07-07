<script lang="ts">
	import { onNavigate } from '$app/navigation'
	import { appManager } from '$lib/AppManager'
	import { TopBar, NavigationBar, Snackbars } from '$lib/components'
	import AppLoader from '$lib/components/appLoader/AppLoader.svelte'
	import { snackbar } from '$lib/components/snackbar/store'
	import { request } from '$lib/request'
	import { clientUser } from '$lib/stores/clientUser'
	import { supabase } from '$lib/supabase'
	import '../styles/global.scss'

	let { children } = $props()

	window.Telegram.WebApp.setHeaderColor(window.Telegram.WebApp.themeParams.bg_color)

	if (!$clientUser) {
		request('getMe').then((userData) => {
			clientUser.set(userData)
		})
	}

	function isChildRoute(oldPath: string, newPath: string) {
		const oldSegments = oldPath.split('/').filter(Boolean)
		const newSegments = newPath.split('/').filter(Boolean)

		if (newSegments.length > oldSegments.length) {
			return oldSegments.every((segment, index) => segment === newSegments[index])
		}

		return false
	}

	function isParentRoute(oldPath: string, newPath: string) {
		const oldSegments = oldPath.split('/').filter(Boolean)
		const newSegments = newPath.split('/').filter(Boolean)

		if (newSegments.length < oldSegments.length) {
			return newSegments.every((segment, index) => segment === oldSegments[index])
		}

		return false
	}

	onNavigate(async (navigation) => {
		if (!('startViewTransition' in document)) return

		const oldRoute = navigation.from
		const newRoute = navigation.to

		const isChild = isChildRoute(oldRoute!.url.pathname, newRoute!.url.pathname)
		const isParent = isParentRoute(oldRoute!.url.pathname, newRoute!.url.pathname)

		document.documentElement.classList.toggle('transition-forward', isChild)
		document.documentElement.classList.toggle('transition-backward', isParent)
		
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})


	const channel = supabase.channel(`notifications-${window.Telegram.WebApp.initDataUnsafe.user!.id}`)

	channel
		.on('broadcast', { event: 'n' }, (notification) => {
			snackbar({
				text: notification.payload.message
			})
		})
		.subscribe()
</script>

<div class="app">
	{#if !$clientUser}
		<AppLoader/>
	{/if}

	{#if appManager.isStandalone}
		<TopBar/>
	{/if}
	<main class="main">
		{@render children()}
		<Snackbars/>
	</main>
	<NavigationBar/>
</div>

<style lang="scss">
	.app {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.main {
		position: relative;
		flex: 1;
		overflow-y: scroll;
		// padding: 1rem;
	}
</style>
