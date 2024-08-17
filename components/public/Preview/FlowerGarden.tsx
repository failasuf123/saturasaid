'use client'
import React, { useState, useEffect, useRef } from 'react';
import { HeartIcon } from '@/components/public/animation/HeartIcon';
import { bilbo, playball } from '@/components/provider/FontStylingProvider';
import { Button } from '@/components/ui/button';
import { FaEnvelope } from 'react-icons/fa';
import { IoIosHeart, IoMdMusicalNote} from 'react-icons/io';
import { motion, useInView } from 'framer-motion';
import { MdTimer } from "react-icons/md";

import { IntroductionList } from '@/shared/Choose/IntroductionList';
import { GreetingList } from '@/shared/Choose/GreetingList';
import { HookMiddleList } from '@/shared/Choose/HookMiddleList';
import { StoryList } from '@/shared/Choose/StoryList';
import { ClosingList } from '@/shared/Choose/ClosingList';
import { MusicList } from '@/shared/Choose/MusicList';
import { type } from 'os';
import { FormPreview } from '@/components/public/Preview/support/typings';


interface UserProfileDisplayProps {
  formPreview: FormPreview;
  coverUrl: string;
  maleUrl: string;
  femaleUrl: string;
  albumUrl: string[]
}

const FlowerGarden:  React.FC<UserProfileDisplayProps> = ({formPreview, coverUrl, maleUrl, femaleUrl, albumUrl}) => {

  if (!formPreview) {
    return <div>Loading...</div>;
  }

  const user = formPreview;
  
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isIntroductionVisible, setIsIntroductionVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  console.log("TEMPLATE")
  console.log(formPreview)

  

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

  const typeToFind = formPreview.songType;
  const songData = MusicList.find(item => item.type === typeToFind)?.url;
  // console.log("SONG DATA")
  // console.log(typeToFind)
  // console.log(songData)

  return (
    <div className="flex bg-gray-100  flex-col min-h-screen items-center justify-center ">
      {/* <audio ref={audioRef} src={songData ? songData: "/musik/NgudhaRasa.mp3" }  loop />  */}
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
          <Cover formPreview={formPreview} coverUrl={coverUrl} showBtn={!isInvitationOpened} onOpenInvitation={handleOpenInvitation} />
          <Introduction formPreview={formPreview} albumUrl={albumUrl} isVisible={isIntroductionVisible} />
          <Greeting formPreview={formPreview} />
          <Bride formPreview={formPreview} femaleUrl={femaleUrl} />
          <Groom formPreview={formPreview} maleUrl={maleUrl}/>
          <CountDown formPreview={formPreview} />
          <Place formPreview={formPreview} />
          <Story formPreview={formPreview} />
          <Album formPreview={formPreview} />
          <Gift formPreview={formPreview} />
          <Closing formPreview={formPreview}/>
        </div>
      </div>
    </div>
  );
}

interface CoverProps {
  formPreview: FormPreview;
  coverUrl: string;
  showBtn: boolean;
  onOpenInvitation: () => void;
}

function Cover({ formPreview, coverUrl, showBtn, onOpenInvitation }: CoverProps) {
  return (
    <div className="relative min-h-screen w-[500px] flex flex-col justify-between text-2xl overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="mt-10 z-10">
          <p className={`text-gray-700 text-3xl ${playball.className}`}>The Wedding of</p>
        </div>

        <div className="mt-2 z-10">
          <p className={`text-5xl text-gray-700 border-sm underline decoration-gray-600 ${playball.className}`}>{formPreview?.nicknameMale} & {formPreview?.nicknameFemale} </p>
        </div>
      </div>

      <div className="flex flex-col items-center mt-48 md:mt-36">
        <div className="mt-16 z-10">
          <p className="text-xl font-bold text-gray-700 underline">Dear</p>
        </div>

        <div className="mt-0 z-10">
          <p className="text-2xl font-bold text-gray-700">Tamu Undangan</p>
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
      <img className="min-h-screen w-[500px] absolute top-0 left-0 object-cover" src={coverUrl ? coverUrl : "/template1/pasangan/pasangan1_b.jpeg"} alt="Wedding Cover" />     
       </div>
      <div className="min-h-screen w-[500px] absolute top-0 left-0 bg-cyan-50 opacity-10 z-2"></div>
    </div>
  );
}

interface IntroductionProps {
  formPreview: FormPreview; 
  albumUrl: string[];
  isVisible: boolean;
}

function Introduction({ formPreview, albumUrl, isVisible }: IntroductionProps) {
  const typeToFind = formPreview.introductionType;
  const introductionData = IntroductionList.find(item => item.type === typeToFind);
  const defaultImages = [
    "/pasangan/1/4.jpeg",
    "/pasangan/1/3.jpeg",
    "/pasangan/1/2.jpeg",
    "/pasangan/1/4.jpeg",
    "/pasangan/1/3.jpeg",
    "/pasangan/1/2.jpeg"
  ];

  let imagesToDisplay = albumUrl.length > 0 ? albumUrl : defaultImages;
  
  while (imagesToDisplay.length < 6) {
    imagesToDisplay = [...imagesToDisplay, ...imagesToDisplay].slice(0, 6);
  }

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const slideCount = imagesToDisplay.length;
      const slideWidth = slider.clientWidth / 3;
      const totalWidth = slideWidth * slideCount;

      slider.style.width = `${totalWidth}px`;
      slider.style.animation = `slide ${slideCount * 5}s linear infinite`;
    }
  }, [imagesToDisplay]);

  return (
    <div id="introduction" className={`relative  w-[500px] flex flex-col text-2xl overflow-hidden snap-center ${isVisible ? 'animate-fade-up' : ''} bg-[url(/paper.svg)]`}>
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
            height: 550px;
            animation: slide 42s linear infinite;
          }

          .slider img {
            width: 30%;
            height: 650px;
            object-fit: cover;
            flex-shrink: 0;
          }
        `}
      </style>

      {/* <div className="relative h-96 flex-shrink-0 flex-grow-0 overflow-hidden">
        <div ref={sliderRef} className="slider h-full gap-3 h-96 w-72">
          {imagesToDisplay.map((imgSrc, index) => (
            <img key={index} className="object-none " src={imgSrc} alt="" />
          ))}
        </div>
      </div> */}
      
      <motion.div 
        className="z-10 basis-1/2 py-10 bg-gray-100 relative flex flex-col items-center justify-center"
      >
        <IoIosHeart className="text-red-700 animate-pulse" />
        <div className="absolute h-20 w-64 bottom-20 items-center opacity-40">
          <img src="/template1/2.png" alt="" />
        </div>

        <h2 className={`text-gray-700 text-2xl font-bold`}>We Found Love !</h2>
        <p className={`text-gray-600 text-sm mx-10 mt-3 text-center`}>{introductionData?.isi}</p>
        <p className={`text-gray-600 text-xs mx-3 my-3 text-center`}>- {introductionData?.sumber} -</p>
      </motion.div>
    </div>
  );
}



const Greeting = ({ formPreview }: { formPreview: FormPreview }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = formPreview.time.toLocaleDateString('id-ID', options);
  const typeToFind = formPreview.greetingType
  const greetingData = GreetingList.find(item => item.type === typeToFind);
  return(
    <div  className="min-h-[500px] h-[700px] relative w-[500px] flex flex-col items-center justify-center bg-white text-2xl snap-start snap-always bg-gradient-to-b from-slate-50 to-rose-50 bg-[url(/stripes.svg)]">
      <motion.div 
        ref={ref}
        className="flex flex-col items-center justify-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
        >
        <div className="mt-10 z-10">
          <p className={`text-gray-700 text-2xl ${playball.className}`}>We Are Getting Married</p>
        </div>

        <div className="mt-2 z-10">
          <p className={`text-4xl text-gray-700 border-sm underline decoration-gray-600 ${playball.className}`}>
            {formPreview?.nicknameMale} & {formPreview?.nicknameFemale}
          </p>
        </div>

        <div className="mt-3 z-10 px-5 py-2 bg-cyan-100 rounded-full animate-bounce">
          <p className={`text-gray-700 text-xl ${playball.className} animate-bounce`}>
            {formattedDate}
          </p>
        </div>

        <div>
          <p className={`text-gray-600 text-lg mx-10 mt-3  text-center  `}>
            {greetingData?.isi}
          </p>

        </div>
      </motion.div>
      <div>
        <img className="min-h-screen w-[500px] absolute top-0 left-0 object-cover " src="/template1/14.png" alt="" />
      </div>

      <div className="absolute z-10 left-1/2 top-3/5">
        {[...Array(5)].map((_, index) => (
          <HeartIcon key={index} />
        ))}
      </div>
    </div>
  )
}

const Bride = ({ formPreview, femaleUrl }: { formPreview: FormPreview, femaleUrl:string }) =>  {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });


  return (
    <div ref={ref} className="min-h-screen relative w-[500px] flex flex-col items-center bg-white text-2xl snap-start snap-always bg-gradient-to-b from-slate-50 to-rose-50">
      <motion.div 
        className="w-64 h-72 p-3 rounded-t-full rounded-b-xl mt-6 ml-36  mb-4 z-10 bg-gradient-to-t from-slate-50 to-orange-200"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
      >
        <div className="overflow-hidden rounded-t-full rounded-b-2xl">

          <img 
            src={femaleUrl ? femaleUrl:"/template1/pasangan/pasangan1_female.jpeg"}
            alt="Pengantin Wanita" 
            className="w-full h-full object-cover rounded-b-3xl"
          />
        </div>
      </motion.div>

      <motion.div 
        className="z-10 mt-20 md:mt-16 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
      >
        <p className={`text-4xl font-bold text-gray-600 ${bilbo.className}`}>{formPreview?.fullnameFemale}</p>
        <p className={`text-sm text-gray-600 mt-8 md:mt-5 lg:mt-3`}>Putri dari </p>
        <div className="flex flex-col items-center px-3 py-2 bg-cyan-100 bg-opacity-10 md:bg-opacity-20 rounded">
          <p className={`text-2xl font-bold text-gray-600  ${bilbo.className}`}>Bapak {formPreview?.dadFemale} <hr /> </p>
          <p className={`text-2xl font-bold text-gray-600  ${bilbo.className}`}>Ibu {formPreview?.momFemale} </p>
        </div>
      </motion.div>
      <div>

        <img className="min-h-screen w-[400px] absolute top-0 left-0 object-contain animate-pulse" src="/template1/11.png" alt="" />
        <img className="min-h-screen w-[500px] absolute bottom-0 left-0 object-contain animate-pulse" src="/template1/13.png" alt="" />
      </div>
    </div>
  );
}


const Groom = ({ formPreview, maleUrl }: { formPreview: FormPreview, maleUrl: string }) =>  {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="min-h-screen relative w-[500px] flex flex-col items-center bg-white text-2xl snap-start snap-always bg-gradient-to-t from-slate-50 to-rose-50">
      <motion.div 
        className="w-64 h-72 p-3 rounded-t-full rounded-b-xl mt-6 mr-36  mb-4 z-10 bg-gradient-to-t from-slate-50 to-orange-200"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
        >
        <div className="overflow-hidden rounded-t-full rounded-b-2xl">
          <img 
            src={maleUrl ? maleUrl:"/template1/pasangan/pasangan1_male.jpeg"}
            alt="Pengantin Pria" 
            className="w-full h-full object-cover rounded-b-3xl "
          />
        </div>
      </motion.div>

      <motion.div 
        className="z-10 mt-20 md:mt-16 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
        >
        <p className={`text-4xl font-bold text-gray-600 ${bilbo.className}`}>{formPreview.fullnameMale}</p>
        <p className={`text-sm text-gray-600 mt-8 md:mt-5 lg:mt-3`}>Putra dari </p>
        <div className="flex flex-col items-center px-3 py-2 bg-cyan-100 bg-opacity-10 md:bg-opacity-20 rounded">
          <p className={`text-2xl font-bold text-gray-600  ${bilbo.className}`}>Bapak {formPreview.dadMale} <hr /> </p>
          <p className={`text-2xl font-bold text-gray-600  ${bilbo.className}`}>Ibu {formPreview.momMale} </p>
        </div>
      </motion.div>
      <div className="w-[500px]">

        <img className="min-h-screen w-[400px] absolute ml-24 top-0 left-0 object-contain scale-90 animate-pulse" src="/template1/12.png" alt="" />
        <img className="min-h-screen w-[500px] absolute bottom-0 left-0 object-contain animate-pulse" src="/template1/13.png" alt="" />
      </div>
    </div>
  );
}

const CountDown: React.FC<{ formPreview: FormPreview }> = ({ formPreview })=> {
  const typeToFind = formPreview.hookMiddleType
  const hookMiddleData = HookMiddleList.find(item => item.type === typeToFind);
  const calculateTimeLeft = () => {
    const weddingDate = formPreview.time ; // Ganti dengan tanggal pernikahan Anda
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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (

    <div className="min-h-screen w-[500px] flex flex-col items-center justify-center  text-2xl snap-start snap-always">
      <motion.div 
        ref={ref} className="div"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 6 }}
      >
        <img className="animate-pulse h-36 " src="/template1/10.png" alt="" />

      </motion.div>
      <motion.div ref={ref}  className="mt-2 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
      >
        <p className={`text-4xl text-gray-700 border-sm underline decoration-gray-600 ${playball.className}`}>Menghitung Hari</p>
      </motion.div>
      <motion.div ref={ref}  className=" z-10 mt-5 px-8 py-2 items-center"
          initial={{ opacity: 0,  x:-100 }}
          animate={isInView ? { opacity: 1, y: 0, x:0} : {}}
          transition={{ 
            ease: "linear",
            duration: 3,
            x: { duration: 1 }
          }}
      >
        <p className={`text-lg text-gray-700 text-center   `}>
          {hookMiddleData?.isi}
        </p>
      </motion.div>
      <motion.div className="mt-5 flex flex-col items-center justify-center gap-2"
        initial={{ opacity: 0,  x:100 }}
        animate={isInView ? { opacity: 1, y: 0,  x: 0 } : {}}
        transition={{
          ease: "linear",
          duration: 3,
          x: { duration: 1 }
        }}
      >
        <div>
          <MdTimer className="text-gray-600 animate-bounce text-3xl" />
        </div>
        {timerComponents.length ? (
          <div className="flex flex-row gap-4 items-center justify-center text-gray-800">
            {timerComponents.map((component, index) => (
              <div className="text-lg font-bold" key={index}>{component}</div>
            ))}
          </div>
        ) : (
          <span>Waktu pernikahan sudah tiba!</span>
        )}
      </motion.div>

      {/* <div className="w-[500px] relative">
        <img className="min-h-screen w-[500px] absolute bottom-0 left-0 object-contain animate-pulse" src="/template1/15.png" alt="" />
      </div> */}
    </div>
  );
};



const Place = ({ formPreview }: { formPreview: FormPreview }) =>  {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="min-h-screen relative w-[500px] text-2xl bg-gradient-to-t from-slate-50 to-orange-200 flex flex-col justify-start items-center">
      <div className="relative w-[500px] h-[95%]">
        <img src="/template1/16.jpeg" className="w-full h-full object-cover" alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-orange-100 opacity-30"></div>
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-center">
          {[...Array(6)].map((_, index) => (
            <HeartIcon key={index} />
          ))}
        </div>
        <div className="absolute top-0 w-full flex justify-center">
          {[...Array(6)].map((_, index) => (
            <HeartIcon key={index} />
          ))}
        </div>
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
          {[...Array(6)].map((_, index) => (
            <HeartIcon key={index} />
          ))}
        </div>
      </div>

      <motion.div 
        ref={ref}
        className="absolute text-center flex flex-col items-center justify-start mt-10 gap-3 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
      >
        <div className="z-10">
          <p className={`text-white text-5xl ${playball.className}`}>Resepsi Pernikahan</p>
        </div>

        <div className="z-10 mt-4 gap-2 flex flex-col items-center ">
          <p className="text-white text-4xl">Sabtu</p>
          <p className="text-white text-8xl font-bold">20</p>
          <p className="text-white text-3xl">Juli 2024</p>
          <p className="text-white text-2xl mt-2">Pukul: 08.00 WIB</p>
          <p className="text-white text-2xl ">||</p>
          <p className="text-white text-2xl ">Bertempat di:</p>
          <div className="mx-12 bg-white rounded-lg items-center py-1 px-4">
            <p className="text-gray-800 text-lg mt-2">{formPreview.address}</p>
          </div>
        </div>
        <div className="mt-3 p-3 bg-white rounded-lg">
        <iframe
          src={formPreview.gmap ? formPreview.gmap + "=&output=embed" : "https://maps.google.com/maps?q=Ajibarang%20wetan%20Rt%2002%20Rw%2012&t=&z=13&ie=UTF8&iwloc=&output=embed"}
          width="300"
          height="230"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        ></iframe>

        </div>

        <a target="_blank" rel="noopener noreferrer" href={formPreview.gmap ? formPreview.gmap : "https://maps.google.com/maps?q=Ajibarang%20wetan%20Rt%2002%20Rw%2012&t=&z=13&ie=UTF8&iwloc"}>
          <div className="bg-white opacity-80 hover:opacity-100 hover:scale-110 px-4 py-2 rounded-lg shadow-lg hover:shadow-2xl shadow-cyan-600 hover:shadow-cyan-700 cursor-pointer">
                <p className="text-sm text-gray-800 ">Buka Maps</p>
          </div>
        </a>
      </motion.div>
    </div>
  );
}

const Story = ({ formPreview }: { formPreview: FormPreview }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const typeToFind = formPreview.storyType
  const storyData = StoryList.find(item => item.type === typeToFind);
  return(
    <div className="min-h-screen relative w-[500px] text-2xl bg-gradient-to-t from-slate-50 to-orange-200 flex flex-col justify-start items-center">
      <p>{storyData?.isi}</p>
    </div>
  )
}

const Album = ({ formPreview }: { formPreview: FormPreview }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return(
    <div className="min-h-screen relative w-[500px] text-2xl bg-gradient-to-t from-slate-50 to-orange-200 flex flex-col justify-start items-center">
      

<div className="grid grid-cols-2 gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""></img>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""></img>
        </div>

    </div>

    </div>
  )
}

const Gift = ({ formPreview }: { formPreview: FormPreview }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return(
    <div className="min-h-screen relative w-[500px] text-2xl bg-gradient-to-t from-slate-50 to-orange-200 flex flex-col justify-start items-center">
      <div>
        Gift 1
        <h1>{formPreview.accountBank1}</h1>
        <h1></h1>
        <h1></h1>
      </div>
    </div>
  );
}

const Closing = ({ formPreview }: { formPreview: FormPreview }) =>  {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const typeToFind = formPreview.closingType
  const closingData = ClosingList.find(item => item.type === typeToFind);
  return(
    <div className="min-h-screen relative w-[500px] text-2xl bg-gradient-to-t from-slate-50 to-orange-200 flex flex-col justify-start items-center">
      <p>{closingData?.isi}</p>
    </div>
  );
}

export default FlowerGarden;

