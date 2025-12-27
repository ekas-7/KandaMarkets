import { ObjectId } from 'mongodb';

export interface PageView {
  _id?: ObjectId;
  sessionId: string;
  page: string;
  timestamp: Date;
  userAgent?: string;
  referrer?: string;
  country?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
}

export interface ClickEvent {
  _id?: ObjectId;
  sessionId: string;
  elementId: string;
  elementType: string; // 'button', 'link', 'card', etc.
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
}

export interface UserSession {
  _id?: ObjectId;
  sessionId: string;
  firstSeen: Date;
  lastSeen: Date;
  pageViews: number;
  country?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
  referrer?: string;
  converted: boolean;
}

export interface DailyStats {
  _id?: ObjectId;
  date: string; // YYYY-MM-DD format
  pageViews: number;
  uniqueVisitors: number;
  clicks: number;
  formSubmissions: number;
  conversionRate: number;
  topPages: { page: string; views: number }[];
  topClickedElements: { elementId: string; clicks: number }[];
  deviceBreakdown: { mobile: number; tablet: number; desktop: number };
  timestamp: Date;
}
