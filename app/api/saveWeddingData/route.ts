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

      accountName1,
      accountBank1,
      accountNumber1,

      accountName2,
      accountBank2,
      accountNumber2,

      event,
      address,
      gmap,
      time,

      event2,
      address2,
      gmap2,
      time2,
      isEvent2,
    

      introductionType,
      greetingType,
      hookMiddleType,
      storyType,
      closingType,
      songType,
      theme,
      userId,
    } = await req.json();

    
    const timeDate = new Date(time);
    const timeDate2 = new Date(time2);

    if (isNaN(timeDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }
    if (isNaN(timeDate2.getTime())) {
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
        accountName1,
        accountBank1,
        accountNumber1,
        accountName2,
        accountBank2,
        accountNumber2,
        event,
        address,
        gmap,
        time: timeDate,
        event2,
        address2,
        gmap2,
        time2:timeDate2,
        isEvent2,
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
