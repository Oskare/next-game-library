import {db} from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import {eq} from "drizzle-orm";
import {User} from "@/lib/definitions";

export const getUsers = async () => {
  return db
    .select()
    .from(user);
};

export const getUser = async (email: string): Promise<User | null> => {
  return db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1)
    .then(v => v[0] || null);
};

export const createUser = async (newUser: User) => {
  return db
    .insert(user)
    .values(newUser)
    .returning({id: user.id});
}