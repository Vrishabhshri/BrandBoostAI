"use client"

import NavHeader from "./components/navHeaderNew";
import PageChat from "./components/pageChat"
import { Karla } from 'next/font/google'
import Graph from "./components/graph";
import OverviewCard from "./components/overviewCard";
import MetricSection from "./components/metricSection";
import OverviewHeader from "./components/overviewHeader";
import RecentPosts from "./components/recentPosts";
import './styles.css';
import { useState, useEffect } from 'react';

const karla = Karla({ subsets: ['latin'] })

// Define metrics for each tab
const tabMetrics = {
  All: [
    { title: "Total Followers", value: "40.4M", change: 20.1 },
    { title: "Total Engagements", value: "15M", change: 12.3 },
    { title: "Total Impressions", value: "2,015M", change: 10.5 },
    { title: "Total Reach", value: "714.5M", change: 10.5 },
    { title: "Total Mentions", value: "1M", change: -8.2 },
  ],
  facebook: [
    { title: "Facebook Followers", value: "15.2M", change: 8.1 },
    { title: "Facebook Engagements", value: "5.2M", change: 12.3 },
    { title: "Facebook Impressions", value: "850M", change: 15.5 },
    { title: "Facebook Reach", value: "320M", change: 12.5 },
    { title: "Facebook Mentions", value: "450K", change: -5.2 },
  ],
  instagram: [
    { title: "Instagram Followers", value: "12.8M", change: 15.1 },
    { title: "Instagram Engagements", value: "4.8M", change: 18.3 },
    { title: "Instagram Impressions", value: "720M", change: 12.5 },
    { title: "Instagram Reach", value: "250M", change: 14.5 },
    { title: "Instagram Mentions", value: "320K", change: -3.2 },
  ],
  tiktok: [
    { title: "TikTok Followers", value: "8.4M", change: 25.1 },
    { title: "TikTok Engagements", value: "3.2M", change: 22.3 },
    { title: "TikTok Impressions", value: "320M", change: 18.5 },
    { title: "TikTok Reach", value: "120M", change: 16.5 },
    { title: "TikTok Mentions", value: "180K", change: -2.2 },
  ],
  twitter: [
    { title: "Twitter Followers", value: "4M", change: 5.1 },
    { title: "Twitter Engagements", value: "1.8M", change: 8.3 },
    { title: "Twitter Impressions", value: "125M", change: 6.5 },
    { title: "Twitter Reach", value: "24.5M", change: 4.5 },
    { title: "Twitter Mentions", value: "50K", change: -12.2 },
  ],
};

// Sample posts data
const samplePosts = [
  {
    id: 1,
    platform: "Instagram",
    content: "Check out our latest collection! #NewArrivals",
    engagement: "12.5K",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    platform: "Facebook",
    content: "Join us for our summer sale! 🎉",
    engagement: "8.2K",
    timestamp: "4 hours ago"
  },
  {
    id: 3,
    platform: "TikTok",
    content: "Behind the scenes of our new campaign",
    engagement: "25.3K",
    timestamp: "6 hours ago"
  },
  {
    id: 4,
    platform: "Twitter",
    content: "Customer spotlight: @user123's amazing story",
    engagement: "3.8K",
    timestamp: "8 hours ago"
  }
];

export default function OverviewPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [posts, setPosts] = useState(samplePosts);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Filter posts based on selected tab
    if (tab === "All") {
      setPosts(samplePosts);
    } else {
      setPosts(samplePosts.filter(post => post.platform.toLowerCase() === tab));
    }
  };

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
            <div className="flex flex-row justify-between">
              {/* Overview Title */}
              <OverviewHeader />

              {/* OverviewCard (Social Media Tabs) */}
              <div className="flex flex-col w-auto items-center mb-0">
                <OverviewCard activeTab={activeTab} handleTabClick={handleTabChange} />
              </div>
            </div>

            {/* Metric Section - 5 Cards in a Row */}
            <div className="flex">
              <MetricSection isChatOpen={isChatOpen} metrics={tabMetrics[activeTab as keyof typeof tabMetrics]} />
            </div>

            {/* Graph & Post Performance Section */}
            <div className="flex flex-row gap-6 mt-4">
              {/* Graph Section */}
              <Graph isChatOpen={isChatOpen} />

              {/* Recent Posts */}
              <div className="w-1/3 h-auto p-4 bg-[rgba(255,255,255,0.08)] backdrop-blur-lg rounded-xl">
                <RecentPosts posts={posts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

