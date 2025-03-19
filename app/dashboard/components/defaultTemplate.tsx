"use client";

import NavHeader from "./navHeaderNew";
import PageChat from "../components/pageChat";
import { Karla } from "next/font/google";
import Graph from "../components/graph";
import OverviewCard from "../components/overviewCard"; // Social Media Tabs
import MetricSection from "../components/metricSection"; // 5 Metric Cards
import OverviewHeader from "../components/overviewHeader";
import RecentPosts from "../components/recentPosts";
import "./styles.css";
import { useState } from "react";

const karla = Karla({ subsets: ["latin"] });

export default function DefaultTemplate() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div
      className={`flex min-h-screen flex-col bg-[#302f2f] overflow-x-hidden ${karla.className} font-medium`}
    >
      {/* Navigation Header */}
      <NavHeader />

      {/* Main Content */}
      <div className="relative bg-[url('/Background.png')] bg-cover bg-center flex flex-row">
        {/* Overlay Gray */}
        <div className="absolute inset-0 bg-[#302f2f] opacity-90"></div>

        {/* Page Layout Container */}
        <div className="relative z-10 flex flex-row h-[calc(100vh-68px)] w-screen">
          {/* Page Chat (Side Panel) */}
          <PageChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

          {/* Page Content */}
          <div className="w-full h-full p-7 flex-grow overflow-y-auto custom-scrollbar">
            {/* Header & Social Media Tabs */}
            <div className="flex flex-row justify-between">
              <OverviewHeader />
              <div className="flex flex-col w-auto items-center mb-0">
                <OverviewCard activeTab={activeTab} handleTabClick={setActiveTab} />
              </div>
            </div>

            {/* Metric Section - Adjusts Based on Chat Open State */}
            <div className={`flex ${isChatOpen ? "grid grid-cols-3 grid-rows-2 gap-4" : "flex-row justify-between"} mt-6`}>
              <MetricSection isChatOpen={isChatOpen} />
            </div>

            {/* Graph & Post Performance Section */}
            <div className="flex flex-row gap-6 mt-4">
              <Graph isChatOpen={isChatOpen} />
              <div className="w-1/3 h-auto p-4 bg-[rgba(255,255,255,0.08)] backdrop-blur-lg rounded-xl">
                <RecentPosts posts={[]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
