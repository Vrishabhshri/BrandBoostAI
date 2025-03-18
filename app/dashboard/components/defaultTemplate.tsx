"use client"

import NavHeader from "../components/navHeaderNew";
import PageChat from "../components/pageChat"
import { Karla } from 'next/font/google'
import { useState } from 'react';

const karla = Karla({ subsets: ['latin'] })

export default function CompetitorDashboardPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className={`flex min-h-screen flex-col bg-[#302f2f] overflow-x-hidden ${karla.className} font-medium`}>

      {/* Nav container */}
      <NavHeader/>

      {/* Main Content */}
      <div className={`relative bg-radial-gradient
                      flex flex-row`}>

        {/* Overlay Gray */}
        <div className='absolute inset-0 bg-[#302f2f] opacity-90'></div>

        {/* Container of main content */}
        <div className='relative z-10 flex flex-row h-[calc(100vh-68px)] w-screen'>

          <PageChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

          {/* Page Content */}
          <div className='w-full h-full p-7 flex-grow overflow-y-auto custom-scrollbar'>

              

          </div>

        </div>

      </div>

      
    </div>
  )
}

