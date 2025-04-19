import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { stringify } from "csv-stringify/sync";
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
    
    if (!entries || entries.length === 0) {
      return NextResponse.json(
        { message: "No entries found" },
        { status: 200 }
      );
    }
    
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
    
    const csvString = stringify(csvData, { 
      header: true,
      quoted: true,
      quoted_empty: true
    });
    
    return new NextResponse(csvString, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="milkar-leads-${new Date().toISOString().split("T")[0]}.csv"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
  } catch (error) {
    console.error("Error generating CSV:", error);
    return NextResponse.json(
      { error: "Failed to generate CSV" },
      { status: 500 }
    );
  }
}