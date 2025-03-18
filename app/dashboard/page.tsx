"use client";

import React from "react";
import { Karla } from "next/font/google";
import NavHeader from "./components/navHeaderNew";
import PageChat from "./components/pageChat";
import Graph from "./components/graph";
import OverviewCard from "./components/overviewCard";
import MetricSection from "./components/metricSection";
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
            {/* Nav container */}
            <NavHeader />

            {/* Main Content */}
            <div className="relative bg-boostrDark backdrop-blur-lg flex flex-row w-full grow">
                
                {/* Sidebar (Page Chat) */}
                <div className="w-1/4 max-w-[320px] h-auto p-4">
                    <PageChat />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col w-3/4 h-auto p-6">
                    {/* Overview Header */}
                    <OverviewHeader />

                    {/* Metrics Section */}
                    <div className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 mt-6">
                        <OverviewCard title="Total Engagements" value="15M" change="+12.3%" />
 
                    </div>

                    {/* Metric Section */}
                    <div className="w-full h-auto p-4 mt-6">
                        <MetricSection />
                    </div>

                    {/* Graph & Recent Posts - Horizontally Aligned */}
                    <div className="flex flex-row gap-6 mt-6 bg-[rgba(255,255,255,0.02)] rounded-xl p-6">
                        {/* Graph Section (Takes 2/3 of width) */}
                        <div className="w-2/3 h-auto p-4 bg-boostrDark rounded-xl">
                            <Graph />
                        </div>

                        {/* Recent Posts / Post Performance (Takes 1/3 of width) */}
                        <div className="w-1/3 h-auto p-4 bg-boostrDark rounded-xl">
                            <RecentPosts posts={[]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
