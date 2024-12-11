import Image from "next/image"
// Update the import path to use the public directory
import Logo from "/public/assets/icons/Logo.svg"

interface LayoutProps {
  leftContent?: React.ReactNode
  rightContent: React.ReactNode
}

export default function Layout({ leftContent, rightContent }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#302F2F] flex items-center justify-center p-4 py-10">
      <div className="relative flex w-[60%] max-w-[680px] h-auto bg-gradient-to-r from-white to-[rgba(255,255,255,0.8)] rounded-3xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-[50%] min-w-[350px] flex flex-auto items-center justify-center">
          <div className="content-center m-2">
            <div className="flex items-center gap-2 mb-4">
              <Image src={Logo} alt="Logo" width={20} height={20} className="filter invert" />
              <span className="font-semibold">Brandboost.us</span>
            </div>
            {leftContent}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[55%] flex items-center justify-center">
          {rightContent}
        </div>
      </div>
    </div>
  )
} 