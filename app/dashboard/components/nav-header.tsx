import Link from "next/link"
import { Flame, LayoutDashboard, Settings, Wand2 } from 'lucide-react'

import { cn } from "@/lib/utils"

export function NavHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-zinc-800 px-4">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-white">
          <Flame className="h-8 w-8" />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-zinc-200 hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Link>
          <Link
            href="/dashboard/competitor"
            className="flex items-center gap-2 text-sm text-zinc-200 hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            Competitor Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-zinc-200 hover:text-white"
          >
            <Wand2 className="h-4 w-4" />
            Content Builder
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-zinc-200 hover:text-white"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-zinc-700" />
      </div>
    </header>
  )
}

