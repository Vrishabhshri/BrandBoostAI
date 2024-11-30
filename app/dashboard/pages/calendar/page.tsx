import { Calendar as CalendarIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContentCalendarPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CalendarIcon className="h-8 w-8" />
          Content Calendar
        </h1>
        <Button>Schedule Content</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>July 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 31 }, (_, i) => (
              <div key={i} className="aspect-square border rounded-md flex items-center justify-center">
                {i + 1}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}