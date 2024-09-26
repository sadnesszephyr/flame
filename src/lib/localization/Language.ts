interface LanguageConfig {
	id: string,
	strings: unknown,
	fallbackId?: string
}

export class Language {
	id: string

	constructor(config: LanguageConfig) {
		this.id = config.id
	}
}
