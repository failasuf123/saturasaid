// pages/api/saveWeddingData/route.ts
"use server";
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST request handler
export async function POST(req: NextRequest) {
  try {
    const {
      id,
      nicknameMale,
      nicknameFemale,
      fullnameMale,
      fullnameFemale,
      dadMale,
      momMale,
      dadFemale,
      momFemale,
      mainEventTime,

      accountName1,
      accountBank1,
      accountNumber1,

      accountName2,
      accountBank2,
      accountNumber2,

      event1,
      address1,
      gmap1,
      time1,
      
      event2,
      address2,
      gmap2,
      time2,

      introductionType,
      greetingType,
      hookMiddleType,
      storyType,
      closingType,
      songType,
      theme,
      userId,
    } = await req.json();

    const mainEventTimeDate = new Date(mainEventTime);
    const time1Date = new Date(time1);
    const time2Date = time2 ? new Date(time2) : null;

    if (isNaN(mainEventTimeDate.getTime()) || isNaN(time1Date.getTime()) || (time2Date && isNaN(time2Date.getTime()))) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const result = await prisma.wedding.create({
      data: {
        id,
        nicknameMale,
        nicknameFemale,
        fullnameMale,
        fullnameFemale,
        dadMale,
        momMale,
        dadFemale,
        momFemale,
        mainEventTime: mainEventTimeDate,
        accountName1,
        accountBank1,
        accountNumber1,
        accountName2,
        accountBank2,
        accountNumber2,
        event1,
        address1,
        gmap1,
        time1: time1Date,
        event2,
        address2,
        gmap2,
        time2: time2Date,
        introductionType,
        greetingType,
        hookMiddleType,
        storyType,
        closingType,
        songType,
        theme: theme || "default_theme",
        userId,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving data to the database:", error);
    return NextResponse.json({ error: "Error saving data to the database" }, { status: 500 });
  }
}
