import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Auth Demo",
  description: "Authentication demo flow",
}

export default function AuthDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[800px] bg-white rounded-3xl overflow-hidden">
        {children}
      </div>
    </div>
  )
} 