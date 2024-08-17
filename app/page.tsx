"use client";
import { ThemeModeButton } from "@/components/ThemeModeButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/app/utils/cn";
import Logo from "@/components/Logo";
import { UserButton } from "@clerk/nextjs";
import { Cover } from "@/components/ui/cover";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {FeatureList} from "@/components/landingpage/FeatureList"
import Image from "next/image";
// import { WobbleCardShow } from "@/components/landingpage/WobbleCard";
import Pricing from "@/components/landingpage/Pricing";
import TemplateWeddingListLandingPage from "@/components/TemplateWeddingListLandingPage";

export default function Home() {
  return (
    <main className="">
        <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
            <Logo/>
            <div className="flex  items-center gap-4">
                <ThemeModeButton />
                <UserButton afterSignOutUrl="/sign-in"/>
            </div>
        </nav>
      <BackgroundCellAnimation />
      <Hook/>
      <HookSecond />
      <FeatureList/>
      <List />
      <Pricing/>
      {/* <WobbleCardShow/> */}
    </main>
  );
}

const BackgroundCellAnimation = () => {
  return (
    // bg-[#D2D2D2]
    <div className="relative h-screen bg-white flex justify-center overflow-hidden">
      <BackgroundCellCore />
      
      <div className="relative z-30 mt-40 flex flex-col gap-4 items-center select-none">
          <div
            className="mt-16 p-3 md:p-0 md:mt-0 mx-5 md:px-0 flex flex-col w-full mb-5 text-left text-center md:bg-gray-100 md:bg-opacity-25 "
          >
            <h1 className="mb-2  text-2xl font-bold tracking-tighter bg-gray-600 md:bg-gray-700 bg-clip-text text-transparent md:text-3xl lg:text-4xl ">
              <span>Kesempatan Anda Membuat</span>
            </h1>
            <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent md:text-4xl lg:text-5xl ">
              <span><Cover>Undangan Pernikahan Online Gratis</Cover></span>
            </h1>
            <br></br>
          </div>

          <Link href="/list">
          <motion.div
            className="z-[100] bg-black rounded-full px-1 py-1 hover:scale-110  cursor-pointer hover:bg-black hover:bg-opacity-100"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay:0.4 }}
          >
            {/* <div className="z-[100] bg-black rounded-full px-1 py-1 hover:scale-110  cursor-pointer hover:bg-black hover:bg-opacity-100"> */}

                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    <Cover>Buat Gratis</Cover>
                  </span>
                </button>
            {/* </div> */}
          </motion.div>
            
          </Link>
      </div>
      <motion.img 
        src="/landingpage/bridal.png" 
        alt="Bridal" 
        className="h-[400px] md:h-[600px] absolute bottom-0 left-0 object-contain"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}  // Delay untuk sedikit menunda animasi agar terjadi setelah konten lainnya
        whileHover={{ scale: 1.05 }} // Sedikit memperbesar gambar saat di-hover
      />
    </div>
  );
};

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const ref = useRef<any>(null);

  const handleMouseMove = (event: any) => {
    const rect = ref.current && ref.current.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const size = 300;
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="h-full absolute inset-0"
    >
      <div className="absolute h-full inset-y-0  overflow-hidden">
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-30 bg-[#D2D2D2] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div
          className="absolute inset-0 z-10 bg-transparent"
          style={{
            maskImage: `radial-gradient(
              ${size / 4}px circle at center,
              white, transparent
            )`,
            WebkitMaskImage: `radial-gradient(
              ${size / 4}px circle at center,
              white, transparent
            )`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
              mousePosition.y - size / 2
            }px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern cellClassName="border-blue-600 relative z-[100]" />
        </div>
        <Pattern className="opacity-[0.5]" cellClassName="border-neutral-200" />
      </div>
    </div>
  );
};

const Pattern = ({
  className,
  cellClassName,
}: {
  className?: string;
  cellClassName?: string;
}) => {
  const x = new Array(47).fill(0);
  const y = new Array(30).fill(0);
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
  const [clickedCell, setClickedCell] = useState<any>(null);

  return (
    <div className={cn("flex flex-row  relative z-30", className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="flex flex-col  relative z-20 border-b"
        >
          {row.map((column, colIdx) => {
            const controls = useAnimation();

            useEffect(() => {
              if (clickedCell) {
                const distance = Math.sqrt(
                  Math.pow(clickedCell[0] - rowIdx, 2) +
                    Math.pow(clickedCell[1] - colIdx, 2)
                );
                controls.start({
                  opacity: [0, 1 - distance * 0.1, 0],
                  transition: { duration: distance * 0.2 },
                });
              }
            }, [clickedCell]);

            return (
              <div
                key={`matrix-col-${colIdx}`}
                className={cn(
                  "bg-transparent border-l border-b border-gray-300",
                  cellClassName
                )}
                onClick={() => setClickedCell([rowIdx, colIdx])}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileHover={{
                    opacity: [0, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "backOut",
                  }}
                  animate={controls}
                  className="bg-[rgba(14,165,233,0.3)] h-12 w-12"
                ></motion.div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};



function Hook() {
  return (
    <div className="flex flex-col overflow-hidden bg-[#D2D2D2]">
      
      <ContainerScroll
        titleComponent={
          <>
              <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent  mb-2 text-gray-600 ">
                Pengalaman Baru<br />
              </h1>
              <h1 className="text-2xl md:text-3xl mb-2 md:mb-10 text-gray-600 ">
                Lihat tampilan sembari menginput data, menjadikan:<br />
              </h1>
              <h1  className="text-4xl mb-10 md:text-4xl text-gray-800  md:text-[6rem] font-bold mt-1 leading-none">
                Kami Berbeda 

              </h1>
            
          </>
        }
      >
        
        <Image
          src={`/landingpage/create-page.png`}
          alt="hero"
          height={800}
          width={1400}
          className="mx-auto rounded-2xl object-contain h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

function HookSecond() {
  return (
    <div className="relative flex h-screen py-10 flex-col justify-center items-center bg-[#D2D2D2] pb-30">
      {/* Background Blur Merah */}
      <div className="absolute bottom-1/2 left-1/2 w-[300px] h-[300px] bg-red-500 rounded-full blur-xl opacity-50 animate-ping" style={{ animationDuration: '4s' }}></div>

      {/* Background Blur Biru */}
      <div className="absolute bottom-1/2 right-1/2 w-[300px] h-[300px] bg-blue-500 rounded-full blur-xl opacity-50 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      {/* Background Blur Merah */}
      <div className="absolute top-1/2 right-1/2 w-[300px] h-[300px] bg-red-500 rounded-full blur-xl opacity-50 animate-ping" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>

      {/* Background Blur Biru */}
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-blue-500 rounded-full blur-xl opacity-50 animate-ping" style={{ animationDuration: '4s', animationDelay: '3s' }}></div>
      <motion.div
        className="my-5 px-1"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-3xl mb-10 md:text-3xl text-gray-800  md:text-[5rem] font-bold mt-1 leading-none text-center">
          Sangat Powerfull
        <br />
        </h1>
        <h1 className="text-xl md:text-2xl text-2xl md:text-3xl bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent text-center">
          Manajemen tamu undangan sangat mudah: 
        <br />
        </h1>
        <h1 className="text-xl md:text-2xl mb-2 md:mb-10 text-gray-600 text-center">
          Menambah tamu, copy template text, copy undangan, serta filter data
        <br />
        </h1>
      </motion.div>
      {/* Gambar */}
      <motion.div
        className="relative h-[250px] md:h-[400px] flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={`/landingpage/mackbook-builder.png`}
          alt="hero"
          height={800}
          width={900}
          className="mx-auto rounded-2xl object-contain h-full hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </motion.div>

 
    </div>
  );
}


function List() {
  return (
    <div className=" ">
      <div className="container p-4 md:p-8 pt-4">
        <h2 className="text-xl md:text-2xl text-gray-800 font-bold dark:text-white">Pilih Template</h2>
        <TemplateWeddingListLandingPage />
     </div>
      
    </div>
  )
}





