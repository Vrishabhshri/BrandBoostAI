"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2, Instagram, Facebook, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Toast from "@/app/dashboard/components/Toast"

interface CompetitorData {
  name: string
  description: string
  instagram: {
    followers: number
    increase_percentage: number
    hashtags: string[]
    content: string
  }
  facebook: {
    followers: number
    increase_percentage: number
    hashtags: string[]
    content: string
  }
}

function CompetitorCard({ name, description, instagram, facebook, onPin }: CompetitorData & { onPin: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handlePinClick = () => {
    onPin()
    setIsDropdownOpen(false) // Close dropdown after pinning
  }

  return (
    <Card className="bg-zinc-800/50 border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-red-500 flex items-center justify-center">
            <span className="text-xs text-white font-bold">{name[0].toUpperCase()}</span>
          </div>
          <h3 className="font-medium text-white">{name}</h3>
          <Instagram className="h-5 w-5 text-zinc-400" />
          <Facebook className="h-5 w-5 text-zinc-400" />
        </div>
        <div className="relative">
          <Button variant="ghost" size="icon" className="text-zinc-400" onClick={handleDropdownToggle}>
            <MoreHorizontal className="h-5 w-5" />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
              <button
                onClick={handlePinClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Pin
              </button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="text-lg font-semibold text-white mb-2">{description}</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {typeof instagram.followers === 'number' ? instagram.followers.toLocaleString() : 'N/A'}
              </span>
              <span className={`text-xs ${instagram.increase_percentage >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {instagram.increase_percentage >= 0 ? "+" : ""}
                {typeof instagram.increase_percentage === 'number' ? instagram.increase_percentage.toFixed(2) : 'N/A'}%
              </span>
            </div>
            <span className="text-sm text-zinc-400">Instagram Followers</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {typeof facebook.followers === 'number' ? facebook.followers.toLocaleString() : 'N/A'}
              </span>
              <span className={`text-xs ${facebook.increase_percentage >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {facebook.increase_percentage >= 0 ? "+" : ""}
                {typeof facebook.increase_percentage === 'number' ? facebook.increase_percentage.toFixed(2) : 'N/A'}%
              </span>
            </div>
            <span className="text-sm text-zinc-400">Facebook Followers</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-zinc-400 mb-2">Recent Instagram Content:</p>
          <p className="text-sm text-white mb-2">{instagram.content}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {instagram.hashtags.map((hashtag) => (
              <Badge key={hashtag} variant="secondary" className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600">
                {hashtag}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-zinc-400 mb-2">Recent Facebook Content:</p>
          <p className="text-sm text-white mb-2">{facebook.content}</p>
          <div className="flex flex-wrap gap-2">
            {facebook.hashtags.map((hashtag) => (
              <Badge key={hashtag} variant="secondary" className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600">
                {hashtag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CompetitorAnalysis({ onPinCompany }: { onPinCompany: (company: CompetitorData) => void }) {
  const [companyName, setCompanyName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CompetitorData | null>(null)
  const [error, setError] = useState("")
  const [loadingMessage, setLoadingMessage] = useState("")
  const [requestCount, setRequestCount] = useState(0)
  const [showToast, setShowToast] = useState(false)

  const fetchField = async (field: string) => {
    try {
      const response = await fetch("/api/competitor-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyName, field }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data[field]
    } catch (err) {
      console.error(`Error fetching ${field}:`, err)
      throw err
    }
  }

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!companyName.trim()) return

    if (requestCount >= 5) {
      setLoadingMessage("Please wait, due to many searches please try again in 5 seconds.")
      return
    }

    setIsLoading(true)
    setError("")
    setResult(null)
    setRequestCount((prev) => prev + 1)

    try {
      const companyDescription = await fetchField("company_description")
      const instagramFollowers = await fetchField("instagram_followers")
      const instagramIncrease = await fetchField("instagram_increase")
      const instagramHashtags = await fetchField("instagram_hashtags")
      const instagramContent = await fetchField("instagram_content")
      const facebookFollowers = await fetchField("facebook_followers")
      const facebookIncrease = await fetchField("facebook_increase")
      const facebookHashtags = await fetchField("facebook_hashtags")
      const facebookContent = await fetchField("facebook_content")

      setResult({
        name: companyName,
        description: companyDescription,
        instagram: {
          followers: instagramFollowers,
          increase_percentage: instagramIncrease,
          hashtags: instagramHashtags,
          content: instagramContent,
        },
        facebook: {
          followers: facebookFollowers,
          increase_percentage: facebookIncrease,
          hashtags: facebookHashtags,
          content: facebookContent,
        },
      })
    } catch (err) {
      console.error("Analysis Error:", err)
      setError("Please wait and try again in 5 seconds.")
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false) // Automatically hide the toast after 5 seconds
      }, 5000)
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        setRequestCount(0)
        setLoadingMessage("")
      }, 5000)
    }
  }

  const handlePinCompany = () => {
    if (result) {
      onPinCompany(result)
    }
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <form onSubmit={handleAnalysis} className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Enter company name..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={isLoading || !companyName.trim()}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Analyze
        </Button>
      </form>

      {loadingMessage && <p className="text-destructive text-center mb-4">{loadingMessage}</p>}
      {error && <p className="text-destructive text-center mb-4">{error}</p>}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      ) : (
        result && <CompetitorCard {...result} onPin={handlePinCompany} />
      )}

      {showToast && (
        <Toast 
          message="Please wait and try again in 5 seconds." 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  )
}

