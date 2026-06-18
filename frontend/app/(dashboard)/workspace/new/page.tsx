"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Plus, Trash2 } from "lucide-react";

export default function NewWorkspacePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold gradient-text">New Workspace</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Create New Workspace</CardTitle>
            <CardDescription>
              Set up a new AI-powered development workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Workspace Name</label>
              <Input placeholder="My Awesome Project" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your workspace..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Template</label>
              <div className="grid gap-3">
                <TemplateOption title="Blank Workspace" description="Start from scratch" icon={<Plus className="w-5 h-5" />} />
                <TemplateOption title="React + Next.js" description="Full-stack React application" icon={<Sparkles className="w-5 h-5" />} />
                <TemplateOption title="AI Agent Starter" description="Pre-configured AI agent environment" icon={<Sparkles className="w-5 h-5" />} />
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600">
                Create Workspace
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TemplateOption({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
