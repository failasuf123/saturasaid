'use client'
import React, { useState, useEffect, useRef } from 'react';
import { HeartIcon } from '../animation/HeartIcon';
import { bilbo, playball } from '../../provider/FontStylingProvider';
import { Button } from '@/components/ui/button';
import { FaEnvelope } from 'react-icons/fa';
import { IoIosHeart, IoMdMusicalNote, IoMdMusicalNotes } from 'react-icons/io';
import { motion, useInView } from 'framer-motion';


export default function Template1() {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isIntroductionVisible, setIsIntroductionVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    setIsIntroductionVisible(true); // Setelah tombol dibuka, atur agar Introduction terlihat
    const introductionSection = document.getElementById('introduction');
    if (introductionSection) {
      introductionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleScroll = () => {
      const introductionSection = document.getElementById('introduction');
      if (introductionSection) {
        const topPosition = introductionSection.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (topPosition < screenHeight * 0.75) { // Atur ambang batas sesuai kebutuhan
          setIsIntroductionVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <div className="flex bg-gray-100 flex-col min-h-screen items-center justify-center">
      <audio ref={audioRef} src="/musik/NgudhaRasa.mp3" autoPlay loop />
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="bg-gray-100 p-2 rounded-full shadow-lg hover:bg-gray-200"
        >
          {isPlaying ? <IoMdMusicalNote className="text-gray-500 animate-spin" size={24} /> : <IoMdMusicalNote className="text-gray-500" size={24} />}
        </button>
      </div>
      <div className="flex w-full flex-grow items-center justify-center ">
        <div className="w-full max-w-[1740px] mx-auto flex flex-col items-center snap-y snap-mandatory">
          <Cover showBtn={!isInvitationOpened} onOpenInvitation={handleOpenInvitation} />
          <Introduction isVisible={isIntroductionVisible} />
          <Bride />
          <Groom />
          <Place />
          <CountDown />
        </div>
      </div>
    </div>
  );
}

interface CoverProps {
  showBtn: boolean;
  onOpenInvitation: () => void;
}

function Cover({ showBtn, onOpenInvitation }: CoverProps) {
  return (
    <div className="relative min-h-screen w-[500px] flex flex-col justify-between text-2xl overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="mt-10 z-10">
          <p className={`text-gray-700 text-3xl ${playball.className}`}>The Wedding of</p>
        </div>

        <div className="mt-2 z-10">
          <p className={`text-5xl text-gray-700 border-sm underline decoration-gray-600 ${playball.className}`}>Romeo & Juliete</p>
        </div>
      </div>

      <div className="flex flex-col items-center mt-48 md:mt-36">
        <div className="mt-16 z-10">
          <p className="text-xl font-bold text-gray-700 underline">Dear</p>
        </div>

        <div className="mt-0 z-10">
          <p className="text-2xl font-bold text-gray-700">Bapak Yanto</p>
        </div>

        <div className="mt-1 z-10">
          <p className="text-xs text-white">*mohon maaf apabila terdapat kesalahan penulisan nama/gelar</p>
        </div>

        {showBtn && (
          <div className="mt-4 z-10 animate-pulse">
            <Button onClick={onOpenInvitation} className="bg-cyan-100 opacity-80 text-gray-600 hover:bg-cyan-100 hover:scale-105 text-sm py-3 px-5">
              <FaEnvelope className="mr-2" />
              Buka Undangan
            </Button>
          </div>
        )}

      </div>

      <div className="absolute z-10 top-1/2">
        {[...Array(7)].map((_, index) => (
          <HeartIcon key={index} />
        ))}
      </div>
      <div className="absolute z-10 left-1/2 top-3/5">
        {[...Array(5)].map((_, index) => (
          <HeartIcon key={index} />
        ))}
      </div>
      <div>
        <img className="min-h-screen w-[500px] absolute top-0 left-0 object-cover" src="/template1/pasangan/pasangan1_b.jpeg" alt="" />
      </div>
      <div className="min-h-screen w-[500px] absolute top-0 left-0 bg-cyan-50 opacity-10 z-2"></div>
    </div>
  );
}

interface IntroductionProps {
  isVisible: boolean;
}

function Introduction({ isVisible }: IntroductionProps) {
  return (
    <div id="introduction" className={`relative h-screen w-[500px] flex flex-col text-2xl overflow-hidden snap-center ${isVisible ? 'animate-fade-up' : ''}`}>
      <style>
        {`
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .slider {
            display: flex;
            width: 300%;
            height:550px;
            animation: slide 45s linear infinite;
          }

          .slider img {
            width: 30%;
            height: 650px;
            object-fit: cover;
            flex-shrink: 0;
          }
        `}
      </style>

      <div className="relative basis-2/3 flex-shrink-0 flex-grow-0 overflow-hidden">
        <div className="slider h-full gap-3">
          <img className="object-cover" src="/pasangan/1/4.jpeg" alt="" />
          <img className="object-cover" src="/pasangan/1/3.jpeg" alt="" />
          <img className="object-cover" src="/pasangan/1/2.jpeg" alt="" />
          <img className="object-cover" src="/pasangan/1/4.jpeg" alt="" />
          <img className="object-cover" src="/pasangan/1/3.jpeg" alt="" />
          <img className="object-cover" src="/pasangan/1/2.jpeg" alt="" />
        </div>
      </div>
      
      <div className="z-10 basis-1/3 bg-gray-100 relative flex flex-col items-center justify-center">
        <IoIosHeart className="text-red-700  animate-pulse"/>
        <div className="absolute h-20 w-64 bottom-20 items-center opacity-40 "><img src="/template1/2.png" alt="" /></div>

        <h2 className={`text-gray-700 text-2xl font-bold ${bilbo.className}`}>We Found Love !</h2>
        <p className={`text-gray-600 text-xs mx-10 mt-3  text-center  `}>" Dan di antara tanda-tanda kekuasaan-Nya diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri supaya kamu dapat ketenangan hati dan dijadikannya kasih sayang di antara kamu. Sesungguhnya yang demikian menjadi tanda-tanda kebesaran-Nya bagi orang-orang yang berpikir. "</p>
        <p className={`text-gray-600 text-xs mx-3 my-3 text-center`}>- Q.S. Ar-Rum: 21 -</p>
      </div>

    </div>
  );
}



const Bride = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <div className="relative z-20">
        <img 
          className="min-h-screen w-[400px] absolute top-0 left-0 object-cover animate-pulse" 
          src="/template1/11.png" 
          alt="" 
        />
        <img 
          className="min-h-screen w-[500px] absolute bottom-0 left-0 object-cover animate-pulse" 
          src="/template1/13.png" 
          alt="" 
        />
      </div>

      <motion.div
        className="w-64 z-30 h-72 p-3 rounded-t-full rounded-b-xl mt-6 ml-36 mb-4 z-40 bg-gradient-to-t from-slate-50 to-orange-200"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-hidden rounded-t-full rounded-b-2xl z-40">
          <img
            src="/template1/pasangan/pasangan1_female.jpeg"
            alt="Pengantin Wanita"
            className="w-full h-full object-contain rounded-b-3xl"
          />
        </div>
      </motion.div>

      <motion.div
        className="z-50 mt-20 md:mt-16 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className={`text-4xl font-bold text-gray-600 ${bilbo.className}`}>Juliete Julieata</p>
        <p className={`text-sm text-gray-600 mt-8 md:mt-5 lg:mt-3`}>Putri dari</p>
        <div className="flex flex-col items-center px-3 py-2 bg-cyan-100 bg-opacity-10 md:bg-opacity-20 rounded">
          <p className={`text-2xl font-bold text-gray-600  ${bilbo.className}`}>Bapak Dr.dr.Rahmat Ramdahan Sulaimani.Sp.O.K. <hr /> </p>
          <p className={`text-2xl font-bold text-gray-600  ${bilbo.className}`}>Ibu dr.Dariya Amanda Narsiti.Sp.Keb. </p>
        </div>
      </motion.div>
    </div>
  );
};

const Groom = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="" ref={ref}>
      <div className="relative z-0">
        <img className="min-h-screen w-[400px] absolute ml-36 top-0 left-0 object-cover scale-90 animate-pulse" src="/template1/12.png" alt="" />
        <img className="min-h-screen w-[500px] absolute bottom-0 left-0 object-cover animate-pulse" src="/template1/13.png" alt="" />
      </div>
      <motion.div
        className="w-64 h-72 p-3 rounded-t-full rounded-b-xl mt-6 mr-36 mb-4 z-10 bg-gradient-to-t from-slate-50 to-orange-200"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-hidden rounded-t-full rounded-b-2xl z-10">
          <img
            src="/template1/pasangan/pasangan1_male.jpeg"
            alt="Pengantin Wanita"
            className="w-full h-full object-contain rounded-b-3xl"
          />
        </div>
      </motion.div>

      <motion.div
        className="z-40 mt-20 md:mt-16 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className={`text-4xl font-bold text-gray-600 ${bilbo.className}`}>Romeo Widjaya Kusuma</p>
        <p className={`text-sm text-gray-600 mt-8 md:mt-5 lg:mt-3`}>Putra dari</p>
        <div className="flex flex-col items-center px-3 py-2 bg-cyan-100 bg-opacity-10 md:bg-opacity-20 rounded">
          <p className={`text-2xl font-bold text-gray-600  ${bilbo.className}`}>Bapak ir.H.Joko Hadi Koesuma <hr /> </p>
          <p className={`text-2xl font-bold text-gray-600  ${bilbo.className}`}>Ibu Sri Rejeki</p>
        </div>
      </motion.div>
    </div>
  );
};



function Place() {
  return (
    <div className="min-h-screen w-[500px] flex items-center justify-center bg-yellow-500 text-2xl snap-start snap-always">
      Tempat
    </div>
  );
}



const CountDown: React.FC = () => {
  const calculateTimeLeft = () => {
    const weddingDate = new Date('2024-7-11'); // Ganti dengan tanggal pernikahan Anda
    const now = new Date();
    const difference = weddingDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return null;
    }

    return (
      <span key={interval}>
        {timeLeft[interval as keyof typeof timeLeft]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="min-h-screen w-[500px] flex items-center justify-center bg-red-500 text-2xl snap-start snap-always">
      <div>
        {timerComponents.length ? (
          <div>
            {timerComponents.map((component, index) => (
              <div key={index}>{component}</div>
            ))}
          </div>
        ) : (
          <span>Waktu pernikahan sudah tiba!</span>
        )}
      </div>
    </div>
  );
};

