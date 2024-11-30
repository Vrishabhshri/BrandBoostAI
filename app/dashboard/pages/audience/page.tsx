import { Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AudiencePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Users className="h-8 w-8" />
        Audience
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] bg-muted flex items-center justify-center">
              Demographics chart placeholder
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] bg-muted flex items-center justify-center">
              Interests chart placeholder
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] bg-muted flex items-center justify-center">
              Location map placeholder
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] bg-muted flex items-center justify-center">
              Active times chart Placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}