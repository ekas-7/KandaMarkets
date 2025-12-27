import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated admin
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('kanda');

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7'; // days
    const periodDays = parseInt(period);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // === BASIC METRICS ===
    const totalPageViews = await db.collection('pageViews').countDocuments({
      timestamp: { $gte: startDate }
    });

    const totalSessions = await db.collection('userSessions').countDocuments({
      firstSeen: { $gte: startDate }
    });

    const totalClicks = await db.collection('clickEvents').countDocuments({
      timestamp: { $gte: startDate }
    });

    const totalFormSubmissions = await db.collection('formSubmissions').countDocuments({
      timestamp: { $gte: startDate },
      success: true
    });

    const conversions = await db.collection('userSessions').countDocuments({
      firstSeen: { $gte: startDate },
      converted: true
    });

    const conversionRate = totalSessions > 0 
      ? parseFloat(((conversions / totalSessions) * 100).toFixed(2))
      : 0;

    // === BOUNCE RATE ===
    const bouncedSessions = await db.collection('userSessions').countDocuments({
      firstSeen: { $gte: startDate },
      bounced: true
    });

    const bounceRate = totalSessions > 0 
      ? parseFloat(((bouncedSessions / totalSessions) * 100).toFixed(2))
      : 0;

    // === AVERAGE SESSION DURATION ===
    const avgDurationResult = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate }, sessionDuration: { $exists: true } } },
      { $group: { _id: null, avgDuration: { $avg: '$sessionDuration' } } }
    ]).toArray();

    const avgSessionDuration = avgDurationResult[0]?.avgDuration 
      ? Math.round(avgDurationResult[0].avgDuration / 1000) // Convert to seconds
      : 0;

    // === AVERAGE PAGES PER SESSION ===
    const avgPagesResult = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate } } },
      { $group: { _id: null, avgPages: { $avg: '$pageViews' } } }
    ]).toArray();

    const avgPagesPerSession = avgPagesResult[0]?.avgPages?.toFixed(2) || '0';

    // === RETURNING VS NEW VISITORS ===
    const returningVisitors = await db.collection('userSessions').countDocuments({
      firstSeen: { $gte: startDate },
      isReturning: true
    });

    const newVisitors = totalSessions - returningVisitors;

    // === PAGE VIEWS BY PAGE ===
    const pageViewsByPage = await db.collection('pageViews').aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { $group: { _id: '$page', views: { $sum: 1 }, avgTimeOnPage: { $avg: '$timeOnPage' } } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]).toArray();

    // === ENTRY & EXIT PAGES ===
    const entryPages = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate }, entryPage: { $exists: true } } },
      { $group: { _id: '$entryPage', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    const exitPages = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate }, exitPage: { $exists: true } } },
      { $group: { _id: '$exitPage', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    // === TOP CLICKED ELEMENTS ===
    const topClickedElements = await db.collection('clickEvents').aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { 
        $group: { 
          _id: { elementId: '$elementId', elementType: '$elementType' }, 
          clicks: { $sum: 1 },
          elementText: { $first: '$elementText' }
        } 
      },
      { $sort: { clicks: -1 } },
      { $limit: 10 }
    ]).toArray();

    // === DEVICE BREAKDOWN ===
    const deviceBreakdown = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate } } },
      { $group: { _id: '$device', count: { $sum: 1 } } }
    ]).toArray();

    // === BROWSER BREAKDOWN ===
    const browserBreakdown = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate }, browser: { $exists: true } } },
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    // === OS BREAKDOWN ===
    const osBreakdown = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate }, os: { $exists: true } } },
      { $group: { _id: '$os', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    // === GEOGRAPHIC DATA ===
    const countryBreakdown = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate }, country: { $exists: true } } },
      { $group: { _id: '$country', visitors: { $sum: 1 } } },
      { $sort: { visitors: -1 } },
      { $limit: 10 }
    ]).toArray();

    const cityBreakdown = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate }, city: { $exists: true } } },
      { $group: { _id: { city: '$city', country: '$country' }, visitors: { $sum: 1 } } },
      { $sort: { visitors: -1 } },
      { $limit: 10 }
    ]).toArray();

    // === UTM CAMPAIGN TRACKING ===
    const utmSources = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate }, utmSource: { $exists: true, $ne: null } } },
      { 
        $group: { 
          _id: '$utmSource', 
          visitors: { $sum: 1 },
          conversions: { $sum: { $cond: ['$converted', 1, 0] } }
        } 
      },
      { $sort: { visitors: -1 } },
      { $limit: 10 }
    ]).toArray();

    const utmCampaigns = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate }, utmCampaign: { $exists: true, $ne: null } } },
      { 
        $group: { 
          _id: '$utmCampaign', 
          visitors: { $sum: 1 },
          conversions: { $sum: { $cond: ['$converted', 1, 0] } }
        } 
      },
      { $sort: { visitors: -1 } },
      { $limit: 10 }
    ]).toArray();

    // === DAILY STATS ===
    const dailyStats = await db.collection('pageViews').aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          views: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();

    const dailyVisitors = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$firstSeen' } },
          visitors: { $sum: 1 },
          conversions: { $sum: { $cond: ['$converted', 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();

    // === REFERRER DATA ===
    const topReferrers = await db.collection('userSessions').aggregate([
      { 
        $match: { 
          firstSeen: { $gte: startDate },
          referrer: { $exists: true, $nin: [null, ''] }
        } 
      },
      { 
        $group: { 
          _id: '$referrer', 
          count: { $sum: 1 },
          conversions: { $sum: { $cond: ['$converted', 1, 0] } }
        } 
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    // === USER FLOW (Top Paths) ===
    const userFlows = await db.collection('userSessions').aggregate([
      { 
        $match: { 
          firstSeen: { $gte: startDate },
          pagesVisited: { $exists: true, $ne: [] }
        } 
      },
      { $project: { path: { $slice: ['$pagesVisited', 5] } } }, // First 5 pages
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    // === SCROLL DEPTH ===
    const avgScrollDepth = await db.collection('scrollEvents').aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { 
        $group: { 
          _id: '$page', 
          avgMaxScroll: { $avg: '$maxScrollDepth' },
          sessions: { $sum: 1 }
        } 
      },
      { $sort: { sessions: -1 } },
      { $limit: 10 }
    ]).toArray();

    // === FORM ANALYTICS ===
    const formAbandonments = await db.collection('formInteractions').aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { 
        $group: { 
          _id: '$formId',
          interactions: { $sum: 1 },
          uniqueSessions: { $addToSet: '$sessionId' }
        } 
      }
    ]).toArray();

    const formSubmissionRate = await db.collection('formSubmissions').aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: '$formType',
          total: { $sum: 1 },
          successful: { $sum: { $cond: ['$success', 1, 0] } },
          avgTimeTaken: { $avg: '$timeTaken' }
        }
      }
    ]).toArray();

    // === REAL-TIME METRICS (last 5 minutes) ===
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const activeVisitors = await db.collection('pageViews').aggregate([
      { $match: { timestamp: { $gte: fiveMinutesAgo } } },
      { $group: { _id: '$sessionId' } },
      { $count: 'count' }
    ]).toArray();

    const recentConversions = await db.collection('formSubmissions').find({
      timestamp: { $gte: fiveMinutesAgo },
      success: true
    }).sort({ timestamp: -1 }).limit(5).toArray();

    // === RECENT ACTIVITY ===
    const recentActivity = await db.collection('pageViews').aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { $sort: { timestamp: -1 } },
      { $limit: 20 },
      {
        $project: {
          sessionId: 1,
          page: 1,
          timestamp: 1,
          device: 1,
          country: 1,
          city: 1,
          browser: 1
        }
      }
    ]).toArray();

    // === RESPONSE ===
    return NextResponse.json({
      summary: {
        totalPageViews,
        totalSessions,
        totalClicks,
        totalFormSubmissions,
        conversions,
        conversionRate,
        bounceRate,
        avgSessionDuration, // in seconds
        avgPagesPerSession,
        returningVisitors,
        newVisitors,
        activeVisitors: activeVisitors[0]?.count || 0,
      },
      pageViewsByPage: pageViewsByPage.map(item => ({
        page: item._id,
        views: item.views,
        avgTimeOnPage: item.avgTimeOnPage ? Math.round(item.avgTimeOnPage / 1000) : 0 // seconds
      })),
      entryPages: entryPages.map(item => ({
        page: item._id,
        count: item.count
      })),
      exitPages: exitPages.map(item => ({
        page: item._id,
        count: item.count
      })),
      topClickedElements: topClickedElements.map(item => ({
        elementId: item._id.elementId,
        elementType: item._id.elementType,
        elementText: item.elementText,
        clicks: item.clicks
      })),
      deviceBreakdown: deviceBreakdown.reduce((acc, item) => {
        acc[item._id || 'unknown'] = item.count;
        return acc;
      }, {} as Record<string, number>),
      browserBreakdown: browserBreakdown.map(item => ({
        browser: item._id,
        count: item.count
      })),
      osBreakdown: osBreakdown.map(item => ({
        os: item._id,
        count: item.count
      })),
      countryBreakdown: countryBreakdown.map(item => ({
        country: item._id,
        visitors: item.visitors
      })),
      cityBreakdown: cityBreakdown.map(item => ({
        city: item._id.city,
        country: item._id.country,
        visitors: item.visitors
      })),
      utmSources: utmSources.map(item => ({
        source: item._id,
        visitors: item.visitors,
        conversions: item.conversions,
        conversionRate: ((item.conversions / item.visitors) * 100).toFixed(2)
      })),
      utmCampaigns: utmCampaigns.map(item => ({
        campaign: item._id,
        visitors: item.visitors,
        conversions: item.conversions,
        conversionRate: ((item.conversions / item.visitors) * 100).toFixed(2)
      })),
      dailyStats: dailyStats.map(item => ({
        date: item._id,
        views: item.views
      })),
      dailyVisitors: dailyVisitors.map(item => ({
        date: item._id,
        visitors: item.visitors,
        conversions: item.conversions
      })),
      topReferrers: topReferrers.map(item => ({
        referrer: item._id,
        count: item.count,
        conversions: item.conversions
      })),
      userFlows: userFlows.map(item => ({
        path: item._id,
        count: item.count
      })),
      scrollDepth: avgScrollDepth.map(item => ({
        page: item._id,
        avgMaxScroll: Math.round(item.avgMaxScroll),
        sessions: item.sessions
      })),
      formAnalytics: {
        abandonments: formAbandonments.map(item => ({
          formId: item._id,
          interactions: item.interactions,
          uniqueSessions: item.uniqueSessions.length
        })),
        submissions: formSubmissionRate.map(item => ({
          formType: item._id,
          total: item.total,
          successful: item.successful,
          successRate: ((item.successful / item.total) * 100).toFixed(2),
          avgTimeTaken: item.avgTimeTaken ? Math.round(item.avgTimeTaken / 1000) : 0 // seconds
        }))
      },
      recentConversions: recentConversions.map(item => ({
        formType: item.formType,
        timestamp: item.timestamp
      })),
      recentActivity: recentActivity.map(item => ({
        sessionId: item.sessionId,
        page: item.page,
        timestamp: item.timestamp,
        device: item.device,
        country: item.country,
        city: item.city,
        browser: item.browser
      }))
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
