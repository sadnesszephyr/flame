<script>
	import { Cell, CellGroup } from '$lib/components'
	import { BatteryCharge, Contrast, CursiveFont } from '$lib/components/icons'
	import { goto } from '$app/navigation'
	import { localSettings } from '$lib/stores/localSettings'
	import { t } from '$lib/localization/translator'

	window.Telegram.WebApp.BackButton.show()
	window.Telegram.WebApp.BackButton.onClick(() => goto('/settings'))
</script>

<CellGroup>
	<Cell
		type="switch"
		icon={Contrast}
		title={$t('settings.appearance.highContrast.title')}
		subtitle={$t('settings.appearance.highContrast.subtitle')}
		bind:enabled={$localSettings.appearance.highContranst}
	/>
	<Cell
		type="switch"
		icon={CursiveFont}
		title={$t('settings.appearance.cursiveHeadings.title')}
		subtitle={$t('settings.appearance.cursiveHeadings.subtitle')}
		bind:enabled={$localSettings.appearance.cursiveHeadings}
	/>
	<Cell
		type="switch"
		icon={BatteryCharge}
		title={$t('settings.appearance.powerSaving.title')}
		subtitle={$t('settings.appearance.powerSaving.subtitle')}
		bind:enabled={$localSettings.powerSaving}
	/>
</CellGroup>
