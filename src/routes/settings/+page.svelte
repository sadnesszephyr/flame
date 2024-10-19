<script>
	import { Cell, CellGroup } from '$lib/components'
	import { Globe, Palette } from '$lib/components/icons'
	import { goto } from '$app/navigation'
	import { t } from '$lib/localization/translator'

	window.Telegram.WebApp.BackButton.show()
	window.Telegram.WebApp.BackButton.onClick(() => goto('/me'))
</script>

<CellGroup>
	<Cell type="link" title={$t('settings.appearance')} href="/settings/appearance" icon={Palette}/>
	<Cell type="link" title={$t('settings.language')} href="/settings/language" icon={Globe}/>
</CellGroup>
