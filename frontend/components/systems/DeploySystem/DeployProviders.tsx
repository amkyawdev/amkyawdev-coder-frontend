"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, Server, Globe, Check, Settings } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  deployments: number;
  lastDeploy?: Date;
}

const providers: Provider[] = [
  { id: "vercel", name: "Vercel", icon: <Globe className="w-6 h-6" />, connected: true, deployments: 24, lastDeploy: new Date() },
  { id: "netlify", name: "Netlify", icon: <Cloud className="w-6 h-6" />, connected: true, deployments: 12, lastDeploy: new Date(Date.now() - 86400000) },
  { id: "aws", name: "AWS", icon: <Server className="w-6 h-6" />, connected: false, deployments: 0 },
  { id: "gcp", name: "Google Cloud", icon: <Globe className="w-6 h-6" />, connected: false, deployments: 0 },
];

export function DeployProviders() {
  const handleConnect = (providerId: string) => {
    console.log("Connecting to", providerId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Deploy Providers
        </CardTitle>
        <CardDescription>
          Manage your connected deployment providers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {providers.map((provider) => (
          <div key={provider.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${provider.connected ? "bg-primary/10" : "bg-muted"}`}>
                {provider.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{provider.name}</p>
                  {provider.connected ? (
                    <Badge className="bg-green-500/10 text-green-600">
                      <Check className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline">Not Connected</Badge>
                  )}
                </div>
                {provider.connected ? (
                  <p className="text-sm text-muted-foreground">
                    {provider.deployments} deployments • Last: {provider.lastDeploy?.toLocaleDateString()}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">Click to connect</p>
                )}
              </div>
            </div>
            <Button variant={provider.connected ? "outline" : "default"} size="sm">
              {provider.connected ? (
                <>
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
