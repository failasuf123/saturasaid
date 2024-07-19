// pages/api/submit.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const result = await prisma.formData.create({ data });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
