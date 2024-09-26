import { writable } from 'svelte/store'
import merge from 'deepmerge'

export interface LocalSettings {
	appearance: {
		highContranst: boolean,
		cursiveHeadings: boolean
	},
	powerSaving: boolean
}

const defaultSettings: LocalSettings = {
	appearance: {
		highContranst: false,
		cursiveHeadings: true
	},
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
