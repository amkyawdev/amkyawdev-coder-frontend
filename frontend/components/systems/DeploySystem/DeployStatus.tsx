"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, ExternalLink, GitCommit, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface DeployStatusData {
  id: string;
  version: string;
  status: "success" | "failed" | "building" | "pending";
  url: string;
  commit: string;
  branch: string;
  startedAt: Date;
  completedAt?: Date;
}

export function DeployStatus() {
  const [deploy, setDeploy] = React.useState<DeployStatusData>({
    id: "deploy_123",
    version: "v1.2.3",
    status: "success",
    url: "https://my-app.vercel.app",
    commit: "abc1234",
    branch: "main",
    startedAt: new Date(Date.now() - 300000),
    completedAt: new Date(Date.now() - 100000),
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "failed": return <XCircle className="w-5 h-5 text-red-500" />;
      case "building": return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default: return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success": return <Badge className="bg-green-500">Success</Badge>;
      case "failed": return <Badge className="bg-red-500">Failed</Badge>;
      case "building": return <Badge className="bg-blue-500">Building</Badge>;
      default: return <Badge variant="outline">Pending</Badge>;
    }
  };

  const duration = deploy.completedAt 
    ? Math.round((deploy.completedAt.getTime() - deploy.startedAt.getTime()) / 1000) 
    : Math.round((Date.now() - deploy.startedAt.getTime()) / 1000);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Deployment Status
        </CardTitle>
        <CardDescription>
          Current deployment information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon(deploy.status)}
            <div>
              <p className="font-semibold text-lg">{deploy.version}</p>
              <p className="text-sm text-muted-foreground">{getStatusBadge(deploy.status)}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={deploy.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Site
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <GitCommit className="w-4 h-4" />
              Commit
            </div>
            <p className="font-mono text-sm">{deploy.commit}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              Duration
            </div>
            <p className="font-medium">{duration}s</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">
            <span>Branch: </span>
            <span className="font-medium text-foreground">{deploy.branch}</span>
          </div>
          <div className="text-muted-foreground">
            <span>Deployed: </span>
            <span className="font-medium text-foreground">{deploy.completedAt?.toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
