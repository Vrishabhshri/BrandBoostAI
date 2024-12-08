"use client"

import { Instagram, Lock } from "lucide-react"
import { useCompetitorOverview } from "././hooks/useCompetitorOverview"
import { MetricCard } from "@/app/dashboard/components/metric-card"
import { NavHeader } from "@/app/dashboard/components/nav-header"

export default function OverviewPage() {
  const { overview, lastRefreshed } = useCompetitorOverview();
  const { metrics, recentPosts } = overview;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900">
      <NavHeader />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Overview</h1>
          <button className="flex items-center gap-2 rounded-full border border-zinc-700 px-3 py-1">
            <Lock className="h-4 w-4 text-zinc-400" />
            <span className="text-sm text-zinc-400">Locked</span>
          </button>
        </div>
        
        <div className="mt-6 grid grid-cols-4 gap-4">
          <MetricCard 
            title="Followers" 
            value={metrics.followers.count.toLocaleString()} 
            change={metrics.followers.growth} 
          />
          <MetricCard 
            title="Engagement" 
            value={`${metrics.engagement.rate}%`} 
            change={metrics.engagement.growth} 
          />
          <MetricCard 
            title="Post Reach" 
            value={metrics.postReach.count.toLocaleString()} 
            change={metrics.postReach.growth} 
          />
          <MetricCard 
            title="Brand Mentions" 
            value={metrics.brandMentions.count.toLocaleString()} 
            change={metrics.brandMentions.growth} 
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="rounded-lg bg-zinc-800 p-4">
            <h2 className="text-lg font-medium text-white">Social Media Performance</h2>
            <p className="text-sm text-zinc-400">Engagement across platforms</p>
            <div className="mt-4 h-[300px] rounded bg-zinc-700/50" />
          </div>

          <div className="rounded-lg bg-zinc-800 p-4">
            <h2 className="text-lg font-medium text-white">Recent Posts</h2>
            <p className="text-sm text-zinc-400">Performance of your latest content</p>
            <div className="mt-4 space-y-3">
              {recentPosts.map((post, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-zinc-700/50 p-3"
                >
                  <Instagram className="h-6 w-6 text-zinc-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {post.title}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {post.likes.toLocaleString()} likes • {post.reach.toLocaleString()} reach
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

