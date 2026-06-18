"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle2, Clock } from "lucide-react";

interface ChainProgressProps {
  progress: number;
  isRunning: boolean;
}

export function ChainProgress({ progress, isRunning }: ChainProgressProps) {
  const getStatusText = () => {
    if (isRunning) return "Executing...";
    if (progress === 100) return "Completed";
    if (progress > 0) return "Paused";
    return "Ready";
  };

  const getStatusBadge = () => {
    if (isRunning) return <Badge className="bg-blue-500">Running</Badge>;
    if (progress === 100) return <Badge className="bg-green-500">Complete</Badge>;
    if (progress > 0) return <Badge variant="outline">Paused</Badge>;
    return <Badge variant="secondary">Ready</Badge>;
  };

  return (
    <div className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isRunning ? (
            <Play className="w-4 h-4 text-blue-500" />
          ) : progress === 100 ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <Clock className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
        {getStatusBadge()}
      </div>
      <Progress value={progress} className="h-3" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0%</span>
        <span className="font-medium text-primary">{Math.round(progress)}%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
