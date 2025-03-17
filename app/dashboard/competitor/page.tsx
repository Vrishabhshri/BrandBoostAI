"use client"

import { useRef, useState, useEffect } from 'react'
import NavHeader from "../components/navHeaderNew";
import PageChat from "../components/pageChat"
import Image from 'next/image';
import { RotateCw } from 'lucide-react'
import { Karla } from 'next/font/google'

const karla = Karla({ subsets: ['latin'] })

interface CompanyData {
  name: string;
  description: string;
  instagram: {
    followers: number;
    increase_percentage: number;
    hashtags: string[];
    content: string;
  };
  facebook: {
    followers: number;
    increase_percentage: number;
    hashtags: string[];
    content: string;
  };
}

export default function CompetitorDashboardPage() {
  const [competitors, setCompetitors] = useState<CompanyData[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
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

  const changeTab = (tab: string) => {

    setActiveTab(tab);

  }

  const refreshDate = () => {

    setLastRefresh(new Date());

  }

  const handleLoadCompetitor = (competitor: CompanyData) => {
    setCompetitors((prev) => [...prev, competitor])
  }

  // const handlePinCompany = (company: CompanyData) => {
  //   if (!pinnedCompanies.some(pinned => pinned.name === company.name)) {
  //     setPinnedCompanies((prev) => [...prev, company])
  //   }
  // }

  // const handleUnpinCompany = (company: CompanyData) => {
  //   setPinnedCompanies((prev) => prev.filter(pinned => pinned.name !== company.name))
  // }

  // const handleViewCompany = (company: CompanyData) => {
  //   setSelectedCompany(company); // Set the selected company to display its full card
  // }

  // const handleUnviewCompany = () => {
  //   setSelectedCompany(null); // Clear the selected company
  // }

  // Function to format the date
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options) + ' CDT';
  };

  useEffect(() => {
    const now = new Date();
    setLastRefresh(now);
  }, []);

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
        <div className='relative z-10 flex flex-row'>

          <PageChat/>

          {/* Page Content */}
          <div className='w-full h-full p-7 flex-grow'>

              <div className='flex flex-row gap-12 mb-5'>

                {/* Title div */}
                <div className='w-[400px] flex flex-col'>

                  <span className='text-white text-[2.5rem]'>Competitor Dashboard</span>

                  <div className='flex flex-row items-center gap-2'>
                    <RotateCw className='w-4 h-4 text-white cursor-pointer' onClick={refreshDate}/>
                    <span className='text-[#ffffff]'>Last refreshed: {lastRefresh.toISOString()}</span>
                  </div>

                </div>

                {/* Add Competitor Button */}
                <div className='flex jusify-center items-center text-white px-[100px] py-10 rounded-[2rem]
                                border border-white border-dashed cursor-pointer w-[300px]'>

                  <span>Add Competitor</span>

                </div>

              </div>

              <div className='w-full h-[74%] overflow-y-auto'>

                {/* Competitor temp page */}
                <div className='rounded-[1.5rem] w-[320px] h-[80%] overflow-hidden border-2 border-[#ffffff19] bg-[#ffffff19]'>

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
              Last refreshed {lastRefreshed}
            </div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <CompetitorAnalysis onPinCompany={handlePinCompany} />
          </div>

          Render pinned companies in a scrollable container
          <h2 className="text-lg font-semibold text-white mt-6">Pinned Companies</h2>
          <div className="max-h-[300px] overflow-y-auto flex flex-wrap justify-center items-start mt-4 border border-zinc-700 rounded-lg p-4 bg-zinc-800 shadow-md">
            {pinnedCompanies.map((company) => (
              <div
                key={company.name}
                className="m-2" // Add margin for spacing
              >
                <CompetitorCard 
                  {...company} 
                  onPin={() => handlePinCompany(company)} 
                  onUnpin={() => handleUnpinCompany(company)} // Pass the unpin function
                  onView={() => handleViewCompany(company)} // Pass the view function
                />
              </div>
            ))}
          </div>

          Display the selected pinned company card
          {selectedCompany && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white">Selected Company</h2>
              <CompetitorCard 
                {...selectedCompany} 
                onPin={() => handlePinCompany(selectedCompany)} 
                onUnpin={() => handleUnpinCompany(selectedCompany)} 
                onView={() => handleViewCompany(selectedCompany)} 
              />
              <Button 
                onClick={handleUnviewCompany} 
                className="mt-4 bg-red-500 text-white hover:bg-red-600"
              >
                Unview
              </Button>
            </div>
          )}
        </main>
      </div> */}
    </div>
  )
}

