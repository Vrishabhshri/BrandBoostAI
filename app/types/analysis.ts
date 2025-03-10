export interface AnalysisMetrics {
  followers: number | null;
  likes: number | null;
  engagement: 'high' | 'medium' | 'low';
  trending: boolean;
}

export interface AnalysisBasicInfo {
  description: string;
  summary: string;
}

export interface AnalysisData {
  basicInfo: AnalysisBasicInfo;
  metrics: AnalysisMetrics;
}

export interface Analysis {
  analysis: AnalysisData;
  analyzedAt: string;
  originalData: unknown;
} 
