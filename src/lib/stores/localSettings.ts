import { writable } from 'svelte/store'
import merge from 'deepmerge'

export interface LocalSettings {
	appearance: {
		highContranst: boolean,
		cursiveHeadings: boolean
	},
	language: string,
	powerSaving: boolean
}

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

const localStorageSettingsString = localStorage.getItem('localSettings')
const localStorageSettings = localStorageSettingsString ? JSON.parse(localStorageSettingsString) : undefined

export const localSettings = writable<LocalSettings>(
	localStorageSettings
		? merge(defaultSettings, localStorageSettings)
		: defaultSettings
)

localSettings.subscribe((newValue) => {
	localStorage.setItem('localSettings', JSON.stringify(newValue))
})
