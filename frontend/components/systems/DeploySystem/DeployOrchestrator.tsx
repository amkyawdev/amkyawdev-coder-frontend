"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Rocket, Cloud, Server, Database, Globe, Play, Pause, RefreshCw } from "lucide-react";

interface DeployConfig {
  provider: string;
  region: string;
  environment: string;
  branch: string;
}

export function DeployOrchestrator() {
  const [config, setConfig] = useState<DeployConfig>({
    provider: "vercel",
    region: "us-east",
    environment: "production",
    branch: "main",
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);

  const deploySteps = [
    { name: "Building", icon: <Server className="w-4 h-4" /> },
    { name: "Uploading", icon: <Cloud className="w-4 h-4" /> },
    { name: "Configuring", icon: <Database className="w-4 h-4" /> },
    { name: "Deploying", icon: <Globe className="w-4 h-4" /> },
  ];

  const handleDeploy = async () => {
    setIsDeploying(true);
    for (let i = 0; i < deploySteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setDeployStep(i);
    }
    setIsDeploying(false);
    setDeployStep(0);
  };

  return (
    <Card className="border-2 border-gradient-to-r from-indigo-500/20 to-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Rocket className="w-6 h-6" />
          Deploy Orchestrator
        </CardTitle>
        <CardDescription>
          Deploy your application to multiple providers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Provider</label>
            <Select value={config.provider} onValueChange={(v) => setConfig({ ...config, provider: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vercel">Vercel</SelectItem>
                <SelectItem value="netlify">Netlify</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="gcp">Google Cloud</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Region</label>
            <Select value={config.region} onValueChange={(v) => setConfig({ ...config, region: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-east">US East</SelectItem>
                <SelectItem value="us-west">US West</SelectItem>
                <SelectItem value="eu-west">EU West</SelectItem>
                <SelectItem value="asia-east">Asia East</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Environment</label>
            <Select value={config.environment} onValueChange={(v) => setConfig({ ...config, environment: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Branch</label>
            <Input 
              value={config.branch}
              onChange={(e) => setConfig({ ...config, branch: e.target.value })}
              placeholder="main"
            />
          </div>
        </div>

        {isDeploying && (
          <div className="space-y-4 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Deploying...</span>
              <Badge className="bg-blue-500">In Progress</Badge>
            </div>
            <div className="flex justify-between">
              {deploySteps.map((step, index) => (
                <div key={step.name} className="flex flex-col items-center">
                  <div className={`p-3 rounded-full ${index <= deployStep ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white" : "bg-muted"} transition-colors`}>
                    {step.icon}
                  </div>
                  <span className={`text-xs mt-1 ${index <= deployStep ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button className="flex-1" onClick={handleDeploy} disabled={isDeploying}>
            <Play className="w-4 h-4 mr-2" />
            {isDeploying ? "Deploying..." : "Deploy Now"}
          </Button>
          <Button variant="outline" disabled={isDeploying}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
