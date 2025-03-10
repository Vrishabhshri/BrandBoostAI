'use client'

import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import 
    { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, 
    } from '@/components/ui/dropdown-menu'

import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { UserButton } from '@clerk/nextjs'

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-5000 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-0 mb-0"> 
      <div className="container flex items-center justify-between h-16">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>

        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts, hashtags, or mentions..."
              className="pl-8 w-full md:w-[300px]"
            />
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge variant="destructive" className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0">3</Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New follower on Instagram</DropdownMenuItem>
                <DropdownMenuItem>Post reached 1k likes</DropdownMenuItem>
                <DropdownMenuItem>Trending hashtag alert</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="./assets/icons/userAlt.svg" alt="Profile" />
                    <AvatarFallback>BB</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Brand Settings</DropdownMenuItem>
                <DropdownMenuItem>Team Management</DropdownMenuItem>
                <DropdownMenuItem>Billing & Plans</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><UserButton/></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
