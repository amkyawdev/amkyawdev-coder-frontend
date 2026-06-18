"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileCode, Copy, Check, Github, FileJson, FileText } from "lucide-react";
import { toast } from "sonner";

export function ScriptExport() {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);

  const codeSnippet = `export function generateScript(config) {
  return {
    code: config.template,
    metadata: {
      version: '1.0.0',
      generated: new Date().toISOString()
    }
  };
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = async (format: string) => {
    setExporting(format);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setExporting(null);
    toast.success(`Exported as ${format.toUpperCase()}!`);
  };

  const exportOptions = [
    { id: "ts", name: "TypeScript", icon: <FileCode className="w-5 h-5" />, extension: ".ts" },
    { id: "js", name: "JavaScript", icon: <FileCode className="w-5 h-5" />, extension: ".js" },
    { id: "json", name: "JSON Config", icon: <FileJson className="w-5 h-5" />, extension: ".json" },
    { id: "md", name: "Markdown", icon: <FileText className="w-5 h-5" />, extension: ".md" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Script
        </CardTitle>
        <CardDescription>
          Export your generated scripts in various formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100 font-mono">
              <code>{codeSnippet}</code>
            </pre>
          </div>
          <Button
            onClick={handleCopy}
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {exportOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleExport(option.id)}
              variant="outline"
              className="h-auto py-4 flex-col gap-2"
              disabled={exporting !== null}
            >
              {option.icon}
              <span>{option.name}</span>
              <span className="text-xs text-muted-foreground">{option.extension}</span>
              {exporting === option.id && (
                <span className="text-xs animate-pulse">Exporting...</span>
              )}
            </Button>
          ))}
        </div>

        <Button className="w-full" variant="secondary">
          <Github className="w-4 h-4 mr-2" />
          Export to GitHub Gist
        </Button>
      </CardContent>
    </Card>
  );
}
