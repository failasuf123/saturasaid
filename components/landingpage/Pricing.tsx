import { motion } from 'framer-motion';
import { Cover } from "@/components/ui/cover";


export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col gap-6 justify-start items-center bg-[url('/landingpage/bg.png')] bg-cover">

      <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold">Pricing</h2>
      <div className=" min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card Gratis */}
            <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            >
            <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-l from-red-500 to-blue-500 bg-clip-text text-transparent ">Gratis</h2>
            </div>
            <div>
                <span></span>
                <p className="text-3xl font-bold mb-4">Rp 0</p>
            </div>
            <div>
                <ul className="mb-6">
                    <li className="mb-2">✔️ Akses Semua Template</li>
                    <li className="mb-2">✔️ Akses Semua Musik/Backsound</li>
                    <li className="mb-2">✔️ Upload Gambar</li>
                    <li className="mb-2">✔️ Upload Album (6)</li>
                    <li className="mb-2">😭 Watermark</li>
                    <li className="mb-2">✔️ Manajemen Tamu</li>
                    <li className="mb-2">✔️ Unlimited Tamu</li>
                    <li className="mb-2">✔️ Aktif 5 Hari</li>
                </ul>
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded-lg items-end">Get Started</button>
            </motion.div>
            <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            >
            <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                    Satu Rasa
                </h2>
            </div>
            <div>
                <span></span>
                <p className="text-3xl font-bold mb-4">Rp 59K <span className="text-lg line-through text-gray-400 ml-2">Rp 200K</span> </p>
            </div>
            <div>
                <ul className="mb-6">
                    <li className="mb-2">✔️ Semua fitur pada Free plan</li>
                    <li className="mb-2">✔️ Aktif 3 Bulan</li>
                    <li className="mb-2">✔️ Include Biaya Transfer</li>
                    <li className="mb-2"><Cover>✔️ Hapus Watermark</Cover></li>
   
                </ul>
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded-lg items-end">Get started</button>
            </motion.div>

        </div>
      </div>
    </div>
  );
}
