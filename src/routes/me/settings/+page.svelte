<script>
	import { Button, Cell, CellGroup } from '$lib/components'
	import { Palette } from '$lib/components/icons'
	import { goto } from '$app/navigation'
	import { request } from '$lib/request'

	window.Telegram.WebApp.BackButton.show()
	window.Telegram.WebApp.BackButton.onClick(() => goto('/me'))
</script>

<CellGroup>
	<Cell type="link" title="Appearance" href="/me/settings/appearance" icon={Palette}/>
</CellGroup>
<Button
	onclick={() => request('setChatMainButton', {
		enabled: true
	})}
>
	Enable button
</Button>
<Button
	onclick={() => request('setChatMainButton', {
		enabled: false
	})}
>
	Disable button
</Button>
