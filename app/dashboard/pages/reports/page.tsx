import { FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Reports
        </h1>
        <Button>Generate New Report</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Monthly Overview', 'Campaign Performance', 'Audience Growth', 'Content Engagement', 'Competitor Analysis', 'ROI Report'].map((report) => (
          <Card key={report}>
            <CardHeader>
              <CardTitle>{report}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Last generated: July 1, 2023</p>
              <Button variant="outline">View Report</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}//