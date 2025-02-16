"use client"

import { useState } from 'react'
import { Instagram, Facebook, Linkedin, Trash2, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DialogClose } from "@/components/ui/dialog"

interface CompanyData {
  name: string;
  instagram: {
    followers: number;
    increase_percentage: number;
    hashtags: string[];
    content: string;
  }[];
  facebook: {
    followers: number;
    increase_percentage: number;
    hashtags: string[];
    content: string;
  }[];
}

interface CompetitorFormProps {
  onLoadCompetitor: (competitor: CompanyData) => void;
}

export function CompetitorForm({ onLoadCompetitor }: CompetitorFormProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/search-competitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      })
      const data = await response.json()
      if (response.ok && data.company) {
        setCompanyData(data.company)
      } else {
        setError('Company not found')
      }
    } catch (err) {
      setError('Failed to fetch company data')
    } finally {
      setLoading(false)
    }
  }

  const handleLoadData = () => {
    if (companyData) {
      onLoadCompetitor(companyData)
      setCompanyData(null)
      setSearchTerm('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-zinc-400" />
          <span className="text-sm text-zinc-400">Search Company</span>
        </div>
        <div className="flex gap-2">
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Company name"
            className="bg-zinc-900 border-zinc-700 text-white"
          />
          <Button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {companyData && (
        <>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5 text-zinc-400" />
              <span className="text-sm text-zinc-400">Instagram</span>
            </div>
            <Input 
              value={companyData.instagram[0]?.followers.toLocaleString() || ''}
              readOnly
              placeholder="Followers"
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Facebook className="h-5 w-5 text-zinc-400" />
              <span className="text-sm text-zinc-400">Facebook</span>
            </div>
            <Input 
              value={companyData.facebook[0]?.followers.toLocaleString() || ''}
              readOnly
              placeholder="Followers"
              className="bg-zinc-900 border-zinc-700 text-white"
            />
          </div>
        </>
      )}
      <div className="flex justify-between pt-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-zinc-400 hover:text-zinc-300"
          onClick={() => {
            setCompanyData(null)
            setSearchTerm('')
            setError(null)
          }}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
        <DialogClose asChild>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={!companyData}
            onClick={handleLoadData}
          >
            Load in data
          </Button>
        </DialogClose>
      </div>
    </div>
  )
}

