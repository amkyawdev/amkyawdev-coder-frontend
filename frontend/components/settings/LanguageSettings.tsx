"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Languages } from "lucide-react";

export function LanguageSettings() {
  const [language, setLanguage] = React.useState("en");
  const [autoDetect, setAutoDetect] = React.useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-5 h-5" />
          Language Settings
        </CardTitle>
        <CardDescription>
          Configure language and localization preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Interface Language</label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="my">Myanmar (Burmese)</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="ko">Korean</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Auto-detect Language</label>
          <p className="text-xs text-muted-foreground">
            Automatically detect and adapt to user input language
          </p>
          <Select defaultValue="off">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="off">Off</SelectItem>
              <SelectItem value="prompt">Prompt for confirmation</SelectItem>
              <SelectItem value="auto">Always auto-detect</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date & Time Format</label>
          <Select defaultValue="locale">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="locale">Use locale settings</SelectItem>
              <SelectItem value="en">MM/DD/YYYY</SelectItem>
              <SelectItem value="iso">YYYY-MM-DD (ISO)</SelectItem>
              <SelectItem value="eu">DD/MM/YYYY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
