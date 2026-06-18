"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FileArchive, FolderOpen, CheckCircle2, Loader2, File } from "lucide-react";
import { toast } from "sonner";

interface ExtractedFile {
  id: string;
  name: string;
  path: string;
  size: number;
  extracted: boolean;
}

export function ZipExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast.success("File selected!");
    }
  };

  const handleExtract = async () => {
    if (!file) return;
    
    setIsExtracting(true);
    setProgress(0);
    setExtractedFiles([]);

    const mockFiles: ExtractedFile[] = [
      { id: "1", name: "index.tsx", path: "/src/pages", size: 2048, extracted: false },
      { id: "2", name: "styles.css", path: "/src/styles", size: 1024, extracted: false },
      { id: "3", name: "config.json", path: "/", size: 512, extracted: false },
      { id: "4", name: "README.md", path: "/", size: 256, extracted: false },
    ];

    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProgress(i);
      if (i >= 20) setExtractedFiles(mockFiles.slice(0, Math.floor(i / 25)));
    }

    setExtractedFiles(mockFiles);
    setIsExtracting(false);
    toast.success("Extraction complete!");
  };

  const formatSize = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          ZIP Extractor
        </CardTitle>
        <CardDescription>
          Extract and preview archive contents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <input
            type="file"
            accept=".zip"
            className="hidden"
            id="zip-upload"
            onChange={handleFileSelect}
          />
          <label htmlFor="zip-upload" className="cursor-pointer">
            <FileArchive className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              {file ? file.name : "Select a ZIP file to extract"}
            </p>
            {file && (
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </label>
        </div>

        {isExtracting && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Extracting...
              </span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        {extractedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Extracted Files ({extractedFiles.length})</h4>
            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {extractedFiles.map((f) => (
                <div key={f.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <File className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.path}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatSize(f.size)}</span>
                  {f.extracted && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button 
          className="w-full" 
          onClick={handleExtract}
          disabled={!file || isExtracting}
        >
          <FolderOpen className="w-4 h-4 mr-2" />
          Extract Archive
        </Button>
      </CardContent>
    </Card>
  );
}
