// pages/api/saveWeddingData.ts
"use server";
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

const saveWeddingData = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
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
      } = req.body;

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

      res.status(200).json(result);
    } catch (error) {
      console.error("Error saving data to the database:", error);
      res.status(500).json({ error: "Error saving data to the database" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default saveWeddingData;
