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
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-white">Recent Posts</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#ffffff19] p-4 rounded-xl backdrop-blur"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white">{post.platform}</span>
              <span className="text-sm text-gray-400">{post.timestamp}</span>
            </div>
            <p className="text-white mb-2">{post.content}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Engagement:</span>
              <span className="text-sm text-white">{post.engagement}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
