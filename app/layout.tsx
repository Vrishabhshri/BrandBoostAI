import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { AuthProvider } from '@/app/auth-demo/Auth/AuthContext'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BrandBoost AI",
  description: "AI-powered competitor analysis",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ClerkProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ClerkProvider>
      </body>
    </html>
  )
} 