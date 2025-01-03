import merge from 'deepmerge'

export interface LocalSettings {
	appearance: {
		highContranst: boolean,
		cursiveHeadings: boolean
	},
	language: string,
	powerSaving: boolean
}

const localStorageSettingsString = localStorage.getItem('localSettings')
const localStorageSettings = localStorageSettingsString ? JSON.parse(localStorageSettingsString) : undefined

const defaultSettings: LocalSettings = {
	appearance: {
		highContranst: false,
		cursiveHeadings: true
	},
	language: typeof window !== 'undefined'
		? window?.Telegram.WebApp.initDataUnsafe.user?.language_code ?? 'en'
		: 'en',
	powerSaving: false
}

export const localSettings = $state(
	localStorageSettings
		? merge(defaultSettings, localStorageSettings)
		: defaultSettings
)
