"use client"

import { Instagram, Lock, Target, TrendingUp, Users, Share2, MessageSquare, Twitter } from "lucide-react"
import { useCompetitorOverview } from "./hooks/useCompetitorOverview"
import { MetricCard } from "@/app/dashboard/components/metric-card"
import { NavHeader } from "@/app/dashboard/components/nav-header"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'
import dashboardData from './data/dashboard-data.json'
import amazonTweets from '@/public/amazonhelp_tweets.csv'
import targetTweets from '@/public/target_tweets.csv'
import { useUser } from "@clerk/nextjs"
import AddCredits from "../components/AddCredits"
import { ClipLoader } from "react-spinners";

// Define interface for post data
interface Post {
  id: string
  type: string
  content: string
  engagements: number
  reach: number
  platform: 'twitter' | 'instagram'
  source: string
}

// Mock sentiment data for development
const combineSentimentData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  return months.map((month) => ({
    month,
    Amazon: Number((Math.random() * 0.4 + 0.4).toFixed(3)), // Range 0.4 to 0.8
    Target: Number((Math.random() * 0.3 + 0.3).toFixed(3))  // Range 0.3 to 0.6
  }))
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 p-3 rounded-lg border border-zinc-700 shadow-lg">
        <p className="text-zinc-400 font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className={`text-sm ${entry.color === '#00a1ff' ? 'text-[#00a1ff]' : 'text-[#ff0000]'}`}>
            {entry.name}: {entry.value.toFixed(3)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Update the combine posts function with proper typing
const combineRecentPosts = (): Post[] => {
  // Process Amazon tweets
  const amazonPosts: Post[] = amazonTweets.slice(0, 2).map(tweet => ({
    id: tweet.id || String(Math.random()),
    type: 'Tweet',
    content: tweet.text || '',
    engagements: Math.floor(Math.random() * 1000) + 500,
    reach: Math.floor(Math.random() * 10000) + 5000,
    platform: 'twitter',
    source: 'Amazon Help'
  }))

  // Process Target tweets
  const targetPosts: Post[] = targetTweets.slice(0, 1).map(tweet => ({
    id: tweet.id || String(Math.random()),
    type: 'Tweet',
    content: tweet.text || '',
    engagements: Math.floor(Math.random() * 800) + 400,
    reach: Math.floor(Math.random() * 8000) + 4000,
    platform: 'twitter',
    source: 'Target'
  }))

  // Add Instagram posts from analysis
  const instagramPosts: Post[] = [
    {
      id: 'ig-1',
      type: 'Instagram Post',
      content: 'Product showcase',
      engagements: Math.floor(Math.random() * 5000) + 2000,
      reach: Math.floor(Math.random() * 20000) + 10000,
      platform: 'instagram',
      source: 'Amazon'
    },
    {
      id: 'ig-2',
      type: 'Instagram Story',
      content: 'Promotional campaign',
      engagements: Math.floor(Math.random() * 4000) + 1500,
      reach: Math.floor(Math.random() * 15000) + 8000,
      platform: 'instagram',
      source: 'Target'
    }
  ]

  return [...amazonPosts, ...targetPosts, ...instagramPosts]
    .sort((a, b) => b.engagements - a.engagements)
    .slice(0, 5)
}

export default function OverviewPage() {
  const { overview } = useCompetitorOverview();
  const { lockStatus } = overview;
  const [userName, setUserName] = useState("Amazon")
  const [performanceData, setPerformanceData] = useState(combineSentimentData())
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const metrics = dashboardData.competitorMetrics
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const metricIcons = {
    followers: <Users className="h-5 w-5 text-blue-400" />,
    engagement: <TrendingUp className="h-5 w-5 text-green-400" />,
    reach: <Share2 className="h-5 w-5 text-purple-400" />,
    mentions: <MessageSquare className="h-5 w-5 text-orange-400" />
  }

  useEffect(() => {
    const data = combineSentimentData()
    setPerformanceData(data)

    // Showing dashboard after data has been loaded
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

  }, [])

  useEffect(() => {
    const posts = combineRecentPosts()
    setRecentPosts(posts)
  }, [])

    // get username from clerk
    const { user } = useUser();
  
  // Fallback if user or user.fullName is not available
  const name = user?.fullName || 'Amazon';

  // isLoading variable when false shows loading page, then from useEffect hooks gets set to false allowing page to show
  return isLoading ? (

    <div className="flex min-h-screen flex-col bg-zinc-900 justify-center items-center">
      <p className="text-zinc-400 mt-3 text-lg mb-4">Loading market trends...</p>
      <ClipLoader color="#007bff" size={50} />
    </div>

  ) : (
    <div className="flex min-h-screen flex-col bg-zinc-900">
      <NavHeader />
      <main className="flex-1 p-6">
        {/* Welcome Message */}
        <div className="mb-8 bg-zinc-800 rounded-lg p-6 border border-zinc-700">
          <h1 className="text-3xl font-bold text-white">
            {/* use the name from clerk user */}
            Welcome back, {name}
          </h1>
          <p className="text-zinc-400 mt-3 text-lg">
            Track your competitive performance against Target with real-time metrics and insights
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-white">Competitor Overview</h2>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-full border border-zinc-700">
              <Target className="h-4 w-4 text-red-500" />
              <span className="text-sm text-zinc-300">vs Target</span>
            </div>
          </div>
          <button 
            className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 hover:bg-zinc-800 transition-colors"
            aria-label={lockStatus.text}
          >
            <Lock className="h-4 w-4 text-zinc-400" />
            <span className="text-sm text-zinc-300">{lockStatus.text}</span>
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <MetricCard 
            title="Amazon Followers" 
            value={`${(metrics.amazon.followers / 1000000).toFixed(1)}M`}
            change={metrics.amazon.growth.followers}
            competitor={`Target: ${(metrics.target.followers / 1000000).toFixed(1)}M`}
          />
          <MetricCard 
            title="Engagement Rate" 
            value={`${metrics.amazon.engagementRate}%`}
            change={metrics.amazon.growth.engagement}
            competitor={`Target: ${metrics.target.engagementRate}%`}
          />
          <MetricCard 
            title="Post Reach" 
            value={`${(metrics.amazon.postReach / 1000000).toFixed(1)}M`}
            change={metrics.amazon.growth.reach}
            competitor={`Target: ${(metrics.target.postReach / 1000000).toFixed(1)}M`}
          />
          <MetricCard 
            title="Brand Mentions" 
            value={`${(metrics.amazon.brandMentions / 1000).toFixed(0)}K`}
            change={metrics.amazon.growth.mentions}
            competitor={`Target: ${(metrics.target.brandMentions / 1000).toFixed(0)}K`}
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="rounded-lg bg-zinc-800 p-6 border border-zinc-700">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Social Media Sentiment
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Monthly sentiment score comparison</p>
            <div className="mt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#888" 
                    tick={{ fill: '#888' }}
                    axisLine={{ stroke: '#525252' }}
                  />
                  <YAxis 
                    stroke="#888" 
                    domain={[-1, 1]} 
                    tick={{ fill: '#888' }}
                    axisLine={{ stroke: '#525252' }}
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Amazon" 
                    stroke="#00a1ff" 
                    strokeWidth={2}
                    dot={{ fill: '#00a1ff', strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Target" 
                    stroke="#ff0000" 
                    strokeWidth={2}
                    dot={{ fill: '#ff0000', strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800 p-6 border border-zinc-700">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-pink-400" />
              Recent Posts Analysis
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Latest social media activity across platforms</p>
            <div className="mt-6 space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 rounded-lg bg-zinc-700/50 p-4 border border-zinc-600/50"
                  role="article"
                >
                  <div className="h-12 w-12 rounded-lg bg-zinc-700 flex items-center justify-center">
                    {post.platform === 'twitter' ? (
                      <Twitter className="h-6 w-6 text-blue-400" />
                    ) : (
                      <Instagram className="h-6 w-6 text-pink-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">
                        {post.type}
                      </p>
                      <span className="text-xs text-zinc-500">{post.source}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-zinc-400">
                        {post.engagements.toLocaleString()} engagements • {post.reach.toLocaleString()} reach
                      </p>
                      {post.source === 'Amazon' && (
                        <div className="flex items-center gap-2">
                          <Target className="h-3 w-3 text-red-500" />
                          <p className="text-xs text-zinc-500">
                            Target: {Math.round(post.engagements * 0.85).toLocaleString()} engagements
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AddCredits/>
    </div>
  )
}

