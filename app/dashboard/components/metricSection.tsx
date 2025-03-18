"use client";

import React from "react";

interface Metric {
  title: string;
  value: string | number;
  change: number;
}

const metrics: Metric[] = [
  { title: "Total Followers", value: "40.5M", change: 20.1 },
  { title: "Total Engagements", value: "15M", change: 12.3 },
  { title: "Total Impressions", value: "2,015M", change: 10.5 },
  { title: "Total Reach", value: "714.5M", change: 10.5 },
  { title: "Total Mentions", value: "1M", change: -8.2 },
];

const MetricsSection: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-full justify-between">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-[#ffffff19] backdrop-blur p-5 rounded-3xl shadow-md w-[18%] w-min-28 flex flex-col"
        >
          <div className="flex">
            <h3 className="text-sm font-light text-white">{metric.title}</h3>
          </div>
          <div className="flex gap-2">
            <span className="font-light text-white text-[1.6rem]">{metric.value}</span>
            <span
              className={`text-[0.8rem] font-light text-black rounded-[1.5rem] px-2
                          w-[50px] h-[20px]
                          ${metric.change > 0 ? "bg-green-500" : "bg-red-500"}`}
            >
              {metric.change > 0 ? `+${metric.change}%` : `${metric.change}%`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsSection;
