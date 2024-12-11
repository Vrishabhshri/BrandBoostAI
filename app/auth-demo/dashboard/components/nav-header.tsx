"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Overview", href: "/auth-demo/dashboard", icon: "📊" },
  { label: "Competitor Dashboard", href: "/auth-demo/dashboard/competitors", icon: "🎯" },
  { label: "Content Builder", href: "/auth-demo/dashboard/content", icon: "✏️" },
  { label: "Settings", href: "/auth-demo/dashboard/settings", icon: "⚙️" },
]

export default function NavHeader() {
  const pathname = usePathname()

  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/auth-demo/dashboard" className="flex items-center gap-2">
            <div className="w-6 h-6">
              <Image 
                src="/logo.svg" 
                alt="Brandboost" 
                width={24} 
                height={24}
                className="invert"
              />
            </div>
          </Link>
          
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                  ${pathname === item.href 
                    ? "bg-gray-700" 
                    : "hover:bg-gray-700"
                  }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <span className="sr-only">Notifications</span>
            <span>🔔</span>
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <span className="sr-only">User menu</span>
            <span>👤</span>
          </button>
        </div>
      </div>
    </header>
  )
} 