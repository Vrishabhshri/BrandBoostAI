import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Wand2 } from 'lucide-react'
import './styles.css';

export default function PageChat() {

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

    useEffect(() => {
        // Auto-scroll to bottom when messages update
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={`
            flex flex-col
            bg-[rgba(217,217,217,0.05)]
            w-[40%] h-[calc(100vh-68px)]
            p-6`}>

            {/* Chatbot title */}
            <div className='flex flex-row gap-4 text-white'>
              <Wand2 className="h-6 w-6"/> 
              <span className='text-[20px]'>Page Chat</span>
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
                  className={`${ msg.sender === "bot" ? "text-white" : "text-[#ffffff80]" }`}
                >
                  {msg.response}
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="relative border border-white mt-7 flex items-center gap-2 p-2 rounded-[1.5rem]">
              <div className="absolute top-[-10px] left-1/4 transform -translate-x-1/2 bg-[#302f2f] px-2 text-white text-sm">
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
    )

}