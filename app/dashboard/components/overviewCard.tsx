"use client";

import { useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import * as Tabs from "@radix-ui/react-tabs";

const OverviewCard = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const activeTab = searchParams.get("tab") || "All";

  const handleTabClick = (tab: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

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
          >
            {tab.icon ?? <p>{tab.value}</p>}
          </Tabs.Trigger>
        </div>
      )),
    [activeTab, tabList]
  );

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Tabs.Root value={activeTab} onValueChange={handleTabClick}>
        <Tabs.List className="flex h-8 justify-center outline-none bg-[rgba(250,250,250,0.2)] rounded-3xl overflow-hidden">
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
