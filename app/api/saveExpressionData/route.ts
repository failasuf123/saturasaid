// pages/api/saveWeddingData/route.ts
"use server";
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function POST(req: NextRequest) {
  try {
    const {
      name,
      expression,
      weddingId,
    } = await req.json();

    const result = await prisma.expression.create({
      data: {
        name,
        expression,
        weddingId,
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving image data to the database:", error);
    return NextResponse.json({ error: "Error saving umage data to the database" }, { status: 500 });
  }
}
