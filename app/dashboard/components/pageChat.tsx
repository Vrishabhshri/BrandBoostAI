import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Wand2, ArrowLeft, Loader2 } from 'lucide-react'
import '../styles.css';

interface PageChatProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

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
    analysis: any;
    monthlySentiment: any;
    tweets: string[];
}

const CHAT_PATTERNS = {
    data: /\b(\w+)\s+data\b/i,
    analysis: {
      summary: ['what is', 'tell me about', 'who is', 'describe', 'overview', 'summary'],
      competitors: ['competitors', 'competition', 'similar to', 'companies like', 'vs', 'versus'],
      improvements: ['how to improve', 'suggestions for', 'recommendations', 'better', 'improve'],
      swot: ['swot', 'strengths and weaknesses', 'opportunities', 'threats'],
      trends: ['trends', 'market trends', 'industry trends', 'future of', 'what\'s next'],
      sentiment: ['sentiment', 'feelings', 'emotions', 'customer sentiment', 'brand perception'],
      pros: ['pros', 'advantages', 'strengths', 'good things', 'positive'],
      cons: ['cons', 'disadvantages', 'weaknesses', 'bad things', 'negative', 'problems'],
      recommendations: ['recommendations', 'suggestions', 'advice', 'what should', 'how should'],
      dataset: ['all data', 'full data', 'complete data', 'everything', 'all information']
    }
} as const;

const MessageTypeIndicator = ({ type }: { type: string }) => {
  const getIndicatorColor = () => {
    switch (type) {
      case 'summary':
        return 'bg-blue-500';
      case 'competitors':
        return 'bg-green-500';
      case 'improvements':
        return 'bg-yellow-500';
      case 'swot':
        return 'bg-purple-500';
      case 'trends':
        return 'bg-red-500';
      case 'dataset':
        return 'bg-gray-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`w-2 h-2 rounded-full ${getIndicatorColor()} mr-2`} />
  );
};

export default function PageChat({ isOpen, setIsOpen }: PageChatProps) {
    const [showMessages, setShowMessages] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        { 
          id: 1, 
          text: "Welcome! Add competitors to your dashboard to get started. You can also brainstorm potential competitors in the chat.", 
          isUser: false 
        },
    ]);
    const chatRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyData[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const analyzeCompany = async (companyName: string, type: string = 'dataset') => {
        if (!isDataLoaded) {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: "Company data is not available yet. Please try again in a moment.",
                isUser: false,
                type: 'error'
            }]);
            return;
        }

        setIsLoading(true);
        try {
            const company = companyData.find(c => c.name.toLowerCase() === companyName.toLowerCase());
            if (!company) {
                setMessages(prev => [...prev, {
                    id: prev.length + 1,
                    text: `No data found for ${companyName}. Please try another company.`,
                    isUser: false,
                    type: 'error'
                }]);
                return;
            }

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    company: companyName,
                    type: type,
                    data: {
                        analysis: company.analysis,
                        monthlySentiment: company.monthlySentiment,
                        tweets: company.tweets
                    }
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
                text: data.analysis,
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
            
        // Detect analysis type with improved pattern matching
        let analysisType: string = 'summary';
        let highestMatchCount = 0;
        
        for (const [type, patterns] of Object.entries(CHAT_PATTERNS.analysis)) {
          const matchCount = patterns.filter(pattern => text.includes(pattern)).length;
          if (matchCount > highestMatchCount) {
            highestMatchCount = matchCount;
            analysisType = type;
          }
        }
        
        // If no specific type was detected, default to summary
        if (highestMatchCount === 0) {
          analysisType = 'summary';
        }
        
        await analyzeCompany(detectedCompany, analysisType);
    };

    const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
        if (!textareaRef.current) return;

        const userInput = textareaRef.current.value.toString();
        textareaRef.current.value = ''; // Clear input after sending
    
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: userInput,
          isUser: true
        }]);
    
        await generateResponse(userInput);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleInputSize = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto";
          const newHeight = textarea.scrollHeight;
          
          if (newHeight <= 130) {
            textarea.style.height = `${newHeight}px`;
            textarea.style.overflowY = "hidden";
          } else {
            textarea.style.height = `${130}px`;
            textarea.style.overflowY = "auto";
          }
        }
    };

    const showChat = () => {
        setIsOpen(true);
        const timer = setTimeout(() => {
            setShowMessages(true);
        }, 500);
        return () => clearTimeout(timer);
    };

    const hideChat = () => {
        setShowMessages(false);
        const timer = setTimeout(() => {
            setIsOpen(false);
        }, 500);
        return () => clearTimeout(timer);
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }

        const fetchCompanyData = async () => {
            try {
                const response = await fetch('/api/companies');
                if (!response.ok) {
                    throw new Error('Failed to fetch company data');
                }
                const data = await response.json();
                if (data.companies) {
                    setCompanyData(data.companies);
                    setIsDataLoaded(true);
                } else {
                    throw new Error('No company data received');
                }
            } catch (error) {
                console.error('Failed to load company data:', error);
                setMessages(prev => [...prev, {
                    id: prev.length + 1,
                    text: "Unable to load company data. Some features may be limited.",
                    isUser: false,
                    type: 'error'
                }]);
            }
        };
        fetchCompanyData();
    }, []); // Remove messages dependency to prevent infinite loop

    const renderMessage = (msg: Message) => {
        if (typeof msg.text === 'string') {
            return (
                <div className="flex items-start">
                    {msg.type && <MessageTypeIndicator type={msg.type} />}
                    <span>{msg.text}</span>
                </div>
            );
        }
        return (
            <div className="flex items-start">
                <MessageTypeIndicator type={msg.text.type} />
                <span>{msg.text.content}</span>
            </div>
        );
    };

    return (
        <div className={`${isOpen ? "w-[40%]" : "w-[7%]"} h-full bg-[rgba(217,217,217,0.05)]
                        transition-all duration-500`}>
            {!isOpen && (
                <div className='flex items-center justify-center w-full h-full cursor-pointer px-2' onClick={showChat}>
                    <Image
                        src={'/assets/icons/comment.svg'}
                        alt='Open chat'
                        width={30}
                        height={30}
                        className='transition-all duration-200 hover:invert-[70%] hover:brightness-150'
                    />
                </div>
            )}

            {isOpen && (
                <div className='w-full h-full flex flex-row'>
                    <div className='flex flex-col p-6 w-full h-full'>
                        {/* Chatbot title */}
                        <div className='flex flex-row gap-4 text-white'>
                            <Wand2 className="h-6 w-6"/> 
                            <span className={`text-[20px] transition-all duration-200
                                            ${showMessages ? "opacity-1" : "opacity-0"}`}>Page Chat</span>
                        </div>

                        {/* Welcome message */}
                        <div className="mt-4 text-white text-sm">
                            <div className="flex items-start mb-2">
                                <MessageTypeIndicator type="welcome" />
                                <span>Welcome! Add competitors to your dashboard to get started.</span>
                            </div>
                            <div className="flex items-start">
                                <MessageTypeIndicator type="welcome" />
                                <span>You can also brainstorm potential competitors in the chat.</span>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div
                            ref={chatRef}
                            className="overflow-y-auto mt-4 space-y-3 text-sm h-[560px] custom-scrollbar whitespace-pre-line"
                        >
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`${msg.isUser ? "text-[#ffffff80]" : "text-white"} 
                                                transition-all duration-200
                                                ${showMessages ? "opacity-1" : "opacity-0"}`}
                                >
                                    {renderMessage(msg)}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-center gap-2 text-white mt-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Analyzing data...</span>
                                </div>
                            )}
                        </div>

                        {/* Message input */}
                        <div className="relative border border-white mt-7 flex items-center gap-2 p-2 rounded-[1.5rem]">
                            <div className={`absolute top-[-10px] left-1/4 transform -translate-x-1/2 bg-[#302f2f] px-2 text-white text-sm
                                            transition-all duration-200
                                            ${showMessages ? "opacity-1" : "opacity-0"}`}>
                                Ask a question
                            </div>
                            <textarea
                                ref={textareaRef}
                                rows={1}
                                placeholder="Reply"
                                className="flex-1 p-2 bg-transparent text-white border-none outline-none placeholder-gray-400 
                                            italic resize-none overflow-hidden custom-scrollbar"
                                onInput={handleInputSize}
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                            />
                            <div 
                                className={`bg-white rounded-full p-2 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                onClick={isLoading ? undefined : handleSubmit}
                            >
                                <Image
                                    src={'/assets/icons/comment.svg'}
                                    alt='Message icon'
                                    width={20}
                                    height={20}
                                    className='invert-[70%] brightness-150 hover:invert-[20%]'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='h-full flex items-center' onClick={hideChat}>
                        <div className={`cursor-pointer transition-all duration-200 text-white
                                        ${showMessages ? "opacity-1" : "opacity-0"}`}>
                            <ArrowLeft/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}