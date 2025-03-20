"use client";

import React from "react";
import Image from "next/image";
import { Karla } from "next/font/google";

const karla = Karla({ subsets: ["latin"], weight: ["400", "700"] });

interface Post {
  id: number;
  platform: string;
  content: string;
  engagement: string;
  timestamp: string;
}

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
  return (
    <div className={`space-y-3 ${karla.className}`}>
      <h3 className="text-xl font-semibold text-white">Post Performance</h3>
      <p className="text-xs text-gray-300 font-light">View comments, sentiment analysis, and engagement rate</p>

      <div className="mt-4 space-y-3">
        {posts.map((post, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-[rgba(250,250,250,0.1)] backdrop-blur rounded-lg shadow-md hover:bg-[#333] transition">
            <div className="flex items-center gap-3">
              {/* Dynamic Social Media Icon */}
              <div className="w-8 h-8 bg-[rgba(255,255,255,0.01)] rounded-full flex justify-center items-center">
                <Image
                  src={
                    index === 1
                      ? "/assets/icons/instagram.svg" // Keep Instagram for the second post
                      : "/assets/icons/Facebook-f.svg" // Use Facebook for the first and third posts
                  }
                  alt={index === 1 ? "Instagram Logo" : "Facebook Logo"}
                  width={20}
                  height={20}
                />
              </div>

{/* Post Title & Details */}
              <div>
            {/* Sentiment Analysis Badge */}
                <h4 className="flex flex-row text-sm font-medium text-gray-100">{post.title}</h4>
            <span
              className={`text-[0.6rem] font-semibold text-black rounded-[1.5rem] px-2 w-[5rem] h-[1rem] flex flex-row items-center justify-center ${
                post.sentiment === "positive" ? "bg-green-500" :
                post.sentiment === "negative" ? "bg-red-500" :
                "bg-blue-400"
              }`}
            >
              {post.sentimentValue}
            </span>
                <p className="text-xs text-gray-300 font-light">{post.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
