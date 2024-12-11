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
                className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                ← Go back
              </Link>
              
              <h1 className="text-3xl font-semibold">Welcome back!</h1>
              
              <Clerk.GlobalError className="text-sm text-red-600" />
              
              <div className="space-y-4">
                <Clerk.Field name="identifier">
                  <Clerk.Label className="sr-only">Email</Clerk.Label>
                  <Clerk.Input
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full rounded-xl bg-white px-4 py-3 text-sm text-gray-900 outline-none ring-1 ring-gray-200 placeholder:text-gray-400 hover:ring-gray-300 focus:ring-2 focus:ring-gray-900"
                  />
                  <Clerk.FieldError className="mt-2 text-xs text-red-600" />
                </Clerk.Field>

                <Clerk.Field name="password">
                  <Clerk.Label className="sr-only">Password</Clerk.Label>
                  <Clerk.Input
                    type="password"
                    required
                    placeholder="Password"
                    className="w-full rounded-xl bg-white px-4 py-3 text-sm text-gray-900 outline-none ring-1 ring-gray-200 placeholder:text-gray-400 hover:ring-gray-300 focus:ring-2 focus:ring-gray-900"
                  />
                  <Clerk.FieldError className="mt-2 text-xs text-red-600" />
                </Clerk.Field>
              </div>

              <SignIn.Action
                submit
                className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Login
              </SignIn.Action>
            </SignIn.Step>
            <Clerk.Connection
              name="google"
              className="flex w-full items-center justify-center gap-x-3 rounded-md bg-neutral-700 px-3.5 py-1.5 text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/5%)_inset,0_0_0_1px_theme(colors.white/2%)_inset] outline-none hover:bg-gradient-to-b hover:from-white/5 hover:to-white/5 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gradient-to-b active:from-black/20 active:to-black/20 active:text-white/70"
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
              Login with Google
            </Clerk.Connection>
          </SignIn.Root>
        </div>
      </div>
    </div>
  )
}

