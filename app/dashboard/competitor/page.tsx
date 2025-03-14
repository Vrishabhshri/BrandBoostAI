"use client"

import { useRef, useState, useEffect } from 'react'
import { RefreshCw, Space } from 'lucide-react'
import { NavHeader } from "../components/navHeader"
import { CompetitorCard } from "../components/competitor-card"
import { AddCompetitorButton } from "../components/add-competitor-button"
import { Chat } from "../components/chat"
import Image from 'next/image';
import { Flame, LayoutDashboard, Settings, Wand2, ArrowLeft, BookUser, Castle } from 'lucide-react'
import './styles.css';

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
  const [competitors, setCompetitors] = useState<CompanyData[]>([]);
  const [latestDate, setLatestDate] = useState("");
  const [messages, setMessages] = useState([
    { response: "Welcome! Add competitors to your dashboard to get started. You can also brainstorm potential competitors in the chat. ", sender: "bot"},
    { response: "Hi. I have a small business that sells handmade clothing. What are some potential competitors to  add to add?", sender: "user"},
    { response: `General Handmade/Artisan Clothing

	          •	Etsy Sellers: Independent artisans offering handmade clothing.
	          •	Big Cartel Stores: Small businesses that sell handmade clothing online.
	          •	Fashion Nova (for trendier designs): If your style aligns with fast fashion but handmade.

            Niche Handmade Clothing Companies

              •	Bohemian Styles:
              •	Free People
              •	Spell & The Gypsy Collective
              •	Minimalist & Sustainable:
              •	Everlane
              •	Pact
              •	Kotn
              •	Luxury Handmade:
              •	Christy Dawn
              •	Reformation
              •	Children’s Clothing:
              •	Hanna Andersson (sustainably made)
              •	Little Cotton Clothes

            Sustainable & Ethical Clothing

              •	Patagonia (ethical outdoor wear)
              •	Amour Vert
              •	People Tree

            Regional/Local Brands

            Look at handmade clothing brands or boutiques within your region that target a similar customer demographic.

            Platforms with Similar Offerings

              •	Zazzle
              •	Not On The High Street

            It’s also important to monitor small but growing brands within your niche that might not yet have wide recognition. Consider competitors who sell on platforms like Instagram or through local pop-up markets, as they can directly appeal to your target audience.

            If you can tell me more about your business’s style, target demographic, or key differentiators, I can refine this list further!`, sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages update
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

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

            <Image
              src={'/assets/icons/Book.svg'}
              alt='book user icon'
              width={15}
              height={15}
            />
            <span className='ml-1 mr-1'>Overview</span>

          </div>

          {/* Competitor Dashboard Link */}
          <div className={`
                          text-[15px]
                          flex flex-row items-center justify-center
                          hover:text-[#ffffff80]
                          cursor-pointer`}>

            <Image
              src={'/assets/icons/ChessRook.svg'}
              alt='chess rook icon'
              width={15}
              height={15}
            />
            <span className='ml-1 mr-1'>Competitor Dashboard</span>

          </div>

          {/* Content Builder Link */}
          <div className={`
                          text-[15px]
                          flex flex-row items-center justify-center
                          hover:text-[#ffffff80]
                          cursor-pointer`}>

            <Image
              src={'/assets/icons/Magic.svg'}
              alt='magic icon'
              width={15}
              height={15}
            />
            <span className='ml-1 mr-1'>Content Builder</span>

          </div>

          {/* Settings Link */}
          <div className={`
                          text-[15px]
                          flex flex-row items-center justify-center
                          hover:text-[#ffffff80]
                          cursor-pointer`}>

            <Image
              src={'/assets/icons/Cog.svg'}
              alt='settings icon'
              width={15}
              height={15}
            />
            <span className='ml-1 mr-1'>Settings</span>

          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className={`relative bg-radial-gradient
                      flex flex-row`}>

        {/* Overlay Gray */}
        <div className='absolute inset-0 bg-[#302f2f] opacity-95'></div>

        {/* Container of main content */}
        <div className='relative z-10 flex flex-row'>

          {/* Chatbot */}
          <div className={`
                          flex flex-col
                          bg-[rgba(217,217,217,0.05)]
                          w-1/3 h-[calc(100vh-68px)]
                          p-6`}>

            {/* Chatbot title */}
            <div className='flex flex-row gap-4 text-white'>
              <Wand2 className="h-6 w-6"/> 
              <span className='text-[20px]'>Page Chat</span>
            </div>

            {/* Messages Container */}
            <div
              ref={chatRef}
              className="overflow-y-auto mt-4 space-y-3 text-sm h-[560px] custom-scrollbar"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${ msg.sender === "bot" ? "text-white" : "text-[#ffffff80]" }`}
                >
                  {msg.response}
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="border border-white mt-7 flex items-center gap-2 p-2 rounded-[1.5rem]">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-2 bg-transparent text-white border-none outline-none placeholder-gray-400"
              />
              <div className='bg-white rounded-full p-2'>
                <Image
                  src={'/assets/icons/comment.svg'}
                  alt='Message icon'
                  width={20}
                  height={20}
                  className='invert-[70%] brightness-150'
                />
              </div>

            </div>

          </div>

          {/* Stats Pages */}
          <div className='w-full h-full p-7'>

              {/* Title div */}
              <div className='border border-blue-900 w-1/3 flex flex-col mb-5'>

                <span className='text-white text-[2.3rem]'>Competitor Dashboard</span>
                <span className='text-[#ffffff]'>Last refreshed: {latestDate}</span>

              </div>

              {/* Competitor temp page */}
              <div className='border borde-red-900 rounded-[3rem] w-2/5 h-3/5 overflow-hidden bg-[#ffffff19]'>

                {/* Competitor navbar */}
                <div className='border border-green-900 w-full h-1/6 flex justify-around items-center bg-[#ffffff33]'>

                  {/* Active Tab - Target */}
                  <div className="cursor-pointer text-white px-6 py-2 rounded-lg">
                    <span className="">Target</span>
                  </div>

                  {/* Inactive Tab 1 - Icon */}
                  <div className="cursor-pointer text-white px-5 py-2 rounded-lg">
                    <Image
                      src={'/assets/icons/Facebook-f.svg'}
                      alt='Facebook logo'
                      width={50}
                      height={60}
                    />
                  </div>

                  {/* Inactive Tab 2 - Icon */}
                  <div className="cursor-pointer text-white px-5 py-2 rounded-lg">
                    <span>Icon 2</span>
                  </div>

                  {/* Inactive Tab 3 - Icon */}
                  <div className="cursor-pointer text-white px-5 py-2 rounded-lg">
                    <span>Icon 3</span>
                  </div>

                  {/* Inactive Tab 4 - Icon */}
                  <div className="cursor-pointer text-white px-5 py-2 rounded-lg">
                    <span>Icon 4</span>
                  </div>

                </div>

              </div>

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

