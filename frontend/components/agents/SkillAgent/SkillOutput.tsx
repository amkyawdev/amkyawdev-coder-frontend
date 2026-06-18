"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Copy, Check, Download, ExternalLink } from "lucide-react";

interface OutputLine {
  id: string;
  type: "info" | "success" | "warning" | "error";
  content: string;
  timestamp: Date;
}

const outputs: OutputLine[] = [
  { id: "1", type: "info", content: "Initializing skill execution...", timestamp: new Date() },
  { id: "2", type: "success", content: "Code analysis complete: 0 issues found", timestamp: new Date() },
  { id: "3", type: "info", content: "Generating documentation...", timestamp: new Date() },
  { id: "4", type: "success", content: "Documentation generated successfully", timestamp: new Date() },
];

export function SkillOutput() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getColor = (type: string) => {
    switch (type) {
      case "info": return "text-blue-500";
      case "success": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "error": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Output Console
            </CardTitle>
            <CardDescription>
              Real-time skill execution output
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm h-[300px] overflow-y-auto">
          {outputs.map((output) => (
            <div key={output.id} className="flex items-start gap-2 mb-2 group">
              <span className="text-gray-500 text-xs shrink-0">
                [{output.timestamp.toLocaleTimeString()}]
              </span>
              <span className={`${getColor(output.type)} shrink-0`}>
                [{output.type.toUpperCase()}]
              </span>
              <span className="text-gray-300 flex-1">{output.content}</span>
              <button
                onClick={() => handleCopy(output.id, output.content)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {copiedId === output.id ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
