import { z } from 'zod'

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
/*    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })*/
    .trim(),
})

export type SignupFormState =
  | {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
  success?: boolean
}
  | undefined

export type User = {
  id: number | undefined,
  name: string,
  email: string,
  role: 'admin' | 'customer' | null,
  password: string,
}

export type SteamDetail = {
  id: string;
  name: string;
  img: string;
  price: string;
}

export type Item = {
  id: number;
  name: string;
  description: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  youtubeUrl: string | null;
  status: Status;
}

export type Status = "Backlog" | "In Progress" | "Finished"

export type ItemDetail = {
  id: number;
  itemId: number;
  detail: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}