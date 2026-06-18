"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Plus, GitBranch } from "lucide-react";
import { ChainSteps } from "./ChainSteps";
import { ChainProgress } from "./ChainProgress";

interface ChainStep {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "failed";
  duration?: string;
}

export function ChainOrchestrator() {
  const [isRunning, setIsRunning] = useState(false);
  const [chainName, setChainName] = useState("Multi-Agent Workflow");
  const [steps, setSteps] = useState<ChainStep[]>([
    { id: "1", name: "Analyze Request", description: "Parse and understand user input", status: "completed", duration: "2.3s" },
    { id: "2", name: "Plan Execution", description: "Create execution plan", status: "completed", duration: "1.1s" },
    { id: "3", name: "Execute Skill 1", description: "Run code analysis", status: "running" },
    { id: "4", name: "Execute Skill 2", description: "Generate documentation", status: "pending" },
    { id: "5", name: "Validate Results", description: "Verify output quality", status: "pending" },
    { id: "6", name: "Return Response", description: "Format and present results", status: "pending" },
  ]);

  const progress = (steps.filter(s => s.status === "completed").length / steps.length) * 100;

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSteps(steps.map(s => ({ ...s, status: "pending" as const, duration: undefined })));
  };

  const handleAddStep = () => {
    const newId = String(steps.length + 1);
    setSteps([...steps, { id: newId, name: `Step ${newId}`, description: "New step", status: "pending" }]);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gradient-to-r from-indigo-500/20 to-purple-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 gradient-text">
                <GitBranch className="w-6 h-6" />
                {chainName}
              </CardTitle>
              <CardDescription>
                Orchestrate complex multi-step AI workflows
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {isRunning ? (
                <Button onClick={handlePause} variant="outline">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button onClick={handleStart}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Chain
                </Button>
              )}
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleAddStep} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ChainProgress progress={progress} isRunning={isRunning} />
          <ChainSteps steps={steps} />
        </CardContent>
      </Card>
    </div>
  );
}
