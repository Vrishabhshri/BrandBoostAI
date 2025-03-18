"use client"

import NavHeader from "./components/navHeaderNew";
import PageChat from "./components/pageChat"
import { Karla } from 'next/font/google'
import Graph from "./components/graph";
import OverviewCard from "./components/overviewCard"; // Social Media Tabs
import MetricSection from "./components/metricSection"; // 5 Metric Cards
import OverviewHeader from "./components/overviewHeader";
import RecentPosts from "./components/recentPosts";
import './styles.css';
import { useState } from 'react';

const karla = Karla({ subsets: ['latin'] })

export default function OverviewPage() {
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

                <div className="flex flex-row justify-between">

                    {/* Overview Title */}
                    <OverviewHeader />

                    {/* OverviewCard (Social Media Tabs) */}
                    <div className="flex flex-col w-auto items-center mb-0">
                        <OverviewCard activeTab="All" handleTabClick={() => {}} />
                    </div>

                </div>

                {/* Metric Section - 5 Cards in a Row */}
                  <MetricSection isChatOpen={isChatOpen} />

                {/* Graph & Post Performance Section */}
                <div className="flex flex-row gap-4 mt-4">
                    
                    {/* Graph Section (Already Wrapped in a Card) */}
                    <Graph isChatOpen={isChatOpen} />

                    {/* Recent Posts */}
                    <div className="w-1/3 h-auto p-4 bg-[rgba(255,255,255,0.08)] backdrop-blur-lg rounded-xl">
                        <RecentPosts posts={[]} />
                    </div>
                </div>

          </div>

        </div>

      </div>

      
    </div>
  )
}

