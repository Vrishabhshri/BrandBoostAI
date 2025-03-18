"use client";

import React from "react";

const OverviewHeader: React.FC = () => {
  return (
    <div
      className="leading-loose text-[2.75rem] font-karla text-white font-bold bg-transparent flex flex-col mb-4 my-1 p-3"
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
    >
      <h2 className="flex mx-8">Overview</h2>
    </div>
  );
};

export default OverviewHeader;
