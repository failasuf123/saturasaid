"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function FeatureList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full pt-20  bg-gradient-to-b from-[#D2D2D2] to-white ">
      <h2 className="md:ml-10  max-w-6xl pl-4 mx-auto text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent ">
        Alasan Lain
      </h2>
      <h2 className="md:ml-10  max-w-7xl pl-4 mx-auto text-2xl md:text-5xl font-bold text-neutral-800  font-sans">
        Kenapa Produk Kami Berkualitas ?
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8  md:p-14 rounded-3xl "
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 ">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/banner-wedding/1.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
    {
        category: "Template Undangan Non Pasaran",
        title: "Dibuat eksklusif khusus untuk pengguna saturasa.id",
        src: "/landingpage/fitur-template.jpg",
        content: <DummyContent />,
      },
    //   {
    //     category: "Input Dinamis",
    //     title: "Lihat tampilan sembari menginput data",
    //     src: "/landingpage/create-page.png",
    //     content: <DummyContent />,
    //   },
    //   {
    //     category:"Daftar Tamu",
    //     title: "Manajemen Tamu dengan Mudah",
    //     src: "/landingpage/fitur-manajemen.jpg",
    //     content: <DummyContent />,
    //   },
     
      {
        category: "Pilih Lagu",
        title: "Menyediakan puluhan lagu Gratis yang kamu banget",
        src: "/landingpage/fitur-song.jpg",
        content: <DummyContent />,
      },
      {
        category: "Kirim Undangan",
        title: "Kirim Undangan dan Kalimat hanya Satu Kali Klik ",
        src: "/landingpage/fitur-send.jpg",
        content: <DummyContent />,
      },
      {
        category: "Pembayaran Mudah",
        title: "Opsi pembayaran yang banyak dan mudah",
        src: "/landingpage/fitur-payment.jpg",
        content: <DummyContent />,
      },];
