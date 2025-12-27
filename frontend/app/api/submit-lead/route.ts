import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'fullName',
      'email',
      'phone',
      'businessName',
      'instagramHandle',
      'businessType',
      'budget',
      'biggestGoal'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate services array
    if (!body.services || !Array.isArray(body.services) || body.services.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one service' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('kanda');
    const collection = db.collection('leads');

    // Prepare the document
    const lead = {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      businessName: body.businessName,
      instagramHandle: body.instagramHandle,
      services: body.services,
      businessType: body.businessType,
      budget: body.budget,
      biggestGoal: body.biggestGoal,
      submittedAt: new Date(),
      status: 'new', // You can use this for lead tracking
    };

    // Insert the lead
    const result = await collection.insertOne(lead);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your request has been submitted successfully!',
        leadId: result.insertedId 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
