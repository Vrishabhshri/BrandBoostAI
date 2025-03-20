"use client";

import { useState, useEffect } from "react";

interface Metric {
  title: string;
  value: string | number;
  change: number;
}

interface MetricSectionProps {
  isChatOpen: boolean;
  metrics: Metric[];
}

const MetricSection = ({ isChatOpen, metrics }: MetricSectionProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 300);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div
      className={`grid gap-4 w-full justify-center max-h-30 ${
        isChatOpen
          ? "grid-cols-3 grid-rows-2" // Chat open → 3 on top, 2 on bottom (3x2 grid)
          : "grid-cols-5" // Chat closed → 5 in a row
      }`}
    >
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-[#ffffff19] backdrop-blur p-5 rounded-3xl shadow-md w-full min-w-[120px] flex flex-col"
        >
          <div className="flex">
            <h3 className="text-sm font-light text-white">{metric.title}</h3>
          </div>
          <div className="flex gap-2">
            <span className="font-light text-white text-[1.6rem]">{metric.value}</span>
            <span
              className={`text-[0.8rem] font-light text-black rounded-[1.5rem] px-2 w-[50px] h-[20px] ${
                metric.change > 0 ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {metric.change > 0 ? `+${metric.change}%` : `${metric.change}%`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricSection;
