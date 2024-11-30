'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, LineChart, PieChart, Users, ThumbsUp, Eye, MessageCircle, TrendingUp, Calendar, Hash } from 'lucide-react'
import { Facebook, Instagram, Twitter, Youtube, PlusCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge';


const Dashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Schedule Post</Button>
          <Button variant="outline">Download Report</Button>
        </div>
      </div>
      {/*  */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23.5K</div>
                <p className="text-xs text-muted-foreground">+12.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Post Reach</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95.2K</div>
                <p className="text-xs text-muted-foreground">+10.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Brand Mentions</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,232</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Social Media Performance</CardTitle>
                <CardDescription>Engagement across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/20 rounded-md" />
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Performance of your latest content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[ 
                    { platform: Instagram, title: "Summer Collection Launch", engagement: "2.3K", reach: "15K" },
                    { platform: Twitter, title: "Product Update", engagement: "1.1K", reach: "8K" },
                    { platform: Facebook, title: "Customer Story", engagement: "890", reach: "5K" },
                  ].map((post, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="rounded-full bg-muted p-2">
                        <post.platform className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{post.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {post.engagement} engagements • {post.reach} reach
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Trending Hashtags</CardTitle>
                <CardDescription>Most used hashtags in your niche</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["#marketing", "#socialmedia", "#digital", "#branding", "#strategy"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Posts</CardTitle>
                <CardDescription>Scheduled content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[ 
                    { title: "Weekly Newsletter", time: "Tomorrow, 9:00 AM" },
                    { title: "Product Launch", time: "Friday, 3:00 PM" },
                    { title: "Team Spotlight", time: "Next Monday, 10:00 AM" },
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground">{post.time}</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage your social media accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[ 
                    { icon: Instagram, name: 'Instagram', connected: true },
                    { icon: Twitter, name: 'Twitter', connected: true },
                    { icon: Facebook, name: 'Facebook', connected: false },
                    { icon: Youtube, name: 'YouTube', connected: false },
                  ].map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <platform.icon className="h-5 w-5" />
                        <span>{platform.name}</span>
                      </div>
                      {platform.connected ? (
                        <Button variant="outline" size="sm">Manage</Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Connect
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard
