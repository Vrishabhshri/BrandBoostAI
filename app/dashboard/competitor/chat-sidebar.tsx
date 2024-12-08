import React, { useState } from "react";
import { MessageSquare, X, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  timestamp: string;
  response: string;
}

interface CompetitorChat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: Message;
}

const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [input, setInput] = useState("");

  const handleToggle = () => setIsOpen(!isOpen);
  
  const handleChatSelect = (id: number) => {
    setActiveChat(id);
    setIsOpen(true);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    // TODO: Implement message sending logic
    setInput("");
  };

  return (
    <div className={cn(
      "fixed right-0 top-16 h-[calc(100vh-4rem)] bg-background border-l border-border transition-all duration-300",
      isOpen ? "w-80" : "w-12"
    )}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-10 top-4 hidden md:flex"
        onClick={handleToggle}
      >
        <ChevronRight className={cn(
          "h-4 w-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </Button>

      {/* Sidebar Content */}
      <div className="h-full flex flex-col">
        <CardHeader className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {isOpen ? "Chat Analysis" : <MessageSquare className="h-5 w-5" />}
            </h2>
            {isOpen && (
              <Button variant="ghost" size="icon" onClick={handleToggle}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4">
          {isOpen && activeChat && (
            <div className="space-y-4">
              {/* Chat Messages */}
              <div className="space-y-2">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">How are competitors performing?</p>
                  <span className="text-xs text-muted-foreground">
                    11:30 AM
                  </span>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <p className="text-sm">Analyzing competitor metrics...</p>
                  <span className="text-xs text-muted-foreground">
                    11:31 AM
                  </span>
                </div>
              </div>

              {/* Input Area */}
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default ChatSidebar;
