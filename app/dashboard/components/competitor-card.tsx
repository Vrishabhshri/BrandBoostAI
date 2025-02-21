import { Instagram, Facebook, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CompetitorCardProps {
  name: string;
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
}

export function CompetitorCard({ name, instagram, facebook }: CompetitorCardProps) {
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
        <Button variant="ghost" size="icon" className="text-zinc-400">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{instagram.followers.toLocaleString()}</span>
              <span className={`text-xs ${instagram.increase_percentage >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {instagram.increase_percentage >= 0 ? '+' : ''}{instagram.increase_percentage}%
              </span>
            </div>
            <span className="text-sm text-zinc-400">Instagram Followers</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{facebook.followers.toLocaleString()}</span>
              <span className={`text-xs ${facebook.increase_percentage >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {facebook.increase_percentage >= 0 ? '+' : ''}{facebook.increase_percentage}%
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
