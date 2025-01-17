import { TELEGRAM_LOG_CHAT_ID } from '$env/static/private';
import { bot } from '$lib/server/bot';
import database from '$lib/server/database';
import { authTokens, inventoryItems, users } from '$lib/server/database/schema';
import { supabase } from '$lib/supabase';
import type { WebAppUser } from '@twa-dev/types';
import { and, eq, or } from 'drizzle-orm';

interface NewUserOptions {
	username: string;
	name: string;
	telegramId?: number;
	discordId?: number;
}

export async function createUser(initData: NewUserOptions) {
	const [userData] = await database
		.insert(users)
		.values({
			username: initData.username,
			name: initData.name,
			coins: 100,
			rubies: 0,
			telegramId: initData.telegramId ?? null,
			discordId: initData.discordId ?? null,
		})
		.onConflictDoNothing()
		.returning();

	bot.sendMessage(+TELEGRAM_LOG_CHAT_ID, `New user: ${initData.username}`);

	return userData;
}

export async function updateInventory(userId: number, itemId: string, quantity: number) {
	const itemData = await database.query.inventoryItems.findFirst({
		where: and(eq(inventoryItems.userId, userId), eq(inventoryItems.itemId, itemId)),
	});

	if (!itemData) {
		if (quantity < 0) {
			// throw new Error('Not enough items')
			return;
		}

		await database.insert(inventoryItems).values({
			userId,
			itemId,
			quantity,
		});

		await sendEvent(userId, 'inventoryUpdate', [
			{
				itemId,
				quantity,
			},
		]);
	} else {
		if (itemData.quantity + quantity < 0) {
			// throw new Error('Not enough items')
			return;
		} else if (itemData.quantity + quantity === 0) {
			await database
				.delete(inventoryItems)
				.where(and(eq(inventoryItems.userId, userId), eq(inventoryItems.itemId, itemId)));

			await sendEvent(userId, 'inventoryUpdate', [
				{
					itemId,
					quantity: 0,
				},
			]);
		} else {
			await database
				.update(inventoryItems)
				.set({
					quantity: itemData.quantity + quantity,
				})
				.where(and(eq(inventoryItems.userId, userId), eq(inventoryItems.itemId, itemId)));

			await sendEvent(userId, 'inventoryUpdate', [
				{
					itemId,
					quantity: itemData.quantity + quantity,
				},
			]);
		}
	}
}

export async function sendEvent(userId: number, name: string, data: unknown) {
	const channel = supabase.channel(`events-${userId}`);

	channel.send({
		event: name,
		type: 'broadcast',
		payload: data,
	});

	supabase.removeChannel(channel);
}

export async function authenticateOrCreateUser(
	method: 'telegram' | 'discord',
	id: number,
	newUserOptions: NewUserOptions,
) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const tokenLength = 64;

	let token = '';

	for (let i = 0; i < tokenLength; i++) {
		token += alphabet[Math.floor(Math.random() * alphabet.length)];
	}

	const searchField = method === 'telegram' ? users.telegramId : users.discordId;

	let isNewAccount = false;

	let userData = await database.query.users.findFirst({
		where: eq(searchField, id),
	});

	if (!userData) {
		isNewAccount = true;
		userData = await createUser({
			username: newUserOptions.username,
			name: newUserOptions.name,
			telegramId: method === 'telegram' ? id : undefined,
			discordId: method === 'discord' ? id : undefined,
		});
	}

	await database.insert(authTokens).values({
		token,
		userId: userData.id,
	});

	return {
		token,
		isNewAccount,
	};
}
