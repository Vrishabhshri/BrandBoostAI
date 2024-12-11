'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroComponent from "./_components/HeroComponent";
import Image from "next/image";
import Logo from "../../public/assets/icons/Logo.svg";

const GetStarted = () => {
  const router = useRouter();
// update the sign up button to route to the sign up page, app\(auth)\sign-up
  const handleSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <main className="min-h-screen w-full bg-[#302F2F] flex items-center justify-center p-6">
      <div className="relative flex w-full max-w-[1100px] h-auto min-h-[600px] bg-gradient-to-r from-white to-[rgba(255,255,255,0.8)] rounded-3xl shadow-lg overflow-hidden flex-col md:flex-row">
        {/* Left Side */}
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <Card className="flex h-full w-full bg-white rounded-3xl shadow-xl border-0">
            <div className="w-full p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-xl font-karla font-bold text-black flex items-center gap-2">
                  <Image
                    src={Logo}
                    alt="BrandBoostr.us Logo"
                    width={24}
                    height={24}
                    className="filter invert"
                    priority
                  />
                  <span className="sr-only">Brandboostr.us</span>
                  Brandboostr.us
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <div className="relative w-full mb-8">
                  <HeroComponent />
                </div>

                <p className="text-base font-karla font-bold text-gray-800 leading-snug">
                  Unlock AI powered insights, strategy recommendations, and competitive analysis
                </p>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <h2 className="text-[2rem] md:text-[2.5rem] font-karla font-semibold text-[rgb(30,30,30)] mb-4">
              Begin crafting your brand story
            </h2>

            {/* Progress Indicators */}
            <div className="mb-6 flex gap-3" role="progressbar" aria-label="Sign up progress">
              <div className="h-1.5 w-32 rounded-full bg-gray-400" />
              <div className="h-1.5 w-32 rounded-full bg-gray-600" />
            </div>

            <Button
              onClick={handleSignUp}
              className="w-full h-12 text-lg font-medium rounded-lg hover:opacity-90 transition-opacity"
              aria-label="Sign up for Brandboostr.us"
            >
              Sign up
            </Button>

            <Link 
              href="/sign-in"
              className="block text-center mt-6 text-base text-gray-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md"
              tabIndex={0}
              role="button"
              aria-label="Go to sign in page"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GetStarted;
