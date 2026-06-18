"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileArchive, File, Folder, Image, Code } from "lucide-react";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  expanded?: boolean;
}

const fileTree: FileNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    expanded: true,
    children: [
      { id: "2", name: "components", type: "folder", children: [
        { id: "3", name: "Button.tsx", type: "file" },
        { id: "4", name: "Card.tsx", type: "file" },
      ]},
      { id: "5", name: "app", type: "folder", children: [
        { id: "6", name: "page.tsx", type: "file" },
        { id: "7", name: "layout.tsx", type: "file" },
      ]},
    ],
  },
  { id: "8", name: "package.json", type: "file" },
  { id: "9", name: "README.md", type: "file" },
];

export function ZipPreview() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["1"]));

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const getFileIcon = (name: string) => {
    if (name.endsWith(".tsx") || name.endsWith(".ts")) return <Code className="w-4 h-4 text-blue-500" />;
    if (name.endsWith(".png") || name.endsWith(".jpg") || name.endsWith(".svg")) return <Image className="w-4 h-4 text-green-500" />;
    return <File className="w-4 h-4 text-muted-foreground" />;
  };

  const renderNode = (node: FileNode, depth: number = 0) => (
    <div key={node.id}>
      <button
        onClick={() => node.type === "folder" && toggleExpand(node.id)}
        className="flex items-center gap-2 w-full p-2 hover:bg-accent rounded-lg transition-colors text-left"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {node.type === "folder" ? (
          <>
            {expanded.has(node.id) ? (
              <Folder className="w-4 h-4 text-yellow-500" />
            ) : (
              <Folder className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium">{node.name}</span>
          </>
        ) : (
          <>
            {getFileIcon(node.name)}
            <span className="text-sm">{node.name}</span>
          </>
        )}
      </button>
      {node.type === "folder" && expanded.has(node.id) && node.children && (
        <div>
          {node.children.map(child => renderNode(child, depth + 1))}
        </div>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileArchive className="w-5 h-5" />
          Archive Preview
        </CardTitle>
        <CardDescription>
          Preview file structure before extraction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tree" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tree">Tree View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="tree" className="mt-4 max-h-[300px] overflow-y-auto">
            <div className="border rounded-lg p-2">
              {fileTree.map(node => renderNode(node))}
            </div>
          </TabsContent>
          <TabsContent value="list" className="mt-4 max-h-[300px] overflow-y-auto">
            <div className="space-y-1">
              {["src/components/Button.tsx", "src/components/Card.tsx", "src/app/page.tsx", "src/app/layout.tsx", "package.json", "README.md"].map((path, i) => (
                <div key={i} className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
                  {getFileIcon(path)}
                  <span className="text-sm">{path}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
