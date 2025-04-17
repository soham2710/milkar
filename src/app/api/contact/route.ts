import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation for required fields
    const { name, email, phone, propertyType, budget } = body;
    
    if (!name || !email || !phone || !propertyType || !budget) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Create a new form entry with all possible fields
    const formEntry = {
      name,
      email,
      phone,
      propertyType,
      propertySubType: body.propertySubType || "",
      budget,
      location: body.location || [],
      sizeRange: body.sizeRange || "",
      sizeUnit: body.sizeUnit || "",
      bedrooms: body.bedrooms || "",
      amenities: body.amenities || [],
      purpose: body.purpose || "",
      timeline: body.timeline || "",
      message: body.message || "",
      createdAt: new Date(),
    };
    
    // Save to database
    await db.collection("formEntries").insertOne(formEntry);
    
    return NextResponse.json(
      { success: true, message: "Form submission successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}