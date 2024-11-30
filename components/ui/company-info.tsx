import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram, Facebook } from 'lucide-react'

interface CompanyInfoProps {
  name: string;
  instagram: {
    followers: number;
    content: string;
    date_added: string;
  };
  facebook: {
    followers: number;
    content: string;
    date_added: string;
  };
}

export function CompanyInfo({ name, instagram, facebook }: CompanyInfoProps) {
  return (
    <Card className="bg-zinc-800/50 border-0 mt-4">
      <CardHeader>
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <span className="bg-indigo-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {name[0].toUpperCase()}
          </span>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Instagram className="h-4 w-4" />
            <span className="text-sm">Instagram</span>
          </div>
          <p className="text-white text-sm">Followers: {instagram.followers.toLocaleString()}</p>
          <p className="text-zinc-300 text-sm">{instagram.content}</p>
          <p className="text-zinc-400 text-xs">Added: {instagram.date_added}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Facebook className="h-4 w-4" />
            <span className="text-sm">Facebook</span>
          </div>
          <p className="text-white text-sm">Followers: {facebook.followers.toLocaleString()}</p>
          <p className="text-zinc-300 text-sm">{facebook.content}</p>
          <p className="text-zinc-400 text-xs">Added: {facebook.date_added}</p>
        </div>
      </CardContent>
    </Card>
  )
}
