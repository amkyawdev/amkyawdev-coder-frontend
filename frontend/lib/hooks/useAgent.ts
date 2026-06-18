"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api/client";

interface AgentTask {
  id: string;
  type: "skill" | "chain" | "script";
  status: "pending" | "running" | "completed" | "failed";
  result?: unknown;
  error?: string;
}

export function useAgent() {
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [currentTask, setCurrentTask] = useState<AgentTask | null>(null);

  const executeSkill = useCallback(async (skillId: string, params?: Record<string, unknown>) => {
    const task: AgentTask = {
      id: Math.random().toString(36).substr(2, 9),
      type: "skill",
      status: "pending",
    };

    setTasks((prev) => [...prev, task]);
    setCurrentTask(task);

    try {
      const result = await apiClient.post(`/skill/execute`, { skillId, params });
      setCurrentTask((prev) => prev ? { ...prev, status: "completed", result } : null);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: "completed", result } : t))
      );
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setCurrentTask((prev) => prev ? { ...prev, status: "failed", error: errorMessage } : null);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: "failed", error: errorMessage } : t))
      );
      throw error;
    }
  }, []);

  const cancelTask = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "pending" } : t))
    );
  }, []);

  return {
    tasks,
    currentTask,
    executeSkill,
    cancelTask,
  };
}
