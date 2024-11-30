import { Hash } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HashtagManagerPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Hash className="h-8 w-8" />
          Hashtag Manager
        </h1>
        <Button>Create Hashtag Group</Button>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Hashtags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Enter a hashtag" className="flex-grow" />
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Trending', 'Brand', 'Campaign'].map((group) => (
          <Card key={group}>
            <CardHeader>
              <CardTitle>{group} Hashtags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['#example1', '#example2', '#example3'].map((tag) => (
                  <span key={tag} className="bg-muted px-2 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}//