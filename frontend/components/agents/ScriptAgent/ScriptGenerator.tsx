"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Play, Save, FileCode, Sparkles } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  language: string;
}

const templates: Template[] = [
  { id: "1", name: "API Endpoint", description: "REST API endpoint template", language: "typescript" },
  { id: "2", name: "React Component", description: "Functional React component", language: "tsx" },
  { id: "3", name: "Database Model", description: "Database schema template", language: "typescript" },
  { id: "4", name: "Utility Function", description: "Helper utility functions", language: "typescript" },
];

export function ScriptGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleGenerate = () => {
    setGeneratedCode(`// Generated from template: ${selectedTemplate}\n// Prompt: ${prompt}\n\nexport function example() {\n  // Your code here\n  return true;\n}`);
  };

  const handleSave = () => {
    console.log("Saving script...");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Sparkles className="w-5 h-5" />
          Script Generator
        </CardTitle>
        <CardDescription>
          Generate code from templates and prompts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Template</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4" />
                        <span>{template.name}</span>
                        <span className="text-xs text-muted-foreground">({template.language})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Prompt</label>
              <textarea
                className="flex min-h-[120px] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe what you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <Button onClick={handleGenerate} className="w-full">
              <Code className="w-4 h-4 mr-2" />
              Generate Code
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Generated Code</label>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 min-h-[200px]">
              {generatedCode ? (
                <pre className="text-sm text-gray-100 font-mono overflow-x-auto">
                  <code>{generatedCode}</code>
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p className="text-sm">Generated code will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
