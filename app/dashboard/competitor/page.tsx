"use client"

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { NavHeader } from "../components/navHeader"
import { CompetitorCard } from "../components/competitor-card"
import { AddCompetitorButton } from "../components/add-competitor-button"
import { Chat } from "../components/chat"
import Image from 'next/image';
import { Flame, LayoutDashboard, Settings, Wand2, ArrowLeft, BookUser, Castle } from 'lucide-react'

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
    <div className="flex min-h-screen flex-col bg-[#302f2f] overflow-x-hidden font-karla">

      {/* Nav container */}
      <div className={`flex flex-row justify-start items-center
                        padding-0
                        backdrop-blur-2xl shadow-2xl
                        bg-[#d9d9d940]
                        text-white`}>

        {/* Flame icon */}
        <Image 
          src="/assets/icons/flame.svg" 
          className="m-3"
          alt='flame image'
          width={30}
          height={30}
        />

        {/* Nav categories */}
        <div className={`
                        flex flex-row items-center
                        h-10 ml-10 gap-4
                        `}>

          {/* Overview Link */}
          <div className={`
                          text-[15px]
                          flex flex-row items-center justify-center
                          hover:text-[#ffffff80]
                          cursor-pointer`}>

            <BookUser className="h-4 w-6" />
            <span className='mr-1'>Overview</span>

          </div>

          {/* Competitor Dashboard Link */}
          <div className={`
                          text-[15px]
                          flex flex-row items-center justify-center
                          hover:text-[#ffffff80]
                          cursor-pointer`}>

            <Castle className="h-4 w-6" />
            <span className='mr-1'>Competitor Dashboard</span>

          </div>

          {/* Content Builder Link */}
          <div className={`
                          text-[15px]
                          flex flex-row items-center justify-center
                          hover:text-[#ffffff80]
                          cursor-pointer`}>

            <Wand2 className="h-4 w-6" />
            <span className='mr-1'>Content Builder</span>

          </div>

          {/* Settings Link */}
          <div className={`
                          text-[15px]
                          flex flex-row items-center justify-center
                          hover:text-[#ffffff80]
                          cursor-pointer`}>

            <Settings className="h-4 w-6" />
            <span className='mr-1'>Settings</span>

          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className={`
                      flex flex-row`}>

        {/* Chatbot */}
        <div className={`border border-red-900
                        flex flex-col
                        bg-[rgba(217,217,217,0.05)]
                        w-1/3 h-[calc(100vh-68px)]
                        p-7`}>

          {/* Chatbot title */}
          <div className='flex flex-row gap-4'>
            <Wand2 className="h-6 w-6"/> 
            <span className='text-[20px]'>Page Chat</span>
          </div>

        </div>

      </div>

      {/* <NavHeader />
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
      </div> */}
    </div>
  )
}

