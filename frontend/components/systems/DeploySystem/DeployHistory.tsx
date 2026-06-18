"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, CheckCircle2, XCircle, Clock, ExternalLink } from "lucide-react";

interface DeployHistoryItem {
  id: string;
  version: string;
  status: "success" | "failed";
  commit: string;
  branch: string;
  deployedAt: Date;
  duration: number;
  url: string;
}

const history: DeployHistoryItem[] = [
  { id: "1", version: "v1.2.3", status: "success", commit: "abc1234", branch: "main", deployedAt: new Date(), duration: 45, url: "https://v1-2-3.vercel.app" },
  { id: "2", version: "v1.2.2", status: "success", commit: "def5678", branch: "main", deployedAt: new Date(Date.now() - 86400000), duration: 52, url: "https://v1-2-2.vercel.app" },
  { id: "3", version: "v1.2.1", status: "failed", commit: "ghi9012", branch: "feature", deployedAt: new Date(Date.now() - 172800000), duration: 0, url: "" },
  { id: "4", version: "v1.2.0", status: "success", commit: "jkl3456", branch: "main", deployedAt: new Date(Date.now() - 259200000), duration: 48, url: "https://v1-2-0.vercel.app" },
];

export function DeployHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Deployment History
        </CardTitle>
        <CardDescription>
          Recent deployment activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((deploy) => (
            <div key={deploy.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${deploy.status === "success" ? "bg-green-500/10" : "bg-red-500/10"}`}>
                  {deploy.status === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{deploy.version}</p>
                    <Badge variant={deploy.status === "success" ? "secondary" : "destructive"}>
                      {deploy.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-mono">{deploy.commit.slice(0, 7)}</span>
                    <span>•</span>
                    <span>{deploy.branch}</span>
                    <span>•</span>
                    <span>{deploy.deployedAt.toLocaleDateString()}</span>
                    {deploy.duration > 0 && (
                      <>
                        <span>•</span>
                        <span>{deploy.duration}s</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {deploy.url && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={deploy.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
