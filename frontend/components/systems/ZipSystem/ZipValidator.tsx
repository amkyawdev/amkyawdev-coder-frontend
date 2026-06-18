"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, AlertTriangle, XCircle, FileArchive } from "lucide-react";

interface ValidationCheck {
  id: string;
  name: string;
  status: "pass" | "warning" | "fail";
  message: string;
}

const validations: ValidationCheck[] = [
  { id: "1", name: "File Integrity", status: "pass", message: "All files pass integrity check" },
  { id: "2", name: "Compression Level", status: "pass", message: "Optimal compression ratio achieved" },
  { id: "3", name: "File Structure", status: "warning", message: "Some nested folders may cause issues" },
  { id: "4", name: "Size Limit", status: "pass", message: "Total size within limits (45MB/100MB)" },
  { id: "5", name: "File Permissions", status: "pass", message: "All permissions preserved" },
];

export function ZipValidator() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "fail": return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pass": return <Badge className="bg-green-500/10 text-green-600">Pass</Badge>;
      case "warning": return <Badge className="bg-yellow-500/10 text-yellow-600">Warning</Badge>;
      case "fail": return <Badge className="bg-red-500/10 text-red-600">Fail</Badge>;
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
          Archive Validator
        </CardTitle>
        <CardDescription>
          Validate your ZIP archive before deployment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-4 p-6 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <FileArchive className="w-12 h-12 text-primary" />
          <div>
            <p className="text-2xl font-bold">project.zip</p>
            <p className="text-sm text-muted-foreground">45.2 MB • 127 files</p>
          </div>
        </div>

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
