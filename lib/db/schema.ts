import {serial, text, timestamp, pgTable, pgEnum} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const statusEnum = pgEnum('status', ['Backlog', 'In Progress', 'Finished']);

export const item = pgTable("item", {
  id: serial("id"),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: statusEnum('status').notNull().default('Backlog'),
  youtubeUrl: text("youtube_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const itemDetail = pgTable("item_detail", {
  id: serial("id"),
  itemId: serial("item_id"),
  detail: text("detail").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});