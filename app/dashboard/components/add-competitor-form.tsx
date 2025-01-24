"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
