'use client'

import { useState } from 'react'
import { Flame, Settings, PenBox, BookOpen, MoreHorizontal, RefreshCcw, Send, Facebook, Instagram, Linkedin, Twitter, Pin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Link from 'next/link'
import { cn } from "@/lib/utils"

const styles = {
  cardSubtle: 'bg-[#2A2A2A] bg-opacity-50 backdrop-blur-lg',
  cardStrong: 'bg-[#FFFFFF] bg-opacity-5 backdrop-blur-xl',
  accentCandy: 'bg-gradient-to-br from-[#6366F1] to-[#34D399]',
  accentSherbert: 'bg-gradient-to-r from-[#F87171] to-[#FBBF24]',
  glassMorphism: 'backdrop-blur-md bg-white/5',
}

const competitors = [
  {
    id: 1,
    name: 'Diet Rite',
    avatar: '/placeholder.svg?height=40&width=40',
    followers: 3000,
    growth: 0,
    overlap: 2,
    tags: ['holidays', 'favorite', 'sweet', 'Coca-Cola', 'family'],
    lastMessage: {
      text: "How happy are users?",
      timestamp: "11/11/2024 13:30pm CDT",
      response: "Many fans enjoy Pepsi's sweeter flavor compared to Coca-Cola and even defend it against Coke in online debates, especially in taste comparisons and product consistency."
    }
  },
  {
    id: 2,
    name: 'Dr Pepper',
    avatar: '/placeholder.svg?height=40&width=40',
    followers: 60000,
    growth: 1,
    overlap: 34,
    tags: ['holidays', 'favorite', 'sweet', 'Coca-Cola', 'family'],
    lastMessage: {
      text: "What's their market share?",
      timestamp: "11/12/2024 10:15am CDT",
      response: "Dr Pepper holds about 6.8% of the US carbonated soft drink market, making it the third most popular soft drink after Coca-Cola and Pepsi."
    }
  },
  {
    id: 3,
    name: 'Mountain Dew',
    avatar: '/placeholder.svg?height=40&width=40',
    followers: 1200000,
    growth: 2.5,
    overlap: 45,
    tags: ['extreme', 'energy', 'youth', 'gaming', 'adventure'],
    lastMessage: {
      text: "Who's their target audience?",
      timestamp: "11/13/2024 09:45am CDT",
      response: "Mountain Dew primarily targets young adults, particularly males aged 18-24, who are interested in extreme sports, gaming, and high-energy activities."
    }
  },
  {
    id: 4,
    name: 'Sprite',
    avatar: '/placeholder.svg?height=40&width=40',
    followers: 800000,
    growth: 1.8,
    overlap: 28,
    tags: ['refreshing', 'lemon-lime', 'summer', 'basketball', 'thirst'],
    lastMessage: {
      text: "What's their main marketing strategy?",
      timestamp: "11/14/2024 14:20pm CDT",
      response: "Sprite's marketing strategy focuses on urban youth culture, often partnering with hip-hop artists and basketball players to promote the brand as a cool, refreshing choice."
    }
  }
]

function ProgressRing({ value }: { value: number }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-[120px] h-[120px]">
        <circle
          cx="60"
          cy="60"
          r="54"
          className="stroke-[#2A2A2A] fill-transparent"
          strokeWidth="6"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          className="stroke-[#34D399] fill-transparent"
          strokeWidth="6"
          strokeDasharray={339.292}
          strokeDashoffset={339.292 * (1 - value / 100)}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold">{value}%</span>
        <span className="text-xs text-[#D9D9D9] max-w-[80px] leading-tight">
          of your followers also follow them
        </span>
      </div>
    </div>
  )
}

export default function CompetitorDashboard() {
  const [question, setQuestion] = useState('')
  const [cardQuestions, setCardQuestions] = useState<Record<number, string>>({})

  const handleQuestionSubmit = (competitorId: number, question: string) => {
    setCardQuestions(prev => ({ ...prev, [competitorId]: '' }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] to-[#ff0505] text-[#FFFFFF] backdrop-blur-3xl">
      {/* Navigation */}
      <header className="border-b border-[#797580]/20 bg-[#1E1E1E]/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Flame className="h-8 w-8 text-orange-500" />
              <nav className="flex items-center space-x-6">
                <Link href="#" className="flex items-center text-sm font-medium text-[#FFFFFF]">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Competitor Dashboard
                </Link>
                <Link href="#" className="flex items-center text-sm font-medium text-[#D9D9D9] hover:text-[#FFFFFF]">
                  <PenBox className="h-4 w-4 mr-2" />
                  Content Builder
                </Link>
                <Link href="#" className="flex items-center text-sm font-medium text-[#D9D9D9] hover:text-[#FFFFFF]">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Brand Story
                </Link>
                <Link href="#" className="flex items-center text-sm font-medium text-[#D9D9D9] hover:text-[#FFFFFF]">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </nav>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Competitor Dashboard</h1>
            <div className="flex items-center text-sm text-[#D9D9D9]">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Last refreshed 11/11/2024 15:42PM CDT
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Recommendations Panel */}
          <div className="col-span-3 flex justify-center">
            <Card className={cn(styles.cardSubtle, "border-[#797580]/20 bg-gradient-to-br from-[#2A2A2A] to-[#1E1E1E]/80 backdrop-filter backdrop-blur-lg w-full max-w-sm")}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <PenBox className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Recommendations</h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#D9D9D9] mb-4">
                  Welcome! Based on all competitor data, here are some suggestions:
                </p>
                <ul className="space-y-3 text-sm text-[#D9D9D9] mb-6">
                  <li>• Focus on engaging in your community</li>
                  <li>• Consider implementing a loyalty program to reward repeat customers</li>
                  <li>• Create more content around user success stories to showcase your impact</li>
                  <li>• Leverage social media for real-time engagement with your audience</li>
                </ul>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Ask a question</p>
                  <div className="flex items-center space-x-2">
                    <Input
                      className="bg-[#1E1E1E]/50 border-[#797580]/20 text-[#FFFFFF] placeholder-[#797580]"
                      placeholder='For example, "What are some ways I can connect to my audience?"'
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button size="icon" variant="ghost" className="hover:bg-[#797580]/20">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send question</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Competitor Cards Grid */}
          <div className="col-span-9 grid grid-cols-2 gap-6">
            {competitors.map((competitor) => (
              <Card key={competitor.id} className={cn(styles.cardSubtle, "border-[#797580]/20 bg-gradient-to-br from-[#2A2A2A]/80 to-[#1E1E1E]/80 backdrop-filter backdrop-blur-lg")}>
                <CardContent className="p-4">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-5 bg-[#1E1E1E]/50 rounded-t-lg">
                      <TabsTrigger value="overview" className="data-[state=active]:bg-[#2A2A2A]/50">Overview</TabsTrigger>
                      <TabsTrigger value="facebook" className="data-[state=active]:bg-[#2A2A2A]/50"><Facebook className="h-4 w-4" /></TabsTrigger>
                      <TabsTrigger value="instagram" className="data-[state=active]:bg-[#2A2A2A]/50"><Instagram className="h-4 w-4" /></TabsTrigger>
                      <TabsTrigger value="twitter" className="data-[state=active]:bg-[#2A2A2A]/50"><Twitter className="h-4 w-4" /></TabsTrigger>
                      <TabsTrigger value="linkedin" className="data-[state=active]:bg-[#2A2A2A]/50"><Linkedin className="h-4 w-4" /></TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={competitor.avatar} alt={competitor.name} />
                            <AvatarFallback>{competitor.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{competitor.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="px-2 hover:bg-[#797580]/20">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Metrics */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-3xl font-bold">
                              {competitor.followers >= 1000000 
                                ? `${(competitor.followers / 1000000).toFixed(1)}M`
                                : `${(competitor.followers / 1000).toFixed(0)}K`}
                            </span>
                            <span className="text-sm text-[#34D399]">+{competitor.growth}%</span>
                          </div>
                          <p className="text-sm text-[#D9D9D9]">Followers</p>
                        </div>
                        <ProgressRing value={competitor.overlap} />
                      </div>

                      {/* Tags */}
                      <div className="space-y-4 mb-6">
                        <p className="text-sm text-[#D9D9D9]">People are saying...</p>
                        <div className="flex flex-wrap gap-2">
                          {competitor.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary"
                              className="bg-[#1E1E1E]/50 hover:bg-[#797580]/20 text-[#D9D9D9]"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Chat Section */}
                      <Separator className="mb-6 bg-[#797580]/20" />
                      
                      {competitor.lastMessage && (
                        <div className="mb-4 space-y-2">
                          <div className="flex justify-between items-center text-xs text-[#D9D9D9]">
                            <span>{competitor.lastMessage.timestamp}</span>
                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                              <Pin className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm bg-[#1E1E1E]/30 rounded-lg p-3">
                            <span className="font-semibold">{competitor.lastMessage.text}</span>
                            <br />
                            {competitor.lastMessage.response}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Input
                          className="bg-[#1E1E1E]/50 border-[#797580]/20 text-[#FFFFFF] placeholder-[#797580]"
                          placeholder='For example, "How happy are users?"'
                          value={cardQuestions[competitor.id] || ''}
                          onChange={(e) => setCardQuestions(prev => ({ ...prev, [competitor.id]: e.target.value }))}
                        />
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="hover:bg-[#797580]/20"
                          onClick={() => handleQuestionSubmit(competitor.id, cardQuestions[competitor.id])}
                        >
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Send question</span>
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="facebook">Facebook content for {competitor.name}</TabsContent>
                    <TabsContent value="instagram">Instagram content for {competitor.name}</TabsContent>
                    <TabsContent value="twitter">Twitter content for {competitor.name}</TabsContent>
                    <TabsContent value="linkedin">LinkedIn content for {competitor.name}</TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
