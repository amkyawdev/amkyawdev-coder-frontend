"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Code, MessageSquare, Download, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Result {
  id: string;
  type: "code" | "text" | "analysis";
  title: string;
  content: string;
  language?: string;
}

const results: Result[] = [
  { id: "1", type: "code", title: "Generated Code", language: "typescript", content: "export function analyzeCode(code: string) {\n  // Code analysis implementation\n  return { issues: [], suggestions: [] };\n}" },
  { id: "2", type: "text", title: "Documentation", content: "This function analyzes code and returns potential issues and suggestions for improvement." },
  { id: "3", type: "analysis", title: "Analysis Report", content: "Code quality: 85/100\nLines analyzed: 234\nIssues found: 2\nSuggestions: 5" },
];

export function ChainResults() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    const result = results.find(r => r.id === id);
    if (result) {
      navigator.clipboard.writeText(result.content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "code": return <Code className="w-4 h-4" />;
      case "text": return <FileText className="w-4 h-4" />;
      case "analysis": return <MessageSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Chain Results
        </CardTitle>
        <CardDescription>
          View and download execution results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {results.map((result) => (
              <ResultCard key={result.id} result={result} onCopy={handleCopy} copiedId={copiedId} getIcon={getIcon} />
            ))}
          </TabsContent>

          {["code", "text", "analysis"].map((type) => (
            <TabsContent key={type} value={type} className="space-y-4 mt-4">
              {results.filter(r => r.type === type).map((result) => (
                <ResultCard key={result.id} result={result} onCopy={handleCopy} copiedId={copiedId} getIcon={getIcon} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface ResultCardProps {
  result: Result;
  onCopy: (id: string) => void;
  copiedId: string | null;
  getIcon: (type: string) => React.ReactNode;
}

function ResultCard({ result, onCopy, copiedId, getIcon }: ResultCardProps) {
  return (
    <div className="p-4 rounded-lg border hover:bg-accent transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            {getIcon(result.type)}
          </div>
          <div>
            <p className="font-medium text-sm">{result.title}</p>
            {result.language && (
              <Badge variant="outline" className="text-xs">{result.language}</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onCopy(result.id)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {copiedId === result.id ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
        <code>{result.content}</code>
      </pre>
    </div>
  );
}
