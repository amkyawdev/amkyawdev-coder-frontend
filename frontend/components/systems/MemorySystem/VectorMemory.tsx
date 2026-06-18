"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Database, Clock, Trash2, Copy } from "lucide-react";

interface MemoryVector {
  id: string;
  content: string;
  embedding: number[];
  createdAt: Date;
  tags: string[];
  similarity?: number;
}

const vectors: MemoryVector[] = [
  { id: "1", content: "User prefers dark theme for coding", embedding: [], createdAt: new Date(), tags: ["preference", "theme"], similarity: 0.95 },
  { id: "2", content: "React component patterns for enterprise apps", embedding: [], createdAt: new Date(), tags: ["react", "patterns"], similarity: 0.88 },
  { id: "3", content: "TypeScript best practices for AI agents", embedding: [], createdAt: new Date(), tags: ["typescript", "ai"], similarity: 0.82 },
];

export function VectorMemory() {
  const [query, setQuery] = React.useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Vector Memory
        </CardTitle>
        <CardDescription>
          Semantic search across your memory store
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search memories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-3">
          {vectors.map((vector) => (
            <div key={vector.id} className="p-4 rounded-lg border hover:bg-accent transition-colors">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium">{vector.content}</p>
                {vector.similarity && (
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {(vector.similarity * 100).toFixed(0)}% match
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {vector.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                  <Clock className="w-3 h-3" />
                  {vector.createdAt.toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="ghost" size="sm">
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
