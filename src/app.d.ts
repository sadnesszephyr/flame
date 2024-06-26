import { Telegram } from '@twa-dev/types'

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		Telegram: Telegram
	}
}

export { }
