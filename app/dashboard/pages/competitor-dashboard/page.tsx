import { Instagram, Lock } from "lucide-react"

import { MetricCard } from "@/app/dashboard/components/metric-card"
import { NavHeader } from "@/app/dashboard/components/nav-header"

export default function OverviewPage() {
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
          <MetricCard title="Followers" value="45,231" change={20.1} />
          <MetricCard title="Engagement" value="23,571" change={12.3} />
          <MetricCard title="Post Reach" value="95,211" change={10.5} />
          <MetricCard title="Brand Mentions" value="1,232" change={-8.2} />
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
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-zinc-700/50 p-3"
                >
                  <Instagram className="h-6 w-6 text-zinc-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      Summer collection launch
                    </p>
                    <p className="text-xs text-zinc-400">
                      2.3K engagements • 15K reach
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

