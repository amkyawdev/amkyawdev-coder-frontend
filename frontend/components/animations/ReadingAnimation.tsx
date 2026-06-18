"use client";

import React from "react";

interface ReadingAnimationProps {
  className?: string;
  size?: number;
}

export function ReadingAnimation({ className = "", size = 200 }: ReadingAnimationProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="readingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
        
        {/* Book */}
        <path
          d="M30 50 L100 60 L100 150 L30 140 Z"
          fill="url(#readingGradient)"
        />
        <path
          d="M100 60 L170 50 L170 140 L100 150 Z"
          fill="#764ba2"
        />
        
        {/* Book spine */}
        <line x1="100" y1="60" x2="100" y2="150" stroke="#fff" strokeWidth="2" />
        
        {/* Text lines on left page */}
        <rect x="40" y="70" width="50" height="4" rx="2" fill="#fff" opacity="0.7" />
        <rect x="40" y="80" width="40" height="4" rx="2" fill="#fff" opacity="0.7" />
        <rect x="40" y="90" width="45" height="4" rx="2" fill="#fff" opacity="0.7" />
        <rect x="40" y="100" width="35" height="4" rx="2" fill="#fff" opacity="0.7" />
        
        {/* Text lines on right page */}
        <rect x="110" y="70" width="45" height="4" rx="2" fill="#fff" opacity="0.7" />
        <rect x="110" y="80" width="50" height="4" rx="2" fill="#fff" opacity="0.7" />
        <rect x="110" y="90" width="40" height="4" rx="2" fill="#fff" opacity="0.7" />
        <rect x="110" y="100" width="48" height="4" rx="2" fill="#fff" opacity="0.7" />
        
        {/* Glasses */}
        <circle cx="130" cy="160" r="20" stroke="url(#readingGradient)" strokeWidth="4" fill="none" />
        <circle cx="170" cy="160" r="20" stroke="url(#readingGradient)" strokeWidth="4" fill="none" />
        <line x1="150" y1="160" x2="150" y2="160" stroke="url(#readingGradient)" strokeWidth="4" />
        <line x1="110" y1="160" x2="100" y2="155" stroke="url(#readingGradient)" strokeWidth="3" />
        <line x1="190" y1="160" x2="200" y2="155" stroke="url(#readingGradient)" strokeWidth="3" />
        
        {/* Floating sparkles */}
        <circle cx="60" cy="45" r="4" fill="#667eea" className="animate-pulse" />
        <circle cx="145" cy="40" r="3" fill="#764ba2" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
      </svg>
    </div>
  );
}
