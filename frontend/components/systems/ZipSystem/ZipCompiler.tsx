"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, FileArchive, Package, CheckCircle2, Loader2 } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "pending" | "compressing" | "done";
}

export function ZipCompiler() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zipName, setZipName] = useState("project");

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: FileItem[] = droppedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type || "unknown",
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleCompress = async () => {
    setIsCompressing(true);
    setProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }

    setFiles((prev) =>
      prev.map((file) => ({ ...file, status: "done" }))
    );
    setIsCompressing(false);
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileArchive className="w-5 h-5" />
          Zip Compiler
        </CardTitle>
        <CardDescription>
          Compile and compress your project files
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
        >
          <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop files here, or click to browse
          </p>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || []);
              const newFiles: FileItem[] = selectedFiles.map((file) => ({
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: file.size,
                type: file.type || "unknown",
                status: "pending" as const,
              }));
              setFiles((prev) => [...prev, ...newFiles]);
            }}
          />
          <Button variant="outline" size="sm" onClick={(e) => (e.target as HTMLElement).closest("div")?.querySelector("input")?.click()}>
            Browse Files
          </Button>
        </div>

        {files.length > 0 && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{files.length} files</span>
                <span className="text-muted-foreground">{formatSize(totalSize)} total</span>
              </div>
              <div className="max-h-[200px] overflow-y-auto space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === "compressing" && (
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      )}
                      {file.status === "done" && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(file.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Output filename</label>
              <div className="flex gap-2">
                <Input
                  value={zipName}
                  onChange={(e) => setZipName(e.target.value)}
                  placeholder="Enter filename"
                />
                <span className="flex items-center text-muted-foreground">.zip</span>
              </div>
            </div>

            {isCompressing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Compressing...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleCompress}
              disabled={isCompressing}
            >
              <FileArchive className="w-4 h-4 mr-2" />
              {isCompressing ? "Compressing..." : "Create ZIP Archive"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
