import { relations } from 'drizzle-orm'
import { bigint, boolean, date, integer, jsonb, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('user', {
	id: bigint('id', { mode: 'number' }).primaryKey(),
	username: text('username').notNull().unique(),
	name: text('name').notNull(),
	coins: integer('coins').notNull(),
	rubies: integer('rubies').notNull(),
	level: integer('level').notNull().default(0),
	exp: integer('exp').notNull().default(0),
	joinedAt: timestamp('joined_at').notNull().defaultNow(),
	settings: jsonb('settings').notNull().default({}),
	isAdmin: boolean('is_admin').notNull().default(false),
	translatorLanguages: text('translator_languages').array(),
	bio: text('bio'),
	lastFishedAt: timestamp('last_fished_at', { mode: 'date' })
})

export const usersRelations = relations(users, ({ many }) => ({
	inventoryItems: many(inventoryItems)
}))

export const inventoryItems = pgTable('inventory_item', {
	userId: bigint('user_id', { mode: 'number' }).notNull(),
	itemId: text('item_id').notNull(),
	quantity: integer('quantity').notNull().default(1)
}, (table) => ({
	pk: primaryKey({ columns: [table.userId, table.itemId] })
}))

export const inventoryItemsRelations = relations(inventoryItems, ({ one }) => ({
	user: one(users, {
		fields: [inventoryItems.userId],
		references: [users.id]
	})
}))

export const authTokens = pgTable('auth_token', {
	id: serial('id').primaryKey(),
	token: text('token').notNull(),
	userId: bigint('user_id', { mode: 'number' }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	platform: text('platform')
})

export const AuthTokensRelations = relations(authTokens, ({ one }) => ({
	user: one(users, {
		fields: [authTokens.userId],
		references: [users.id]
	})
}))

export const camps = pgTable('camp', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow()
})

export const relationships = pgTable('relationship', {
	id: serial('id').primaryKey(),
	initiatorId: bigint('initiator_id', { mode: 'number' }).notNull(),
	responderId: bigint('responder_id', { mode: 'number' }).notNull(),
	result: boolean('result')
})

export const relationshipsRelations = relations(relationships, ({ one }) => ({
	initiator: one(users, {
		fields: [relationships.initiatorId],
		references: [users.id]
	}),
	responder: one(users, {
		fields: [relationships.responderId],
		references: [users.id]
	})
}))

export const friendships = pgTable('friendship', {
	id: serial('id').primaryKey(),
	initiatorId: bigint('initiator_id', { mode: 'number' }).notNull(),
	targetId: bigint('target_id', { mode: 'number' }).notNull(),
	initiatedAt: timestamp('initiated_at').notNull().defaultNow()
})

export const friendshipsRelations = relations(friendships, ({ one }) => ({
	initiator: one(users, {
		fields: [friendships.initiatorId],
		references: [users.id],
		relationName: 'friendshipInitiator'
	}),
	target: one(users, {
		fields: [friendships.targetId],
		references: [users.id],
		relationName: 'friendshipTarget'
	})
}))

export const userFriendshipsRelations = relations(users, ({ many }) => ({
	targetInFriendships: many(friendships, {
		relationName: 'friendshipTarget'
	}),
	initiatorInFriendships: many(friendships, {
		relationName: 'friendshipInitiator'
	})
}))
