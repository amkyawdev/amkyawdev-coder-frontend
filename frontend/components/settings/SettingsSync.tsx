"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Cloud, RefreshCw, Download, Upload, Check } from "lucide-react";
import { toast } from "sonner";

export function SettingsSync() {
  const [autoSync, setAutoSync] = React.useState(true);
  const [syncing, setSyncing] = React.useState(false);
  const [lastSync, setLastSync] = React.useState<Date | null>(new Date());

  const handleSync = async () => {
    setSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLastSync(new Date());
    setSyncing(false);
    toast.success("Settings synced successfully!");
  };

  const handleExport = () => {
    const settings = {
      theme: "dark",
      language: "en",
      fontSize: 16,
      accessibility: { highContrast: false, largeCursor: false },
    };
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "settings.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Settings exported!");
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast.success("Settings imported!");
      }
    };
    input.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Settings Sync
        </CardTitle>
        <CardDescription>
          Sync your settings across devices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium">Auto-sync</label>
            <p className="text-xs text-muted-foreground">Automatically sync settings when changed</p>
          </div>
          <Switch
            checked={autoSync}
            onCheckedChange={setAutoSync}
          />
        </div>

        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Last synced</p>
              <p className="text-xs text-muted-foreground">
                {lastSync ? lastSync.toLocaleString() : "Never"}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSync}
              disabled={syncing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing..." : "Sync Now"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleImport}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
