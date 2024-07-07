export abstract class AppManager {
	abstract openPopup(text: string): void

	abstract get isStandalone(): boolean
}
