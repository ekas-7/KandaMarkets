// Analytics tracking utility

const SESSION_KEY = 'analytics_session_id';
const RETURNING_VISITOR_KEY = 'analytics_returning';
const FIRST_VISIT_KEY = 'analytics_first_visit';

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
    
    // Mark as returning visitor if they've been here before
    if (!localStorage.getItem(FIRST_VISIT_KEY)) {
      localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString());
    }
  }
  return sessionId;
}

// Check if returning visitor
export function isReturningVisitor(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(RETURNING_VISITOR_KEY) === 'true';
}

// Mark as returning visitor
export function markAsReturningVisitor(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(RETURNING_VISITOR_KEY, 'true');
  }
}

// Detect device type
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// Detect browser
export function getBrowser(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const ua = navigator.userAgent;
  if (ua.indexOf('Firefox') > -1) return 'Firefox';
  if (ua.indexOf('SamsungBrowser') > -1) return 'Samsung Browser';
  if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera';
  if (ua.indexOf('Trident') > -1) return 'IE';
  if (ua.indexOf('Edge') > -1) return 'Edge';
  if (ua.indexOf('Chrome') > -1) return 'Chrome';
  if (ua.indexOf('Safari') > -1) return 'Safari';
  return 'unknown';
}

// Detect OS
export function getOS(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const ua = navigator.userAgent;
  if (ua.indexOf('Win') > -1) return 'Windows';
  if (ua.indexOf('Mac') > -1) return 'MacOS';
  if (ua.indexOf('Linux') > -1) return 'Linux';
  if (ua.indexOf('Android') > -1) return 'Android';
  if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) return 'iOS';
  return 'unknown';
}

// Get screen resolution
export function getScreenResolution(): string {
  if (typeof window === 'undefined') return 'unknown';
  return `${window.screen.width}x${window.screen.height}`;
}

// Extract UTM parameters from URL
export function getUTMParameters(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
} {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
    utmTerm: params.get('utm_term') || undefined,
    utmContent: params.get('utm_content') || undefined,
  };
}

// Track page view with enhanced data
export async function trackPageView(page: string) {
  try {
    const sessionId = getSessionId();
    const device = getDeviceType();
    const browser = getBrowser();
    const os = getOS();
    const screenResolution = getScreenResolution();
    const utmParams = getUTMParameters();
    const isEntry = sessionStorage.getItem('entry_tracked') !== 'true';
    
    if (isEntry) {
      sessionStorage.setItem('entry_tracked', 'true');
    }
    
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
          browser,
          os,
          screenResolution,
          ...utmParams,
          entryPage: isEntry,
        },
      }),
    });

    // Set up page exit tracking
    setupPageExitTracking(page);
    // Set up scroll tracking
    setupScrollTracking(page);
    
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

// Track page exit with time on page
let pageStartTime = Date.now();
let exitTracked = false;

function setupPageExitTracking(page: string) {
  pageStartTime = Date.now();
  exitTracked = false;
  
  const trackExit = () => {
    if (exitTracked) return;
    exitTracked = true;
    
    const timeOnPage = Date.now() - pageStartTime;
    const sessionId = getSessionId();
    
    // Use sendBeacon for reliable exit tracking
    const data = JSON.stringify({
      eventType: 'page_exit',
      data: { sessionId, page, timeOnPage },
    });
    
    navigator.sendBeacon('/api/analytics/track', data);
  };
  
  // Track on various exit events
  window.addEventListener('beforeunload', trackExit);
  window.addEventListener('pagehide', trackExit);
  
  // Track on route change (for SPA navigation)
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    trackExit();
    return originalPushState.apply(this, args);
  };
}

// Track scroll depth
let maxScroll = 0;
let scrollTimeout: NodeJS.Timeout;

function setupScrollTracking(page: string) {
  maxScroll = 0;
  
  const trackScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollDepth = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollDepth > maxScroll) {
      maxScroll = scrollDepth;
      
      // Debounce scroll tracking
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(async () => {
        const sessionId = getSessionId();
        
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType: 'scroll',
            data: {
              sessionId,
              page,
              scrollDepth,
              maxScrollDepth: maxScroll,
            },
          }),
        });
      }, 1000);
    }
  };
  
  window.addEventListener('scroll', trackScroll, { passive: true });
}

// Track click event with enhanced data
export async function trackClick(
  elementId: string, 
  elementType: string, 
  page: string,
  elementText?: string,
  event?: MouseEvent
) {
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
          elementText,
          page,
          xPosition: event?.clientX,
          yPosition: event?.clientY,
        },
      }),
    });
  } catch (error) {
    console.error('Failed to track click:', error);
  }
}

// Track form field interaction
export async function trackFormInteraction(
  formId: string,
  fieldName: string,
  action: 'focus' | 'blur' | 'change' | 'error',
  timeSpent?: number,
  page?: string
) {
  try {
    const sessionId = getSessionId();
    
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'form_interaction',
        data: {
          sessionId,
          formId,
          fieldName,
          action,
          timeSpent,
          page: page || window.location.pathname,
        },
      }),
    });
  } catch (error) {
    console.error('Failed to track form interaction:', error);
  }
}

// Track form submission with enhanced data
export async function trackFormSubmission(
  formType: string, 
  page: string, 
  success: boolean,
  timeTaken?: number,
  fieldErrors?: string[]
) {
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
          timeTaken,
          fieldErrors,
        },
      }),
    });
  } catch (error) {
    console.error('Failed to track form submission:', error);
  }
}
