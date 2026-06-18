"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, MemoryStick, Clock, TrendingUp, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface StatusMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: "up" | "down" | "neutral";
}

interface SkillStatusData {
  id: string;
  name: string;
  status: "running" | "completed" | "failed" | "pending";
  progress: number;
  startedAt: Date;
  duration?: string;
  metrics: {
    cpu: number;
    memory: number;
    tokens: number;
  };
}

const skillStatus: SkillStatusData = {
  id: "1",
  name: "Code Review",
  status: "running",
  progress: 67,
  startedAt: new Date(Date.now() - 30000),
  duration: "30s",
  metrics: {
    cpu: 45,
    memory: 128,
    tokens: 1024,
  },
};

export function SkillStatus() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <Activity className="w-4 h-4 animate-pulse" />;
      case "completed": return <CheckCircle2 className="w-4 h-4" />;
      case "failed": return <XCircle className="w-4 h-4" />;
      case "pending": return <AlertCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "failed": return "bg-red-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const metrics: StatusMetric[] = [
    { label: "CPU Usage", value: `${skillStatus.metrics.cpu}%`, icon: <Cpu className="w-4 h-4" />, color: "bg-blue-500" },
    { label: "Memory", value: `${skillStatus.metrics.memory}MB`, icon: <MemoryStick className="w-4 h-4" />, color: "bg-purple-500" },
    { label: "Tokens", value: `${skillStatus.metrics.tokens}`, icon: <TrendingUp className="w-4 h-4" />, color: "bg-green-500" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Skill Status
        </CardTitle>
        <CardDescription>
          Real-time execution metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getStatusColor(skillStatus.status)}/10`}>
              <div className={getStatusColor(skillStatus.status)}>
                {getStatusIcon(skillStatus.status)}
              </div>
            </div>
            <div>
              <p className="font-medium">{skillStatus.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{skillStatus.status}</p>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {skillStatus.duration}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{skillStatus.progress}%</span>
          </div>
          <Progress value={skillStatus.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className={`p-1.5 rounded-lg ${metric.color}/10 text-${metric.color}`}>
                  {metric.icon}
                </div>
              </div>
              <p className="text-lg font-semibold">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
