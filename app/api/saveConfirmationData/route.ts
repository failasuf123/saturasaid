// pages/api/saveWeddingData/route.ts
"use server";
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function POST(req: NextRequest) {
  try {
    const {
      name,
      type,
      weddingId,
    } = await req.json();

    const result = await prisma.confirmation.create({
      data: {
        name,
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
