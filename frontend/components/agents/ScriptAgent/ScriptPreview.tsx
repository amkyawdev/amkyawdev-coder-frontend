"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Smartphone, Monitor, Tablet, Maximize2 } from "lucide-react";

interface PreviewDevice {
  id: string;
  name: string;
  icon: React.ReactNode;
  width: string;
}

const devices: PreviewDevice[] = [
  { id: "desktop", name: "Desktop", icon: <Monitor className="w-4 h-4" />, width: "100%" },
  { id: "tablet", name: "Tablet", icon: <Tablet className="w-4 h-4" />, width: "768px" },
  { id: "mobile", name: "Mobile", icon: <Smartphone className="w-4 h-4" />, width: "375px" },
];

export function ScriptPreview() {
  const [selectedDevice, setSelectedDevice] = useState("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentDevice = devices.find(d => d.id === selectedDevice) || devices[0];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Live Preview
            </CardTitle>
            <CardDescription>
              Preview your generated scripts
            </CardDescription>
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => setSelectedDevice(device.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                selectedDevice === device.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {device.icon}
              <span className="text-sm">{device.name}</span>
            </button>
          ))}
        </div>

        <div 
          className={`border rounded-lg overflow-hidden transition-all duration-300 ${
            isFullscreen ? "fixed inset-4 z-50" : ""
          }`}
          style={{ maxWidth: currentDevice.width }}
        >
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs font-medium border-b flex items-center justify-between">
            <span>{currentDevice.name} Preview</span>
            <span className="text-muted-foreground">{currentDevice.width}</span>
          </div>
          <div 
            className="bg-white dark:bg-gray-900 p-6 min-h-[300px] transition-all duration-300"
            style={{ 
              width: selectedDevice === "desktop" ? "100%" : currentDevice.width,
              margin: selectedDevice !== "desktop" ? "0 auto" : undefined
            }}
          >
            <div className="space-y-4">
              <div className="h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg" />
              </div>
              <div className="flex gap-2">
                <div className="h-10 flex-1 bg-primary rounded-lg" />
                <div className="h-10 flex-1 bg-secondary rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
