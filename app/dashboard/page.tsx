"use client"

import React, { useState } from 'react';
// import styled from "styled-components";
import { Karla } from 'next/font/google';
import NavHeader from "./components/navHeaderNew";
import PageChat from "./components/pageChat";
// import OverviewCard from "../components/OverviewCard";
// import Sidebar from "../components/Comp/Sidebar2";
// import OverviewHeader from "../components/OverviewHeader";
// import SocialMediaPerformance from "../components/SocialMediaPerformance";

const karla = Karla({ subsets: ['latin'] });

// const ContentLayout = styled.div`
//   display: flex;
//   margin: clamp(5px, 1.25vw, 10px);
//   gap: clamp(20px, 5vw, 40px);
//   align-items: flex-end;

//   @media (max-width: 968px) {
//     flex-direction: column;
//   }
// `;

export default function OverviewPage() {
    return (
        <div className={`flex min-h-screen flex-col bg-[#302f2f] overflow-x-hidden ${karla.className} font-medium`}>
            {/* Nav container */}
            <NavHeader />
            {/* Main Content */}
            <div className={`relative bg-radial-gradient
                    flex flex-row`}>
                {/* Overlay Gray */}
                <div className='absolute inset-0 bg-[#302f2f] opacity-90'></div>
                {/* Container of main content */}
                <div className='relative z-10 flex flex-row h-[calc(100vh-68px)] w-screen'>
                    <PageChat />
                    {/* Page Content */}
                    <div className='w-full h-full p-7 flex-grow'>
                    </div>
                </div>
            </div>
        </div>
    )
}
