export const ssr = false

export function load() {
	const isOpenedFromTelegram = Boolean(window.Telegram.WebView.initParams.tgWebAppThemeParams)
}