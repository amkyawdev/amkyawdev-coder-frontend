"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/lib/hooks/useChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Trash2, Plus, Bot, User, Loader2, MessageSquare } from "lucide-react";

export function ChatInterface() {
  const {
    messages,
    isLoading,
    agentType,
    agents,
    skills,
    error,
    sendMessage,
    clearMessages,
    newConversation,
    changeAgent,
  } = useChat();

  const [input, setInput] = useState("");
  const [showAgents, setShowAgents] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    await sendMessage(input);
    setInput("");
  };

  const handleAgentChange = (newAgent: string) => {
    changeAgent(newAgent);
    setShowAgents(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">AmkyawDev AI Chat</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Powered by Groq (Llama 3.1 8B)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Agent Selector */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAgents(!showAgents)}
                >
                  <Bot className="w-4 h-4 mr-1" />
                  {agentType.replace("_", " ").toUpperCase()}
                </Button>
                {showAgents && (
                  <Card className="absolute top-full right-0 mt-2 w-64 z-50">
                    <CardContent className="p-2">
                      <p className="text-xs font-semibold text-muted-foreground px-2 py-1">
                        SELECT AGENT
                      </p>
                      {agents.map((agent) => (
                        <Button
                          key={agent.id}
                          variant={agentType === agent.id ? "secondary" : "ghost"}
                          className="w-full justify-start text-sm"
                          onClick={() => handleAgentChange(agent.id)}
                        >
                          <Bot className="w-4 h-4 mr-2" />
                          {agent.name}
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* New Chat */}
              <Button variant="outline" size="sm" onClick={newConversation}>
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>

              {/* Clear */}
              <Button variant="outline" size="sm" onClick={clearMessages}>
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </div>

          {/* Active Agent Badge */}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              Agent: {agentType.replace("_", " ")}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-6"
              onClick={() => setShowSkills(!showSkills)}
            >
              View Skills
            </Button>
          </div>

          {/* Skills Panel */}
          {showSkills && (
            <Card className="mt-2 bg-muted/50">
              <CardContent className="p-3">
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  AVAILABLE SKILLS
                </p>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-secondary"
                      onClick={() => sendMessage(`${skill.id}: explain this concept`)}
                    >
                      {skill.id}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardHeader>
      </Card>

      {/* Messages */}
      <Card className="flex-1 overflow-hidden">
        <CardContent className="h-full overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Start a Conversation</h3>
              <p className="text-muted-foreground max-w-md">
                Send a message to start chatting with AmkyawDev AI. 
                You can use skills like{" "}
                <code className="bg-muted px-1 rounded">code_review</code>,{" "}
                <code className="bg-muted px-1 rounded">bug_fix</code>,{" "}
                <code className="bg-muted px-1 rounded">explain</code>{" "}
                in your messages.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                        : "bg-muted"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === "user" ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm mt-2">
              Error: {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Input */}
      <Card className="mt-4">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message... (e.g., 'code_review: ...' or 'explain: ...')"
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
