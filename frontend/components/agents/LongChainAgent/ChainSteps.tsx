"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Check, Loader2, X, Circle } from "lucide-react";

interface ChainStep {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "failed";
  duration?: string;
}

interface ChainStepsProps {
  steps: ChainStep[];
}

export function ChainSteps({ steps }: ChainStepsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5 text-green-500" />;
      case "running":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case "failed":
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500/50 bg-green-500/5";
      case "running":
        return "border-blue-500/50 bg-blue-500/5 animate-pulse";
      case "failed":
        return "border-red-500/50 bg-red-500/5";
      default:
        return "border-gray-200";
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-gray-200" />
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-start gap-4">
            <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${getStatusColor(step.status)} ${step.status === "running" ? "animate-pulse-glow" : ""}`}>
              {getStatusIcon(step.status)}
            </div>
            
            <Card className={`flex-1 p-4 transition-all duration-300 ${getStatusColor(step.status)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">#{index + 1}</span>
                    {step.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
                {step.duration && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {step.duration}
                  </span>
                )}
              </div>
              
              {step.status === "running" && (
                <div className="mt-3">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse" style={{ width: "60%" }} />
                  </div>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
