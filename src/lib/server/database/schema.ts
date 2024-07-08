import { relations } from 'drizzle-orm'
import { bigint, integer, jsonb, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('user', {
	id: bigint('id', { mode: 'number' }).primaryKey(),
	username: text('username').notNull().unique(),
	coins: integer('coins').notNull(),
	rubies: integer('rubies').notNull(),
	level: integer('level').notNull().default(0),
	exp: integer('exp').notNull().default(0),
	joinedAt: timestamp('joined_at').notNull().defaultNow(),
	settings: jsonb('settings').notNull().default({})
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
