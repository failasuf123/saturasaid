// lib/saveWeddingHelper.ts

import prisma from './prisma';

export const saveWeddingHelper = async (data: any) => {
  try {
    const result = await prisma.wedding.create({
      data: {
        nicknameMale: data.nicknameMale,
        nicknameFemale: data.nicknameFemale,
        fullnameMale: data.fullnameMale,
        fullnameFemale: data.fullnameFemale,
        dadMale: data.dadMale,
        momMale: data.momMale,
        dadFemale: data.dadFemale,
        momFemale: data.momFemale,
        mainEventTime: new Date(data.mainEventTime),
        introductionType: data.introductionType,
        greetingType: data.greetingType,
        hookMiddleType: data.hookMiddleType,
        storyType: data.storyType,
        closingType: data.closingType,
        songType: data.songType,
        theme: data.theme || "default_theme",
      },
    });
    return result;
  } catch (error) {
    console.error("Error saving data to the database:", error);
    throw new Error("Error saving data to the database");
  }
};
