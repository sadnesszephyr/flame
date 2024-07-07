import { AppManager } from '$lib/AppManager/AppManager'

export class TmaAppManager extends AppManager {
	openPopup(text: string) {
		window.Telegram.WebApp.showPopup({
			message: text
		})
	}

	get isStandalone(): false {
		return false
	}
}
