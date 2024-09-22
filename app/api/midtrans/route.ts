// import { NextApiRequest, NextApiResponse } from 'next';
// import midtransClient from 'midtrans-client';

// const snap = new midtransClient.Snap({
//     isProduction: false,
//     serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || "",
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log('Request method:', req.method); // Tambahkan log
//     if (req.method === 'POST') {
//         const parameter = {
//             "transaction_details": {
//                 "order_id": "YOUR-ORDERID-123456",
//                 "gross_amount": 10000
//             },
//             "credit_card": {
//                 "secure": true
//             },
//             "customer_details": {
//                 "first_name": "budi",
//                 "last_name": "pratama",
//                 "email": "budi.pra@example.com",
//                 "phone": "08111222333"
//             }
//         };

//         try {
//             const transaction = await snap.createTransaction(parameter);
//             res.status(200).json({
//                 transactionToken: transaction.token,
//                 redirectUrl: transaction.redirect_url
//             });
//         } catch (error) {
//             console.error('Midtrans Transaction Error:', error);
//             res.status(500).json({ error: 'Transaction failed' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }


import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

// Setup Midtrans client
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || "",
});

// Fungsi untuk menangani POST request
export async function POST(req: Request) {
    try {
        const body = await req.json(); // Ambil body dari request
        const parameter = {
            "transaction_details": {
                "order_id": body.order_id || "YOUR-ORDERID-123456", // Dapatkan order_id dari body
                "gross_amount": body.gross_amount || 10000, // Dapatkan gross_amount dari body
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": body.first_name || "budi",
                "last_name": body.last_name || "pratama",
                "email": body.email || "budi.pra@example.com",
                "phone": body.phone || "08111222333"
            }
        };

        const transaction = await snap.createTransaction(parameter);
        return NextResponse.json({
            transactionToken: transaction.token,
            redirectUrl: transaction.redirect_url
        }, { status: 200 });

    } catch (error) {
        console.error('Midtrans Transaction Error:', error);
        return NextResponse.json({ error: 'Transaction failed' }, { status: 500 });
    }
}

// Method not allowed handler
export async function GET() {
    return NextResponse.json({ message: "GET method not allowed" }, { status: 405 });
}
