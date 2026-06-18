"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Database, FileText, Network, BarChart3, Trash2, Download, RefreshCw } from "lucide-react";

interface MemoryStats {
  totalMemories: number;
  categories: number;
  embeddings: number;
  lastSync: Date;
}

export function MemoryBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const stats: MemoryStats = {
    totalMemories: 1234,
    categories: 8,
    embeddings: 5678,
    lastSync: new Date(),
  };

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Memory Browser
            </CardTitle>
            <CardDescription>
              Explore and manage your agent memory
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 text-center p-4 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
            <p className="text-3xl font-bold gradient-text">{stats.totalMemories.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Memories</p>
          </div>
          <div className="col-span-1 text-center p-4 rounded-lg bg-muted/50">
            <p className="text-3xl font-bold text-blue-600">{stats.categories}</p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </div>
          <div className="col-span-1 text-center p-4 rounded-lg bg-muted/50">
            <p className="text-3xl font-bold text-purple-600">{stats.embeddings.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Embeddings</p>
          </div>
          <div className="col-span-1 text-center p-4 rounded-lg bg-muted/50">
            <p className="text-lg font-bold">{(stats.lastSync.toLocaleTimeString())}</p>
            <p className="text-xs text-muted-foreground">Last Sync</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search memories by content, tags, or metadata..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="vectors">Vectors</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            <MemoryItem icon={<FileText className="w-4 h-4" />} name="Code patterns" count={234} type="vectors" />
            <MemoryItem icon={<Network className="w-4 h-4" />} name="User preferences" count={56} type="context" />
            <MemoryItem icon={<BarChart3 className="w-4 h-4" />} name="Execution history" count={89} type="skills" />
          </TabsContent>

          <TabsContent value="vectors" className="space-y-3 mt-4">
            <MemoryItem icon={<FileText className="w-4 h-4" />} name="Code patterns" count={234} type="vectors" />
            <MemoryItem icon={<FileText className="w-4 h-4" />} name="Documentation" count={78} type="vectors" />
          </TabsContent>

          <TabsContent value="conversations" className="space-y-3 mt-4">
            <MemoryItem icon={<Network className="w-4 h-4" />} name="User preferences" count={56} type="context" />
            <MemoryItem icon={<Network className="w-4 h-4" />} name="Session data" count={23} type="context" />
          </TabsContent>

          <TabsContent value="skills" className="space-y-3 mt-4">
            <MemoryItem icon={<BarChart3 className="w-4 h-4" />} name="Execution history" count={89} type="skills" />
            <MemoryItem icon={<BarChart3 className="w-4 h-4" />} name="Skill cache" count={45} type="skills" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface MemoryItemProps {
  icon: React.ReactNode;
  name: string;
  count: number;
  type: string;
}

function MemoryItem({ icon, name, count, type }: MemoryItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-primary/10">
          {icon}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-muted-foreground capitalize">{type}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{count} items</span>
        <Button variant="ghost" size="icon">
          <Download className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
