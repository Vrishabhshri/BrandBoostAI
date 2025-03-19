"use client"

import NavHeader from "../components/navHeaderNew";
import PageChat from "../components/pageChat"
import { Karla } from 'next/font/google'
import Graph from '../components/graph';

const karla = Karla({ subsets: ['latin'] })

export default function Test() {

    return (
        <div className={`flex min-h-screen flex-col bg-[#302f2f] overflow-x-hidden ${karla.className} font-medium`}>

        {/* Nav container */}
        <NavHeader/>

        {/* Main Content */}
        <div className={`relative bg-gray-200 flex flex-row`}>

            {/* Overlay Gray */}
            <div className='absolute inset-0 bg-[#302f2f] opacity-90'></div>

            {/* Container of main content */}
            <div className='relative z-10 flex flex-row h-[calc(100vh-68px)] w-screen'>

                <PageChat/>

                {/* Page Content */}
                <div className='w-full h-full p-7 flex-grow'>

                    <Graph/>

                </div>

            </div>

        </div>

        
        </div>
    )
}

