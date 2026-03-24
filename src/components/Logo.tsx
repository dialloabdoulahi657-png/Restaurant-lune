import * as React from 'react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  color?: string;
}

export const Logo = ({ className, color = "#80b435" }: LogoProps) => {
  return (
    <svg 
      viewBox="0 0 320 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-auto", className)}
    >
      {/* L */}
      <path 
        d="M20 15V85H75" 
        stroke={color} 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* U */}
      <path 
        d="M95 15V65C95 76.0457 103.954 85 115 85C126.046 85 135 76.0457 135 65V15" 
        stroke={color} 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* N (Arch) */}
      <path 
        d="M165 85V45C165 28.4315 178.431 15 195 15C211.569 15 225 28.4315 225 45V85" 
        stroke={color} 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* E */}
      <path 
        d="M255 15H300" 
        stroke={color} 
        strokeWidth="8" 
        strokeLinecap="round"
      />
      <path 
        d="M255 50H300" 
        stroke={color} 
        strokeWidth="8" 
        strokeLinecap="round"
      />
      <path 
        d="M255 85H300" 
        stroke={color} 
        strokeWidth="8" 
        strokeLinecap="round"
      />
    </svg>
  );
};
