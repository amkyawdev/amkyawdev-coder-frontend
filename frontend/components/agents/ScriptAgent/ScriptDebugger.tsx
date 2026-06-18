"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bug, Play, Square, ChevronDown, ChevronRight, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface Breakpoint {
  id: string;
  line: number;
  condition?: string;
}

interface DebugIssue {
  id: string;
  type: "error" | "warning" | "info";
  line: number;
  message: string;
  suggestion?: string;
}

const debugIssues: DebugIssue[] = [
  { id: "1", type: "error", line: 15, message: "Cannot read property 'map' of undefined", suggestion: "Add null check before mapping" },
  { id: "2", type: "warning", line: 23, message: "Unused variable 'unusedVar'", suggestion: "Remove or use the variable" },
  { id: "3", type: "info", line: 42, message: "Consider using async/await instead of .then()", suggestion: "Refactor to use async/await for better readability" },
];

export function ScriptDebugger() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState<number | null>(null);
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>([
    { id: "1", line: 10 },
    { id: "2", line: 25 },
  ]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleStep = () => {
    setCurrentLine(currentLine ? currentLine + 1 : 1);
  };

  const toggleBreakpoint = (line: number) => {
    const exists = breakpoints.find(bp => bp.line === line);
    if (exists) {
      setBreakpoints(breakpoints.filter(bp => bp.line !== line));
    } else {
      setBreakpoints([...breakpoints, { id: String(line), line }]);
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error": return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "info": return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const codeLines = [
    "function processData(data) {",
    "  const result = [];",
    "  for (let i = 0; i < data.length; i++) {",
    "    const item = data[i];",
    "    if (item.active) {",
    "      result.push(item);",
    "    }",
    "  }",
    "  return result;",
    "}",
    "",
    "async function fetchData() {",
    "  const response = await fetch('/api/data');",
    "  const data = await response.json();",
    "  return processData(data);",
    "}",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="w-5 h-5" />
          Script Debugger
        </CardTitle>
        <CardDescription>
          Debug and troubleshoot your scripts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {isRunning ? (
            <Button onClick={handleStop} variant="destructive" size="sm">
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          ) : (
            <Button onClick={handleStart} size="sm">
              <Play className="w-4 h-4 mr-2" />
              Run
            </Button>
          )}
          <Button onClick={handleStep} variant="outline" size="sm">
            Step
          </Button>
          <div className="flex-1" />
          <Input placeholder="Set condition..." className="w-48 h-8 text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs font-medium border-b">
              Source Code
            </div>
            <div className="bg-gray-900 max-h-[300px] overflow-y-auto">
              {codeLines.map((line, index) => {
                const lineNum = index + 1;
                const hasBreakpoint = breakpoints.some(bp => bp.line === lineNum);
                const isCurrentLine = currentLine === lineNum;
                const hasIssue = debugIssues.find(issue => issue.line === lineNum);

                return (
                  <div
                    key={index}
                    className={`flex font-mono text-sm ${isCurrentLine ? "bg-yellow-500/20" : ""}`}
                  >
                    <button
                      onClick={() => toggleBreakpoint(lineNum)}
                      className={`w-8 shrink-0 text-center py-1 border-r border-gray-700 text-gray-500 hover:bg-gray-800 ${
                        hasBreakpoint ? "bg-red-500/20 text-red-400" : ""
                      }`}
                    >
                      {hasBreakpoint ? "●" : ""}
                    </button>
                    <span className="w-8 shrink-0 text-center py-1 text-gray-500 border-r border-gray-700">
                      {lineNum}
                    </span>
                    <span className="px-2 py-1 flex-1 text-gray-100 whitespace-pre">
                      {line || " "}
                      {hasIssue && (
                        <span className="ml-2 text-red-400">⚠</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-2">Issues ({debugIssues.length})</h4>
              <div className="space-y-2 max-h-[250px] overflow-y-auto">
                {debugIssues.map((issue) => (
                  <div key={issue.id} className="p-3 rounded-lg border text-sm">
                    <div className="flex items-start gap-2">
                      {getIssueIcon(issue.type)}
                      <div>
                        <p className="font-medium">Line {issue.line}: {issue.message}</p>
                        {issue.suggestion && (
                          <p className="text-xs text-muted-foreground mt-1">
                            💡 {issue.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Breakpoints ({breakpoints.length})</h4>
              <div className="space-y-1">
                {breakpoints.map((bp) => (
                  <div key={bp.id} className="flex items-center justify-between p-2 rounded bg-muted text-sm">
                    <span>Line {bp.line}</span>
                    <button onClick={() => toggleBreakpoint(bp.line)} className="text-red-500 hover:text-red-600">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
