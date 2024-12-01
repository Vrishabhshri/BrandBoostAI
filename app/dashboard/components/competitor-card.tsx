"use client"

import { Instagram, Facebook, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CompetitorCardProps {
  name: string;
  instagram: {
    followers: number;
    increase_percentage: number;
    hashtags: string[];
    content: string;
  };
  facebook: {
    followers: number;
    increase_percentage: number;
    hashtags: string[];
    content: string;
  };
}

export function CompetitorCard({ name, instagram, facebook }: CompetitorCardProps) {
  return (
    <Card className="bg-zinc-800/50 border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-red-500 flex items-center justify-center">
            <span className="text-xs text-white font-bold">{name[0].toUpperCase()}</span>
          </div>
          <h3 className="font-medium text-white">{name}</h3>
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-400">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="36"
                className="fill-none stroke-zinc-700"
                strokeWidth="6"
              />
              <circle
                cx="48"
                cy="48"
                r="36"
                className="fill-none stroke-cyan-400"
                strokeWidth="6"
                strokeDasharray={`${15 * 2.26} 226`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">15%</span>
              <span className="text-xs text-zinc-400">Shared</span>
              <span className="text-xs text-zinc-400">followers</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {instagram.followers.toLocaleString()}
              </span>
              <span className={`text-xs ${instagram.increase_percentage >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {instagram.increase_percentage >= 0 ? '+' : ''}{instagram.increase_percentage}%
              </span>
            </div>
            <span className="text-sm text-zinc-400">Total Followers</span>
          </div>
        </div>

        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
            <TabsTrigger value="instagram" className="data-[state=active]:bg-zinc-800">
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </TabsTrigger>
            <TabsTrigger value="facebook" className="data-[state=active]:bg-zinc-800">
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </TabsTrigger>
          </TabsList>
          <TabsContent value="instagram" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-white">{instagram.content}</p>
              <div className="flex flex-wrap gap-2">
                {instagram.hashtags.map((hashtag) => (
                  <Badge 
                    key={hashtag}
                    variant="secondary" 
                    className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  >
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="facebook" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-white">{facebook.content}</p>
              <div className="flex flex-wrap gap-2">
                {facebook.hashtags.map((hashtag) => (
                  <Badge 
                    key={hashtag}
                    variant="secondary" 
                    className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  >
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

