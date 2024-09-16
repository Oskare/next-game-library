'use server'

import {db} from "@/lib/db/db";
import {item, itemDetail, user} from "@/lib/db/schema";
import {count, eq, ilike} from "drizzle-orm";
import {Item, ItemDetail, Status} from "@/lib/definitions";

const ITEMS_PER_PAGE = 5;

export const getItems = async (query: string, currentPage: number): Promise<Item[]> => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereClause = query.length > 0
    ? ilike(item.name, `%${query}%`)
    : undefined;

  const result = await db
    .select()
    .from(item)
    .where(whereClause)
    .orderBy(item.name)
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  return result;
};

export const getItemPages = async (query: string) => {
  const whereClause = query.length > 0
    ? ilike(item.name, `%${query}%`)
    : undefined;

  const result = await db
    .select({count: count()})
    .from(item)
    .where(whereClause);

  return Math.ceil(result[0]?.count / ITEMS_PER_PAGE);
};

export const createItem = async (name: string, description: string, youtubeUrl: string) => {
  return db
    .insert(item)
    .values({
      name: name,
      description: description,
      youtubeUrl: youtubeUrl
    })
    .returning({id: item.id});
}

export const updateItem = async (id: number, name: string, description: string, youtubeUrl: string): Promise<void> => {
  await db
    .update(item)
    .set({
      name: name,
      description: description,
      youtubeUrl: youtubeUrl
    })
    .where(eq(item.id, id));
}

export const updateStatus = async (id: number, newStatus: Status): Promise<void> => {
  await db
    .update(item)
    .set({status: newStatus})
    .where(eq(item.id, id));
}

export const deleteItem = async (id: number): Promise<void> => {
  await db
    .delete(item)
    .where(eq(item.id, id));
}

export const getItem = async (id: number): Promise<{ item: Item, item_detail: ItemDetail | null }[]> => {
  return db
    .select()
    .from(item)
    .leftJoin(itemDetail, eq(item.id, itemDetail.itemId))
    .where(eq(item.id, id));
};