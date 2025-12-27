"use client";

import React from "react";
import { trackClick } from "@/lib/analytics";

interface TrackableButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  trackingId: string;
  trackingPage?: string;
}

export function TrackableButton({ 
  children, 
  trackingId, 
  trackingPage = '/',
  onClick,
  ...rest 
}: TrackableButtonProps) {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the click
    trackClick(trackingId, 'button', trackingPage);
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button {...rest} onClick={handleClick}>
      {children}
    </button>
  );
}
