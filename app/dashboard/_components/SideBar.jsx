'use client'

import { useState, useEffect } from 'react'
import { BarChart3, LayoutGrid, Bell, Instagram, Twitter, Facebook, Youtube, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

// Mock function to fetch connected accounts (Replace this with an API call)
const fetchConnectedAccounts = async () => {
  return ['Instagram', 'Twitter'] // Example: User is logged into Instagram and Twitter
}

/**
 * Renders the dashboard sidebar for the dashboard interface.
 *
 * The component displays main navigation links alongside connected social media accounts.
 * When mounted, it asynchronously fetches the list of connected accounts using a mock fetch
 * function and filters the social accounts to only display those that are connected.
 * An "Add Account" option is always available to allow users to connect new accounts.
 */
export default function DashboardSidebar() {
  const pathname = usePathname()
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([])

  useEffect(() => {
    const getConnectedAccounts = async () => {
      const accounts = await fetchConnectedAccounts()
      setConnectedAccounts(accounts)
    }
    getConnectedAccounts()
  }, [])

  const mainNavItems = [
    { icon: LayoutGrid, label: 'Dashboard', to: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', to: '/dashboard/pages/analytics' },
    { icon: Bell, label: 'Competitor', to: '/dashboard/pages/competitor-dashboard' },
  ]

  const socialAccounts = [
    { icon: Instagram, label: 'Instagram', href: '/accounts/instagram' },
    { icon: Twitter, label: 'Twitter', href: '/accounts/twitter' },
    { icon: Facebook, label: 'Facebook', href: '/accounts/facebook' },
    { icon: Youtube, label: 'YouTube', href: '/accounts/youtube' },
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
    <aside className="fixed left-0 top-0 z-30 flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="text-lg font-semibold">BrandBoost.ai</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="flex flex-col gap-y-4">
          <div className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-muted-foreground">Main Navigation</h2>
            {mainNavItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </div>

          <div className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-muted-foreground">Connected Accounts</h2>
            {socialAccounts
              .filter((account) => connectedAccounts.includes(account.label))
              .map((account) => (
                <Link
                  key={account.href}
                  href={account.href}
                  className="flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-secondary/80"
                >
                  <account.icon className="h-4 w-4" />
                  <span>{account.label}</span>
                </Link>
              ))}
            <Link
              href="/accounts/add"
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
