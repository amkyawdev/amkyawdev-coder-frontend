"use client";

import React from "react";

interface SearchAnimationProps {
  className?: string;
  size?: number;
}

export function SearchAnimation({ className = "", size = 200 }: SearchAnimationProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
        
        {/* Search circle */}
        <circle 
          cx="80" 
          cy="80" 
          r="50" 
          stroke="url(#searchGradient)" 
          strokeWidth="8" 
          fill="none"
          className="animate-pulse"
        />
        
        {/* Search handle */}
        <line 
          x1="115" 
          y1="115" 
          x2="150" 
          y2="150" 
          stroke="url(#searchGradient)" 
          strokeWidth="10" 
          strokeLinecap="round"
        />
        
        {/* Magnifying glass dot */}
        <circle cx="80" cy="80" r="15" fill="url(#searchGradient)" className="animate-pulse" />
        
        {/* Floating search results */}
        <rect x="40" y="140" width="80" height="12" rx="6" fill="#667eea" className="animate-bounce" style={{ animationDelay: "0s" }} />
        <rect x="50" y="160" width="60" height="10" rx="5" fill="#764ba2" className="animate-bounce" style={{ animationDelay: "0.2s" }} />
        <rect x="45" y="178" width="70" height="10" rx="5" fill="#667eea" className="animate-bounce" style={{ animationDelay: "0.4s" }} />
      </svg>
    </div>
  );
}
