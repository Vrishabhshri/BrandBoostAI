import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Wand2, ArrowLeft } from 'lucide-react'
import './styles.css';

export default function PageChat() {

    // Variables for handling view of chatbat
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<boolean>(false);

    // Variables for handling inputs and chat history of page chat
    const [messages, setMessages] = useState([
        { response: "Welcome! Add competitors to your dashboard to get started. You can also brainstorm potential competitors in the chat. ", sender: "bot"},
    ]);
    const chatRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");

    const handleSendMessage = () => {
        if (!input.trim()) return;
    
        console.log("hello");
    
        setMessages([...messages, { response: input, sender: "user" }]);
        setInput("");
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
                                className={`${ msg.sender === "bot" ? "text-white" : "text-[#ffffff80]" } 
                                            transition-all duration-200
                                            ${showMessages ? "opacity-1" : "opacity-0"}`}
                                >
                                {msg.response}
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
                            <input
                                type="text"
                                placeholder="Reply"
                                className="flex-1 p-2 bg-transparent text-white border-none outline-none placeholder-gray-400 italic"
                            />
                            <div className='bg-white rounded-full p-2 cursor-pointer' onClick={handleSendMessage}>
                                <Image
                                src={'/assets/icons/comment.svg'}
                                alt='Message icon'
                                width={20}
                                height={20}
                                className='invert-[70%] brightness-150'
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