"use client"

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import  NavHeader  from "./components/dashboard-header"
import { CompetitorCard } from "./components/competitor-card"
import { AddCompetitorButton } from "./components/add-competitor-button"
import { Chat } from "./components/chat"

interface CompanyData {
  name: string;
  instagram: {
    followers: number;
    increase_percentage: number;
    hashtags: string[];
    content: string;
  }[];
  facebook: {
    followers: number;
    increase_percentage: number;
    hashtags: string[];
    content: string;
  }[];
}

export default function CompetitorDashboardPage() {
  const [competitors, setCompetitors] = useState<CompanyData[]>([])

  const handleLoadCompetitor = (competitor: CompanyData) => {
    setCompetitors((prev) => [...prev, competitor])
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900">
      <NavHeader />
      <div className="flex flex-1">
        <aside className="w-[300px] border-r border-zinc-800 bg-zinc-900 flex flex-col">
          <Chat />
        </aside>
        
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">
              Competitor Dashboard
            </h1>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <RefreshCw className="h-4 w-4" />
              Last refreshed 11/11/2024 16:42PM CDT
            </div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <AddCompetitorButton onLoadCompetitor={handleLoadCompetitor} />
            {competitors.map((competitor, index) => (
              <CompetitorCard 
                key={index}
                name={competitor.name}
                instagram={competitor.instagram[0]}
                facebook={competitor.facebook[0]}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

