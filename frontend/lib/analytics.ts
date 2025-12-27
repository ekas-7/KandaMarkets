// Analytics tracking utility

const SESSION_KEY = 'analytics_session_id';

// Simple UUID generator
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Get or create session ID
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

// Detect device type
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// Track page view
export async function trackPageView(page: string) {
  try {
    const sessionId = getSessionId();
    const device = getDeviceType();
    
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'pageview',
        data: {
          sessionId,
          page,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          device,
        },
      }),
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

// Track click event
export async function trackClick(elementId: string, elementType: string, page: string) {
  try {
    const sessionId = getSessionId();
    
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'click',
        data: {
          sessionId,
          elementId,
          elementType,
          page,
        },
      }),
    });
  } catch (error) {
    console.error('Failed to track click:', error);
  }
}

// Track form submission
export async function trackFormSubmission(formType: string, page: string, success: boolean) {
  try {
    const sessionId = getSessionId();
    
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'form_submission',
        data: {
          sessionId,
          formType,
          page,
          success,
        },
      }),
    });
  } catch (error) {
    console.error('Failed to track form submission:', error);
  }
}
