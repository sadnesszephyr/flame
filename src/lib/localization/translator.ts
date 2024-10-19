import { derived, writable } from 'svelte/store'
import enLocales from '../../locales/en.json'
import ruLocales from '../../locales/ru.json'
import { localSettings } from '$lib/stores/localSettings'
import { languages } from '$lib/localization/languages'

export type TFunction = (key: string, parameters?: Record<string, unknown>) => string

type NestedRecord = { [k: string]: string | NestedRecord }

function translate(languageId: string, key: string, parameters: Record<string, unknown> = {}): string {
	const languageData = languages.find((lang) => lang.id === languageId) ?? languages[0]
	const locales: NestedRecord = languageData.strings
	
	const stringPath = key.split('.')
	
	let resultString: NestedRecord | string = locales

	for (const stringKey of stringPath) {
		// If there's no string found return key as a fallback
		if (typeof resultString === 'string' || !resultString[stringKey]) {
			if (languageData.fallbackLanguageId) {
				console.warn(`Couldn't find a translation for key '${key}' in '${languageId}' language, falling back to ${languageData.fallbackLanguageId}`)
				return translate(languageData.fallbackLanguageId, key, parameters)
			}
			console.warn(`Couldn't find a translation for key '${key}' in '${languageId}' language`)
			return key
		}
		resultString = resultString[stringKey]
	}

	resultString = resultString as unknown as string

	if (typeof resultString !== 'string') {
		if ('$' in resultString) {
			return resultString['$']
		}

		return key
	}

	resultString = resultString.replace(new RegExp('{.*?}', 'g'), (match) => {
		const paramKey = match.substring(1, match.length - 1)
		return parameters[paramKey]?.toString() ?? `{${paramKey}}`
	})

	return resultString
}

export function getT(languageId: string): TFunction {
	return (key: string, parameters: Record<string, unknown> = {}) => {
		return translate(languageId, key, parameters)
	}
}

export const t = derived(localSettings, ({ language }) => getT(language))
