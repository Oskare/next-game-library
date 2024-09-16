'use server'

import {z} from "zod";
import {revalidatePath} from "next/cache";
import {
  createItem as dbCreateItem,
  updateItem as dbUpdateItem,
  updateStatus as dbUpdateStatus,
  deleteItem as dbDeleteItem
} from "@/lib/data/item";
import {Status} from "@/lib/definitions";

export async function createItem(prevState: { success: boolean, message: string }, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    youtubeUrl: z.string()
  });

  const parse = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    youtubeUrl: formData.get("youtubeUrl")
  });

  if (!parse.success) {
    return {success: false, message: 'Failed to create item'};
  }

  const data = parse.data;

  // Create item
  await dbCreateItem(data.name, data.description, data.youtubeUrl);

  // Refresh list
  revalidatePath("/items")

  return {success: true, message: 'item created'};
}

export const deleteItem = async (id: number): Promise<void> => {
  await dbDeleteItem(id);

  revalidatePath("/items")
}

export const updateItem = async (prevState: { success: boolean, message: string }, formData: FormData) => {
  const schema = z.object({
    id: z.number(),
    name: z.string().min(1),
    description: z.string().min(1),
    youtubeUrl: z.string()
  });

  const parse = schema.safeParse({
    id: Number(formData.get("id")),
    name: formData.get("name"),
    description: formData.get("description"),
    youtubeUrl: formData.get("youtubeUrl")
  });

  if (!parse.success) {
    return {success: false, message: 'Failed to update item'};
  }

  const data = parse.data;

  // Update item
  await dbUpdateItem(data.id, data.name, data.description, data.youtubeUrl);

  // Refresh list
  revalidatePath("/items")
  revalidatePath(`/items/${data.id}`)

  return {success: true, message: 'item updated'};
}

export const updateStatus = async (id: number, newStatus: Status) => {
  await dbUpdateStatus(id, newStatus);

  revalidatePath(`/items/${id}`);
}