import { TrendingUp, Users, ThumbsUp, Target } from 'lucide-react'
import { MetricCard } from "../../components/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="h-8 w-8" />
          Performance Overview
        </h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Reach"
          value="2.5M"
          description="+15% from last month"
          icon={Users}
        />
        <MetricCard
          title="Engagement Rate"
          value="4.2%"
          description="-0.3% from last month"
          icon={ThumbsUp}
        />
        <MetricCard
          title="Conversion Rate"
          value="2.8%"
          description="+0.5% from last month"
          icon={Target}
        />
        <MetricCard
          title="Average Response Time"
          value="2.4h"
          description="12% faster than last month"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center bg-muted/5">
              Performance chart will go here
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Posts Published", value: "156" },
                { label: "Total Impressions", value: "1.2M" },
                { label: "Avg. Engagement", value: "3.2K" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}//