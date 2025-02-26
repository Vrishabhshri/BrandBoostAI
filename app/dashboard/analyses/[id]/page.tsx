"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, FileSearch, FileText } from "lucide-react";
import { MetricCard } from "../../components/metric-card";
import { toast } from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Analysis } from "@/types/analysis";

interface FileInfo {
  name: string;
  createdAt: string;
  path: string;
}

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  // Fetch available files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/list-files');
        if (!response.ok) throw new Error('Failed to fetch files');
        const data = await response.json();
        setFiles(data);
        // If ID is provided in URL, set it as selected file
        if (params.id) {
          const file = data.find((f: FileInfo) => f.name === params.id);
          if (file) setSelectedFile(file.name);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
        toast.error('Failed to load files');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [params.id]);

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setAnalyzing(true);
    try {
      const response = await fetch(`/api/view-file?name=${selectedFile}`);
      if (!response.ok) throw new Error('Failed to analyze file');
      const data = await response.json();
      
      console.log('Fetched data:', data); // Log the fetched data

      const analysisResponse = await fetch('/api/analyze-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!analysisResponse.ok) {
        throw new Error('Failed to analyze file');
      }

      const analysisData = await analysisResponse.json();
      console.log('Analysis data:', analysisData); // Log the analysis data

      setAnalysis(analysisData);
      toast.success('Analysis complete');
    } catch (error) {
      console.error('Error analyzing file:', error);
      toast.error('Failed to analyze file');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
    // Clear previous analysis when new file is selected
    setAnalysis(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
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
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            File Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select File to Analyze</label>
                <Select
                  value={selectedFile || ""}
                  onValueChange={handleFileSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a file..." />
                  </SelectTrigger>
                  <SelectContent>
                    {files.map((file) => (
                      <SelectItem key={file.name} value={file.name}>
                        <div className="flex justify-between items-center w-full">
                          <span>{file.name}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(file.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || analyzing}
                  className="flex items-center gap-2"
                >
                  {analyzing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileSearch className="h-4 w-4" />
                  )}
                  {analyzing ? 'Analyzing...' : 'Analyze Selected File'}
                </Button>
              </div>
            </div>
          </div>

          {/* Show selected file content before analysis */}
          {selectedFile && !analysis && (
            <div className="space-y-2 border-t pt-4">
              <h3 className="font-semibold">Selected File Content</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Click "Analyze" to process {selectedFile}
                </p>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6 border-t pt-6">
              <h3 className="font-semibold">Analysis Results</h3>
              
              {/* Basic Info */}
              <div className="space-y-2">
                <h4 className="font-medium">Overview</h4>
                <p className="text-gray-600">{analysis.analysis.basicInfo?.description || 'No description available'}</p>
                <p className="text-sm text-gray-600">{analysis.analysis.basicInfo?.summary || 'No summary available'}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                  title="Followers"
                  value={analysis.analysis.metrics?.followers?.toLocaleString() ?? 'N/A'}
                />
                <MetricCard
                  title="Likes"
                  value={analysis.analysis.metrics?.likes?.toLocaleString() ?? 'N/A'}
                />
                <MetricCard
                  title="Engagement"
                  value={analysis.analysis.metrics?.engagement}
                  className={analysis.analysis.metrics?.engagement === 'high' ? 'text-green-600' : 'text-yellow-600'}
                />
                <MetricCard
                  title="Trending"
                  value={analysis.analysis.metrics?.trending ? 'Yes' : 'No'}
                  className={analysis.analysis.metrics?.trending ? 'text-green-600' : 'text-gray-600'}
                />
              </div>

              {/* Original Data */}
              <div className="space-y-2">
                <h4 className="font-medium">Original Data</h4>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(analysis.originalData, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 