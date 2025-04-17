import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { stringify } from "csv-stringify/sync";
import { headers } from "next/headers";

export async function GET(request: Request) {
  try {
    // Simple security check - can be enhanced with proper authentication
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
    
    // Get all form entries
    const entries = await db
      .collection("formEntries")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    if (!entries || entries.length === 0) {
      return NextResponse.json(
        { error: "No entries found" },
        { status: 404 }
      );
    }
    
    // Format the entries for CSV
    const csvData = entries.map((entry) => ({
      Name: entry.name || "",
      Email: entry.email || "",
      Phone: entry.phone || "",
      "Property Type": entry.propertyType || "",
      "Property Sub-Type": entry.propertySubType || "",
      Budget: entry.budget || "",
      Locations: Array.isArray(entry.location) ? entry.location.join(", ") : (entry.location || ""),
      "Size Range": entry.sizeRange || "",
      "Size Unit": entry.sizeUnit || "",
      Bedrooms: entry.bedrooms || "",
      Amenities: Array.isArray(entry.amenities) ? entry.amenities.join(", ") : (entry.amenities || ""),
      Purpose: entry.purpose || "",
      Timeline: entry.timeline || "",
      Message: entry.message || "",
      "Created At": entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "",
    }));
    
    // Convert to CSV string with proper handling of special characters
    const csvString = stringify(csvData, { 
      header: true,
      quoted: true,
      quoted_empty: true
    });
    
    // Set headers for file download
    const responseHeaders = new Headers();
    responseHeaders.append("Content-Type", "text/csv; charset=utf-8");
    responseHeaders.append("Content-Disposition", `attachment; filename="milkar-leads-${new Date().toISOString().split("T")[0]}.csv"`);
    
    return new NextResponse(csvString, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error generating CSV:", error);
    return NextResponse.json(
      { error: "Failed to generate CSV" },
      { status: 500 }
    );
  }
}