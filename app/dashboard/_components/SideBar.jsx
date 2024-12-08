'use client'

import { BarChart3, Settings, Users, MessageSquare, Calendar, Hash, LayoutGrid, PlusCircle, 
  Instagram, Twitter, Facebook, Youtube, TrendingUp, FileText, Bell } from 'lucide-react'
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from '@/components/ui/sidebar'

export default function DashboardSidebar() {
  //link the href to the pages      : Done.
  const mainNavItems = [
    { icon: LayoutGrid, label: 'Dashboard', to: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', to: '/dashboard/pages/analytics' },
    { icon: MessageSquare, label: 'Posts', to: '/dashboard/pages/posts' },
    { icon: Calendar, label: 'Content', to: '/dashboard/pages/calendar' },
    { icon: Hash, label: 'Manager', to: '/dashboard/pages/hashtags' },
    { icon: TrendingUp, label: 'Performance', to: '/dashboard/pages/performance' },
    { icon: Users, label: 'Audience', to: '/dashboard/pages/audience' },
    { icon: Bell, label: 'Competitor', to: '/dashboard/pages/competitor-dashboard' },
    { icon: FileText, label: 'haris', to: '/dashboard/pages/haris-dashboard' },
    { icon: Settings, label: 'Settings', to: '/dashboard/pages/settings' },
  ];
    const socialAccounts = [
    { icon: Instagram, label: 'Instagram', href: '/accounts/instagram' },
    { icon: Twitter, label: 'Twitter', href: '/accounts/twitter' },
    { icon: Facebook, label: 'Facebook', href: '/accounts/facebook' },
    { icon: Youtube, label: 'YouTube', href: '/accounts/youtube' },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary"></div>
          <span className="text-lg font-bold">BrandBoost.ai</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild className="flex items-center space-x-3">
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

        <SidebarGroup>
          <SidebarGroupLabel>Connected Accounts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {socialAccounts.map((account) => (
                <SidebarMenuItem key={account.href}>
                  <SidebarMenuButton asChild className="flex items-center space-x-3">
                    <a href={account.href}>
                      <account.icon className="h-4 w-4" />
                      <span>{account.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="flex items-center space-x-3 text-muted-foreground">
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