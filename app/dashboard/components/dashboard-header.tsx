'use client'

import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger, 
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/75">
      <div className="container flex h-16 items-center">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search posts, hashtags, or mentions..."
                className="pl-8 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 w-full md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-zinc-300 hover:text-white">
                <Bell className="h-4 w-4" />
                <Badge variant="destructive" className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px] bg-zinc-900 border-zinc-800">
              <DropdownMenuLabel className="text-zinc-300">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">New follower on Instagram</DropdownMenuItem>
              <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">Post reached 1k likes</DropdownMenuItem>
              <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">Trending hashtag alert</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
              <DropdownMenuLabel className="text-zinc-300">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">Billing</DropdownMenuItem>
              <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">Team</DropdownMenuItem>
              <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">Subscription</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

