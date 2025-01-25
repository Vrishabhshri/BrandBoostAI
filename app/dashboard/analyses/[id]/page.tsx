"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { MetricCard } from "../../components/metric-card";
import { RecommendationList } from "../../components/recommendation-list";

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch('/twitter-analysis.json');
        if (!response.ok) throw new Error('Failed to fetch analysis');
        const data = await response.json();
        const selectedAnalysis = data[Number(params.id)];
        if (!selectedAnalysis) throw new Error('Analysis not found');
        setAnalysis(selectedAnalysis);
      } catch (error) {
        console.error('Error loading analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container mx-auto py-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Analyses
        </Button>
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">Analysis not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Analyses
        </Button>
        <span className="text-sm text-gray-500">
          {new Date(analysis.analyzedAt).toLocaleString()}
        </span>
      </div>

      <Card>
        {/* Existing card content from the analyses page, but with more detailed information */}
      </Card>
    </div>
  );
} 