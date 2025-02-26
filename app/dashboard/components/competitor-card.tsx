import { Instagram, Facebook, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from 'react'

interface CompetitorCardProps {
  name: string;
  description: string;
  instagram: {
    followers: number;
    increase_percentage: number;
    hashtags: string[];
    content: string;
  };
  facebook: {
    followers: number;
    increase_percentage: number;
    hashtags: string[];
    content: string;
  };
  onPin: () => void;
  onUnpin: () => void;
  onView: () => void;
}

export function CompetitorCard({ name, description, instagram, facebook, onPin, onUnpin, onView }: CompetitorCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handlePinClick = () => {
    onPin()
    setIsDropdownOpen(false) // Close dropdown after pinning
  }

  const handleViewClick = () => {
    onView()
    setIsDropdownOpen(false) // Close dropdown after viewing
  }

  return (
    <Card className="bg-zinc-800/50 border-0 shadow-lg transition-transform transform hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-red-500 flex items-center justify-center">
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
              <button
                onClick={onUnpin}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Unpin
              </button>
              <button
                onClick={handleViewClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                View
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
              <Badge 
                key={hashtag}
                variant="secondary" 
                className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              >
                {hashtag}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-zinc-400 mb-2">Recent Facebook Content:</p>
          <p className="text-sm text-white mb-2">{facebook.content}</p>
          <div className="flex flex-wrap gap-2">
            {facebook.hashtags.map((hashtag) => (
              <Badge 
                key={hashtag}
                variant="secondary" 
                className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              >
                {hashtag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
