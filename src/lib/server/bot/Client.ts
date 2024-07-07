import { Client } from 'telescript'
import { TELEGRAM_LOG_CHAT_ID } from '$env/static/private'

export class BotClient extends Client {
	// TODO: export `ClientOptions` type in TgKit
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(options: any) {
		super(options)
	}

	log(text: string) {
		// TODO: Add string or `${number}` type to `ChatId` type in TgKit
		this.sendMessage(Number(TELEGRAM_LOG_CHAT_ID), text)
	}
}
