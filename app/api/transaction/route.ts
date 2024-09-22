// import { NextResponse } from 'next/server';
// import createTransaction from "@/app/utils/midtrans/transaction";

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();

//         const params = {
//             transaction_details: {
//                 order_id: body.orderId,
//                 gross_amount: body.gross_amount || 10000,
//             },
//             customer_details: {
//                 first_name: body.first_name || "Agus",
//                 email: body.email || "agus@mail.com",
//                 phone: body.phone || "081234567890"
//             }
//         };

//         return new Promise((resolve, reject) => {
//             createTransaction(params, (transaction: { token: string; redirect_url: string }, error: any) => {
//                 if (error) {
//                     console.error("Failed to create transaction:", error);
//                     reject(NextResponse.json({
//                         status: false,
//                         statusCode: 500,
//                         message: "Failed to create transaction",
//                         error: error.message
//                     }, { status: 500 }));
//                 } else {
//                     resolve(NextResponse.json({
//                         status: true,
//                         statusCode: 200,
//                         message: `Transaction created successfully. Token: ${transaction.token}`,
//                         token: transaction.token
//                     }));
//                 }
//             });
//         });
//     } catch (error) {
//         return NextResponse.json({
//             status: false,
//             statusCode: 500,
//             message: "Internal Server Error",
//             error: error.message
//         }, { status: 500 });
//     }
// }

// export async function GET() {
//     return NextResponse.json({
//         status: false,
//         statusCode: 405,
//         message: "Method not allowed"
//     }, { status: 405 });
// }



import { NextResponse } from 'next/server';
import createTransaction from "@/app/utils/midtrans/transaction";

// Definisikan tipe untuk response dari createTransaction
interface TransactionResponse {
    token: string;
    redirect_url: string;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const params = {
            transaction_details: {
                order_id: body.orderId,
                gross_amount: body.gross_amount || 10000,
            },
            customer_details: {
                first_name: body.first_name || "Agus",
                email: body.email || "agus@mail.com",
                phone: body.phone || "081234567890"
            }
        };

        // Tentukan tipe yang dikembalikan oleh createTransaction menggunakan TransactionResponse
        const transaction = await new Promise<TransactionResponse>((resolve, reject) => {
            createTransaction(params, (transaction: TransactionResponse, error: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(transaction);
                }
            });
        });

        // Mengembalikan respons dengan token transaksi
        return NextResponse.json({
            status: true,
            statusCode: 200,
            message: `Transaction created successfully. Token: ${transaction.token}`,
            token: transaction.token
        }, { status: 200 });

    } catch (error: any) {
        console.error("Failed to create transaction:", error);
        return NextResponse.json({
            status: false,
            statusCode: 500,
            message: "Failed to create transaction",
            error: error.message
        }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        status: false,
        statusCode: 405,
        message: "Method not allowed"
    }, { status: 405 });
}
