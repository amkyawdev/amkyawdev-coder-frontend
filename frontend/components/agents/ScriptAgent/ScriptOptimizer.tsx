"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Clock, Code, CheckCircle2 } from "lucide-react";

interface Optimization {
  id: string;
  type: "performance" | "readability" | "best-practice";
  description: string;
  impact: "high" | "medium" | "low";
  original: string;
  optimized: string;
}

const optimizations: Optimization[] = [
  { id: "1", type: "performance", description: "Use memoization for expensive computations", impact: "high", original: "function calc(n) { return n * 2; }", optimized: "const calc = memoize((n) => n * 2);" },
  { id: "2", type: "readability", description: "Use descriptive variable names", impact: "medium", original: "const x = users.filter(u => u.a > 18);", optimized: "const adults = users.filter(user => user.age > 18);" },
  { id: "3", type: "best-practice", description: "Add error handling", impact: "high", original: "try { doSomething(); } catch(e) {}", optimized: "try {\n  await doSomething();\n} catch (error) {\n  handleError(error);\n}" },
];

export function ScriptOptimizer() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "performance": return <Zap className="w-4 h-4 text-yellow-500" />;
      case "readability": return <Code className="w-4 h-4 text-blue-500" />;
      case "best-practice": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high": return <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/10 text-red-600">High</span>;
      case "medium": return <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/10 text-yellow-600">Medium</span>;
      case "low": return <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-600">Low</span>;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Code Optimizer
        </CardTitle>
        <CardDescription>
          Optimize your code for performance and best practices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="readability">Readability</TabsTrigger>
            <TabsTrigger value="best-practice">Best Practices</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {optimizations.map((opt) => (
              <OptimizationCard key={opt.id} optimization={opt} getTypeIcon={getTypeIcon} getImpactBadge={getImpactBadge} />
            ))}
          </TabsContent>

          {["performance", "readability", "best-practice"].map((type) => (
            <TabsContent key={type} value={type} className="space-y-4 mt-4">
              {optimizations.filter(o => o.type === type).map((opt) => (
                <OptimizationCard key={opt.id} optimization={opt} getTypeIcon={getTypeIcon} getImpactBadge={getImpactBadge} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface OptimizationCardProps {
  optimization: Optimization;
  getTypeIcon: (type: string) => React.ReactNode;
  getImpactBadge: (impact: string) => React.ReactNode;
}

function OptimizationCard({ optimization, getTypeIcon, getImpactBadge }: OptimizationCardProps) {
  return (
    <div className="p-4 rounded-lg border space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getTypeIcon(optimization.type)}
          <span className="font-medium text-sm">{optimization.description}</span>
        </div>
        {getImpactBadge(optimization.impact)}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Before</p>
          <pre className="bg-red-500/5 border border-red-500/20 p-2 rounded text-xs font-mono">
            {optimization.original}
          </pre>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">After</p>
          <pre className="bg-green-500/5 border border-green-500/20 p-2 rounded text-xs font-mono">
            {optimization.optimized}
          </pre>
        </div>
      </div>
      <Button size="sm" className="w-full">Apply Optimization</Button>
    </div>
  );
}
