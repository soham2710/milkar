import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { headers } from "next/headers";

export async function GET() {
  try {
    const headersList = await headers();
    const referer = headersList.get("referer") || "";
    
    if (!referer.includes("/admin")) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
    
    const { db } = await connectToDatabase();
    
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