import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Wand2, ArrowLeft } from 'lucide-react'
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



export default function PageChat({ isOpen, setIsOpen }: PageChatProps) {

    // Variables for handling view of chatbot
    const [showMessages, setShowMessages] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Variables for handling inputs and chat history of page chat
    const [messages, setMessages] = useState<Message[]>([
        { 
          id: 1, 
          text: "Welcome! Add competitors to your dashboard to get started. You can also brainstorm potential competitors in the chat.", 
          isUser: false 
        },
    ])
    const chatRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [companyData, setCompanyData] = useState<CompanyData[]>([])

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

    const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
    
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: textareaRef.current.value.toString(),
          isUser: true
        }]);
    
        const userInput = textareaRef.current.value.toString();
    
        await generateResponse(userInput);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleInputSize = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto"; // Reset height to recalculate
          const newHeight = textarea.scrollHeight;
          
          if (newHeight <= 130) {
            textarea.style.height = `${newHeight}px`; // Grow normally
            textarea.style.overflowY = "hidden"; // No scrolling yet
          } else {
            textarea.style.height = `${130}px`; // Cap at 5 lines
            textarea.style.overflowY = "auto"; // Enable scrolling
          }
        }
    };

    const showChat = () => {

        setIsOpen(true);
        const timer = setTimeout(() => {

            setShowMessages(true);

        }, 500);

        return () => clearTimeout(timer);
        
    }

    const hideChat = () => {

        setShowMessages(false);

        const timer = setTimeout(() => {

            setIsOpen(false);

        }, 500);

        return () => clearTimeout(timer);

    }

    useEffect(() => {
        // Auto-scroll to bottom when messages update
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }

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

    }, [messages]);

    return (
        <div className={`${isOpen ? "w-[40%]" : "w-[7%]"} h-full bg-[rgba(217,217,217,0.05)]
                        transition-all duration-500`}>

            {!isOpen && (

                <div className='flex items-center justify-center w-full h-full cursor-pointer px-2' onClick={() => showChat()}>

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

                    <div className={`
                        flex flex-col
                        p-6
                        w-full h-full`}>

                        {/* Chatbot title */}
                        <div className='flex flex-row gap-4 text-white'>
                            <Wand2 className="h-6 w-6"/> 
                            <span className={`text-[20px] transition-all duration-200
                                            ${showMessages ? "opacity-1" : "opacity-0"}`}>Page Chat</span>
                        </div>

                        {/* Messages Container */}
                        <div
                        ref={chatRef}
                        className="overflow-y-auto mt-4 space-y-3 text-sm h-[560px] custom-scrollbar"
                        style={{ whiteSpace: 'pre-line' }}
                        >
                            {messages.map((msg, index) => (
                                <div
                                key={index}
                                className={`${ msg.isUser ? "text-[#ffffff80]" : "text-white" } 
                                            transition-all duration-200
                                            ${showMessages ? "opacity-1" : "opacity-0"}`}
                                >
                                {msg.text}
                                </div>
                            ))}
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
                            />
                            <div className='bg-white rounded-full p-2 cursor-pointer' onClick={handleSubmit}>
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

                    <div className='h-full flex items-center' onClick={() => hideChat()}>

                        <div className={`cursor-pointer transition-all duration-200 text-white
                                        ${showMessages ? "opacity-1" : "opacity-0"}`}><ArrowLeft/></div>

                    </div>
                
                </div>)}

        </div>
    )

}