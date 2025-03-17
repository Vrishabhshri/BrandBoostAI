"use client"

import { useRef, useState, useEffect } from 'react'
import { RefreshCw, Space } from 'lucide-react'
import { NavHeader } from "../components/navHeader"
import { CompetitorCard } from "../components/competitor-card"
import { AddCompetitorButton } from "../components/add-competitor-button"
import { Chat } from "../components/chat"
import Image from 'next/image';
import { Flame, LayoutDashboard, Settings, Wand2, ArrowLeft, BookUser, Castle, RotateCw } from 'lucide-react'
import './styles.css';
import { Karla } from 'next/font/google'

const karla = Karla({ subsets: ['latin'] })

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
  const [messages, setMessages] = useState([
    { response: "Welcome! Add competitors to your dashboard to get started. You can also brainstorm potential competitors in the chat. ", sender: "bot"},
  ]);
  const [input, setInput] = useState("");
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const chatRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("target");

  const brandWords = ["spring", "floral", "pizza", "garden", "collab"]
  const commentWords = ["DEI", "Costco", "shop", "collab", "love"]
  const socialMediaMetrics = {

    target: {"followers": "6.1M", "engagements": "1.5M"},
    facebook: {"followers": "5.3M", "engagements": "770K"},
    instagram: {"followers": "2.7M", "engagements": "650K"},
    tiktok: {"followers": "3.9M", "engagements": "3.5M"},
    twitter: {"followers": "4.3M", "engagements": "2.5M"}
  
  }

  useEffect(() => {
    // Auto-scroll to bottom when messages update
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const changeTab = (tab: string) => {

    setActiveTab(tab);

  }

  const refreshDate = () => {

    setLastRefresh(new Date());

  }

  const handleSendMessage = () => {
    if (!input.trim()) return;

    console.log("hello");

    setMessages([...messages, { response: input, sender: "user" }]);
    setInput("");
  };

  const handleLoadCompetitor = (competitor: CompanyData) => {
    setCompetitors((prev) => [...prev, competitor])
  }

  return (
    <div className={`flex min-h-screen flex-col bg-[#302f2f] overflow-x-hidden ${karla.className} font-medium`}>

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
        <div className='absolute inset-0 bg-[#302f2f] opacity-90'></div>

        {/* Container of main content */}
        <div className='relative z-10 flex flex-row'>

          {/* Chatbot */}
          <div className={`
                          flex flex-col
                          bg-[rgba(217,217,217,0.05)]
                          w-[40%] h-[calc(100vh-68px)]
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
              style={{ whiteSpace: 'pre-line' }}
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
            <div className="relative border border-white mt-7 flex items-center gap-2 p-2 rounded-[1.5rem]">
              <div className="absolute top-[-10px] left-1/4 transform -translate-x-1/2 bg-[#302f2f] px-2 text-white text-sm">
                Ask a question
              </div>
              <input
                type="text"
                placeholder="Reply"
                className="flex-1 p-2 bg-transparent text-white border-none outline-none placeholder-gray-400 italic"
              />
              <div className='bg-white rounded-full p-2 cursor-pointer' onClick={handleSendMessage}>
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

              <div className='flex flex-row gap-12 mb-5'>

                {/* Title div */}
                <div className='w-[50%] flex flex-col'>

                  <span className='text-white text-[2.5rem]'>Competitor Dashboard</span>

                  <div className='flex flex-row items-center gap-2'>
                    <RotateCw className='w-4 h-4 text-white cursor-pointer transition-all duration-100 hover:scale-110' onClick={refreshDate}/>
                    <span className='text-[#ffffff]'>Last refreshed: {lastRefresh.toISOString()}</span>
                  </div>

                </div>

                {/* Add Competitor Button */}
                <div className='flex jusify-center items-center text-white px-[100px] py-10 rounded-[2rem]
                                border border-white border-dashed cursor-pointer'>

                  <span>Add Competitor</span>

                </div>

              </div>

              <div className='w-full h-[74%] overflow-y-auto'>

                {/* Competitor temp page */}
                <div className='rounded-[1.5rem] w-2/5 h-[80%] overflow-hidden border-2 border-[#ffffff19] bg-[#ffffff19]'>

                  {/* Competitor navbar */}
                  <div className='w-full h-[12%] flex justify-center items-center'>

                    <div className={`cursor-pointer text-white h-full flex justify-center items-center w-1/3
                                    border-r-2 border-[#ffffff19] hover:bg-[#ffffff33]
                                    ${activeTab === "target" ? "bg-[#ffffff33]" : "bg-[#ffffff01]"}`}
                                    onClick={() => changeTab("target")}>

                      Target

                    </div>

                    <div className={`cursor-pointer text-white h-full flex justify-center items-center w-[14.285714%]
                                    border-r-2 border-[#ffffff19] hover:bg-[#ffffff33]
                                    ${activeTab === "facebook" ? "bg-[#ffffff33]" : "bg-[#ffffff01]"}`}
                                    onClick={() => changeTab("facebook")}>

                      <Image
                        src={'/assets/icons/Facebook-f.svg'}
                        alt='Facebook icon'
                        width={20}
                        height={20}
                      />

                    </div>

                    <div className={`cursor-pointer text-white h-full flex justify-center items-center w-[14.285714%]
                                    border-r-2 border-[#ffffff19] hover:bg-[#ffffff33]
                                    ${activeTab === "instagram" ? "bg-[#ffffff33]" : "bg-[#ffffff01]"}`}
                                    onClick={() => changeTab("instagram")}>

                      <Image
                        src={'/assets/icons/instagram.svg'}
                        alt='Instagram icon'
                        width={20}
                        height={20}
                      />

                    </div>

                    <div className={`cursor-pointer text-white h-full flex justify-center items-center w-[14.285714%]
                                    border-r-2 border-[#ffffff19] hover:bg-[#ffffff33]
                                    ${activeTab === "tiktok" ? "bg-[#ffffff33]" : "bg-[#ffffff01]"}`}
                                    onClick={() => changeTab("tiktok")}>

                      <Image
                        src={'/assets/icons/tiktok.png'}
                        alt='Tiktok icon'
                        width={20}
                        height={20}
                      />

                    </div>

                    <div className={`cursor-pointer text-white h-full flex justify-center items-center w-[14.285714%]
                                    border-r-2 border-[#ffffff19] hover:bg-[#ffffff33]
                                    ${activeTab === "twitter" ? "bg-[#ffffff33]" : "bg-[#ffffff01]"}`}
                                    onClick={() => changeTab("twitter")}>

                      <Image
                        src={'/assets/icons/twitter.svg'}
                        alt='Twitter icon'
                        width={20}
                        height={20}
                        className='fill-white'
                      />

                    </div>

                    <div className='cursor-pointer text-white bg-[#ffffff01] h-full flex justify-center items-center w-[14.285714%]
                                    hover:bg-[#ffffff10]'>

                      ...

                    </div>

                  </div>

                  {/* Comptetitor Info */}
                  <div className='w-full h-full rounded-[1.5rem] overflow-hidden bg-[#ffffff33] px-8'>

                    {/* Numbers */}
                    <div className='w-full h-[23%] text-white flex flex-row gap-10 items-center font-light'>

                      {/* Followers */}
                      <div className='flex flex-col'>

                        {/* Number */}
                        <span className='text-3xl'>{socialMediaMetrics[activeTab]["followers"]}</span>
                        {/* Title */}
                        <span className='text-sm'>Followers</span>

                      </div>
                      {/* Engagements */}
                      <div className='flex flex-col'>

                        {/* Number */}
                        <span className='text-3xl'>{socialMediaMetrics[activeTab]["engagements"]}</span>
                        {/* Title */}
                        <span className='text-sm'>Engagements</span>

                      </div>

                    </div>

                    {/* Posting words */}
                    <div className='w-full h-[33%] text-white'>

                      <span>Brand has been posting...</span>

                      {/* Words */}
                      <div className='flex flex-wrap gap-2 mt-2'>

                        {brandWords.map((word, index) => (

                          <div key={index} className='bg-[#ffffff26] rounded-full px-3 py-1 text-[1rem] transition-all 
                                        duration-200 hover:scale-105 hover:bg-[#ffffff40] cursor-pointer'>
                            {word}
                          </div>

                        ))}

                      </div>

                    </div>

                    {/* Commenting words */}
                    <div className='w-full h-[33%] text-white'>

                      <span>Users are commenting...</span>

                      {/* Words */}
                      <div className='flex flex-wrap gap-2 mt-2'>

                        {commentWords.map((word, index) => (

                          <div key={index} className='bg-[#ffffff26] rounded-full px-3 py-1 text-[1rem] transition-all 
                                        duration-200 hover:scale-105 hover:bg-[#ffffff40] cursor-pointer'>
                            {word}
                          </div>

                        ))}

                      </div>

                    </div>

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

