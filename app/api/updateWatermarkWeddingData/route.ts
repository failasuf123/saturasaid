// pages/api/updateWatermarkWeddingData/route.ts
"use server";
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
    console.log("API CALLED for PUT Request"); // Log untuk memastikan API dipanggil
    try {
        const { id, transaction_result } = await req.json();

        // Update hanya dilakukan jika transaction_result sesuai (misalnya "settlement")
        if (transaction_result === 'settlement') {
            const updatedData = await prisma.wedding.update({
                where: {
                    id: id
                },
                data: {
                    watermark: false
                }
            });

            return NextResponse.json(updatedData);
        } else {
            return NextResponse.json({ message: "Transaction not settled, no update made" }, { status: 200 });
        }
    } catch (error) {
        console.error("Error updating watermark:", error);
        return NextResponse.json({ error: "Failed to update watermark" }, { status: 500 });
    }
}



// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/lib/prisma'; // pastikan Anda memiliki prisma instance

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log("API CALLED")
//   if (req.method === 'POST') {
//     const { id, transaction_status } = req.body;
//     console.log("API-id=",id,"-statu=",transaction_status)

//     try {
//       console.log("TRY API CALLED")
//       if (transaction_status === 'capture' || transaction_status === 'settlement') {
//         // Update status watermark menjadi false
//         console.log("IF API CALLED")
//         await prisma.wedding.update({
//           where: {
//             id: id,
//           },
//           data: {
//             watermark: false,
//           },
//         });
//         console.log("IF API DONE")

//         return res.status(200).json({ message: 'Payment successful and watermark status updated.' });
//       }

//       // Handle status lainnya
//       return res.status(200).json({ message: 'Payment status is not settled or captured yet.' });

//     } catch (error) {
//       console.error('Error updating watermark status:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
