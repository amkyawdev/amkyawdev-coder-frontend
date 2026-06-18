"use client";

import { useState, useCallback, useEffect } from "react";
import { endpoints } from "@/lib/api/endpoints";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Agent {
  id: string;
  name: string;
  description?: string;
}

export interface Skill {
  id: string;
  description: string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>("default");
  const [agentType, setAgentType] = useState<string>("general");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch available agents
  const fetchAgents = useCallback(async () => {
    try {
      const response = await fetch(
        `${endpoints.backend.baseUrl}${endpoints.backend.agents}`
      );
      const data = await response.json();
      setAgents(data.agents || []);
    } catch (err) {
      console.error("Failed to fetch agents:", err);
    }
  }, []);

  // Fetch available skills
  const fetchSkills = useCallback(async () => {
    try {
      const response = await fetch(
        `${endpoints.backend.baseUrl}${endpoints.backend.skills}`
      );
      const data = await response.json();
      setSkills(data.skills || []);
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    }
  }, []);

  // Initialize agents and skills
  useEffect(() => {
    fetchAgents();
    fetchSkills();
  }, [fetchAgents, fetchSkills]);

  // Send message to backend
  const sendMessage = useCallback(
    async (content: string, options?: { agentType?: string; context?: Record<string, unknown> }) => {
      if (!content.trim()) return;

      // Add user message immediately
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${endpoints.backend.baseUrl}${endpoints.backend.chat}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: content,
              agent_type: options?.agentType || agentType,
              conversation_id: conversationId,
              context: options?.context,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        // Update conversation ID if returned
        if (data.conversation_id) {
          setConversationId(data.conversation_id);
        }

        // Update agent type if returned
        if (data.agent_type) {
          setAgentType(data.agent_type);
        }

        // Add assistant message
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to get response";
        setError(errorMessage);
        
        // Add error message
        const errorAssistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Sorry, I encountered an error: ${errorMessage}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorAssistantMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [agentType, conversationId]
  );

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Start new conversation
  const newConversation = useCallback(() => {
    setConversationId(`conv-${Date.now()}`);
    setMessages([]);
    setAgentType("general");
  }, []);

  // Change agent type
  const changeAgent = useCallback((newAgentType: string) => {
    setAgentType(newAgentType);
  }, []);

  return {
    messages,
    isLoading,
    conversationId,
    agentType,
    agents,
    skills,
    error,
    sendMessage,
    clearMessages,
    newConversation,
    changeAgent,
    fetchAgents,
    fetchSkills,
  };
}
