"use client";

import { useCallback, useMemo } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import * as Tabs from "@radix-ui/react-tabs";

interface OverviewCardProps {
  activeTab: string;
  handleTabClick: (tab: string) => void;
}

const OverviewCard = ({ activeTab, handleTabClick }: OverviewCardProps) => {
  const tabList = useMemo(
    () => [
      { value: "All", label: "All", icon: null },
      { value: "facebook", icon: <FaFacebookF className="text-md" /> },
      { value: "instagram", icon: <FaInstagram className="text-md" /> },
      { value: "tiktok", icon: <FaTiktok className="text-md" /> },
      { value: "twitter", icon: <FaTwitter className="text-md" /> },
    ],
    []
  );

  const renderTabs = useCallback(
    () =>
      tabList.map((tab) => (
        <div key={tab.value} className="flex items-center justify-center h-full">
          <Tabs.Trigger
            value={tab.value}
            className={`flex items-center justify-center bg-[rgba(250, 250, 250, 0.2)] px-3 py-2 rounded-xl text-md ${
              activeTab === tab.value
                ? "bg-[rgba(250,250,250,0.4)] p-2 h-full text-white border-black rounded-none"
                : "bg-[rgb(0, 0, 0)] text-white border-black rounded-none"
            }`}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.icon ?? <p>{tab.value}</p>}
          </Tabs.Trigger>
        </div>
      )),
    [activeTab, tabList, handleTabClick]
  );

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Tabs.Root value={activeTab} onValueChange={handleTabClick}>
        <Tabs.List className="flex h-8 justify-center outline-none bg-[rgba(250,250,250,0.2)] rounded-3xl overflow-hidden">
          {renderTabs()}
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
};

export default OverviewCard;
