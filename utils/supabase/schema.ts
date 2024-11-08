import { integer, pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";

export const poll = pgTable('polls', {
    id: serial("id").primaryKey().notNull(),
    question: text("question").notNull(),
    description: text("description").notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
        precision: 3
    }),
})

export const poll_answer = pgTable("poll_answers", {
    id: serial("id").primaryKey().notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
        precision: 3
    }),
    poll_id: integer("poll_id").notNull().references(() => poll.id, { onDelete: "cascade" }),
    user_id: text("user_id").notNull(),
    answer: text("answer").notNull(),
    comment: text("")
})


export const answers = pgTable("answers", {
    id: serial("id").primaryKey().notNull(),
    poll_id: integer("poll_id").notNull().references(() => poll.id, { onDelete: "cascade" }),
    answer: text("answer").notNull(),
    image: text("image"),
    description: text("description"),
})