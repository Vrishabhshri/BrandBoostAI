"use client";

import { useCallback, useMemo } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';
import * as Tabs from '@radix-ui/react-tabs';

interface OverviewProps {
    activeTab: string;
    handleTabClick: (tab: string) => void;
}

const OverviewCard = ({ activeTab, handleTabClick }: OverviewProps) => {
    const tabList = useMemo(
        () => [
            { value: 'All', label: 'All', icon: null },
            { value: 'facebook', icon: <FaFacebookF className="text-md" /> },
            { value: 'instagram', icon: <FaInstagram className="text-md" /> },
            { value: 'tiktok', icon: <FaTiktok className="text-md" /> },
            { value: 'twitter', icon: <FaTwitter className="text-md" /> },
        ],
        []
    );

    const renderTabs = useCallback(
        () =>
            tabList.map((tab) => (
                <div key={tab.value} className="flex justify-center w-[100%] h-full">
                    <Tabs.Trigger
                        value={tab.value}
                        className={`flex w-full justify-center p-4 py-2 rounded-xl text-md ${activeTab === tab.value
                                ? 'bg-[rgba(241, 2, 2, 0.4)] p-4 h-full text-white rounded-3xl'
                                : 'bg-[rgba(0, 94, 255, 0.1)] text-white  rounded-none'
                            }`}
                    >
                        {tab.icon ?? <p>{tab.value}</p>}
                    </Tabs.Trigger>
                    <Separator />
                </div>
            )),
        [activeTab, tabList]
    );

    return (
        <div className="flex flex-col  justify-center w-full">
            <Tabs.Root value={activeTab} onValueChange={handleTabClick}>
                <Tabs.List className="flex h-8 justify-center outline-none bg-[rgba(250,250,250,0.1)] rounded-2xl overflow-hidden">
                    {renderTabs()}
                </Tabs.List>

                {/* Tabs Content */}
                {tabList.map((tab) => (
                    <Tabs.Content key={tab.value} value={tab.value}>
                        {/* Content for each tab */}
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </div>
    );
};

export default OverviewCard;
