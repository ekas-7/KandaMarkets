import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('kanda');
    const body = await request.json();
    const { eventType, data } = body;

    const timestamp = new Date();

    switch (eventType) {
      case 'pageview': {
        const { 
          sessionId, page, userAgent, referrer, country, city, device,
          browser, os, screenResolution, utmSource, utmMedium, utmCampaign,
          utmTerm, utmContent, entryPage
        } = data;
        
        // Insert page view
        await db.collection('pageViews').insertOne({
          sessionId,
          page,
          timestamp,
          userAgent,
          referrer,
          country,
          city,
          device,
          browser,
          os,
          screenResolution,
          utmSource,
          utmMedium,
          utmCampaign,
          utmTerm,
          utmContent,
          entryPage,
        });

        // Update or create user session
        const sessionUpdate: any = {
          $set: {
            lastSeen: timestamp,
            device,
            country,
            city,
            browser,
            os,
          },
          $setOnInsert: {
            firstSeen: timestamp,
            referrer,
            converted: false,
            bounced: false,
            entryPage: page,
          },
          $inc: { pageViews: 1 },
          $addToSet: { pagesVisited: page },
        };

        // Add UTM data if present
        if (utmSource) sessionUpdate.$set.utmSource = utmSource;
        if (utmMedium) sessionUpdate.$set.utmMedium = utmMedium;
        if (utmCampaign) sessionUpdate.$set.utmCampaign = utmCampaign;

        await db.collection('userSessions').updateOne(
          { sessionId },
          sessionUpdate,
          { upsert: true }
        );

        break;
      }

      case 'page_exit': {
        const { sessionId, page, timeOnPage } = data;
        
        // Update the specific page view with exit time
        await db.collection('pageViews').updateOne(
          { sessionId, page, exitPage: { $ne: true } },
          { 
            $set: { 
              exitPage: true,
              timeOnPage 
            } 
          },
          { sort: { timestamp: -1 } }
        );

        // Update session with exit page and duration
        const session = await db.collection('userSessions').findOne({ sessionId });
        if (session) {
          const duration = timestamp.getTime() - new Date(session.firstSeen).getTime();
          const bounced = session.pageViews <= 1 && duration < 30000; // < 30 seconds
          
          await db.collection('userSessions').updateOne(
            { sessionId },
            { 
              $set: { 
                exitPage: page,
                sessionDuration: duration,
                bounced,
              } 
            }
          );
        }

        break;
      }

      case 'scroll': {
        const { sessionId, page, scrollDepth, maxScrollDepth } = data;
        
        // Update or insert scroll event (keep max depth)
        await db.collection('scrollEvents').updateOne(
          { sessionId, page },
          { 
            $set: { 
              scrollDepth,
              timestamp 
            },
            $max: { maxScrollDepth }
          },
          { upsert: true }
        );

        break;
      }

      case 'click': {
        const { sessionId, elementId, elementType, page, elementText, xPosition, yPosition } = data;
        
        await db.collection('clickEvents').insertOne({
          sessionId,
          elementId,
          elementType,
          elementText,
          page,
          xPosition,
          yPosition,
          timestamp,
        });

        break;
      }

      case 'form_interaction': {
        const { sessionId, formId, fieldName, action, timeSpent, page } = data;
        
        await db.collection('formInteractions').insertOne({
          sessionId,
          formId,
          fieldName,
          action,
          timeSpent,
          page,
          timestamp,
        });

        break;
      }

      case 'form_submission': {
        const { sessionId, formType, page, success, timeTaken, fieldErrors } = data;
        
        await db.collection('formSubmissions').insertOne({
          sessionId,
          formType,
          page,
          success,
          timeTaken,
          fieldErrors,
          timestamp,
        });

        // Mark session as converted if submission was successful
        if (success) {
          await db.collection('userSessions').updateOne(
            { sessionId },
            { $set: { converted: true } }
          );
        }

        break;
      }

      default:
        return NextResponse.json(
          { error: 'Invalid event type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
