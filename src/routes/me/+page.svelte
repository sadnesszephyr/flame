<script>
	import { Cell, CellGroup } from '$lib/components'
	import { Settings, Logout } from '$lib/components/icons'

	window.Telegram.WebApp.BackButton.hide()

	let bool = $state(false)
</script>

<CellGroup>
	<Cell type="link" title="Settings" href="/me/settings" icon={Settings}/>
	<Cell type="link" title="Admin page" href="/admin" icon={Settings}/>
	<Cell type="default" title="Log out" variant="danger" icon={Logout}/>
	<Cell type="switch" title="Log out" bind:enabled={bool}/>
</CellGroup>
