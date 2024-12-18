'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { Flame } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="grid w-full max-w-[1000px] grid-cols-1 overflow-hidden rounded-[32px] bg-white shadow-xl md:grid-cols-2">
        <div className="p-8">
          <div className="mb-6 flex items-center gap-2">
            <Flame className="h-6 w-6" />
            <span className="text-xl font-semibold">Brandboost.us</span>
          </div>
          
          <div className="relative aspect-square w-full">
            <Image
              src="/assets/hero.png?height=400&width=400"
              alt="Office illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <p className="mt-6 text-xl font-medium text-gray-900">
            Unlock AI powered insights, strategy recommendations, and competitive analysis
          </p>
        </div>

        <div className="bg-gray-50 p-8">
          <SignIn.Root>
            <SignIn.Step
              name="start"
              className="space-y-6"
            >
              <Link
                href="/auth-demo"
                className="mb-6 inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900"
              >
                ← Go back
              </Link>
              
              <h1 className="text-xl font-medium tracking-tight text-zinc-950">
                Welcome back!
              </h1>
              
              <Clerk.GlobalError className="block text-sm text-red-400" />
              
              <div className="space-y-4">
                <Clerk.Field name="identifier" className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-zinc-950">Email</Clerk.Label>
                  <Clerk.Input
                    type="email"
                    required
                    className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>

                <Clerk.Field name="password" className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-zinc-950">Password</Clerk.Label>
                  <Clerk.Input
                    type="password"
                    required
                    className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
              </div>

              <SignIn.Action
                submit
                className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
              >
                Sign In
              </SignIn.Action>

              <p className="text-center text-sm text-zinc-500">
                No account?{' '}
                <Clerk.Link
                  navigate="sign-up"
                  className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                >
                  Create an account
                </Clerk.Link>
              </p>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-50 px-2 text-zinc-500">Or continue with</span>
                </div>
              </div>

              <Clerk.Connection
                name="google"
                className="flex w-full items-center justify-center gap-x-3 rounded-md bg-white px-3.5 py-2 text-sm font-medium text-zinc-950 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 16"
                  className="w-4"
                  aria-hidden
                >
                  <path
                    fill="currentColor"
                    d="M8.82 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.998.96 11.256 0 8.82 0 4.41 0 .705 3.591.705 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.82Z"
                  />
                </svg>
                Continue with Google
              </Clerk.Connection>
            </SignIn.Step>
          </SignIn.Root>
        </div>
      </div>
    </div>
  )
}

