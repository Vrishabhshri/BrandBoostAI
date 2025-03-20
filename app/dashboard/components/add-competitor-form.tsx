"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Save, Search, Twitter } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CompanyInfo {
  name: string;
  description: string;
  hashtags: string[];
  topCompetitors: string[];
  socialStats: {
    followers: number | null;
    likes: number | null;
    tweets: number | null;
  };
}

interface LoadingStates {
  title: boolean;
  description: boolean;
  social: boolean;
  competitors: boolean;
  hashtags: boolean;
}

interface TweetAnalysis {
  sentiment: string;
  sentimentScore: number;
  trends: string[];
  summary: string;
  keyInsights: string[];
}

interface TwitterData {
  name: string;
  id: string;
  description: string;
  tweets: {
    text: string;
    createdAt: string;
  }[];
  analysis?: TweetAnalysis;
}

export function AddCompetitorForm() {
  const [companyName, setCompanyName] = useState("");
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    title: false,
    description: false,
    social: false,
    competitors: false,
    hashtags: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [twitterData, setTwitterData] = useState<TwitterData | null>(null);
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  // Define the missing variables
  const [fileContent, setFileContent] = useState(""); // Adjust type as needed
  const [fileType, setFileType] = useState("competitor"); // Default value
  const [description, setDescription] = useState(""); // Adjust type as needed
  const [currentUser, setCurrentUser] = useState<{ id: number } | null>(null); // State for current user

  // Fetch current user (replace with your actual user fetching logic)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      // Replace with your actual API call or context logic
      const response = await fetch('/api/current-user'); // Example endpoint
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
      } else {
        console.error('Failed to fetch current user');
      }
    };

    fetchCurrentUser();
  }, []);

  const fetchCompanyInfo = async () => {
    const response = await fetch(`/api/company-info?name=${encodeURIComponent(companyName)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCompanyInfo(null);
    
    // Reset loading states
    setLoadingStates({
      title: true,
      description: true,
      social: true,
      competitors: true,
      hashtags: true,
    });

    try {
      const data = await fetchCompanyInfo();
      setCompanyInfo(data);
    } catch (error: any) {
      console.error("Error fetching company info:", error);
      setError(error.message || "An error occurred while fetching company information.");
    } finally {
      setLoading(false);
      setLoadingStates({
        title: false,
        description: false,
        social: false,
        competitors: false,
        hashtags: false,
      });
    }
  };

  const handleSave = async () => {
    if (!companyInfo || !currentUser) return; // Ensure currentUser is available

    setIsSaving(true);
    try {
      const dataToSave = {
        userId: currentUser.id, // Use the actual user ID
        companyName: companyName,
        fileContent: fileContent,
        fileType: fileType,
        description: description,
      };

      console.log('Data to save:', dataToSave); // Log the data being sent

      const response = await fetch('/api/save-company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from API:', errorData); // Log the error response
        throw new Error(errorData.error || 'Failed to save company');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error in handleSave:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTwitterSearch = async () => {
    if (!companyName) return;
    
    setIsTwitterLoading(true);
    setError(null);
    setTwitterData(null);

    try {
      const response = await fetch(`/api/twitter-search?name=${encodeURIComponent(companyName)}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit reached. Please try again in a few minutes.');
        }
        throw new Error(data.error || 'Failed to fetch Twitter data');
      }

      setTwitterData(data);
    } catch (error: any) {
      console.error('Twitter search error:', error);
      setError(error.message || 'Failed to fetch Twitter data');
    } finally {
      setIsTwitterLoading(false);
    }
  };

  const handleAnalyzeTweets = async () => {
    if (!twitterData) return;

    setIsAnalyzing(true);
    try {
      console.log('Analyzing tweets with data:', twitterData); // Log the data being sent

      const response = await fetch('/api/analyze-tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(twitterData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from API:', errorData); // Log the error response
        throw new Error(errorData.error || 'Failed to analyze tweets');
      }

      const analysis = await response.json();
      setTwitterData(prev => prev ? { ...prev, analysis } : null);
      toast.success('Tweets analyzed successfully');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze tweets');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveTwitterData = async () => {
    if (!twitterData) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-twitter-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(twitterData),
      });

      if (!response.ok) {
        throw new Error('Failed to save Twitter data');
      }

      toast.success('Twitter data saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save Twitter data');
    } finally {
      setIsSaving(false);
    }
  };

  const handleViewFile = async (fileName: string) => {
    try {
      router.push(`/dashboard/analyses/${encodeURIComponent(fileName)}`);
    } catch (error) {
      console.error('Error viewing file:', error);
      toast.error('Failed to view file');
    }
  };

  const LoadingSpinner = () => (
    <Loader2 className="h-4 w-4 animate-spin" />
  );

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name..."
          className="flex-1 bg-[#ffffff19] border-[#ffffff33] text-white placeholder:text-gray-400"
        />
        <Button type="submit" disabled={loading} className="bg-[#ffffff19] hover:bg-[#ffffff33] text-white">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Company Info Card */}
      {companyInfo && (
        <Card className="bg-[#ffffff19] border-[#ffffff33] backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white">{companyInfo.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Description</h3>
              <p className="text-sm text-gray-200">{companyInfo.description}</p>
            </div>

            {/* Social Stats */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Social Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#ffffff19] p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Followers</p>
                  <p className="text-lg font-semibold text-white">{companyInfo.socialStats.followers?.toLocaleString() || 'N/A'}</p>
                </div>
                <div className="bg-[#ffffff19] p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Likes</p>
                  <p className="text-lg font-semibold text-white">{companyInfo.socialStats.likes?.toLocaleString() || 'N/A'}</p>
                </div>
                <div className="bg-[#ffffff19] p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Tweets</p>
                  <p className="text-lg font-semibold text-white">{companyInfo.socialStats.tweets?.toLocaleString() || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Hashtags */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {companyInfo.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#ffffff19] text-white rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Competitors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Top Competitors</h3>
              <div className="space-y-2">
                {companyInfo.topCompetitors.map((competitor, index) => (
                  <div
                    key={index}
                    className="bg-[#ffffff19] p-3 rounded-lg text-white"
                  >
                    {competitor}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#ffffff19] hover:bg-[#ffffff33] text-white"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save
              </Button>
              <Button
                onClick={handleTwitterSearch}
                disabled={isTwitterLoading}
                className="bg-[#ffffff19] hover:bg-[#ffffff33] text-white"
              >
                <Twitter className="h-4 w-4 mr-2" />
                {isTwitterLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search Twitter"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Twitter Data Card */}
      {twitterData && (
        <Card className="bg-[#ffffff19] border-[#ffffff33] backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white">Twitter Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Twitter Profile */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Profile</h3>
              <p className="text-sm text-gray-200">{twitterData.description}</p>
            </div>

            {/* Tweets */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Recent Tweets</h3>
              <div className="space-y-3">
                {twitterData.tweets.map((tweet, index) => (
                  <div
                    key={index}
                    className="bg-[#ffffff19] p-3 rounded-lg"
                  >
                    <p className="text-sm text-gray-200">{tweet.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{tweet.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis */}
            {twitterData.analysis && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-300">Analysis</h3>
                <div className="bg-[#ffffff19] p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Sentiment</p>
                    <p className="text-sm text-white">{twitterData.analysis.sentiment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Summary</p>
                    <p className="text-sm text-white">{twitterData.analysis.summary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Key Insights</p>
                    <ul className="list-disc list-inside text-sm text-white">
                      {twitterData.analysis.keyInsights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {!twitterData.analysis && (
                <Button
                  onClick={handleAnalyzeTweets}
                  disabled={isAnalyzing}
                  className="bg-[#ffffff19] hover:bg-[#ffffff33] text-white"
                >
                  {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze Tweets"}
                </Button>
              )}
              <Button
                onClick={handleSaveTwitterData}
                disabled={isSaving}
                className="bg-[#ffffff19] hover:bg-[#ffffff33] text-white"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Twitter Data
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
