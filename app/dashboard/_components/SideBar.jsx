'use client'
import {
  BarChart3, Settings, Users, MessageSquare, Calendar, Hash, LayoutGrid, PlusCircle,
  Instagram, Twitter, Facebook, Youtube, TrendingUp, FileText, Bell
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState, useEffect } from 'react' // Import useState & useEffect

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true) // Define isLoading state
  const [socialAccounts, setSocialAccounts] = useState([])

  // Simulate fetching connected accounts (replace with real API call)
  useEffect(() => {
    setTimeout(() => {
      setSocialAccounts([
        { icon: Instagram, label: 'Instagram', href: '/accounts/instagram' },
        { icon: Twitter, label: 'Twitter', href: '/accounts/twitter' },
        { icon: Facebook, label: 'Facebook', href: '/accounts/facebook' },
        { icon: Youtube, label: 'YouTube', href: '/accounts/youtube' }
      ])
      setIsLoading(false)
    }, 2000) // Simulate a delay
  }, [])

  const mainNavItems = [
    { icon: LayoutGrid, label: 'Dashboard', to: '/dashboard' },
    { icon: TrendingUp, label: 'Subscription', to: '/dashboard/pages/subscription' },
    { icon: Bell, label: 'Competitor', to: '/dashboard/pages/competitor-dashboard' },
  ]

  const NavItem = ({ icon: Icon, label, to }) => {
    const isActive = pathname === to

    return (
      <Link
        href={to}
        className={cn(
          'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg transition-colors',
          'hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-2',
          isActive && 'bg-secondary text-primary font-medium'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>
    )
  }

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-full w-64 flex-col border-r bg-gray-300">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-x-2">
        <div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="./assets/icons/userAlt.svg" alt="Profile" />
            
            <AvatarFallback></AvatarFallback>
          </Avatar>
          
          </div>
          <span className="text-lg font-semibold">BrandBoostr-AI</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="flex flex-col gap-y-4">
          <div className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-muted-foreground">
              Main Navigation
            </h2>
            {mainNavItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </div>

          <div className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-muted-foreground">
              Connected Accounts
            </h2>
            {isLoading ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">Loading accounts...</div>
            ) : socialAccounts.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">No connected accounts</div>
            ) : (
              socialAccounts.map((account) => (
                <Link
                  key={account.href}
                  href={account.href}
                  className="flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-secondary/80"
                >
                  <account.icon className="h-4 w-4" />
                  <span>{account.label}</span>
                </Link>
              ))
            )}
            <Link
              href="dashboard/Login"
              className="flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-secondary/80 text-muted-foreground"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Account</span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  )
}
