import { derived, writable } from 'svelte/store'
import enLocales from '../../locales/en.json'
import ruLocales from '../../locales/ru.json'

export type TFunction = (key: string, parameters?: Record<string, unknown>) => string

type NestedRecord = { [k: string]: string | NestedRecord }

export const userLanguage = typeof window !== 'undefined'
	? window?.Telegram.WebApp.initDataUnsafe.user?.language_code
	: undefined

export const clientLanguage = writable(userLanguage ?? 'en')

export function getT(language: string): TFunction {
	return (key: string, parameters: Record<string, unknown> = {}) => {
		const locales: NestedRecord = language === 'en' ? enLocales : ruLocales
		
		const stringPath = key.split('.')
		
		let resultString: NestedRecord | string = locales
		console.log(stringPath)

		for (const stringKey of stringPath) {
			// If there's no string found return key as a fallback
			if (typeof resultString === 'string' || !resultString[stringKey]) {
				console.warn(`Couldn't find a translation for key '${key}'`)
				return key
			}
			resultString = resultString[stringKey]
		}

		resultString = resultString as unknown as string

		if (typeof resultString !== 'string') {
			return key
		}

		resultString = resultString.replace(new RegExp('{.*?}', 'g'), (match) => {
			const paramKey = match.substring(1, match.length - 1)
			return parameters[paramKey]?.toString() ?? `{${paramKey}}`
		})

		return resultString
	}
}

export const t = derived(clientLanguage, (language) => getT(language))
