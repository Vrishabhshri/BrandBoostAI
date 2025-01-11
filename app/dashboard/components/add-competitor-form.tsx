"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

interface CompanyInfo {
  name: string;
  description: string;
  hashtags: string[];
  estimatedFollowers: number | null;
  estimatedLikes: number | null;
  topCompetitors: string[];
}

export function AddCompetitorForm() {
  const [companyName, setCompanyName] = useState("")
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setCompanyInfo(null)

    try {
      const response = await fetch(`/api/company-info?name=${encodeURIComponent(companyName)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (!data || Object.keys(data).length === 0) {
        throw new Error('Received empty data from the server')
      }

      setCompanyInfo(data)

      // Save the company info
      await fetch('/api/save-company-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

    } catch (error) {
      console.error("Error fetching company info:", error)
      setError(error.message || "An error occurred while fetching company information.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Competitor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {companyInfo && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{companyInfo.name}</h3>
            <p>{companyInfo.description}</p>
            <p>Estimated Followers: {companyInfo.estimatedFollowers ?? 'N/A'}</p>
            <p>Estimated Likes: {companyInfo.estimatedLikes ?? 'N/A'}</p>
            <h4 className="font-semibold mt-2">Hashtags:</h4>
            <ul className="list-disc list-inside">
              {companyInfo.hashtags && companyInfo.hashtags.length > 0 ? (
                companyInfo.hashtags.map((tag: string) => (
                  <li key={tag}>{tag}</li>
                ))
              ) : (
                <li>No hashtags available</li>
              )}
            </ul>
            <h4 className="font-semibold mt-2">Top Competitors:</h4>
            <ul className="list-disc list-inside">
              {companyInfo.topCompetitors && companyInfo.topCompetitors.length > 0 ? (
                companyInfo.topCompetitors.map((competitor: string) => (
                  <li key={competitor}>{competitor}</li>
                ))
              ) : (
                <li>No competitors available</li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

