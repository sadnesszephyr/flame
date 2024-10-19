<script>
	import { goto } from '$app/navigation'
	import { Cell, CellGroup } from '$lib/components'
	import { Translate } from '$lib/components/icons'
	import { languages } from '$lib/localization/languages'
	import { t } from '$lib/localization/translator'
	import { clientUser } from '$lib/stores/clientUser'
	import { localSettings } from '$lib/stores/localSettings'

	window.Telegram.WebApp.BackButton.show()
	window.Telegram.WebApp.BackButton.onClick(() => goto('/settings'))
</script>

<div class="container">
	{#if $clientUser?.translatorLanguages}
		<CellGroup heading={$t('settings.language.translating')}>
			<Cell
				type="switch"
				icon={Translate}
				title={$t('settings.language.translating.enableEditor')}
				enabled={false}
			/>
		</CellGroup>
	{/if}

	<CellGroup heading={$t('settings.language.language')}>
		{#each languages as language}
			<Cell
				type="default"
				title={language.nativeName}
				subtitle={$t('languages.' + language.id)}
				onclick={() => $localSettings.language = language.id}
			/>
		{/each}
	</CellGroup>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
