"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Accessibility, Eye, MousePointer, Volume2 } from "lucide-react";

export function AccessibilitySettings() {
  const [highContrast, setHighContrast] = React.useState(false);
  const [largeCursor, setLargeCursor] = React.useState(false);
  const [screenReader, setScreenReader] = React.useState(true);
  const [keyboardNav, setKeyboardNav] = React.useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Accessibility className="w-5 h-5" />
          Accessibility Settings
        </CardTitle>
        <CardDescription>
          Improve accessibility and usability
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <label className="text-sm font-medium">High Contrast Mode</label>
                <p className="text-xs text-muted-foreground">Increase contrast for better visibility</p>
              </div>
            </div>
            <Switch
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <MousePointer className="w-4 h-4" />
              </div>
              <div>
                <label className="text-sm font-medium">Large Cursor</label>
                <p className="text-xs text-muted-foreground">Use a larger mouse cursor</p>
              </div>
            </div>
            <Switch
              checked={largeCursor}
              onCheckedChange={setLargeCursor}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <label className="text-sm font-medium">Screen Reader Support</label>
                <p className="text-xs text-muted-foreground">Enable screen reader optimizations</p>
              </div>
            </div>
            <Switch
              checked={screenReader}
              onCheckedChange={setScreenReader}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Accessibility className="w-4 h-4" />
              </div>
              <div>
                <label className="text-sm font-medium">Enhanced Keyboard Navigation</label>
                <p className="text-xs text-muted-foreground">Better keyboard navigation support</p>
              </div>
            </div>
            <Switch
              checked={keyboardNav}
              onCheckedChange={setKeyboardNav}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
