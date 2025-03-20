"use client"

import { useState } from 'react'
import { Chat } from './components/chat'
import { SidebarControls } from './components/sidebar-controls'
// import DashboardSidebar from "./_components/_SideBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDashboardOpen, setIsDashboardOpen] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleToggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen)
    if (!isDashboardOpen) {
      setIsChatOpen(false)
    }
  }

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen)
    if (!isChatOpen) {
      setIsDashboardOpen(false)
    }
  }

  const handleClose = () => {
    setIsDashboardOpen(false)
    setIsChatOpen(false)
  }

  return (
    <div className="relative min-h-screen">
      {/* Main content */}
      <main className={`transition-all duration-300 ease-in-out ${
        isDashboardOpen || isChatOpen ? 'lg:ml-64' : ''
      }`}>
        {children}
      </main>

      {/* Dashboard Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 transition-transform duration-300 ease-in-out ${
        isDashboardOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* <DashboardSidebar /> */}
      </div>

      {/* Chat Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 transition-transform duration-300 ease-in-out ${
        isChatOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Chat />
      </div>

      {/* Sidebar Controls */}
      <SidebarControls
        onToggleDashboard={handleToggleDashboard}
        onToggleChat={handleToggleChat}
        onClose={handleClose}
        isDashboardOpen={isDashboardOpen}
        isChatOpen={isChatOpen}
      />
    </div>
  )
} 
