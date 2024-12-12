"use client"

import { useState, useEffect, useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CompanyInfo } from "./company-info"
import competitorData from '../data/competitor.json'

interface Tweet {
  tweet_id: string;
  author_id: string;
  inbound: boolean;
  created_at: string;
  text: string;
  response_tweet_id?: string;
}

interface SentimentData {
  month: string;
  average_score: number;
  positive: number;
  negative: number;
  neutral: number;
}

interface ServiceIssue {
  title: string;
  description: string;
}

interface AmazonAnalysis {
  timestamp: string;
  issues: ServiceIssue[];
  recommendations: ServiceIssue[];
}

interface GeminiAnalysis {
  type: string;
  content: string;
  error?: boolean;
  data?: {
    tweets?: Tweet[];
    sentiment?: SentimentData[];
    analysis?: AmazonAnalysis;
  };
}

interface Message {
  id: number;
  text: string | GeminiAnalysis;
  isUser: boolean;
  type?: 'analysis' | 'dataset' | 'error';
}

interface CompanyData {
  name: string;
  instagram: {
    followers: number;
    content: string;
    date_added: string;
  }[];
  facebook: {
    followers: number;
    content: string;
    date_added: string;
  }[];
}

const CHAT_PATTERNS = {
  tweets: /\b(tweets?|interactions?)\b/i,
  sentiment: /\b(sentiment|mood|feeling)\b/i,
  analysis: /\b(analysis|issues|recommendations)\b/i,
  timeRange: /\b(\d{4}-\d{2}|\d{4})\b/,
} as const;

const CHAT_HELP = {
  commands: [
    {
      type: 'Company Info',
      examples: ['Tell me about Target', 'What is Amazon'],
      description: 'Get general company information'
    },
    {
      type: 'Sentiment Analysis',
      examples: ['Show sentiment trends', 'Customer satisfaction'],
      description: 'Analyze customer sentiment data'
    },
    {
      type: 'Trend Analysis',
      examples: ['Show trends', 'Pattern analysis'],
      description: 'Identify patterns and changes'
    },
    {
      type: 'Data Analysis',
      examples: ['Analyze issues', 'Show problems'],
      description: 'Deep dive into specific issues'
    }
  ]
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Welcome! Add competitors to your dashboard to get started. You can also brainstorm potential competitors in the chat.", 
      isUser: false 
    },
  ])
  const [input, setInput] = useState('')
  const [companyData, setCompanyData] = useState<CompanyData[]>([])
  const [mentionedCompany, setMentionedCompany] = useState<CompanyData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showCompanyData, setShowCompanyData] = useState(false)

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setCompanyData(competitorData.companies)
      } catch (error) {
        console.error('Failed to load company data:', error)
      }
    }
    fetchCompanyData()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const analyzeCompany = async (companyName: string, type: string = 'dataset') => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/gemini?name=${companyName}&type=${type}`);
      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: `Error: ${data.error}`,
          isUser: false,
          type: 'error'
        }]);
        return;
      }

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: data.analysis.content,
        isUser: false,
        type: type as 'analysis' | 'dataset'
      }]);

      if (data.staticData?.name) {
        setMentionedCompany(data.staticData);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'Failed to fetch analysis. Please try again.',
        isUser: false,
        type: 'error'
      }]);
    } finally {
      setIsLoading(false)
    }
  }

  const generateResponse = async (userInput: string) => {
    const text = userInput.toLowerCase();
    
    // Determine which data sources to query based on input patterns
    const queryTypes = {
      tweets: CHAT_PATTERNS.tweets.test(text),
      sentiment: CHAT_PATTERNS.sentiment.test(text),
      analysis: CHAT_PATTERNS.analysis.test(text),
    };

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: text,
          queryTypes,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: `Error: ${data.error}`,
          isUser: false,
          type: 'error'
        }]);
        return;
      }

      // Add response to messages
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: {
          type: 'analysis',
          content: data.analysis.content,
          data: data.analysis.data
        },
        isUser: false,
        type: 'analysis'
      }]);

    } catch (error) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'Failed to analyze data. Please try again.',
        isUser: false,
        type: 'error'
      }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: input,
      isUser: true
    }]);

    const userInput = input;
    setInput('');

    await generateResponse(userInput);
  };

  const renderMessage = (message: Message) => {
    if (typeof message.text === 'string') {
      return message.text;
    }
    
    if (typeof message.text === 'object' && 'content' in message.text) {
      const analysis = message.text as GeminiAnalysis;
      
      // Render different data types
      if (analysis.data?.tweets) {
        return (
          <div className="space-y-2">
            <p>{analysis.content}</p>
            <div className="mt-2 space-y-1">
              {analysis.data.tweets.map((tweet, index) => (
                <div key={index} className="text-sm border-l-2 border-zinc-700 pl-2">
                  <span className="text-zinc-400">{new Date(tweet.created_at).toLocaleDateString()}</span>
                  <p className="text-zinc-200">{tweet.text}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      return analysis.content;
    }

    return 'Invalid message format';
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-zinc-900">
      <div className="px-4 py-3 border-b border-zinc-800">
        <h2 className="text-sm font-medium text-white">Page chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-full rounded-lg p-3 text-sm
                ${message.isUser 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-zinc-800 text-zinc-300'
                }
                ${message.type === 'error' ? 'bg-red-900/50 text-red-200' : ''}
              `}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{renderMessage(message)}</p>
            </div>
          </div>
        ))}
        
        {showCompanyData && mentionedCompany && (
          <div className="my-4 border-t border-zinc-800 pt-4 bg-zinc-900/95">
            <CompanyInfo
              name={mentionedCompany.name}
              instagram={mentionedCompany.instagram[0]}
              facebook={mentionedCompany.facebook[0]}
            />
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-zinc-400 bg-zinc-900/95 p-2 rounded-lg">
            <div className="animate-spin h-4 w-4 border-2 border-zinc-500 border-t-transparent rounded-full" />
            <span className="text-sm">Analyzing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-zinc-800 bg-zinc-900 p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-full border-zinc-700 bg-zinc-800 pl-4 pr-12 text-zinc-200 placeholder-zinc-500 focus:ring-1 focus:ring-zinc-600 text-sm h-9"
            placeholder="Ask about any company (e.g., 'Tell me about Nike' or 'Nike competitors')"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-zinc-800"
            disabled={isLoading}
          >
            <MessageCircle className="h-4 w-4 text-zinc-400" />
          </Button>
        </form>
      </div>

    </div>
  );
}

