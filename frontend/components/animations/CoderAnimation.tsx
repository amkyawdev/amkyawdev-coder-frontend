"use client";

import React from "react";

interface CoderAnimationProps {
  className?: string;
  size?: number;
}

export function CoderAnimation({ className = "", size = 200 }: CoderAnimationProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="coderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
        
        {/* Monitor */}
        <rect x="30" y="40" width="140" height="100" rx="8" fill="url(#coderGradient)" />
        <rect x="35" y="45" width="130" height="85" rx="4" fill="#1a1a2e" />
        
        {/* Code lines */}
        <rect x="45" y="55" width="60" height="6" rx="3" fill="#667eea" className="animate-pulse" />
        <rect x="110" y="55" width="30" height="6" rx="3" fill="#764ba2" />
        <rect x="45" y="68" width="40" height="6" rx="3" fill="#764ba2" />
        <rect x="90" y="68" width="50" height="6" rx="3" fill="#667eea" />
        <rect x="45" y="81" width="80" height="6" rx="3" fill="#667eea" className="animate-pulse" />
        <rect x="130" y="81" width="20" height="6" rx="3" fill="#764ba2" />
        <rect x="45" y="94" width="50" height="6" rx="3" fill="#764ba2" />
        <rect x="100" y="94" width="40" height="6" rx="3" fill="#667eea" />
        
        {/* Monitor stand */}
        <rect x="85" y="140" width="30" height="20" fill="url(#coderGradient)" />
        <rect x="60" y="155" width="80" height="10" rx="3" fill="url(#coderGradient)" />
        
        {/* Floating elements */}
        <circle cx="25" cy="60" r="8" fill="#667eea" className="animate-bounce" style={{ animationDelay: "0s" }} />
        <circle cx="175" cy="50" r="6" fill="#764ba2" className="animate-bounce" style={{ animationDelay: "0.3s" }} />
        <circle cx="170" cy="100" r="10" fill="#667eea" className="animate-bounce" style={{ animationDelay: "0.6s" }} />
        
        {/* Cursor */}
        <rect x="55" y="100" width="3" height="15" fill="#fff" className="animate-pulse" />
      </svg>
    </div>
  );
}
