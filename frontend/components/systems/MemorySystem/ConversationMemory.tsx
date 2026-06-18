"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, User, Bot, Search } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const conversations: Conversation[] = [
  {
    id: "1",
    title: "Code Review Discussion",
    messages: [
      { id: "1", role: "user", content: "Can you review my authentication code?", timestamp: new Date() },
      { id: "2", role: "assistant", content: "I'll analyze your authentication implementation...", timestamp: new Date() },
    ],
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "API Design Help",
    messages: [
      { id: "3", role: "user", content: "How should I design my REST API?", timestamp: new Date() },
      { id: "4", role: "assistant", content: "Here are some best practices for REST API design...", timestamp: new Date() },
    ],
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 86400000),
  },
];

export function ConversationMemory() {
  const [selectedConv, setSelectedConv] = React.useState<string | null>(null);

  const currentConv = conversations.find(c => c.id === selectedConv);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Conversation History
        </CardTitle>
        <CardDescription>
          Browse and search past conversations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search conversations..." className="pl-10" />
        </div>

        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConv(conv.id)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedConv === conv.id ? "border-primary bg-primary/5" : "hover:bg-accent"
              }`}
            >
              <p className="font-medium text-sm truncate">{conv.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <span>{conv.messages.length} messages</span>
                <span>•</span>
                <span>{conv.updatedAt.toLocaleDateString()}</span>
              </div>
            </button>
          ))}
        </div>

        {currentConv && (
          <div className="border rounded-lg p-4 max-h-[300px] overflow-y-auto space-y-3">
            {currentConv.messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`p-2 rounded-full ${msg.role === "user" ? "bg-primary/10" : "bg-secondary"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`flex-1 ${msg.role === "user" ? "text-right" : ""}`}>
                  <div className={`inline-block p-3 rounded-lg ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
