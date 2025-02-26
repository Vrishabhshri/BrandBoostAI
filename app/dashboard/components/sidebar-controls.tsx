"use client"

import { useState } from 'react'
import { PanelLeftIcon, MessageCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface SidebarControlsProps {
  onToggleDashboard: () => void
  onToggleChat: () => void
  onClose: () => void
  isDashboardOpen: boolean
  isChatOpen: boolean
}

export const SidebarControls = ({
  onToggleDashboard,
  onToggleChat,
  onClose,
  isDashboardOpen,
  isChatOpen
}: SidebarControlsProps) => {
  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      {!isDashboardOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-zinc-800 hover:bg-zinc-700"
          onClick={onToggleDashboard}
          aria-label="Toggle Dashboard Sidebar"
        >
          <PanelLeftIcon className="h-4 w-4 text-zinc-400" />
        </Button>
      )}
      {!isChatOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-zinc-800 hover:bg-zinc-700"
          onClick={onToggleChat}
          aria-label="Toggle Chat Sidebar"
        >
          <MessageCircle className="h-4 w-4 text-zinc-400" />
        </Button>
      )}
      {(isDashboardOpen || isChatOpen) && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-zinc-800 hover:bg-zinc-700"
          onClick={onClose}
          aria-label="Close Sidebar"
        >
          <X className="h-4 w-4 text-zinc-400" />
        </Button>
      )}
    </div>
  )
} 