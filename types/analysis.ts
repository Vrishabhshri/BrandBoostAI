export interface Analysis {
  fileName: string;
  analyzedAt: string;
  originalData: any;
  analysis: {
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
  };
} 