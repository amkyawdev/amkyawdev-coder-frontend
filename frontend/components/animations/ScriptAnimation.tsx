"use client";

import React from "react";

interface ScriptAnimationProps {
  className?: string;
  size?: number;
}

export function ScriptAnimation({ className = "", size = 200 }: ScriptAnimationProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="scriptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
        
        {/* Terminal window */}
        <rect x="20" y="30" width="160" height="120" rx="10" fill="url(#scriptGradient)" />
        <rect x="25" y="35" width="150" height="110" rx="8" fill="#1a1a2e" />
        
        {/* Terminal dots */}
        <circle cx="40" cy="45" r="5" fill="#ff5f56" />
        <circle cx="55" cy="45" r="5" fill="#ffbd2e" />
        <circle cx="70" cy="45" r="5" fill="#27ca40" />
        
        {/* Code lines with animation */}
        <rect x="40" y="60" width="80" height="5" rx="2.5" fill="#667eea" className="animate-pulse" />
        <rect x="40" y="72" width="60" height="5" rx="2.5" fill="#764ba2" />
        <rect x="40" y="84" width="100" height="5" rx="2.5" fill="#667eea" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
        <rect x="40" y="96" width="70" height="5" rx="2.5" fill="#764ba2" />
        <rect x="40" y="108" width="90" height="5" rx="2.5" fill="#667eea" />
        
        {/* Cursor */}
        <rect x="40" y="120" width="3" height="15" fill="#fff" className="animate-pulse" />
        
        {/* Floating script elements */}
        <rect x="150" y="55" width="30" height="20" rx="3" fill="#667eea" className="animate-bounce" />
        <rect x="155" y="80" width="25" height="15" rx="3" fill="#764ba2" className="animate-bounce" style={{ animationDelay: "0.2s" }} />
        <rect x="145" y="105" width="35" height="18" rx="3" fill="#667eea" className="animate-bounce" style={{ animationDelay: "0.4s" }} />
      </svg>
    </div>
  );
}
