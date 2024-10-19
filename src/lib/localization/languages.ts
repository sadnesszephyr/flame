import enStrings from '../../locales/en.json'
import frStrings from '../../locales/fr.json'
import ruStrings from '../../locales/ru.json'
import uaStrings from '../../locales/ua.json'

type NestedRecord = { [k: string]: string | NestedRecord }

interface Language {
	id: string,
	strings: NestedRecord,
	fallbackLanguageId?: string,
	nativeName: string
}

export const languages: Language[] = [
	{
		id: 'en',
		nativeName: 'English',
		strings: enStrings
	},
	{
		id: 'fr',
		nativeName: 'Français',
		strings: frStrings,
		fallbackLanguageId: 'en'
	},
	{
		id: 'ru',
		nativeName: 'Русский',
		strings: ruStrings,
		fallbackLanguageId: 'en'
	},
	{
		id: 'ua',
		nativeName: 'Українська',
		strings: uaStrings,
		fallbackLanguageId: 'ru'
	}
]
