"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CoderAnimation } from "./CoderAnimation";
import { SearchAnimation } from "./SearchAnimation";
import { ReadingAnimation } from "./ReadingAnimation";
import { ScriptAnimation } from "./ScriptAnimation";
import { ThankingAnimation } from "./ThankingAnimation";
import { ConnectionAnimation } from "./ConnectionAnimation";

type AnimationType = "coder" | "search" | "reading" | "script" | "thanking" | "connection";

interface AnimationContextType {
  currentAnimation: AnimationType;
  setCurrentAnimation: (type: AnimationType) => void;
  size: number;
  setSize: (size: number) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationType>("coder");
  const [size, setSize] = useState(200);

  return (
    <AnimationContext.Provider value={{ currentAnimation, setCurrentAnimation, size, setSize }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
}

const animationComponents: Record<AnimationType, React.ComponentType<{ size?: number; className?: string }>> = {
  coder: CoderAnimation,
  search: SearchAnimation,
  reading: ReadingAnimation,
  script: ScriptAnimation,
  thanking: ThankingAnimation,
  connection: ConnectionAnimation,
};

interface AnimatedContentProps {
  type: AnimationType;
  size?: number;
  className?: string;
  fallback?: ReactNode;
}

export function AnimatedContent({ type, size, className, fallback }: AnimatedContentProps) {
  const Component = animationComponents[type];
  return Component ? <Component size={size} className={className} /> : fallback || null;
}
