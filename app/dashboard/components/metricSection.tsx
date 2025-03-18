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
    <div className="flex flex-wrap justify-center gap-4 w-full m-20 mt-0">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="flex-wrap bg-[rgba(255,255,255,0.01)] backdrop-blur p-5 rounded-3xl shadow-md w-1/4 w-min-28 text-center"
        >
        <div className="flex flex-row">
          <h3 className="text-sm  text-white">{metric.title}</h3>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-xl font-bold text-white">{metric.value}</span>
            <span
              className={`px-2 py-1 text-sm font-semibold text-white rounded-md ${
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

export default MetricsSection;
