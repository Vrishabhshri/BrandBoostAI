// Keep only the types that are actually being used
export interface CompanyInfo {
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

export interface TwitterData {
  name: string;
  id: string;
  description: string;
  tweets: {
    text: string;
    createdAt: string;
  }[];
  analysis?: TweetAnalysis;
}

export interface TweetAnalysis {
  sentiment: string;
  sentimentScore: number;
  trends: string[];
  summary: string;
  keyInsights: string[];
} 