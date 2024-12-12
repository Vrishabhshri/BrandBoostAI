import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { AuthProvider } from '@/app/auth-demo/Auth/AuthContext'
import { Toaster } from "sonner";

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
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#fff',
              color: '#363636',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
            },
            duration: 3000,
          }}
        />
      </body>
    </html>
  )
} 