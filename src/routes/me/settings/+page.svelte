<script>
	import { Cell, CellGroup } from '$lib/components'
	import { Settings } from '$lib/components/icons'
	import { goto } from '$app/navigation'

	window.Telegram.WebApp.BackButton.show()
	window.Telegram.WebApp.BackButton.onClick(() => goto('/me'))
</script>

<CellGroup>
	<Cell type="link" title="Appearance" href="/me/settings/appearance" icon={Settings}/>
</CellGroup>
