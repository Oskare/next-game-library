'use server'

import {z} from "zod";
import {
  createDetail as dbCreateDetail,
  deleteDetail as dbDeleteDetail
} from "@/lib/data/itemdetail";
import {revalidatePath} from "next/cache";

export async function createDetail(prevState: { success: boolean, message: string }, formData: FormData) {
  const schema = z.object({
    itemId: z.number().min(1),
    detail: z.string().min(1)
  });

  const parse = schema.safeParse({
    itemId: Number(formData.get("itemId")),
    detail: formData.get("detail")
  });

  if (!parse.success) {
    return {success: false, message: 'Failed to create item'};
  }

  const data = parse.data;

  // Create item
  await dbCreateDetail(data.itemId, data.detail);

  // Refresh list
  revalidatePath(`/items/${data.itemId}`)

  return {success: true, message: 'item created'};
}

export const deleteDetail = async (itemId: number, detailId: number): Promise<void> => {
  await dbDeleteDetail(detailId);

  revalidatePath(`/items/${itemId}`)
}