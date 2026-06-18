"use client";

import React from "react";

interface ThankingAnimationProps {
  className?: string;
  size?: number;
}

export function ThankingAnimation({ className = "", size = 200 }: ThankingAnimationProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="thankGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
        
        {/* Star burst */}
        <circle cx="100" cy="100" r="70" fill="url(#thankGradient)" opacity="0.1" className="animate-pulse" />
        <circle cx="100" cy="100" r="50" fill="url(#thankGradient)" opacity="0.2" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
        
        {/* Heart */}
        <path
          d="M100 130 C60 100 50 70 75 55 C90 45 100 55 100 65 C100 55 110 45 125 55 C150 70 140 100 100 130 Z"
          fill="url(#thankGradient)"
          className="animate-bounce"
        />
        
        {/* Sparkles */}
        <circle cx="40" cy="60" r="6" fill="#667eea" className="animate-pulse" />
        <circle cx="160" cy="50" r="5" fill="#764ba2" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
        <circle cx="50" cy="140" r="4" fill="#667eea" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
        <circle cx="155" cy="130" r="7" fill="#764ba2" className="animate-pulse" style={{ animationDelay: "0.9s" }} />
        
        {/* Confetti */}
        <rect x="30" y="80" width="8" height="8" rx="1" fill="#667eea" transform="rotate(45 30 80)" className="animate-bounce" />
        <rect x="165" y="70" width="6" height="6" rx="1" fill="#764ba2" transform="rotate(45 165 70)" className="animate-bounce" style={{ animationDelay: "0.2s" }} />
        <rect x="45" y="160" width="7" height="7" rx="1" fill="#667eea" transform="rotate(45 45 160)" className="animate-bounce" style={{ animationDelay: "0.4s" }} />
        <rect x="150" y="155" width="5" height="5" rx="1" fill="#764ba2" transform="rotate(45 150 155)" className="animate-bounce" style={{ animationDelay: "0.6s" }} />
      </svg>
    </div>
  );
}
