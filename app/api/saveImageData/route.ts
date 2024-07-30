// pages/api/saveWeddingData/route.ts
"use server";
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST request handler
export async function POST(req: NextRequest) {
  try {
    const {
      url,
      type,
      weddingId
    } = await req.json();

    const result = await prisma.image.create({
      data: {
        url,
        type,
        weddingId,
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving image data to the database:", error);
    return NextResponse.json({ error: "Error saving umage data to the database" }, { status: 500 });
  }
}
