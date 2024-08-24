import { NextApiRequest, NextApiResponse } from 'next';
import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Request method:', req.method); // Tambahkan log
    if (req.method === 'POST') {
        const parameter = {
            "transaction_details": {
                "order_id": "YOUR-ORDERID-123456",
                "gross_amount": 10000
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": "budi",
                "last_name": "pratama",
                "email": "budi.pra@example.com",
                "phone": "08111222333"
            }
        };

        try {
            const transaction = await snap.createTransaction(parameter);
            res.status(200).json({
                transactionToken: transaction.token,
                redirectUrl: transaction.redirect_url
            });
        } catch (error) {
            console.error('Midtrans Transaction Error:', error);
            res.status(500).json({ error: 'Transaction failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
