'use client'

import { BarChart3, Settings, Users, MessageSquare, Calendar, Hash, LayoutGrid, PlusCircle, 
  Instagram, Twitter, Facebook, Youtube, TrendingUp, FileText, Bell } from 'lucide-react'
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from '@/components/ui/sidebar'

const mainNavItems = [
  { icon: LayoutGrid, label: 'Dashboard', to: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', to: '/dashboard/analytics' },
  { icon: MessageSquare, label: 'Posts', to: '/dashboard/posts' },
  { icon: Calendar, label: 'Content', to: '/dashboard/content' },
  { icon: Hash, label: 'Manager', to: '/dashboard/hashtags' },
  { icon: TrendingUp, label: 'Performance', to: '/dashboard/performance' },
  { icon: Users, label: 'Audience', to: '/dashboard/audience' },
  { icon: Bell, label: 'Competitor', to: '/dashboard/competitor' },
  { icon: FileText, label: 'Reports', to: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
];

const socialAccounts = [
  { icon: Instagram, label: 'Instagram', href: '/accounts/instagram' },
  { icon: Twitter, label: 'Twitter', href: '/accounts/twitter' },
  { icon: Facebook, label: 'Facebook', href: '/accounts/facebook' },
  { icon: Youtube, label: 'YouTube', href: '/accounts/youtube' },
];

export default function DashboardSidebar() {
  return (
    <Sidebar className="border-r border-zinc-800">
      <SidebarHeader className="border-b border-zinc-800 p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500"></div>
          <span className="text-lg font-bold text-white">BrandBoost.ai</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-zinc-500">Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild className="flex items-center space-x-3 text-zinc-300 hover:text-white hover:bg-zinc-800">
                    <a href={item.to}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-zinc-500">Connected Accounts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {socialAccounts.map((account) => (
                <SidebarMenuItem key={account.href}>
                  <SidebarMenuButton asChild className="flex items-center space-x-3 text-zinc-300 hover:text-white hover:bg-zinc-800">
                    <a href={account.href}>
                      <account.icon className="h-4 w-4" />
                      <span>{account.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="flex items-center space-x-3 text-zinc-500 hover:text-white hover:bg-zinc-800">
                  <a href="/accounts/add">
                    <PlusCircle className="h-4 w-4" />
                    <span>Add Account</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

