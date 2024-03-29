export const ssr = false

export function load() {
	const isOpenedFromTelegram = Boolean(window.Telegram.WebView.initParams.tgWebAppThemeParams)
	if(!isOpenedFromTelegram) {
		if(window.confirm('Do you want to open Campfire Telegram Mini App?')) {
			window.location.href = 'https://t.me/campfire_game_bot/app'
		}
	}
}