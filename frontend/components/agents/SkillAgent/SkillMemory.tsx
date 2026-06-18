"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Database, Clock, Zap } from "lucide-react";

interface MemoryEntry {
  id: string;
  type: "skill" | "context" | "result";
  content: string;
  timestamp: Date;
  tags: string[];
}

const memories: MemoryEntry[] = [
  { id: "1", type: "skill", content: "Code Review completed for auth module", timestamp: new Date(), tags: ["review", "auth"] },
  { id: "2", type: "context", content: "User prefers detailed documentation", timestamp: new Date(), tags: ["preference"] },
  { id: "3", type: "result", content: "Found 3 potential bugs in user service", timestamp: new Date(), tags: ["bugs", "service"] },
];

export function SkillMemory() {
  const getIcon = (type: string) => {
    switch (type) {
      case "skill": return <Zap className="w-4 h-4" />;
      case "context": return <Brain className="w-4 h-4" />;
      case "result": return <Database className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "skill": return "bg-purple-500/10 text-purple-600";
      case "context": return "bg-blue-500/10 text-blue-600";
      case "result": return "bg-green-500/10 text-green-600";
      default: return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Skill Memory
        </CardTitle>
        <CardDescription>
          Context and history from previous skill executions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <p className="text-2xl font-bold gradient-text">24</p>
              <p className="text-xs text-muted-foreground">Total Skills</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-500/10">
              <p className="text-2xl font-bold text-green-600">18</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/10">
              <p className="text-2xl font-bold text-blue-600">6</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
          </div>

          <div className="space-y-3">
            {memories.map((memory) => (
              <div 
                key={memory.id} 
                className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
              >
                <div className={`p-2 rounded-lg ${getColor(memory.type)}`}>
                  {getIcon(memory.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{memory.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1">
                      {memory.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {memory.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
