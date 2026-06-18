"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items?: BreadcrumbItem[];
}

export function Navigation({ items = [] }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="hover:text-primary transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={item.href}
            className={cn(
              "hover:text-primary transition-colors",
              index === items.length - 1 && "text-foreground font-medium"
            )}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
