export const ssr = false

export function load() {
	const isOpenedFromTelegram = Boolean(window.Telegram.WebView.initParams.tgWebAppThemeParams)
	if(!isOpenedFromTelegram) {
		window.location.href = 'https://t.me/campfire_game_bot/app'
	}
}