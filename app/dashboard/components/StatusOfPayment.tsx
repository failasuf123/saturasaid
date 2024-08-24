"use client";
import { useState } from 'react';
import Script from 'next/script';
import { nanoid } from 'nanoid';

declare global {
  interface Window {
    snap: any;
  }
}

const StatusOfPayment = ({ id }: { id: string }) => {
  const [transactionToken, setTransactionToken] = useState<string | null>(null);

  const handlePayment = async () => {
    const uniqueId = nanoid(3);
    const paymentData = {
      orderId: id + "heh3e",
      first_name: "Septio",
      email: "septio@gmail.com",
      phone: "081322456237",
      gross_amount: 59000
    };

    if (!transactionToken) {
      try {
        const response = await fetch('/api/transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
          console.error("Failed to fetch transaction token");
          return;
        }

        const data = await response.json();
        
        if (data.status && data.token) {
          setTransactionToken(data.token);
          window.snap.pay(data.token, {
            onSuccess: function(result: any) {
              // Aksi setelah pembayaran berhasil
              console.log('Payment success:', result);
              // Contoh: Redirect ke halaman sukses atau update status pembayaran di database
              handlePaymentSuccess(result);
            },
            onPending: function(result: any) {
              console.log('Payment pending:', result);
              // Contoh: Menampilkan pesan bahwa pembayaran sedang diproses
            },
            onError: function(result: any) {
              console.error('Payment error:', result);
              // Contoh: Menampilkan pesan error
            },
            onClose: function() {
              console.log('Payment popup closed');
              // Contoh: Aksi ketika pengguna menutup popup pembayaran sebelum menyelesaikan transaksi
            }
          });
        } else {
          console.error("Failed to get transaction token:", data.message);
        }
      } catch (error) {
        console.error("Error during payment process:", error);
      }
    } else {
      window.snap.pay(transactionToken, {
        onSuccess: function(result: any) {
          console.log('Payment success:', result);
          handlePaymentSuccess(result);
        },
        onPending: function(result: any) {
          console.log('Payment pending:', result);
        },
        onError: function(result: any) {
          console.error('Payment error:', result);
        },
        onClose: function() {
          console.log('Payment popup closed');
        }
      });
    }
  };

  const handlePaymentSuccess = async (result: any) => {
    try {
      // Misalnya, kirim permintaan ke API backend untuk memperbarui status pembayaran
      const response = await fetch('/api/updateWatermarkWeddingData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: result.order_id,
          watermark: true,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update payment status");
        return;
      }

      const data = await response.json();
      console.log('Payment status updated:', data);

      // Redirect atau aksi lain setelah status diperbarui
      // Misal redirect ke halaman sukses
      window.location.href = '/payment-success';
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div>
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        onLoad={() => console.log('Midtrans Snap script loaded successfully')}
        strategy="lazyOnload"
      />
      <div className="flex flex-col gap-3 bg-gray-100 dark:bg-gray-900 rounded px-5 py-2">
        <div className="flex flex-row gap-5 items-center justify-start">
          <h2>Status: Belum Terbayar</h2>
        </div>
        <div>
          <h2 className="text-xs font-light text-black dark:text-gray-200">
            Hai! Selamat Undangan anda berhasil dibuat menggunakan Fitur Freemium (Gratis), masih terdapat Watermark yang muncul pada undangan anda,
            Upgrade undangan anda untuk menghilangkan watermark dengan melakukan Pembayaran
          </h2>
        </div>
      </div>
      <div className="flex flex-row gap-10 items-center justify-center mt-2">
        <div 
          className="text-sm p-2 text-white bg-green-600 rounded-xl cursor-pointer hover:bg-green-500 hover:scale-105"
          onClick={handlePayment}
        >
          Pembayaran
        </div>
      </div>
    </div>
  );
}

export default StatusOfPayment;
