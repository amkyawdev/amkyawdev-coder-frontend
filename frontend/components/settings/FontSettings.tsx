"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Type } from "lucide-react";

export function FontSettings() {
  const [fontFamily, setFontFamily] = React.useState("inter");
  const [fontSize, setFontSize] = React.useState([16]);
  const [lineHeight, setLineHeight] = React.useState([1.5]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="w-5 h-5" />
          Font Settings
        </CardTitle>
        <CardDescription>
          Customize typography and text appearance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Font Family</label>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter (Default)</SelectItem>
              <SelectItem value="system">System UI</SelectItem>
              <SelectItem value="mono">Monospace</SelectItem>
              <SelectItem value="serif">Serif</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Base Font Size</label>
            <span className="text-sm text-muted-foreground">{fontSize}px</span>
          </div>
          <Slider
            value={fontSize}
            onValueChange={setFontSize}
            max={24}
            min={12}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Small (12px)</span>
            <span>Large (24px)</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Line Height</label>
            <span className="text-sm text-muted-foreground">{lineHeight}</span>
          </div>
          <Slider
            value={lineHeight}
            onValueChange={setLineHeight}
            max={2}
            min={1}
            step={0.1}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Compact</span>
            <span>Relaxed</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/50">
          <p className="text-sm font-medium mb-2">Preview</p>
          <p className="text-muted-foreground" style={{ fontFamily, fontSize: `${fontSize}px`, lineHeight: `${lineHeight[0]}em` }}>
            The quick brown fox jumps over the lazy dog. This is a preview of your font settings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
