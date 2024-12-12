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
      <div className="">
        {children}
    </div>
  )
} 