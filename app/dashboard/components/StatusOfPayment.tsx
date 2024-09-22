"use client";
import { useState,useEffect } from 'react';
import Script from 'next/script';
import { nanoid } from 'nanoid';
import { useUser } from '@clerk/nextjs';
import { ToastContainer, toast , Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DialogClose } from '@radix-ui/react-dialog';


declare global {
  interface Window {
    snap: any;
  }
}

const StatusOfPayment = ({ id }: { id: string }) => {
  const [transactionToken, setTransactionToken] = useState<string | null>(null);
  const { user, isSignedIn } = useUser(); 
  const [firstname, setFirstname] = useState<string>("no-name")
  const [email, setEmail] = useState<string>("no-email@gmail.com")
  const [phoneNumber, setPhoneNumber] = useState("081222345678")
  const [isShowPayment, setIsShowPayment] = useState<boolean>(true)

  useEffect(() => {
    if(!isSignedIn || !user) {
      return;
    }
    
    if (user.firstName) {
      setFirstname(user.firstName);
    }
  
    if (user.emailAddresses && user.emailAddresses.length > 0) {
      setEmail(user.emailAddresses[0].emailAddress); 
    }

    if (user.phoneNumbers && user.phoneNumbers.length > 0) {
      setPhoneNumber(user.phoneNumbers[0].phoneNumber);
    }

    const fetchWeddingData = async () => {
      try {
        const response = await fetch(`/api/getInvitationData?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch wedding data');
        }
        const data = await response.json();
        console.log("Fetched Wedding Data:", data);

        if (data && data.watermark !== undefined) {
          setIsShowPayment(data.watermark);
        }
      } catch (error) {
        console.error("Error fetching wedding data:", error);
      }
    };

    fetchWeddingData();
    
  }, [isSignedIn, user, id]); 

  console.log(firstname, email, phoneNumber, isShowPayment);



  const handlePayment = async () => {
    const uniqueId = nanoid(3);
    const paymentData = {
      orderId: "order-"+uniqueId+"-"+id ,
      first_name: firstname,
      email: email,
      phone: phoneNumber,
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
        } else {
          console.error("Failed to get transaction token:", data.message);
        }
      } catch (error) {
        console.error("Error during payment process:", error);
      }
    } else {
      window.snap.pay(transactionToken, {
        onSuccess: function(result: any) {
          console.log('Payment success2:', result);
          handlePaymentSuccess(result);
        },
        onPending: function(result: any) {
          console.log('Payment pending2:', result);
        },
        onError: function(result: any) {
          console.error('Payment error2:', result);
        },
        onClose: function() {
          console.log('Payment popup closed2');
        }
      });
    }
  };

  const handlePaymentSuccess = async (result:any) => {
    console.log("TRY handlePaymentSuccess");

    try {
        const response = await fetch('/api/updateWatermarkWeddingData', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,  // Ganti dengan id yang sesuai
                transaction_result: 'settlement'  // Ganti dengan status transaksi yang sesuai
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        else{
          toast('🦄 Selamat Pambayaran Berhasil', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });

            toast('Apabila tampilan berlum terupdate silahkan refresh laman', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });

        }

        const data = await response.json();
        console.log("API Response:", data);
    } catch (error) {
        console.error("Error in handlePaymentSuccess:", error);
    }

    console.log("DONE handlePaymentSuccess");
}


return (
  <div className="mx-5">
    <Script 
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      onLoad={() => console.log('Midtrans Snap script loaded successfully')}
      strategy="lazyOnload"
    />
    <div className="flex flex-col gap-3 bg-gray-100 dark:bg-gray-900 rounded px-5 py-2">
      {isShowPayment ? (
        <>
          <div className="flex flex-row gap-5 items-center justify-start">
            <h2>Status: Belum Terbayar</h2>
          </div>
          <div>
            <h2 className="text-xs font-light text-black dark:text-gray-200">
              Hai! Selamat Undangan anda berhasil dibuat menggunakan Fitur Freemium (Gratis), masih terdapat Watermark yang muncul pada undangan anda,
              Upgrade undangan anda untuk menghilangkan watermark dengan melakukan Pembayaran
            </h2>
          </div>
          <div className="flex flex-row gap-10 items-center justify-center mt-2">
            <Dialog>
              <DialogTrigger >
                <div 
                  className="text-sm p-2 text-white bg-green-600 rounded-xl cursor-pointer hover:bg-green-500 hover:scale-105"
                >
                  Pembayaran
                </div>              
              </DialogTrigger>
            
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Saran Pengguna</DialogTitle>
                  <DialogDescription>
                    Saran pengguna untuk mendukung kelancaran pembayaran
                    <InfoBeforePayment />
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose>
                  <div 
                    className="text-sm p-2 text-center text-white bg-green-600 items-center rounded-xl cursor-pointer hover:bg-green-500 hover:scale-105"
                    onClick={handlePayment}
                  >
                    Mengerti
                  </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      ) : (
        <div className="flex flex-row gap-5 items-center justify-start">
          <h2>Status: Sudah Dibayar</h2>
        </div>
      )}
    </div>
  </div>
  );
}

function InfoBeforePayment() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Jangan Menutup atau Merefresh Halaman</AccordionTrigger>
        <AccordionContent>
          Anda dapat membuka aplikasi lain untuk menyelesaikan pembayaran (seperti mobile banking, Gopay, dll), namun pastikan halaman pembayaran ini tetap terbuka di latar belakang sampai pembayaran selesai.     
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-start">Kode Pembayaran Berubah Jika Halaman Direfresh atau Ditutup</AccordionTrigger>
        <AccordionContent>
          Perlu diingat bahwa jika Anda merefresh atau menutup halaman ini selama proses pembayaran, kode pembayaran Anda akan berubah. Ini berarti Anda perlu memulai kembali proses pembayaran untuk mendapatkan kode yang baru.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Periksa Koneksi Internet</AccordionTrigger>
        <AccordionContent>
          Pastikan koneksi internet Anda stabil untuk menghindari kegagalan pembayaran.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Catat Bukti Pembayaran</AccordionTrigger>
        <AccordionContent>
          Jika pembayaran berhasil, catat atau screenshot informasi transaksi sebagai bukti pembayaran.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Hubungi Dukungan Jika Terjadi Masalah</AccordionTrigger>
        <AccordionContent>
          Setelah pembayaran berhasil, data undangan Anda akan diperbarui secara otomatis. Jika tidak,  hubungi tim dukungan kami dengan bukti transaksi Anda..
        </AccordionContent>
      </AccordionItem>


    </Accordion>
  );
}



export default StatusOfPayment;

