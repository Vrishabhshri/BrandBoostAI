"use client"

import { useState, useEffect, useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CompanyInfo } from "./company-info"

interface Message {
  id: number;
  text: string;
  isUser: boolean;
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

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome! Add competitors to your dashboard to get started. You can also brainstorm potential competitors in the chat.", isUser: false },
  ])
  const [input, setInput] = useState('')
  const [companyData, setCompanyData] = useState<CompanyData[]>([])
  const [mentionedCompany, setMentionedCompany] = useState<CompanyData | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/competer-gKaumRWhUCYiUwqe2egWoQEZDUf9gc.json')
        const data = await response.json()
        setCompanyData(data.companies)
      } catch (error) {
        console.error('Failed to fetch company data:', error)
      }
    }
    fetchCompanyData()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const newMessage: Message = { id: messages.length + 1, text: input, isUser: true }
      setMessages([...messages, newMessage])
      setInput('')

      const mentionedCompanyName = input.match(/@(\w+)/)?.[1]
      if (mentionedCompanyName) {
        const company = companyData.find(c => c.name.toLowerCase() === mentionedCompanyName.toLowerCase())
        if (company) {
          setMentionedCompany(company)
        } else {
          setMessages(prev => [...prev, { id: prev.length + 1, text: `No information found for @${mentionedCompanyName}`, isUser: false }])
        }
      } else {
        setMentionedCompany(null)
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.isUser ? 'text-white' : 'text-zinc-400'
            } text-sm`}
          >
            {message.text}
          </div>
        //   
        ))}
        {mentionedCompany && (
          <CompanyInfo
            name={mentionedCompany.name}
            instagram={mentionedCompany.instagram[0]}
            facebook={mentionedCompany.facebook[0]}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-full border-zinc-700 bg-zinc-800 pl-4 pr-10 text-white placeholder-zinc-400"
            placeholder="Type a message..."
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1 h-6 w-6 rounded-full"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

