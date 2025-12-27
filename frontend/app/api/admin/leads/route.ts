import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("kanda");
    const leadsCollection = db.collection("leads");

    // Fetch all leads, sorted by most recent first
    const leads = await leadsCollection
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    // Convert MongoDB ObjectId to string for JSON serialization
    const formattedLeads = leads.map((lead) => ({
      ...lead,
      _id: lead._id.toString(),
    }));

    return NextResponse.json(
      { leads: formattedLeads, total: formattedLeads.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
