"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { MetricCard } from "../components/metric-card";
import { RecommendationList } from "../components/recommendation-list";
import { Analysis } from "@/types/analysis";

const AnalysesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fileName = searchParams.get('file');
    if (fileName) {
      fetchAnalysis(fileName);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    // Redirect to the default analysis view
    router.push('/dashboard/analyses/default.json');
  }, [router]);

  const fetchAnalysis = async (fileName: string) => {
    try {
      const response = await fetch(`/dashboard/analyses/default.json`);
      if (!response.ok) throw new Error('Failed to fetch analysis');
      const data = await response.json();
      setAnalysis(data.data);
    } catch (error) {
      console.error('Error loading analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-8 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">No analysis selected</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Analysis Results</h1>
      
      {/* Display the analysis using your existing components */}
      <Card>
        <CardHeader>
          <CardTitle>{analysis.fileName}</CardTitle>
          <p className="text-sm text-gray-500">
            Analyzed at: {new Date(analysis.analyzedAt).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-2">
            <h3 className="font-semibold">Overview</h3>
            <p className="text-gray-600">{analysis.analysis.basicInfo.description}</p>
            <p className="text-sm text-gray-600">{analysis.analysis.basicInfo.summary}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              title="Followers"
              value={analysis.analysis.metrics.followers?.toLocaleString() ?? 'N/A'}
            />
            <MetricCard
              title="Likes"
              value={analysis.analysis.metrics.likes?.toLocaleString() ?? 'N/A'}
            />
            <MetricCard
              title="Engagement"
              value={analysis.analysis.metrics.engagement}
              className={analysis.analysis.metrics.engagement === 'high' ? 'text-green-600' : 'text-yellow-600'}
            />
            <MetricCard
              title="Trending"
              value={analysis.analysis.metrics.trending ? 'Yes' : 'No'}
              className={analysis.analysis.metrics.trending ? 'text-green-600' : 'text-gray-600'}
            />
          </div>

          {/* Original Data */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Original Data</h3>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
              {JSON.stringify(analysis.originalData, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AnalysesPage />
  </Suspense>
);

export default Page; 