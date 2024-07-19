// pages/api/saveWeddingData/route.ts
"use server";
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST request handler
export async function POST(req: NextRequest) {
  try {
    const {
      nicknameMale,
      nicknameFemale,
      fullnameMale,
      fullnameFemale,
      dadMale,
      momMale,
      dadFemale,
      momFemale,
      mainEventTime,
      introductionType,
      greetingType,
      hookMiddleType,
      storyType,
      closingType,
      songType,
      theme,
    } = await req.json();

    const result = await prisma.wedding.create({
      data: {
        nicknameMale,
        nicknameFemale,
        fullnameMale,
        fullnameFemale,
        dadMale,
        momMale,
        dadFemale,
        momFemale,
        mainEventTime: new Date(mainEventTime),
        introductionType,
        greetingType,
        hookMiddleType,
        storyType,
        closingType,
        songType,
        theme: theme || "default_theme",
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving data to the database:", error);
    return NextResponse.json({ error: "Error saving data to the database" }, { status: 500 });
  }
}
