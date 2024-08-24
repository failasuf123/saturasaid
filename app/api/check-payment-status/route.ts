// Example API route for checking payment status
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid id' });
  }

  try {
    const wedding = await prisma.wedding.findUnique({
      where: { id },
    });

    if (!wedding) {
      return res.status(404).json({ message: 'Wedding not found' });
    }

    res.status(200).json({ watermark: wedding.watermark });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
