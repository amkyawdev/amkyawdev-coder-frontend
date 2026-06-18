"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface ValidationRule {
  id: string;
  name: string;
  status: "pass" | "fail" | "warning";
  message: string;
}

const validations: ValidationRule[] = [
  { id: "1", name: "Input Validation", status: "pass", message: "All inputs are valid" },
  { id: "2", name: "Output Format", status: "pass", message: "Output matches expected format" },
  { id: "3", name: "Security Check", status: "warning", message: "Potential SQL injection detected in step 2" },
  { id: "4", name: "Performance", status: "pass", message: "Execution time within limits" },
];

export function ChainValidator() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "fail": return <XCircle className="w-4 h-4 text-red-500" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <CheckCircle2 className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pass": return <Badge className="bg-green-500/10 text-green-600">Pass</Badge>;
      case "fail": return <Badge className="bg-red-500/10 text-red-600">Fail</Badge>;
      case "warning": return <Badge className="bg-yellow-500/10 text-yellow-600">Warning</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const passCount = validations.filter(v => v.status === "pass").length;
  const warningCount = validations.filter(v => v.status === "warning").length;
  const failCount = validations.filter(v => v.status === "fail").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Chain Validator
        </CardTitle>
        <CardDescription>
          Validate chain execution results
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 text-center p-3 rounded-lg bg-green-500/10">
            <p className="text-2xl font-bold text-green-600">{passCount}</p>
            <p className="text-xs text-muted-foreground">Passed</p>
          </div>
          <div className="flex-1 text-center p-3 rounded-lg bg-yellow-500/10">
            <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
            <p className="text-xs text-muted-foreground">Warnings</p>
          </div>
          <div className="flex-1 text-center p-3 rounded-lg bg-red-500/10">
            <p className="text-2xl font-bold text-red-600">{failCount}</p>
            <p className="text-xs text-muted-foreground">Failed</p>
          </div>
        </div>

        <div className="space-y-3">
          {validations.map((validation) => (
            <div key={validation.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                {getStatusIcon(validation.status)}
                <div>
                  <p className="font-medium text-sm">{validation.name}</p>
                  <p className="text-xs text-muted-foreground">{validation.message}</p>
                </div>
              </div>
              {getStatusBadge(validation.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
