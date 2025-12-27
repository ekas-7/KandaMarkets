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
        const { sessionId, page, userAgent, referrer, country, device } = data;
        
        // Insert page view
        await db.collection('pageViews').insertOne({
          sessionId,
          page,
          timestamp,
          userAgent,
          referrer,
          country,
          device,
        });

        // Update or create user session
        await db.collection('userSessions').updateOne(
          { sessionId },
          {
            $set: {
              lastSeen: timestamp,
              device,
              country,
            },
            $setOnInsert: {
              firstSeen: timestamp,
              referrer,
              converted: false,
            },
            $inc: { pageViews: 1 },
          },
          { upsert: true }
        );

        break;
      }

      case 'click': {
        const { sessionId, elementId, elementType, page } = data;
        
        await db.collection('clickEvents').insertOne({
          sessionId,
          elementId,
          elementType,
          page,
          timestamp,
        });

        break;
      }

      case 'form_submission': {
        const { sessionId, formType, page, success } = data;
        
        await db.collection('formSubmissions').insertOne({
          sessionId,
          formType,
          page,
          success,
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
