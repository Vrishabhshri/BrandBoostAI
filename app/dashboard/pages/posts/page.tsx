import { MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PostsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-8 w-8" />
          Posts
        </h1>
        <Button>Create New Post</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((post) => (
          <Card key={post}>
            <CardHeader>
              <CardTitle>Post Title {post}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Post content preview...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}//