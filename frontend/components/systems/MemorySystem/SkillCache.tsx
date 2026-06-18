"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Clock, Database, HardDrive, Trash2 } from "lucide-react";

interface CachedSkill {
  id: string;
  name: string;
  lastUsed: Date;
  hitCount: number;
  size: number;
  ttl: number;
}

const cachedSkills: CachedSkill[] = [
  { id: "1", name: "Code Review", lastUsed: new Date(), hitCount: 45, size: 1024, ttl: 3600 },
  { id: "2", name: "Bug Detection", lastUsed: new Date(Date.now() - 3600000), hitCount: 32, size: 512, ttl: 7200 },
  { id: "3", name: "Documentation", lastUsed: new Date(Date.now() - 86400000), hitCount: 18, size: 256, ttl: 1800 },
];

export function SkillCache() {
  const totalSize = cachedSkills.reduce((acc, skill) => acc + skill.size, 0);
  const maxSize = 8192; // 8MB
  const usagePercent = (totalSize / maxSize) * 100;

  const formatSize = (kb: number) => {
    if (kb < 1024) return `${kb} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Skill Cache
        </CardTitle>
        <CardDescription>
          Cached skill results for faster access
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <HardDrive className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-lg font-semibold">{formatSize(totalSize)}</p>
            <p className="text-xs text-muted-foreground">Cache Size</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <Database className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-lg font-semibold">{cachedSkills.length}</p>
            <p className="text-xs text-muted-foreground">Cached Skills</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <Sparkles className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-lg font-semibold">{cachedSkills.reduce((acc, s) => acc + s.hitCount, 0)}</p>
            <p className="text-xs text-muted-foreground">Total Hits</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Cache Usage</span>
            <span className="font-medium">{usagePercent.toFixed(1)}%</span>
          </div>
          <Progress value={usagePercent} />
        </div>

        <div className="space-y-3">
          {cachedSkills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{skill.name}</p>
                  <Badge variant="secondary" className="text-xs">{skill.hitCount} hits</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(skill.lastUsed)}
                  </span>
                  <span>{formatSize(skill.size)}</span>
                  <span>TTL: {skill.ttl}s</span>
                </div>
              </div>
              <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
