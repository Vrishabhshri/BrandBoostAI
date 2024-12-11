"use client"

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CompanyInfo } from "./company-info"
import { cn } from "@/lib/utils"

interface GeminiAnalysis {
  type: string;
  content: string;
  error?: boolean;
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
  data: /\b(\w+)\s+data\b/i,
  analysis: {
    summary: ['what is', 'tell me about', 'who is', 'describe'],
    competitors: ['competitors', 'competition', 'similar to', 'companies like'],
    improvements: ['how to improve', 'suggestions for', 'recommendations', 'better'],
    swot: ['swot', 'strengths and weaknesses', 'opportunities'],
    trends: ['trends', 'market trends', 'industry trends', 'future of']
  }
} as const;

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Welcome! Add competitors to your dashboard to get started. You can also brainstorm potential competitors in the chat.", 
      isUser: false 
    },
  ])
  const [input, setInput] = useState('')
  const [companyData, setCompanyData] = useState<CompanyData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Temporary inline data instead of fetching from URL
        const data = {
          companies: [
            {
              name: "nike",
              instagram: [{
                followers: 2500000,
                content: "Latest sports gear and innovation",
                date_added: "2024-03-20"
              }],
              facebook: [{
                followers: 4000000,
                content: "Global sports and lifestyle brand",
                date_added: "2024-03-20"
              }]
            },
            {
              name: "amazon",
              instagram: [{
                followers: 3800000,
                content: "E-commerce and technology leader",
                date_added: "2024-03-20"
              }],
              facebook: [{
                followers: 5500000,
                content: "Global online marketplace and tech company",
                date_added: "2024-03-20"
              }]
            },
            {
              name: "target",
              instagram: [{
                followers: 2100000,
                content: "Retail and lifestyle products",
                date_added: "2024-03-20"
              }],
              facebook: [{
                followers: 3200000,
                content: "American retail corporation",
                date_added: "2024-03-20"
              }]
            }
          ]
        };
        setCompanyData(data.companies);
      } catch (error) {
        console.error('Failed to load company data:', error);
      }
    };
    fetchCompanyData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const analyzeCompany = async (companyName: string, type: string = 'dataset') => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: companyName,
          type: type
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: data.error,
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

    } catch (error) {
      console.error('Analysis error:', error);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'AI analysis temporarily unavailable. Please try again later.',
        isUser: false,
        type: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = async (userInput: string) => {
    const text = userInput.toLowerCase();
    
    // Check for data request pattern
    const dataMatch = text.match(CHAT_PATTERNS.data);
    if (dataMatch) {
      const companyName = dataMatch[1];
      await analyzeCompany(companyName, 'dataset');
      return;
    }

    // Detect company name and analysis type
    const words = text.split(' ');
    let detectedCompany = null;
    
    for (const word of words) {
      if (companyData.some(company => 
        company.name.toLowerCase() === word.toLowerCase()
      )) {
        detectedCompany = word;
        break;
      }
    }

    if (!detectedCompany) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "I couldn't identify a company name. Could you please mention the company you'd like to learn about?",
        isUser: false
      }]);
      return;
    }

    let analysisType: string = 'summary';
    for (const [type, patterns] of Object.entries(CHAT_PATTERNS.analysis)) {
      if (patterns.some(pattern => text.includes(pattern))) {
        analysisType = type;
        break;
      }
    }

    await analyzeCompany(detectedCompany, analysisType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

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
      return message.text.content;
    }

    return 'Invalid message format';
  };

  return (
    <div 
      className={cn(
        "fixed left-64 top-16 h-[calc(100vh-4rem)] bg-zinc-900 transition-all duration-300 ease-in-out z-50 border-l border-zinc-800",
        isOpen ? "w-[400px]" : "w-16"
      )}
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 text-zinc-400" />
        </button>
      ) : (
        <div className="flex flex-col h-full">
          <div className="px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-sm font-medium text-white">AI Chat</h2>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-zinc-800"
              aria-label="Close chat"
            >
              <X className="h-4 w-4 text-zinc-400" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[85%] rounded-lg p-3 text-sm
                    ${message.isUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-zinc-800 text-zinc-300'
                    }
                    ${message.type === 'error' ? 'bg-red-900/50 text-red-200' : ''}
                  `}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {renderMessage(message)}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center space-x-2 text-zinc-400 bg-zinc-900/95 p-2 rounded-lg">
                <div className="animate-spin h-4 w-4 border-2 border-zinc-500 border-t-transparent rounded-full" />
                <span className="text-sm">Analyzing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-zinc-800 p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-full border-zinc-700 bg-zinc-800 pl-4 pr-12 text-zinc-200 placeholder-zinc-500 focus:ring-1 focus:ring-zinc-600 text-sm h-9"
                placeholder="Ask about any company..."
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
      )}
    </div>
  );
} 