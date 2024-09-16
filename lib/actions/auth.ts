'use server';

import bcrypt from 'bcrypt'
import { SignupFormSchema, SignupFormState } from '@/lib/definitions'
import {createUser, getUser} from '@/lib/data/user'
import {authConfig} from "@/auth.config";
import NextAuth, {AuthError} from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: {email: string, password: string}) {
        const parsedCredentials = z
          .object({
            username: z.string().email(),
            password: z.string().min(2)
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const {username, password} = parsedCredentials.data;

          const user = await getUser(username);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    } as any),
  ],
});

export async function signup(state: SignupFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors}
  }

  const { name, email, password } = validatedFields.data

  const hashedPassword: string = await bcrypt.hash(password, 10);

  const user = await createUser({
    id: undefined,
    name,
    email,
    role: 'customer',
    password: hashedPassword
  });

  if (!user) {
    return { message: 'An error occurred.', success: false }
  }

  return { message: 'Success.', success: true }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {

  try {
    await signIn('credentials', {
      redirect: true,
      redirectTo: '/items',
      ...Object.fromEntries(formData)
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
  return '';
}

export async function logout() {
  await signOut({
    redirect: true,
    redirectTo: '/'
  });
}