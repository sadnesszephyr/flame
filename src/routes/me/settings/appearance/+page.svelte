<script>
	import { Cell, CellGroup } from '$lib/components'
	import { BatteryCharge, Contrast, CursiveFont } from '$lib/components/icons'
	import { goto } from '$app/navigation'
	import { localSettings } from '$lib/stores/localSettings'

	window.Telegram.WebApp.BackButton.show()
	window.Telegram.WebApp.BackButton.onClick(() => goto('/me/settings'))
</script>

<CellGroup>
	<Cell
		type="switch"
		icon={Contrast}
		title="High contrast"
		subtitle="Add borders to some elements"
		bind:enabled={$localSettings.appearance.highContranst}
	/>
	<Cell
		type="switch"
		icon={CursiveFont}
		title="Cursive headings"
		subtitle="Use cozy cursive font for headings"
		bind:enabled={$localSettings.appearance.cursiveHeadings}
	/>
	<Cell
		type="switch"
		icon={BatteryCharge}
		title="Power saving"
		subtitle="Disable animations for power saving"
		bind:enabled={$localSettings.powerSaving}
	/>
</CellGroup>
