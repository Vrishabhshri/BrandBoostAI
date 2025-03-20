import Image from 'next/image';
import { useState } from 'react';

interface CardProps {

    cardName: string;
    description: string;
    postingWords: string[] | undefined;
    commentingWords: string[] | undefined;

}

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
    postingWords?: string[];
    commentingWords?: string[];
}

interface SocialMediaMetrics {
    followers: string;
    engagements: string;
    change: number;
}
  
interface SocialMediaData {
    [key: string]: SocialMediaMetrics;
}

export default function CompetitorCard({ cardName, description, postingWords, commentingWords }: CardProps) {

    const [activeTab, setActiveTab] = useState(cardName)

    const socialMediaMetrics: SocialMediaData = {
        [cardName]: {"followers": "6.1M", "engagements": "1.5M", "change": 20.1},
        facebook: {"followers": "5.3M", "engagements": "770K", "change": 2.1},
        instagram: {"followers": "2.7M", "engagements": "650K", "change": -8.1},
        tiktok: {"followers": "3.9M", "engagements": "3.5M", "change": -3.1},
        twitter: {"followers": "4.3M", "engagements": "2.5M", "change": 5.1}
    }

    const changeTab = (tab: string) => {
        setActiveTab(tab);
    }

    return (

        <div className='rounded-[1.5rem] w-[320px] h-[600px] overflow-hidden border-2 border-[#ffffff19] bg-[#ffffff19]'>
            {/* Competitor navbar */}
            <div className='w-full h-[72px] flex justify-center items-center'>
            <div className={`cursor-pointer text-white h-full flex justify-center items-center w-1/3
                        border-r-2 border-[#ffffff19] hover:bg-[#ffffff33]
                        ${activeTab === cardName ? "bg-[#ffffff33] border-b-0" : "bg-[#ffffff01]"}`}
                        onClick={() => changeTab(cardName)}>
                {cardName}
            </div>

            <div className={`cursor-pointer text-white h-full flex justify-center items-center w-[14.285714%]
                        border-r-2 border-[#ffffff19] hover:bg-[#ffffff33]
                        ${activeTab === "facebook" ? "bg-[#ffffff33] border-b-0" : "bg-[#ffffff01]"}`}
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
                        ${activeTab === "instagram" ? "bg-[#ffffff33] border-b-0" : "bg-[#ffffff01]"}`}
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
                        ${activeTab === "tiktok" ? "bg-[#ffffff33] border-b-0" : "bg-[#ffffff01]"}`}
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
                        ${activeTab === "twitter" ? "bg-[#ffffff33] border-b-0" : "bg-[#ffffff01]"}`}
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

            {/* Competitor Info */}
            <div className={`w-full h-[calc(100%-72px)] rounded-[1.5rem] overflow-hidden bg-[#ffffff33] px-8 py-6 flex flex-col gap-10
                        ${activeTab === cardName ? "rounded-tl-none" : ""}
                        ${activeTab === "facebook" ? "rounded-tl-none" : ""}
                        ${activeTab === "instagram" ? "rounded-tl-none" : ""}
                        ${activeTab === "tiktok" ? "rounded-tl-none" : ""}
                        ${activeTab === "twitter" ? "rounded-tl-none" : ""}`}>
            {/* Numbers */}
            <div className='w-full h-[20%] text-white flex flex-row gap-5 items-center font-light'>
                {/* Followers */}
                <div className='flex flex-col'>
                <div className="flex gap-1">
                    <span className="font-light text-white text-[1.6rem]">
                    {socialMediaMetrics[activeTab]["followers"]}
                    </span>
                    <span className={`text-[0.8rem] font-light text-black rounded-[1.5rem] px-2 w-[50px] h-[20px]
                            ${socialMediaMetrics[activeTab]["change"] > 0 ? "bg-green-500" : "bg-red-500"}`}>
                    {socialMediaMetrics[activeTab]["change"] > 0 ? `+${socialMediaMetrics[activeTab]["change"]}%` : `${socialMediaMetrics[activeTab]["change"]}%`}
                    </span>
                </div>
                <span className='text-sm'>Followers</span>
                </div>

                {/* Engagements */}
                <div className='flex flex-col'>
                <div className="flex gap-1">
                    <span className="font-light text-white text-[1.6rem]">
                    {socialMediaMetrics[activeTab]["engagements"]}
                    </span>
                    <span className={`text-[0.8rem] font-light text-black rounded-[1.5rem] px-2 w-[50px] h-[20px]
                            ${socialMediaMetrics[activeTab]["change"] > 0 ? "bg-green-500" : "bg-red-500"}`}>
                    {socialMediaMetrics[activeTab]["change"] > 0 ? `+${socialMediaMetrics[activeTab]["change"]}%` : `${socialMediaMetrics[activeTab]["change"]}%`}
                    </span>
                </div>
                <span className='text-sm'>Engagements</span>
                </div>
            </div>

            {/* Description */}
            <div className='w-full h-[15%] text-white mb-4'>
                <p className="text-sm">{description || "Loading..."}</p>
            </div>

            {/* Posting words */}
            <div className='w-full h-[32%] text-white mb-4'>
                <span className="text-sm font-medium">Brand has been posting...</span>
                <div className='flex flex-wrap gap-2 mt-2'>
                {postingWords?.map((word: string, idx: number) => (
                    <div 
                    key={idx} 
                    className='bg-[#ffffff26] rounded-full px-3 py-1 text-[0.9rem] transition-all duration-200 hover:scale-105 hover:bg-[#ffffff40] cursor-pointer'
                    >
                    {word}
                    </div>
                ))}
                </div>
            </div>

            {/* Commenting words */}
            <div className='w-full h-[32%] text-white'>
                <span className="text-sm font-medium">Users are commenting...</span>
                <div className='flex flex-wrap gap-2 mt-2'>
                {commentingWords?.map((word: string, idx: number) => (
                    <div 
                    key={idx} 
                    className='bg-[#ffffff26] rounded-full px-3 py-1 text-[0.9rem] transition-all duration-200 hover:scale-105 hover:bg-[#ffffff40] cursor-pointer'
                    >
                    {word}
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>

    )

}