import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const AuthPage = () => {
  const router = useRouter()

  const handleSignUp = () => {
    router.push('/sign-up')
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Column - Image Section */}
      <div className="flex-1 p-8 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <svg 
            className="w-6 h-6" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-4.5c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5z"/>
          </svg>
          <span className="font-semibold text-xl">Brandboostr.us</span>
        </div>

        {/* Illustration */}
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <Image
            src="/workspace-illustration.svg"
            alt="Workspace illustration showing an isometric office space with computers and people"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Description */}
        <p className="text-gray-700 mt-8 text-lg max-w-md">
          Unlock AI powered insights, strategy recommendations, and competitive analysis
        </p>
      </div>

      {/* Right Column - Sign Up Section */}
      <div className="flex-1 bg-gray-100 p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-semibold mb-2">
            Begin crafting your brand story
          </h1>
          <div className="h-1 w-12 bg-gray-300 mb-8"></div>

          <button
            onClick={handleSignUp}
            className="w-full bg-gray-800 text-white rounded-lg py-3 mb-4 hover:bg-gray-700 transition-colors"
            aria-label="Sign up"
          >
            Sign up
          </button>

          <Link 
            href="/sign-in" 
            className="block text-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
            tabIndex={0}
          >
            I already have an account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthPage 