"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Palette, Languages, Type, Accessibility, Bell, Shield } from "lucide-react";
import { ThemeSettings } from "./ThemeSettings";
import { LanguageSettings } from "./LanguageSettings";
import { FontSettings } from "./FontSettings";
import { AccessibilitySettings } from "./AccessibilitySettings";

export function SettingsPanel() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="w-8 h-8" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your workspace settings and preferences
        </p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="appearance">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="language">
            <Languages className="w-4 h-4 mr-2" />
            Language
          </TabsTrigger>
          <TabsTrigger value="typography">
            <Type className="w-4 h-4 mr-2" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="accessibility">
            <Accessibility className="w-4 h-4 mr-2" />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ThemeSettings />
          </div>
        </TabsContent>

        <TabsContent value="language" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <LanguageSettings />
          </div>
        </TabsContent>

        <TabsContent value="typography" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FontSettings />
          </div>
        </TabsContent>

        <TabsContent value="accessibility" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <AccessibilitySettings />
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Notification settings coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
