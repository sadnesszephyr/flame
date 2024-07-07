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

	interface ViewTransition {
		updateCallbackDone: Promise<void>,
		ready: Promise<void>,
		finished: Promise<void>,
		skipTransition: () => void
	}

	interface Document {
		startViewTransition(updateCallback: () => Promise<void>): ViewTransition
	}
}

export { }
