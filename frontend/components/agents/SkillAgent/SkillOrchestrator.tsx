"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Play, Pause, RotateCcw, Zap } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  description: string;
  status: "idle" | "running" | "completed" | "error";
  icon: React.ReactNode;
}

interface SkillOrchestratorProps {
  onSkillExecute?: (skillId: string) => void;
}

export function SkillOrchestrator({ onSkillExecute }: SkillOrchestratorProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "Code Review", description: "Analyze code quality and suggest improvements", status: "idle", icon: <Sparkles className="w-5 h-5" /> },
    { id: "2", name: "Bug Detection", description: "Find potential bugs and security issues", status: "idle", icon: <Zap className="w-5 h-5" /> },
    { id: "3", name: "Documentation", description: "Generate comprehensive documentation", status: "idle", icon: <Zap className="w-5 h-5" /> },
  ]);

  const handleRunSkill = (skillId: string) => {
    setSkills(skills.map(skill => 
      skill.id === skillId ? { ...skill, status: "running" } : skill
    ));
    onSkillExecute?.(skillId);
  };

  const handleStopSkill = (skillId: string) => {
    setSkills(skills.map(skill => 
      skill.id === skillId ? { ...skill, status: "idle" } : skill
    ));
  };

  const handleResetAll = () => {
    setSkills(skills.map(skill => ({ ...skill, status: "idle" })));
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gradient-to-r from-indigo-500/20 to-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Sparkles className="w-6 h-6" />
            Skill Orchestrator
          </CardTitle>
          <CardDescription>
            Manage and execute AI-powered skills for your workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input 
              placeholder="Search skills..." 
              className="flex-1"
            />
            <Button variant="outline" onClick={handleResetAll}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <Card 
                key={skill.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedSkill === skill.id ? "ring-2 ring-primary" : ""
                } ${
                  skill.status === "running" ? "animate-pulse-glow" : ""
                }`}
                onClick={() => setSelectedSkill(skill.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${
                        skill.status === "running" 
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white" 
                          : "bg-primary/10 text-primary"
                      }`}>
                        {skill.icon}
                      </div>
                      <span className="font-semibold">{skill.name}</span>
                    </div>
                    {skill.status === "running" && (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-600">
                        Running
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {skill.description}
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      skill.status === "running" 
                        ? handleStopSkill(skill.id) 
                        : handleRunSkill(skill.id);
                    }}
                  >
                    {skill.status === "running" ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Skill
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
