"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Share2, ExternalLink, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function ZipDownload() {
  const [copied, setCopied] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const downloadUrl = "https://example.com/downloads/project.zip";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    setDownloading(true);
    setProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }

    setDownloading(false);
    toast.success("Download started!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Project Archive",
          text: "Download my project archive",
          url: downloadUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Download Archive
        </CardTitle>
        <CardDescription>
          Download or share your compiled archive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-4 p-6 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <div className="text-center">
            <p className="text-3xl font-bold gradient-text">project.zip</p>
            <p className="text-sm text-muted-foreground mt-1">45.2 MB</p>
          </div>
        </div>

        {downloading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Downloading...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        <Button 
          className="w-full" 
          size="lg"
          onClick={handleDownload}
          disabled={downloading}
        >
          <Download className="w-5 h-5 mr-2" />
          Download ZIP
        </Button>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </>
            )}
          </Button>
        </div>

        <Button variant="ghost" className="w-full" asChild>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Download Page
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
