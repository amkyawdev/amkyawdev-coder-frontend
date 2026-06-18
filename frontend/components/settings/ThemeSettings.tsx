"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Sun, Moon, Monitor, Palette } from "lucide-react";

export function ThemeSettings() {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system");
  const [accentIntensity, setAccentIntensity] = React.useState([50]);
  const [animations, setAnimations] = React.useState(true);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme Settings
        </CardTitle>
        <CardDescription>
          Customize the appearance of your workspace
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">Theme Mode</label>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              className="flex-col h-auto py-4"
              onClick={() => setTheme("light")}
            >
              <Sun className="w-5 h-5 mb-2" />
              <span className="text-sm">Light</span>
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              className="flex-col h-auto py-4"
              onClick={() => setTheme("dark")}
            >
              <Moon className="w-5 h-5 mb-2" />
              <span className="text-sm">Dark</span>
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              className="flex-col h-auto py-4"
              onClick={() => setTheme("system")}
            >
              <Monitor className="w-5 h-5 mb-2" />
              <span className="text-sm">System</span>
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Accent Color Intensity</label>
            <span className="text-sm text-muted-foreground">{accentIntensity}%</span>
          </div>
          <Slider
            value={accentIntensity}
            onValueChange={setAccentIntensity}
            max={100}
            min={0}
            step={10}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Animations</label>
              <p className="text-xs text-muted-foreground">Enable interface animations</p>
            </div>
            <Switch
              checked={animations}
              onCheckedChange={setAnimations}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Reduced Motion</label>
              <p className="text-xs text-muted-foreground">Minimize animations for accessibility</p>
            </div>
            <Switch
              checked={reducedMotion}
              onCheckedChange={setReducedMotion}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
