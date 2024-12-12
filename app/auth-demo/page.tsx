'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Logo from "@/public/assets/icons/Logo.svg"
import HeroComponent from "@/app/components/HeroComponent"

const GetStarted: React.FC = () => {
  const router = useRouter()

  const handleSignUp = () => {
    router.push('/auth-demo/signup')
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-[1100px] bg-white rounded-[2rem] flex overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-8 bg-white">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src={Logo}
                alt="BrandBoostr.us Logo"
                width={24}
                height={24}
              />
              <span className="text-xl font-semibold">Brandboostr.us</span>
            </div>
            
            <div className="w-full aspect-square relative mb-6">
                {/* public\assets\hero.png */}
              <Image
                src="/assets/hero.png"
                alt="Workspace Illustration"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-gray-800 text-lg font-medium">
              Unlock AI powered insights, strategy recommendations, and competitive analysis
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-gray-100 p-12 flex flex-col justify-center">
          <h1 className="text-[2rem] font-bold text-gray-900 mb-6">
            Begin crafting<br />your brand story
          </h1>

          <div className="flex gap-2 mb-8">
            <div className="h-1 w-16 bg-gray-300 rounded-full"></div>
            <div className="h-1 w-16 bg-gray-400 rounded-full"></div>
          </div>

          <Button
            onClick={handleSignUp}
            className="w-full bg-gray-800 text-white py-6 rounded-lg text-lg font-medium hover:bg-gray-700"
          >
            Sign up
          </Button>

          <Link 
            href="/auth-demo/login"
            className="text-gray-600 text-center mt-6 hover:text-gray-800"
          >
            I already have an account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GetStarted