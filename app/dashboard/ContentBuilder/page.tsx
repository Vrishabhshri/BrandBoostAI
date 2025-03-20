"use client"

import NavHeader from "../components/navHeaderNew";
import PageChat from "../components/pageChat";
import { Karla } from 'next/font/google';
import { AddCompetitorForm } from "../components/add-competitor-form";
import '../styles.css';
import { useState } from 'react';

const karla = Karla({ subsets: ['latin'] });

export default function ContentBuilder() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className={`flex min-h-screen flex-col bg-[#302f2f] overflow-x-hidden ${karla.className} font-medium`}>
      {/* Nav container */}
      <NavHeader/>

      {/* Main Content */}
      <div className={`relative bg-[Background.png] flex flex-row`}>
        {/* Overlay Gray */}
        <div className='absolute inset-0 bg-[#302f2f] opacity-90'></div>

        {/* Container of main content */}
        <div className='relative z-10 flex flex-row h-[calc(100vh-68px)] w-screen'>
          <PageChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

          {/* Page Content */}
          <div className='w-full h-full p-7 flex-grow overflow-y-auto custom-scrollbar'>
            {/* Header Section */}
            <div className="flex flex-row justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-white">
                  Content Builder
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Create and manage your social media content
                </p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-[#ffffff19] backdrop-blur-lg rounded-xl p-6">
              <AddCompetitorForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

