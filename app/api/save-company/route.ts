import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';
// Import your database client or ORM
import { db } from '@/configs/db'; // Adjust the import based on your setup
import { FILES_TABLE } from '@/configs/schema'; // Import the FILES_TABLE schema

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate userId
    if (!data.userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Create a new company object
    const newCompany = {
      userId: data.userId, // Assuming userId is part of the incoming data
      fileName: data.companyName, // Adjust based on your data structure
      fileContent: data.fileContent, // Assuming you have this in your data
      fileType: data.fileType || 'competitor', // Default value if not provided
      description: data.description || '', // Default to empty if not provided
      createdAt: new Date() // Set createdAt as a Date object
    };

    // Insert the new company into the FILES_TABLE
    await db.insert(FILES_TABLE).values(newCompany); // Use the correct insert method

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving company:', error);
    return NextResponse.json({ error: 'Failed to save company' }, { status: 500 });
  }
} 