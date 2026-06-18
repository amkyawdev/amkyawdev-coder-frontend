"use client";

import React from "react";

interface ConnectionAnimationProps {
  className?: string;
  size?: number;
}

export function ConnectionAnimation({ className = "", size = 200 }: ConnectionAnimationProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="connGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
        
        {/* Connection lines */}
        <line x1="50" y1="50" x2="100" y2="100" stroke="url(#connGradient)" strokeWidth="3" opacity="0.5" className="animate-pulse" />
        <line x1="150" y1="50" x2="100" y2="100" stroke="url(#connGradient)" strokeWidth="3" opacity="0.5" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
        <line x1="50" y1="150" x2="100" y2="100" stroke="url(#connGradient)" strokeWidth="3" opacity="0.5" className="animate-pulse" style={{ animationDelay: "0.4s" }} />
        <line x1="150" y1="150" x2="100" y2="100" stroke="url(#connGradient)" strokeWidth="3" opacity="0.5" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
        
        {/* Center node */}
        <circle cx="100" cy="100" r="25" fill="url(#connGradient)" />
        <circle cx="100" cy="100" r="35" stroke="url(#connGradient)" strokeWidth="2" fill="none" opacity="0.3" className="animate-pulse" />
        <circle cx="100" cy="100" r="50" stroke="url(#connGradient)" strokeWidth="1" fill="none" opacity="0.2" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
        
        {/* Outer nodes */}
        <circle cx="50" cy="50" r="15" fill="#667eea" className="animate-bounce" />
        <circle cx="150" cy="50" r="12" fill="#764ba2" className="animate-bounce" style={{ animationDelay: "0.3s" }} />
        <circle cx="50" cy="150" r="18" fill="#764ba2" className="animate-bounce" style={{ animationDelay: "0.6s" }} />
        <circle cx="150" cy="150" r="14" fill="#667eea" className="animate-bounce" style={{ animationDelay: "0.9s" }} />
        
        {/* Data packets */}
        <circle cx="75" cy="75" r="5" fill="#667eea" className="animate-ping" />
        <circle cx="125" cy="75" r="5" fill="#764ba2" className="animate-ping" style={{ animationDelay: "0.5s" }} />
        <circle cx="75" cy="125" r="5" fill="#764ba2" className="animate-ping" style={{ animationDelay: "1s" }} />
        <circle cx="125" cy="125" r="5" fill="#667eea" className="animate-ping" style={{ animationDelay: "1.5s" }} />
      </svg>
    </div>
  );
}
