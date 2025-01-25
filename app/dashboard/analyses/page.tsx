"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "../components/metric-card";
import { RecommendationList } from "../components/recommendation-list";

interface Analysis {
  basicInfo: {
    name: string | null;
    description: string | null;
    summary: string;
  };
  metrics: {
    followers: number | null;
    likes: number | null;
    engagement: string;
    trending: boolean;
  };
  sentiment: {
    sentiment: string;
    sentimentScore: number;
    keyPhrases: string[];
    emotionalTone: string;
  };
  recommendations: {
    recommendations: string[];
    improvements: string[];
    opportunities: string[];
  };
  analyzedAt: string;
}

export default function AnalysesPage() {
  const router = useRouter();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await fetch('/twitter-analysis.json');
        if (!response.ok) throw new Error('Failed to fetch analyses');
        const data = await response.json();
        setAnalyses(data);
      } catch (error) {
        console.error('Error loading analyses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const handleViewDetails = (index: number) => {
    router.push(`/dashboard/analyses/${index}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Twitter Analyses</h1>
      
      {analyses.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">No analyses found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {analyses.map((analysis, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{analysis.basicInfo.name || 'Unnamed Analysis'}</CardTitle>
                  <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {new Date(analysis.analyzedAt).toLocaleString()}
                  </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(index)}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Overview</h3>
                  <p className="text-gray-600">{analysis.basicInfo.description}</p>
                  <p className="text-sm text-gray-600">{analysis.basicInfo.summary}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MetricCard
                    title="Followers"
                    value={analysis.metrics.followers?.toLocaleString() ?? 'N/A'}
                  />
                  <MetricCard
                    title="Likes"
                    value={analysis.metrics.likes?.toLocaleString() ?? 'N/A'}
                  />
                  <MetricCard
                    title="Engagement"
                    value={analysis.metrics.engagement}
                    className={analysis.metrics.engagement === 'high' ? 'text-green-600' : 'text-yellow-600'}
                  />
                  <MetricCard
                    title="Trending"
                    value={analysis.metrics.trending ? 'Yes' : 'No'}
                    className={analysis.metrics.trending ? 'text-green-600' : 'text-gray-600'}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold">Sentiment Analysis</h3>
                  <div className="grid gap-3">
                    <div>
                      <span className="font-medium">Overall Sentiment: </span>
                      <span className={`${
                        analysis.sentiment.sentiment === 'positive' ? 'text-green-600' :
                        analysis.sentiment.sentiment === 'negative' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {analysis.sentiment.sentiment} ({analysis.sentiment.sentimentScore})
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Emotional Tone: </span>
                      <span className="text-gray-600">{analysis.sentiment.emotionalTone}</span>
                    </div>
                    <div>
                      <span className="font-medium">Key Phrases: </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {analysis.sentiment.keyPhrases.map((phrase, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Recommendations</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <RecommendationList
                      title="Action Items"
                      items={analysis.recommendations.recommendations}
                    />
                    <RecommendationList
                      title="Improvements"
                      items={analysis.recommendations.improvements}
                    />
                    <RecommendationList
                      title="Opportunities"
                      items={analysis.recommendations.opportunities}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 