import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { headers } from "next/headers";

export async function GET(request: Request) {
  try {
    // Simple security check - can be enhanced with proper authentication
    // This is just a basic example to prevent direct API access
    const headersList = await headers();
    const referer = headersList.get("referer") || "";
    
    // Check if request is coming from our own admin page
    if (!referer.includes("/admin")) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Get all form entries, sorted by newest first
    const entries = await db
      .collection("formEntries")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}