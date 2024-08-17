import { z } from 'zod';

const formSchema = z.object({
  // ID
  id: z.string(),
  // Card 1
  nicknameMale: z.string(),
  nicknameFemale: z.string(),
  fullnameMale: z.string(),
  fullnameFemale: z.string(),
  dadMale: z.string(),
  momMale: z.string(),
  dadFemale: z.string(),
  momFemale: z.string(),

  accountName1: z.string(),
  accountBank1: z.string(),
  accountNumber1: z.string(),

  accountName2: z.string(),
  accountBank2: z.string(),
  accountNumber2: z.string(),

  event: z.string(),
  address: z.string(),
  gmap: z.string(),
  time: z.date(),

  event2: z.string(),
  address2: z.string(),
  gmap2: z.string(),
  time2: z.date(),
  isEvent2: z.boolean(),
  

  // Card 2
  introductionType: z.number(),
  greetingType: z.number(),
  hookMiddleType: z.number(),
  storyType: z.number(),
  closingType: z.number(),

  // Card 3
  songType: z.number(),

  // default
  theme: z.string(),
  userId: z.string()
});

const imageSchema = z.object({
  url: z.string(),
  type: z.string(),
  weddingId: z.string().nullable(),
});

export { imageSchema, formSchema };
