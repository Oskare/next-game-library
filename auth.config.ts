import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  basePath: process.env.AUTH_BASE_PATH,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl} }) {
      return!!auth?.user;
    },
  },
  providers: []
} satisfies NextAuthConfig;