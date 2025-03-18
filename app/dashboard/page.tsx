"use client";

import React from "react";
import { Karla } from "next/font/google";
import NavHeader from "./components/navHeaderNew";
import PageChat from "./components/pageChat";
import Graph from "./components/graph";
import OverviewCard from "./components/overviewCard"; // Social Media Tabs
import MetricSection from "./components/metricSection"; // 5 Metric Cards
import OverviewHeader from "./components/overviewHeader";
import RecentPosts from "./components/recentPosts";

const karla = Karla({ subsets: ["latin"] });

export default function OverviewPage() {
    return (
        <div
            className={`flex flex-col min-h-screen ${karla.className} font-medium`}
            style={{
                backgroundImage: "url('/Background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed"
            }}
        >
            {/* Top Navigation Bar */}
            <NavHeader />

            {/* Main Dashboard Layout */}
            <div className="relative bg-[rgba(255,255,255,0.08)] backdrop-blur-lg flex flex-row w-full grow">

                {/* Sidebar (Page Chat) */}
                <div className="w-1/4 max-w-[320px] h-auto p-4">
                    <PageChat />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col w-3/4 h-auto p-6">
                    
                    {/* Overview Title */}
                    <OverviewHeader />

                    {/* OverviewCard (Social Media Tabs) */}
                    <div className="absolute top-20 right-28 w-auto justify-right w-auto mb-0">
                        <OverviewCard activeTab="All" handleTabClick={() => {}} />
                    </div>

                    {/* Metric Section - 5 Cards in a Row */}
                    <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 gap-4 mt-0">
                        <MetricSection />
                    </div>


                    {/* Graph & Post Performance Section */}
                    <div className="flex flex-row gap-6 mt-2">
                        
                        {/* Graph Section (Already Wrapped in a Card) */}
                        <Graph />

                        {/* Recent Posts */}
                        <div className="w-1/3 h-auto p-4 bg-[rgba(255,255,255,0.08)] backdrop-blur-lg rounded-xl">
                            <RecentPosts posts={[]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
