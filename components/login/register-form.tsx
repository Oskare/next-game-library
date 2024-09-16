"use client"

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useFormState} from "react-dom";
import {signup} from "@/lib/actions/auth";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's a link to login if you already have an account"

export default function RegisterForm() {

  const [state, dispatch, pending] = useFormState(signup, undefined);

  return (
    <form action={dispatch}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Name" required/>
              {state?.errors?.name && <p className="text-sm text-red-400">{state.errors.name}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {state?.errors?.email && <p className="text-sm text-red-400">{state.errors.email}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password"/>
              {state?.errors?.password && (
                <div>
                  <p>Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li className="text-sm text-red-400" key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {!state?.success &&
                <Button aria-disabled={pending} type="submit" className="w-full">
                  {pending ? 'Submitting...' : 'Create an account'}
                </Button>
            }
            {state?.success && (
              <div className="mt-4 text-center text-sm">
                Account created, go to{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
            )}
          </div>

          {!state?.success &&
              <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                      Sign in
                  </Link>
              </div>
          }
        </CardContent>
      </Card>
    </form>
  )
}