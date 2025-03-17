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
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              {loading ? "Searching..." : "General Search"}
            </Button>
            <Button 
              type="button"
              onClick={handleTwitterSearch}
              disabled={isTwitterLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Twitter className="h-4 w-4" />
              {isTwitterLoading ? "Searching..." : "Twitter Search"}
            </Button>
          </div>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {(loading || companyInfo) && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {loadingStates.title ? <LoadingSpinner /> : companyInfo?.name}
              </h3>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  {loadingStates.description ? <LoadingSpinner /> : companyInfo?.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm">Followers</h4>
                  <p className="text-lg">
                    {loadingStates.social ? <LoadingSpinner /> : 
                      companyInfo?.socialStats.followers?.toLocaleString() ?? "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm">Likes</h4>
                  <p className="text-lg">
                    {loadingStates.social ? <LoadingSpinner /> : 
                      companyInfo?.socialStats.likes?.toLocaleString() ?? "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm">Tweets</h4>
                  <p className="text-lg">
                    {loadingStates.social ? <LoadingSpinner /> : 
                      companyInfo?.socialStats.tweets?.toLocaleString() ?? "N/A"}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Top Competitors:</h4>
                {loadingStates.competitors ? (
                  <LoadingSpinner />
                ) : (
                  <ul className="list-disc list-inside">
                    {companyInfo?.topCompetitors.map((competitor) => (
                      <li key={competitor}>{competitor}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Hashtags:</h4>
                {loadingStates.hashtags ? (
                  <LoadingSpinner />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {companyInfo?.hashtags.map((tag) => (
                      <span key={tag} className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Company'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {twitterData && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Twitter Data</h3>
              <div className="flex gap-2">
                <Button
                  onClick={handleAnalyzeTweets}
                  disabled={isAnalyzing}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Loader2 className={cn("h-4 w-4", isAnalyzing && "animate-spin")} />
                  {isAnalyzing ? "Analyzing..." : "Analyze Tweets"}
                </Button>
                <Button
                  onClick={handleSaveTwitterData}
                  disabled={isSaving || !twitterData.analysis}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Analysis"}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {twitterData.name}</p>
              <p><span className="font-medium">ID:</span> {twitterData.id}</p>
              <p><span className="font-medium">Description:</span> {twitterData.description}</p>
              
              <div className="space-y-2">
                <h4 className="font-medium">Recent Tweets:</h4>
                {twitterData.tweets.map((tweet, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm">{tweet.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(tweet.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {twitterData.analysis && (
              <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold">Analysis</h4>
                <div className="grid gap-4">
                  <div>
                    <p className="font-medium">Sentiment</p>
                    <p className="text-sm">{twitterData.analysis.sentiment} ({twitterData.analysis.sentimentScore})</p>
                  </div>
                  <div>
                    <p className="font-medium">Summary</p>
                    <p className="text-sm">{twitterData.analysis.summary}</p>
                  </div>
                  <div>
                    <p className="font-medium">Trends</p>
                    <div className="flex flex-wrap gap-2">
                      {twitterData.analysis.trends.map((trend, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                          {trend}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Key Insights</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {twitterData.analysis.keyInsights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
