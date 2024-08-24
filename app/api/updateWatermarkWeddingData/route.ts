import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // pastikan Anda memiliki prisma instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { order_id, transaction_status } = req.body;

    try {
      if (transaction_status === 'capture' || transaction_status === 'settlement') {
        // Update status watermark menjadi false
        await prisma.wedding.update({
          where: {
            id: order_id,
          },
          data: {
            watermark: false,
          },
        });

        return res.status(200).json({ message: 'Payment successful and watermark status updated.' });
      }

      // Handle status lainnya
      return res.status(200).json({ message: 'Payment status is not settled or captured yet.' });

    } catch (error) {
      console.error('Error updating watermark status:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
