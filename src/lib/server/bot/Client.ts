import { Client, type ClientOptions } from 'tgkit'
import { TELEGRAM_LOG_CHAT_ID } from '$env/static/private'

export class BotClient extends Client {
	constructor(options: ClientOptions) {
		super(options)
	}

	log(text: string) {
		this.sendMessage(Number(TELEGRAM_LOG_CHAT_ID), text)
	}
}
