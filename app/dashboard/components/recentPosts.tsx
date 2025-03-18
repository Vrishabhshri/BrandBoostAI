"use client";

import React from "react";

interface Post {
  title: string;
  details: string;
}

interface RecentPostsProps {
  posts: Post[];
}


const posts = [
  { title: "Summer collection launch", details: "2.3K engagements • 15K reach" },
  { title: "Product Update", details: "2.3K engagements • 15K reach" },
  { title: "Customer Story", details: "2.3K engagements • 15K reach" },
];


const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <div className="flex flex-col h-full w-1/4 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white">Post Performance</h3>
      <h2 className="text-sm text-gray-400">View comments, sentiment analysis, and engagement stats</h2>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="flex p-4 justify-between items-center p-4 rounded-lg my-2">
            <div className="flex items-center g1111ap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" />
              <div>
                <h4 className="text-white font-semibold">{post.title}</h4>
                <p className="text-gray-300 text-sm">{post.details}</p>
              </div>
            </div>
            <div className="text-gray-400 text-lg">➔</div>
          </div>
        ))
      ) : (
        <p className="text-gray-300 text-center">No recent posts available.</p>
      )}
    </div>
  );
};

export default RecentPosts;
