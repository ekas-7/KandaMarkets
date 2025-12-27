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

    // Get total stats
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
      ? ((conversions / totalSessions) * 100).toFixed(2) 
      : '0';

    // Get page views by page
    const pageViewsByPage = await db.collection('pageViews').aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { $group: { _id: '$page', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]).toArray();

    // Get top clicked elements
    const topClickedElements = await db.collection('clickEvents').aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { $group: { _id: { elementId: '$elementId', elementType: '$elementType' }, clicks: { $sum: 1 } } },
      { $sort: { clicks: -1 } },
      { $limit: 10 }
    ]).toArray();

    // Get device breakdown
    const deviceBreakdown = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate } } },
      { $group: { _id: '$device', count: { $sum: 1 } } }
    ]).toArray();

    // Get daily stats for chart
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

    // Get unique visitors per day
    const dailyVisitors = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$firstSeen' } },
          visitors: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();

    // Get referrer data
    const topReferrers = await db.collection('userSessions').aggregate([
      { 
        $match: { 
          firstSeen: { $gte: startDate },
          referrer: { $exists: true, $nin: [null, ''] }
        } 
      },
      { $group: { _id: '$referrer', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    // Get average session duration (pages per session)
    const avgPagesPerSession = await db.collection('userSessions').aggregate([
      { $match: { firstSeen: { $gte: startDate } } },
      { $group: { _id: null, avgPages: { $avg: '$pageViews' } } }
    ]).toArray();

    // Get recent activity (last 20 events)
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
          country: 1
        }
      }
    ]).toArray();

    return NextResponse.json({
      summary: {
        totalPageViews,
        totalSessions,
        totalClicks,
        totalFormSubmissions,
        conversions,
        conversionRate: parseFloat(conversionRate),
        avgPagesPerSession: avgPagesPerSession[0]?.avgPages?.toFixed(2) || '0',
      },
      pageViewsByPage: pageViewsByPage.map(item => ({
        page: item._id,
        views: item.views
      })),
      topClickedElements: topClickedElements.map(item => ({
        elementId: item._id.elementId,
        elementType: item._id.elementType,
        clicks: item.clicks
      })),
      deviceBreakdown: deviceBreakdown.reduce((acc, item) => {
        acc[item._id || 'unknown'] = item.count;
        return acc;
      }, {} as Record<string, number>),
      dailyStats: dailyStats.map(item => ({
        date: item._id,
        views: item.views
      })),
      dailyVisitors: dailyVisitors.map(item => ({
        date: item._id,
        visitors: item.visitors
      })),
      topReferrers: topReferrers.map(item => ({
        referrer: item._id,
        count: item.count
      })),
      recentActivity: recentActivity.map(item => ({
        sessionId: item.sessionId,
        page: item.page,
        timestamp: item.timestamp,
        device: item.device,
        country: item.country
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
