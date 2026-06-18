"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  LayoutDashboard,
  Plus,
  Settings,
  FileText,
  Archive,
  Rocket,
  Database,
  Sparkles,
  Brain,
  Code,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const mainNav: NavItem[] = [
  { title: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
  { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { title: "New Workspace", href: "/workspace/new", icon: <Plus className="w-5 h-5" />, badge: "New" },
];

const agentNav: NavItem[] = [
  { title: "Skill Agents", href: "/agents/skills", icon: <Sparkles className="w-5 h-5" /> },
  { title: "Long Chain", href: "/agents/chain", icon: <GitBranch className="w-5 h-5" /> },
  { title: "Script Agent", href: "/agents/script", icon: <Code className="w-5 h-5" /> },
];

const systemNav: NavItem[] = [
  { title: "Zip System", href: "/systems/zip", icon: <Archive className="w-5 h-5" /> },
  { title: "Deploy", href: "/systems/deploy", icon: <Rocket className="w-5 h-5" /> },
  { title: "Memory", href: "/systems/memory", icon: <Database className="w-5 h-5" /> },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;
    
    const linkContent = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
            : "hover:bg-accent text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="shrink-0">{item.icon}</span>
        {!collapsed && (
          <>
            <span className="flex-1 text-sm font-medium">{item.title}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-white/20">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-2">
            {item.title}
            {item.badge && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary">{item.badge}</span>}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "sticky top-0 h-screen border-r bg-card transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold gradient-text">AmkyawDev</span>
              </Link>
            )}
            {collapsed && (
              <Link href="/" className="mx-auto">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </Link>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          <div className="space-y-1">
            {!collapsed && <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase">Main</h3>}
            {mainNav.map((item) => (
              <div key={item.href}>
                <NavLink item={item} />
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {!collapsed && <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase">Agents</h3>}
            {agentNav.map((item) => (
              <div key={item.href}>
                <NavLink item={item} />
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {!collapsed && <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase">Systems</h3>}
            {systemNav.map((item) => (
              <div key={item.href}>
                <NavLink item={item} />
              </div>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t">
          <NavLink
            item={{
              title: "Settings",
              href: "/settings",
              icon: <Settings className="w-5 h-5" />,
            }}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 w-6 h-6 rounded-full border bg-background shadow-md"
          onClick={onToggle}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </aside>
    </TooltipProvider>
  );
}
