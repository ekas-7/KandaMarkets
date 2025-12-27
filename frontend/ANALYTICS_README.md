# Analytics System Documentation

## Overview
This analytics system provides comprehensive tracking and monitoring for the Kanda Markets landing page. It tracks page views, user interactions, form submissions, and provides detailed insights through an admin dashboard.

## Features

### 1. **Event Tracking**
- **Page Views**: Automatic tracking of page visits with device type, referrer, and user agent
- **Click Events**: Track button and element clicks throughout the site
- **Form Submissions**: Monitor form completions and conversion rates
- **User Sessions**: Track unique visitors and session duration

### 2. **Metrics Tracked**
- Total page views
- Unique visitors (sessions)
- Conversion rate
- Click-through rates
- Device breakdown (mobile/tablet/desktop)
- Top pages by traffic
- Most clicked elements
- Traffic sources (referrers)
- Daily traffic trends

### 3. **Admin Dashboard**
Access analytics at `/theauthadminkanda/stats` (requires admin authentication)

## Implementation

### Database Collections

The system uses MongoDB with the following collections:

1. **pageViews** - Individual page view events
   - sessionId
   - page
   - timestamp
   - userAgent
   - referrer
   - country
   - device

2. **userSessions** - User session aggregations
   - sessionId
   - firstSeen
   - lastSeen
   - pageViews (count)
   - device
   - referrer
   - converted (boolean)

3. **clickEvents** - Click tracking
   - sessionId
   - elementId
   - elementType
   - page
   - timestamp

4. **formSubmissions** - Form submission events
   - sessionId
   - formType
   - page
   - success
   - timestamp

### API Endpoints

#### 1. Track Events: `POST /api/analytics/track`
Records analytics events from the frontend.

**Request Body:**
```json
{
  "eventType": "pageview" | "click" | "form_submission",
  "data": {
    // Event-specific data
  }
}
```

**Event Types:**

**Page View:**
```json
{
  "eventType": "pageview",
  "data": {
    "sessionId": "uuid",
    "page": "/",
    "userAgent": "Mozilla/5.0...",
    "referrer": "https://google.com",
    "device": "desktop"
  }
}
```

**Click Event:**
```json
{
  "eventType": "click",
  "data": {
    "sessionId": "uuid",
    "elementId": "cta-button",
    "elementType": "button",
    "page": "/"
  }
}
```

**Form Submission:**
```json
{
  "eventType": "form_submission",
  "data": {
    "sessionId": "uuid",
    "formType": "interest-form",
    "page": "/interestform",
    "success": true
  }
}
```

#### 2. Get Analytics: `GET /api/admin/analytics?period=7`
Retrieves aggregated analytics data (admin only).

**Query Parameters:**
- `period`: Number of days to fetch data for (default: 7)

**Response:**
```json
{
  "summary": {
    "totalPageViews": 1234,
    "totalSessions": 456,
    "totalClicks": 789,
    "totalFormSubmissions": 12,
    "conversions": 8,
    "conversionRate": 1.75,
    "avgPagesPerSession": "2.70"
  },
  "pageViewsByPage": [...],
  "topClickedElements": [...],
  "deviceBreakdown": {...},
  "dailyStats": [...],
  "dailyVisitors": [...],
  "topReferrers": [...],
  "recentActivity": [...]
}
```

### Client-Side Usage

#### Automatic Page View Tracking

Add to any page component:
```typescript
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export default function MyPage() {
  useEffect(() => {
    trackPageView('/my-page');
  }, []);
  
  // ... rest of component
}
```

#### Manual Click Tracking

```typescript
import { trackClick } from "@/lib/analytics";

function MyButton() {
  const handleClick = () => {
    trackClick('my-button-id', 'button', '/current-page');
    // ... your click logic
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

#### Using TrackableButton Component

```typescript
import { TrackableButton } from "@/components/TrackableButton";

function MyComponent() {
  return (
    <TrackableButton 
      trackingId="hero-cta" 
      trackingPage="/"
      onClick={() => router.push('/interestform')}
      className="my-button-class"
    >
      Get Started
    </TrackableButton>
  );
}
```

#### Form Submission Tracking

```typescript
import { trackFormSubmission } from "@/lib/analytics";

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await submitForm(formData);
    
    if (response.ok) {
      trackFormSubmission('contact-form', '/contact', true);
    } else {
      trackFormSubmission('contact-form', '/contact', false);
    }
  } catch (error) {
    trackFormSubmission('contact-form', '/contact', false);
  }
};
```

## Analytics Dashboard Features

### Summary Cards
- Total page views
- Unique visitors
- Conversions and conversion rate
- Total clicks

### Visual Charts
- Daily traffic trend (bar chart)
- Device breakdown (progress bars)
- Top pages by views
- Most clicked elements
- Top referral sources

### Recent Activity Table
Real-time view of the latest page views with:
- Timestamp
- Page visited
- Device type
- Session ID

### Time Period Filtering
View analytics for:
- Last 24 hours
- Last 7 days (default)
- Last 30 days
- Last 90 days

## Access Control

The analytics dashboard is protected by NextAuth authentication:
1. Only authenticated admin users can access `/theauthadminkanda/stats`
2. API endpoints check for valid admin sessions
3. Unauthenticated requests are redirected to login

## Performance Considerations

1. **Session Storage**: Uses browser sessionStorage for session IDs (lightweight)
2. **Fire and Forget**: Tracking calls don't block UI operations
3. **Error Handling**: Failed tracking calls are logged but don't break functionality
4. **Aggregation**: Dashboard uses MongoDB aggregation for efficient queries

## Future Enhancements

Potential additions:
- Geographic tracking with IP geolocation
- Heatmap visualization
- A/B testing capabilities
- Export analytics to CSV/PDF
- Email reports
- Real-time dashboard updates
- Custom event tracking
- Funnel analysis
- Retention metrics

## Troubleshooting

### Tracking not working?
1. Check browser console for errors
2. Verify MongoDB connection in `.env.local`
3. Ensure collections are created in MongoDB
4. Check network tab for failed API calls

### Dashboard not showing data?
1. Verify you're authenticated as admin
2. Check the time period filter
3. Ensure tracking is active on frontend pages
4. Check MongoDB collections have data

## Environment Variables Required

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_app_url
```

## Pages Currently Tracked

- `/` - Homepage (automatic page view tracking)
- `/interestform` - Interest form page (page views + form submission tracking)

## Next Steps

1. Add tracking to more interactive elements (Navigation links, Footer links, etc.)
2. Implement TrackableButton on key CTAs
3. Add more custom events as needed
4. Set up automated reports
5. Add goal tracking for specific conversion paths
