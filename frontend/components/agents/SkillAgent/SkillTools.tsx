"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Code, FileText, Search, GitBranch } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive" | "loading";
  description: string;
}

const tools: Tool[] = [
  { id: "1", name: "Code Analyzer", type: "analysis", status: "active", description: "Analyzes code structure and patterns" },
  { id: "2", name: "Document Generator", type: "generation", status: "active", description: "Creates documentation from code" },
  { id: "3", name: "Search Engine", type: "search", status: "inactive", description: "Searches codebase for patterns" },
  { id: "4", name: "Git Integration", type: "git", status: "active", description: "Git operations and version control" },
];

export function SkillTools() {
  const getIcon = (type: string) => {
    switch (type) {
      case "analysis": return <Code className="w-4 h-4" />;
      case "generation": return <FileText className="w-4 h-4" />;
      case "search": return <Search className="w-4 h-4" />;
      case "git": return <GitBranch className="w-4 h-4" />;
      default: return <Wrench className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "inactive": return "bg-gray-400";
      case "loading": return "bg-yellow-500 animate-pulse";
      default: return "bg-gray-400";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="w-5 h-5" />
          Available Tools
        </CardTitle>
        <CardDescription>
          Configure and manage skill tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="loading">Loading</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3">
            {tools.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {getIcon(tool.type)}
                  </div>
                  <div>
                    <p className="font-medium">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(tool.status)}`} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-3">
            {tools.filter(t => t.status === "active").map((tool) => (
              <div key={tool.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                    {getIcon(tool.type)}
                  </div>
                  <div>
                    <p className="font-medium">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="inactive" className="space-y-3">
            {tools.filter(t => t.status === "inactive").map((tool) => (
              <div key={tool.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors opacity-60">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-500/10 text-gray-600">
                    {getIcon(tool.type)}
                  </div>
                  <div>
                    <p className="font-medium">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-gray-400" />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="loading" className="space-y-3">
            {tools.filter(t => t.status === "loading").map((tool) => (
              <div key={tool.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-600">
                    {getIcon(tool.type)}
                  </div>
                  <div>
                    <p className="font-medium">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
