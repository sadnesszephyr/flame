<script lang="ts">
	import { goto } from '$app/navigation'
	import { localSettings, userData } from '$lib/client/store'
	import { ripple } from '$lib/client/actions'
	import Toggle from '../../../lib/client/components/Toggle.svelte'
	import { Cell, CellGroup } from '$lib/client/components/Cell'
	import Contrast from '$lib/client/components/icons/Contrast.svelte'
	import { BatteryCharge, Devices } from '$lib/client/components/icons'
	import { t } from '$lib/shared/localization'

	const webApp = window.Telegram.WebApp
	webApp.BackButton.show()
	webApp.BackButton.onClick(() => goto('/'))
	webApp.MainButton.hide()

	function handleVersionInfoClick(e: MouseEvent) {
		if (e.detail === 3) {
			goto('/lab')
		}
	}
</script>

<CellGroup>
	<Cell
		title={$t('settings.contrastMode.title')}
		subtitle={$t('settings.contrastMode.subtitle')}
		bind:value={$localSettings.contrastMode}
	>
		<Contrast slot="icon"/>
	</Cell>
	<Cell
		title={$t('settings.powerSaving.title')}
		subtitle={$t('settings.powerSaving.subtitle')}
		bind:value={$localSettings.powerSaving}
	>
		<BatteryCharge slot="icon"/>
	</Cell>
	<Cell
		title={$t('settings.sessions.title')}
	>
		<Devices slot="icon"/>
	</Cell>
</CellGroup>

<button class="hint" use:ripple on:click={handleVersionInfoClick}>Beta Version</button>

<style lang="scss">
	.hint {
		background: none;
		font-size: 0.875rem;
		color: var(--text);
		border: none;
		height: 3rem;
		margin-top: -1rem;
	}
</style>