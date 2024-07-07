import { AppManager } from '$lib/AppManager/AppManager'

export class StandaloneAppManager extends AppManager {
	openPopup(text: string) {
		alert(text)
	}

	get isStandalone(): true {
		return true
	}
}
