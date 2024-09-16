'use server'

import {db} from "@/lib/db/db";
import {itemDetail} from "@/lib/db/schema";
import {eq} from "drizzle-orm";

export const createDetail = async(itemId: number, detail: string)=> {
  return db
    .insert(itemDetail)
    .values({
      itemId: itemId,
      detail: detail
    })
    .returning({id: itemDetail.id});
}

export const deleteDetail = async (id: number): Promise<void> => {
  await db
    .delete(itemDetail)
    .where(eq(itemDetail.id, id));
}