"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, Clock, Server, Cpu, MemoryStick, RefreshCw } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface DeployLog {
  id: string;
  timestamp: Date;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export function DeployMonitor() {
  const [isMonitoring, setIsMonitoring] = React.useState(true);

  const metrics: Metric[] = [
    { label: "CPU", value: "45%", icon: <Cpu className="w-4 h-4" />, color: "bg-blue-500" },
    { label: "Memory", value: "2.1 GB", icon: <MemoryStick className="w-4 h-4" />, color: "bg-purple-500" },
    { label: "Requests", value: "1.2K/min", icon: <Activity className="w-4 h-4" />, color: "bg-green-500" },
    { label: "Latency", value: "120ms", icon: <Clock className="w-4 h-4" />, color: "bg-yellow-500" },
  ];

  const logs: DeployLog[] = [
    { id: "1", timestamp: new Date(), message: "Deployment started", type: "info" },
    { id: "2", timestamp: new Date(), message: "Build completed successfully", type: "success" },
    { id: "3", timestamp: new Date(), message: "Uploading artifacts...", type: "info" },
    { id: "4", timestamp: new Date(), message: "CDN cache updated", type: "success" },
  ];

  const getLogIcon = (type: string) => {
    switch (type) {
      case "success": return <div className="w-2 h-2 rounded-full bg-green-500" />;
      case "warning": return <div className="w-2 h-2 rounded-full bg-yellow-500" />;
      case "error": return <div className="w-2 h-2 rounded-full bg-red-500" />;
      default: return <div className="w-2 h-2 rounded-full bg-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Deploy Monitor
            </CardTitle>
            <CardDescription>
              Real-time deployment metrics
            </CardDescription>
          </div>
          <Badge className="bg-green-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center p-3 rounded-lg border">
              <div className={`inline-flex p-2 rounded-lg ${metric.color}/10 mb-2`}>
                {metric.icon}
              </div>
              <p className="text-lg font-semibold">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Uptime</span>
            <span className="font-medium">99.9%</span>
          </div>
          <Progress value={99.9} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Deployment Logs</h4>
          <div className="bg-gray-900 rounded-lg p-3 max-h-[150px] overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 py-2 border-b border-gray-800 last:border-0">
                {getLogIcon(log.type)}
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{log.message}</p>
                  <p className="text-xs text-gray-500">{log.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setIsMonitoring(!isMonitoring)}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isMonitoring ? "animate-spin" : ""}`} />
          {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
        </Button>
      </CardContent>
    </Card>
  );
}
