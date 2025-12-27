import { ObjectId } from 'mongodb';

export interface PageView {
  _id?: ObjectId;
  sessionId: string;
  page: string;
  timestamp: Date;
  userAgent?: string;
  referrer?: string;
  referrerCategory?: 'direct' | 'search' | 'social' | 'email' | 'referral' | 'campaign' | 'internal';
  referrerSource?: string;
  searchKeywords?: string;
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  ip?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  os?: string;
  screenResolution?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  timeOnPage?: number; // milliseconds
  exitPage?: boolean;
  entryPage?: boolean;
}

export interface ScrollEvent {
  _id?: ObjectId;
  sessionId: string;
  page: string;
  scrollDepth: number; // percentage 0-100
  maxScrollDepth: number; // max depth reached
  timestamp: Date;
}

export interface ClickEvent {
  _id?: ObjectId;
  sessionId: string;
  elementId: string;
  elementType: string; // 'button', 'link', 'card', etc.
  elementText?: string; // visible text on element
  page: string;
  timestamp: Date;
  xPosition?: number;
  yPosition?: number;
}

export interface FormInteraction {
  _id?: ObjectId;
  sessionId: string;
  formId: string;
  fieldName: string;
  action: 'focus' | 'blur' | 'change' | 'error';
  timeSpent?: number; // milliseconds on field
  page: string;
  timestamp: Date;
}

export interface FormSubmission {
  _id?: ObjectId;
  sessionId: string;
  formType: string;
  page: string;
  timestamp: Date;
  success: boolean;
  timeTaken?: number; // time from first interaction to submit
  fieldErrors?: string[];
}

export interface UserSession {
  _id?: ObjectId;
  sessionId: string;
  firstSeen: Date;
  lastSeen: Date;
  pageViews: number;
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  os?: string;
  referrer?: string;
  referrerCategory?: 'direct' | 'search' | 'social' | 'email' | 'referral' | 'campaign' | 'internal';
  referrerSource?: string;
  converted: boolean;
  sessionDuration?: number; // milliseconds
  pagesVisited?: string[]; // ordered array of pages
  entryPage?: string;
  exitPage?: string;
  bounced?: boolean; // true if only 1 page view and < 30 seconds
  isReturning?: boolean; // detected via cookie/localStorage
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface DailyStats {
  _id?: ObjectId;
  date: string; // YYYY-MM-DD format
  pageViews: number;
  uniqueVisitors: number;
  clicks: number;
  formSubmissions: number;
  conversionRate: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: { page: string; views: number }[];
  topClickedElements: { elementId: string; clicks: number }[];
  deviceBreakdown: { mobile: number; tablet: number; desktop: number };
  topCountries: { country: string; visitors: number }[];
  topUTMSources: { source: string; visitors: number }[];
  timestamp: Date;
}
