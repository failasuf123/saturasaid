import midtransClient from 'midtrans-client';

// Pastikan serverKey ada
const serverKey = process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || "";
if (!serverKey) {
  throw new Error("Midtrans Server Key is not set");
}

// Create Snap API instance
const snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: serverKey,
});

export default snap;

