"use client";

import { useEffect } from 'react';
import { trackClick } from '@/lib/analytics';

/**
 * AutoClickTracker - Automatically tracks all clicks on buttons, links, and interactive elements
 * Add this component once in your layout or main page
 */
export default function AutoClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Find the closest clickable element
      const clickable = target.closest('button, a, [role="button"], [data-track-click]');
      
      if (!clickable) return;
      
      const element = clickable as HTMLElement;
      
      // Determine element type
      const tagName = element.tagName.toLowerCase();
      let elementType = tagName;
      
      if (element.hasAttribute('role')) {
        elementType = element.getAttribute('role') || tagName;
      }
      
      // Get element identifier - prioritize data-track-name for readable analytics
      const elementId = 
        element.getAttribute('data-track-name') || // Custom tracking name (highest priority)
        element.id ||
        element.getAttribute('data-track-id') ||
        element.getAttribute('aria-label') ||
        element.textContent?.trim().substring(0, 50) || // Use button text as fallback
        element.className ||
        `${tagName}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Get element text
      const elementText = element.textContent?.trim().substring(0, 100) || '';
      
      // Get current page
      const page = window.location.pathname;
      
      // Track the click
      trackClick(elementId, elementType, page, elementText, event);
    };
    
    // Add click listener
    document.addEventListener('click', handleClick, { capture: true });
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);
  
  return null; // This component doesn't render anything
}
