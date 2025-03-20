"use client"

import { useRef, useState, useEffect } from 'react'
import NavHeader from "../components/navHeaderNew";
import PageChat from "../components/pageChat"
import Image from 'next/image';
import { RotateCw, X } from 'lucide-react'
import { Karla } from 'next/font/google'
import CompetitorCard from '../components/competitor-card-new';

const karla = Karla({ subsets: ['latin'] })

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
  postingWords?: string[];
  commentingWords?: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (companyName: string) => Promise<void>;
}

interface SocialMediaMetrics {
  followers: string;
  engagements: string;
  change: number;
}

interface SocialMediaData {
  [key: string]: SocialMediaMetrics;
}

const SearchModal = ({ isOpen, onClose, onSearch }: SearchModalProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setIsLoading(true);
    setError('');
    
    try {
      await onSearch(searchInput.trim());
      onClose();
    } catch (err) {
      setError('Failed to search for company. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#302f2f] rounded-lg p-6 w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-semibold text-white mb-4">Search Company</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter company name..."
              className="w-full px-4 py-2 bg-[#ffffff19] border border-[#ffffff33] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white hover:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-white text-[#302f2f] rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function CompetitorDashboardPage() {
  const [competitors, setCompetitors] = useState<CompanyData[]>([{
    name: "Target",
    description: "Target Corporation is an American retail corporation headquartered in Minneapolis, Minnesota. It is the eighth-largest retailer in the United States, and a component of the S&P 500 Index.",
    instagram: {
      followers: 2700000,
      increase_percentage: 20.1,
      hashtags: ["#target", "#targetstyle", "#targetfinds"],
      content: ""
    },
    facebook: {
      followers: 5300000,
      increase_percentage: 2.1,
      hashtags: ["#target", "#targetstyle", "#targetfinds"],
      content: ""
    },
    postingWords: ["spring", "floral", "pizza", "garden", "collab"],
    commentingWords: ["DEI", "Costco", "shop", "collab", "love"]
  }]);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [activeTabs, setActiveTabs] = useState<{ [key: string]: string }>({
    "Target": "target" // Default tab for Target
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const brandWords = ["spring", "floral", "pizza", "garden", "collab"]
  const commentWords = ["DEI", "Costco", "shop", "collab", "love"]
  const socialMediaMetrics: SocialMediaData = {
    target: {"followers": "6.1M", "engagements": "1.5M", "change": 20.1},
    facebook: {"followers": "5.3M", "engagements": "770K", "change": 2.1},
    instagram: {"followers": "2.7M", "engagements": "650K", "change": -8.1},
    tiktok: {"followers": "3.9M", "engagements": "3.5M", "change": -3.1},
    twitter: {"followers": "4.3M", "engagements": "2.5M", "change": 5.1}
  }

  const changeTab = (tab: string, companyName: string) => {
    setActiveTabs(prev => ({
      ...prev,
      [companyName]: tab
    }));
  };

  const refreshDate = () => {
    setLastRefresh(new Date());
  }

  const handleLoadCompetitor = (competitor: CompanyData) => {
    setCompetitors((prev) => [...prev, competitor])
  }

  const handleSearchCompany = async (companyName: string) => {
    try {
      console.log('Searching for company:', companyName);
      const response = await fetch(`/api/search-competitor?name=${encodeURIComponent(companyName)}&field=social`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch company data');
      }
      
      console.log('API Response:', data);
      
      // Transform the API response to match our CompanyData interface
      const newCompetitor: CompanyData = {
        name: companyName,
        description: data.description || '',
        instagram: {
          followers: data.social?.followers || 0,
          increase_percentage: 0,
          hashtags: data.hashtags || [],
          content: ''
        },
        facebook: {
          followers: data.social?.followers || 0,
          increase_percentage: 0,
          hashtags: data.hashtags || [],
          content: ''
        },
        postingWords: data.postingWords || brandWords,
        commentingWords: data.commentingWords || commentWords
      };

      console.log('New competitor data:', newCompetitor);
      setCompetitors(prev => [...prev, newCompetitor]);
      console.log('Updated competitors array:', [...competitors, newCompetitor]);
    } catch (error) {
      console.error('Error searching company:', error);
      throw error;
    }
  };

  // Add a function to get metrics for a competitor
  const getCompetitorMetrics = (competitor: CompanyData, tab: string) => {
    // For Target, use the predefined metrics
    if (competitor.name === "Target") {
      return socialMediaMetrics[tab] || socialMediaMetrics["target"];
    }
    
    // For other competitors, use their social media data
    const platform = tab === "target" ? "instagram" : tab;
    const metrics = competitor[platform as keyof CompanyData] as { followers: number, increase_percentage: number };
    
    if (!metrics) {
      return {
        followers: "0",
        engagements: "0",
        change: 0
      };
    }

    return {
      followers: metrics.followers.toLocaleString(),
      engagements: "0",
      change: metrics.increase_percentage
    };
  };

  // const handlePinCompany = (company: CompanyData) => {
  //   if (!pinnedCompanies.some(pinned => pinned.name === company.name)) {
  //     setPinnedCompanies((prev) => [...prev, company])
  //   }
  // }

  // const handleUnpinCompany = (company: CompanyData) => {
  //   setPinnedCompanies((prev) => prev.filter(pinned => pinned.name !== company.name))
  // }

  // const handleViewCompany = (company: CompanyData) => {
  //   setSelectedCompany(company); // Set the selected company to display its full card
  // }

  // const handleUnviewCompany = () => {
  //   setSelectedCompany(null); // Clear the selected company
  // }

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
    setLastRefresh(now);
  }, []);

  return (
    <div className={`flex min-h-screen flex-col bg-[#302f2f] overflow-x-hidden ${karla.className} font-medium`}>

      {/* Nav container */}
      <NavHeader/>

      {/* Main Content */}
      <div className={`relative bg-radial-gradient
                      flex flex-row`}>

        {/* Overlay Gray */}
        <div className='absolute inset-0 bg-[#302f2f] opacity-90'></div>

        {/* Container of main content */}
        <div className='relative z-10 flex flex-row h-[calc(100vh-68px)] w-screen'>

          <PageChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

          {/* Page Content */}
          <div className='w-full h-full p-7 flex-grow overflow-y-auto custom-scrollbar'>

              <div className='flex flex-row gap-12 mb-5'>

                {/* Title div */}
                <div className='w-[400px] flex flex-col'>

                  <span className='text-white text-[2.5rem]'>Competitor Dashboard</span>

                  <div className='flex flex-row items-center gap-2'>
                    <RotateCw className='w-4 h-4 text-white cursor-pointer' onClick={refreshDate}/>
                    <span className='text-[#ffffff]'>Last refreshed: {lastRefresh ? lastRefresh.toISOString() : 'Loading...'}</span>
                  </div>

                </div>

                {/* Add Competitor Button */}
                <div 
                  className='flex jusify-center items-center text-white px-[100px] py-10 rounded-[2rem]
                            border border-white border-dashed cursor-pointer w-[300px]'
                  onClick={() => setIsSearchModalOpen(true)}
                >
                  <span>Add Competitor</span>
                </div>

              </div>

              <div className='w-full h-[74%]'>
                {/* Competitor cards container */}
                <div className='flex flex-wrap gap-6'>
                  
                  <CompetitorCard cardName={competitors[0].name} description={competitors[0].description} 
                                postingWords={competitors[0].postingWords} commentingWords={competitors[0].commentingWords} />

                  {/* New competitor cards */}
                  {competitors.slice(1).map((competitor, index) => (
                    <CompetitorCard key={index} cardName={competitor.name} description={competitor.description} 
                    postingWords={competitor.postingWords} commentingWords={competitor.commentingWords} />
                  ))}
                </div>
              </div>

          </div>

        </div>

      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearchCompany}
      />

    </div>
  )
}

