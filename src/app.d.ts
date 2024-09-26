import { Telegram } from '@twa-dev/types'

interface AuthOptions {
	bot_id: string,
	request_access?: boolean,
	lang?: string
}

interface AuthData {
	auth_date: number,
	first_name: string,
	hash: string,
	id: number,
	last_name: string,
	username: string
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		Telegram: Telegram & {
			Login: {
				widgetsOrigin: string,
				// eslint-disable-next-line no-unused-vars
				auth: (options: AuthOptions, callback: (data: AuthData | false) => void) => void
			}
		}
	}

	interface ViewTransition {
		updateCallbackDone: Promise<void>,
		ready: Promise<void>,
		finished: Promise<void>,
		skipTransition: () => void
	}

	interface Document {
		// eslint-disable-next-line no-unused-vars
		startViewTransition(updateCallback: () => Promise<void>): ViewTransition
	}
}

export { }
