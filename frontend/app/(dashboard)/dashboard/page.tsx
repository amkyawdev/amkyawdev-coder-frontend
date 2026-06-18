"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SkillOrchestrator } from "@/components/agents/SkillAgent/SkillOrchestrator";
import { ChainOrchestrator } from "@/components/agents/LongChainAgent/ChainOrchestrator";
import { ScriptGenerator } from "@/components/agents/ScriptAgent/ScriptGenerator";
import { Sparkles, Plus, Search, Activity, Clock, TrendingUp, Folder, FileCode, Archive, MessageSquare } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="hidden md:inline-block font-bold text-lg gradient-text">
                AmkyawDev
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-64" 
              />
            </div>
            <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              New Workspace
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Developer</h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your AI agents today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <StatCard
            icon={<Activity className="w-5 h-5" />}
            label="Active Agents"
            value="12"
            trend="+2"
            color="bg-blue-500"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Tasks Completed"
            value="1,234"
            trend="+15%"
            color="bg-green-500"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Productivity"
            value="87%"
            trend="+5%"
            color="bg-purple-500"
          />
          <StatCard
            icon={<Folder className="w-5 h-5" />}
            label="Workspaces"
            value="8"
            trend=""
            color="bg-orange-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <QuickActionCard
            icon={<Sparkles className="w-6 h-6" />}
            title="AI Chat"
            description="Chat with AI agents"
            href="/chat"
            gradient="from-indigo-500 to-purple-600"
          />
          <QuickActionCard
            icon={<FileCode className="w-6 h-6" />}
            title="Skill Agents"
            description="Execute specialized AI skills"
            href="/agents/skills"
            gradient="from-purple-500 to-pink-600"
          />
          <QuickActionCard
            icon={<Archive className="w-6 h-6" />}
            title="Script Agent"
            description="Generate and optimize code"
            href="/agents/script"
            gradient="from-pink-500 to-red-600"
          />
          <QuickActionCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Zip System"
            description="Compile and compress files"
            href="/systems/zip"
            gradient="from-yellow-500 to-orange-600"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Workspaces</CardTitle>
              <CardDescription>Your latest workspace activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <WorkspaceItem
                  name="E-commerce Dashboard"
                  lastEdited="2 hours ago"
                  status="active"
                />
                <WorkspaceItem
                  name="AI Code Review"
                  lastEdited="Yesterday"
                  status="active"
                />
                <WorkspaceItem
                  name="Mobile App Backend"
                  lastEdited="3 days ago"
                  status="paused"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>AI agent activity this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AgentPerformanceItem
                  name="Code Review Agent"
                  tasks={45}
                  successRate={98}
                />
                <AgentPerformanceItem
                  name="Script Generator"
                  tasks={32}
                  successRate={95}
                />
                <AgentPerformanceItem
                  name="Bug Detector"
                  tasks={28}
                  successRate={92}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  trend, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  trend: string; 
  color: string; 
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${color}/10 text-foreground`}>
            {icon}
          </div>
          {trend && (
            <Badge variant="outline" className="text-green-600 border-green-600">
              {trend}
            </Badge>
          )}
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

function QuickActionCard({
  icon,
  title,
  description,
  href,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  gradient: string;
}) {
  return (
    <Link href={href}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
        <CardContent className="p-6">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function WorkspaceItem({
  name,
  lastEdited,
  status,
}: {
  name: string;
  lastEdited: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white">
          <Folder className="w-5 h-5" />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">Edited {lastEdited}</p>
        </div>
      </div>
      <Badge variant={status === "active" ? "default" : "secondary"}>
        {status}
      </Badge>
    </div>
  );
}

function AgentPerformanceItem({
  name,
  tasks,
  successRate,
}: {
  name: string;
  tasks: number;
  successRate: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{tasks} tasks</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-green-600">{successRate}%</p>
        <p className="text-xs text-muted-foreground">success rate</p>
      </div>
    </div>
  );
}
