// import { MessageSquare, Plus, TrendingUp, MessageCircle } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { MetricCard } from "../../components/metric-card"

// export default function PostsPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold flex items-center gap-2">
//           <MessageSquare className="h-8 w-8" />
//           Content Management
//         </h1>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" /> Create New Post
//         </Button>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <MetricCard
//           title="Total Posts"
//           value="234"
//           description="+12 this month"
//           icon={MessageSquare}
//         />
//         <MetricCard
//           title="Engagement Rate"
//           value="5.2%"
//           description="+0.5% from last month"
//           icon={TrendingUp}
//         />
//         <MetricCard
//           title="Comments"
//           value="1.2K"
//           description="+24% this month"
//           icon={MessageCircle}
//         />
//         <MetricCard
//           title="Scheduled Posts"
//           value="12"
//           description="Next 7 days"
//           icon={MessageSquare}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {[1, 2, 3, 4, 5, 6].map((post) => (
//           <Card key={post} className="hover:bg-muted/50 transition-colors">
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 Post Title {post}
//                 <Button variant="ghost" size="sm">Edit</Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground mb-4">
//                 Post content preview... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               </p>
//               <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                 <span>Published: 2 days ago</span>
//                 <span>• 324 views</span>
//                 <span>• 12 comments</span>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }//