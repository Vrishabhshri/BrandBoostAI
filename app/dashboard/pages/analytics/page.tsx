// import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { MetricCard } from "../../components/metric-card"

// export default function AnalyticsPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold flex items-center gap-2">
//           <BarChart3 className="h-8 w-8" />
//           Analytics Dashboard
//         </h1>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <MetricCard
//           title="Total Views"
//           value="845.2K"
//           description="+20.1% from last month"
//           icon={Activity}
//         />
//         <MetricCard
//           title="Unique Visitors"
//           value="145.2K"
//           description="+10.1% from last month"
//           icon={Users}
//         />
//         <MetricCard
//           title="Bounce Rate"
//           value="27.5%"
//           description="-5% from last month"
//           icon={TrendingUp}
//         />
//         <MetricCard
//           title="Avg. Session"
//           value="4m 13s"
//           description="+1m from last month"
//           icon={BarChart3}
//         />
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Traffic Overview</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[350px] flex items-center justify-center bg-muted/5">
//               Traffic chart will go here
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Engagement Metrics</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[350px] flex items-center justify-center bg-muted/5">
//               Engagement chart will go here
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// } 