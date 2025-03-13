"use client"

import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import { NavHeader } from "../components/navHeader"
import { CompetitorCard } from "../components/competitor-card"
import { Chat } from "../components/chat"
import CompetitorAnalysis from './competitor-analysis'
import { Button } from "@/components/ui/button"

interface CompanyData {
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
}

export default function CompetitorDashboardPage() {
  const [competitors, setCompetitors] = useState<CompanyData[]>([])
  const [pinnedCompanies, setPinnedCompanies] = useState<CompanyData[]>([]) // State for pinned companies
  const [lastRefreshed, setLastRefreshed] = useState<string>('')
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null) // State for selected pinned company

  const handleLoadCompetitor = (competitor: CompanyData) => {
    setCompetitors((prev) => [...prev, competitor])
  }

  const handlePinCompany = (company: CompanyData) => {
    if (!pinnedCompanies.some(pinned => pinned.name === company.name)) {
      setPinnedCompanies((prev) => [...prev, company])
    }
  }

  const handleUnpinCompany = (company: CompanyData) => {
    setPinnedCompanies((prev) => prev.filter(pinned => pinned.name !== company.name))
  }

  const handleViewCompany = (company: CompanyData) => {
    setSelectedCompany(company); // Set the selected company to display its full card
  }

  const handleUnviewCompany = () => {
    setSelectedCompany(null); // Clear the selected company
  }

  // Function to format the date
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options) + ' CDT';
  };

  useEffect(() => {
    const now = new Date();
    setLastRefreshed(formatDate(now));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900">
      <NavHeader />
      <div className="flex flex-1">
        <aside className="w-[300px] border-r border-zinc-800 bg-zinc-900 flex flex-col">
          <Chat />
        </aside>
        
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">
              Competitor Dashboard
            </h1>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <RefreshCw className="h-4 w-4" />
              Last refreshed {lastRefreshed}
            </div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <CompetitorAnalysis onPinCompany={handlePinCompany} />
          </div>

          {/* Render pinned companies in a scrollable container */}
          <h2 className="text-lg font-semibold text-white mt-6">Pinned Companies</h2>
          <div className="max-h-[300px] overflow-y-auto flex flex-wrap justify-center items-start mt-4 border border-zinc-700 rounded-lg p-4 bg-zinc-800 shadow-md">
            {pinnedCompanies.map((company) => (
              <div
                key={company.name}
                className="m-2" // Add margin for spacing
              >
                <CompetitorCard 
                  {...company} 
                  onPin={() => handlePinCompany(company)} 
                  onUnpin={() => handleUnpinCompany(company)} // Pass the unpin function
                  onView={() => handleViewCompany(company)} // Pass the view function
                />
              </div>
            ))}
          </div>

          {/* Display the selected pinned company card */}
          {selectedCompany && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white">Selected Company</h2>
              <CompetitorCard 
                {...selectedCompany} 
                onPin={() => handlePinCompany(selectedCompany)} 
                onUnpin={() => handleUnpinCompany(selectedCompany)} 
                onView={() => handleViewCompany(selectedCompany)} 
              />
              <Button 
                onClick={handleUnviewCompany} 
                className="mt-4 bg-red-500 text-white hover:bg-red-600"
              >
                Unview
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

