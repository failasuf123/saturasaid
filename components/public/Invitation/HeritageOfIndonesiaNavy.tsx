'use client'
import React, { useState, useEffect, useRef } from 'react';
import { HeartIcon } from '../animation/HeartIcon';
import { bilbo, playball } from '../../provider/FontStylingProvider';
import { Button } from '@/components/ui/button';
import { FaEnvelope } from 'react-icons/fa';
import { IoIosHeart, IoMdMusicalNote} from 'react-icons/io';
import { motion, useInView } from 'framer-motion';
import { MdTimer } from "react-icons/md";
import { BridalCouple } from '@/typings';
import { FaCopy } from 'react-icons/fa'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface HeritageOfIndonesiaNavyProps {
  currentUser: BridalCouple | null;
  cover: string | null;
  male: string | null;
  female: string | null;
  album: string[];
  name: string;
}

const HeritageOfIndonesiaNavy: React.FC<HeritageOfIndonesiaNavyProps> = ({ currentUser, cover, male, female, album, name }) => {
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  
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
    <div className="flex  flex-col min-h-screen items-center justify-center bg-[url('/template2/bg-navy.png')] bg-fixed">
      <audio ref={audioRef} src="/musik/NgudhaRasa.mp3" loop />
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
          <Cover currentUser={currentUser} showBtn={!isInvitationOpened} name={name} onOpenInvitation={handleOpenInvitation} />
          <Introduction currentUser={currentUser} isVisible={isIntroductionVisible} />
          <Greeting currentUser={currentUser} />
          <Bride currentUser={currentUser} />
          <Groom currentUser={currentUser}/>
          <CountDown currentUser={currentUser} />
          <Place currentUser={currentUser} />
          <Place2 currentUser={currentUser} />
          <Story currentUser={currentUser} />
          <Album currentUser={currentUser} />
          <Gift currentUser={currentUser}/>
          <Closing currentUser={currentUser}  name={name}/>

          
        </div>
      </div>
    </div>
  );
}

interface CoverProps {
  currentUser: BridalCouple | null;
  showBtn: boolean;
  name: string;
  onOpenInvitation: () => void;
}

function Cover({ currentUser, showBtn, name, onOpenInvitation }: CoverProps) {
  return (
    <div className="flex justify-center items-center relative min-h-screen w-[500px] flex-col bg-[url('/template2/bg-phone-navy.png')] justify-center pb-10 text-2xl overflow-hidden">      <div className="flex flex-col items-center">
        <div className="mt-5 z-10">
          <p className={`text-[#D9C7A4] text-3xl ${playball.className}`}>The Wedding of</p>
        </div>

        <div className="mt-2 z-10">
          <p className={`text-5xl text-[#D9C7A4] border-sm underline decoration-[#D9C7A4] ${playball.className}`}>{currentUser?.nicknameMale} & {currentUser?.nicknameFemale} </p>
        </div>
      </div>

      
      <motion.img
        className="w-[300px] object-cover top-1/2 mt-5"
        src="/template2/circular1.png"
        alt=""
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      />
      <img
        className="absolute w-[180px] h-[270px] border-4 border-[#D9C7A4] rounded-t-full rounded-b-2xl object-cover top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%] z-20" // Menggunakan translate-x dan translate-y untuk memusatkan gambar
        src="/pasangan/1/4.jpeg" // Ganti dengan path gambar pengantin
        alt="Pengantin"
      />

      <div className="flex flex-col items-center ">
        <div className="mt-16 z-10">
          <p className="text-xl font-bold text-[#D9C7A4] underline">Dear</p>
        </div>

        <div className="mt-0 z-10">
          <p className="text-2xl font-bold text-[#D9C7A4]">{name}</p>
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

   
      </div>
    </div>
  );
}



interface IntroductionProps {
  currentUser: BridalCouple | null;
  isVisible: boolean;
}
function Introduction({ currentUser, isVisible }: IntroductionProps) {
  const images = [
    "/pasangan/1/4.jpeg",
    "/pasangan/1/3.jpeg",
    "/pasangan/1/2.jpeg",
    // Jika ada gambar tambahan, tambahkan di sini
  ];

  // Fungsi untuk menduplikasi gambar hingga total menjadi 6 gambar
  const duplicateImages = (imgs: string[]) => {
    const duplicatedImages = [...imgs];
    while (duplicatedImages.length < 20) {
      duplicatedImages.push(...imgs);
    }
    return duplicatedImages.slice(0, 6);
  };

  const finalImages = duplicateImages(images);

  return (
    <div id="introduction" className={`relative min-h-screen w-[500px] flex flex-col bg-[url('')] text-2xl overflow-hidden snap-center ${isVisible ? 'animate-fade-up' : ''} bg-[url(/template2/bg-phone-navy.png)]`}>
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
            height:360px;
            animation: slide 90s linear infinite;
          }

          .slider img {
            width: 240px;
            height: 360px;
            object-fit: cover;
            flex-shrink: 0;
          }
        `}
      </style>

      <div className="relative basis-2/3 flex-shrink-0 flex-grow-0 overflow-hidden">
        <div className="slider h-full gap-1">
          {finalImages.map((src, index) => (
            <img key={index} className="object-cover" src={src} alt="" />
          ))}
        </div>
      </div>
      
      <motion.div 
        className="z-10 basis-1/3  relative flex flex-col items-center justify-center mt-10 md:my-5 px-5 "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay:0.4 }}
        >
        <IoIosHeart className="text-red-700 animate-pulse"/>
        <div className="absolute h-20 w-64 bottom-20 right-0 items-center opacity-40 ">
          <motion.img 
            src="/template2/circular2.png" alt="" 
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          />
        </div>
        <div className="absolute h-20 w-64 bottom-20 left-0 items-center opacity-40 ">
          <motion.img 
            src="/template2/circular2.png" alt="" 
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          />
        </div>


        <h2 className={`text-[#D9C7A4] text-2xl font-bold ${bilbo.className}`}>We Found Love !</h2>
        <p className={`text-gray-100 text-sm mx-10 mt-3 text-center`}> "Dan di antara tanda-tanda kekuasaan-Nya diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri supaya kamu dapat ketenangan hati dan dijadikannya kasih sayang di antara kamu. Sesungguhnya yang demikian menjadi tanda-tanda kebesaran-Nya bagi orang-orang yang berpikir."</p>
        <p className={`text-gray-100 text-xs mx-3 my-3 text-center`}>- Q.S. Ar-Rum: 21 -</p>
      </motion.div>
    </div>
  );
}
const Greeting = ({ currentUser }: { currentUser: BridalCouple| null }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return(
    <div  className="min-h-[500px] h-[700px] relative w-[500px] flex flex-col bg-[url('/template2/bg-phone-navy.png')] items-center justify-center bg-white text-2xl snap-start snap-always ">
      <motion.div 
        ref={ref}
        className="flex flex-col items-center justify-center z-10 bg-[url(/stripes.svg)]"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
        >
        <div className="mt-10 z-10">
          <p className={`text-[#D9C7A4] text-2xl ${playball.className}`}>We Are Getting Married</p>
        </div>

        <div className="mt-2 z-10">
          <p className={`text-4xl text-[#D9C7A4] border-sm underline decoration-gray-600 ${playball.className}`}>{currentUser?.nicknameMale} & {currentUser?.nicknameMale}</p>
        </div>

        <div className="mt-3 z-10 px-5 py-2 bg-white rounded-full animate-bounce">
          <p className={`text-[#D9C7A4] text-xl ${playball.className} animate-bounce`}>
            Sabtu, 20 Juli 2024
          </p>
        </div>

        <div>
          <p className={`text-[#D9C7A4] text-lg mx-10 mt-3  text-center  `}>
          Assalamu’alaikum Wr. Wb.
          Dengan memohon rahmat dan ridho Allah
          Subhanahu Wa Ta’ala, InsyaaAllah kami akan menyelenggarakan acara pernikahan :
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

const Bride = ({ currentUser }: { currentUser: BridalCouple| null }) =>  {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="min-h-screen relative w-[500px] flex flex-col justify-between bg-[url('/template2/bg-phone-navy.png')] items-center bg-white text-2xl snap-start snap-always ">
      <motion.div 
        className="w-64 h-72 p-3 rounded-t-full rounded-b-xl mt-6 ml-36  mb-4 z-10 bg-gradient-to-t from-slate-50 to-orange-200"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
      >
        <div className="overflow-hidden rounded-t-full rounded-b-2xl">
          <img 
            src="/template1/pasangan/pasangan1_female.jpeg" 
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
        <p className={`text-4xl font-bold text-[#D9C7A4] ${bilbo.className}`}>{currentUser?.fullnameFemale}</p>
        <p className={`text-sm text-[#D9C7A4] mt-8 md:mt-5 lg:mt-3`}>Putri dari </p>
        <div className="flex flex-col items-center px-3 py-2 bg-cyan-100 bg-opacity-10 md:bg-opacity-20 rounded">
          <p className={`text-2xl font-bold text-[#D9C7A4]  ${bilbo.className}`}>Bapak {currentUser?.dadFemale} <hr /> </p>
          <p className={`text-2xl font-bold text-[#D9C7A4]  ${bilbo.className}`}>Ibu {currentUser?.momFemale} </p>
        </div>
      </motion.div>
      <div>

      <motion.img 
          className="min-h-screen w-[250px] absolute bottom-10 left-5 object-contain animate-pulse" 
          src="/template2/circular3.png" 
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          alt="" />       
      </div>
      <div className="">

        <img className=" w-[500px] absolute top-0 left-0 object-contain " src="/template2/line2.png" alt="" />
      </div>

    </div>
  );
}


const Groom = ({ currentUser }: { currentUser: BridalCouple| null }) =>  {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="min-h-screen relative w-[500px] flex flex-col bg-[url('/template2/bg-phone-navy.png')] items-center bg-white text-2xl snap-start snap-always ">
      <motion.div 
        className="w-64 h-72 p-3 rounded-t-full rounded-b-xl mt-6 mr-36  mb-4 z-10 bg-gradient-to-t from-slate-50 to-orange-200"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
        >
        <div className="overflow-hidden rounded-t-full rounded-b-2xl">
          <img 
            src="/template1/pasangan/pasangan1_male.jpeg" 
            alt="Pengantin Wanita" 
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
        <p className={`text-4xl font-bold text-[#D9C7A4] ${bilbo.className}`}>Romeo Widjaya Kusuma</p>
        <p className={`text-sm text-[#D9C7A4] mt-8 md:mt-5 lg:mt-3`}>Putra dari </p>
        <div className="flex flex-col items-center px-3 py-2 bg-cyan-100 bg-opacity-10 md:bg-opacity-20 rounded">
          <p className={`text-2xl font-bold text-[#D9C7A4]  ${bilbo.className}`}>Bapak ir.H.Joko Hadi Koesuma <hr /> </p>
          <p className={`text-2xl font-bold text-[#D9C7A4]  ${bilbo.className}`}>Ibu Sri Rejeki </p>
        </div>
      </motion.div>
      <div>

        <motion.img 
          className="min-h-screen w-[250px] absolute bottom-10  object-contain animate-pulse" 
          src="/template2/ciruclar5.png" 
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          alt="" />

      </div>
      <div className="">

        <img className=" w-[500px] absolute top-0 left-0 object-contain " src="/template2/line2.png" alt="" />
      </div>
    </div>
  );
}

const CountDown: React.FC<{ currentUser: BridalCouple | null }> = ({ currentUser })=> {
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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (

    <div className="min-h-screen w-[500px] flex flex-col bg-[url('/template2/bg-phone-navy.png')] items-center justify-center  text-2xl snap-start snap-always">
      <motion.div 
        ref={ref} className="div"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 6 }}
      >
        <img className="animate-pulse h-36 " src="/template2/element3.png" alt="" />

      </motion.div>
      <motion.div ref={ref}  className="mt-2 z-10 px-5"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
      >
        <p className={`text-4xl text-[#D9C7A4] border-sm underline decoration-gray-600 ${playball.className}`}>Menghitung Hari</p>
      </motion.div>
      <motion.div ref={ref}  className=" z-10 mt-5 mx-20 py-2 items-center"
          initial={{ opacity: 0,  x:-100 }}
          animate={isInView ? { opacity: 1, y: 0, x:0} : {}}
          transition={{ 
            ease: "linear",
            duration: 3,
            x: { duration: 1 }
          }}
      >
        <p className={`text-lg text-[#D9C7A4] text-center    `}>
          Siang dan malam berganti begitu cepat, diantara saat saat mendebarkan yang belum pernah kami rasakan sebelum nya. 
          kami nantikan kehadiran para keluarga dan sahabat, untuk menjadi saksi ikrar janji suci kami di hari yang bahagia :
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
          <span className="text-[#D9C7A4]">Waktu pernikahan sudah tiba!</span>
        )}
      </motion.div>

      <div className="w-[500px] relative">
        <img className="min-h-screen w-[500px] absolute bottom-0 left-0 object-contain animate-pulse" src="/template1/15.png" alt="" />
      </div>
    </div>
  );
};



const Place = ({ currentUser }: { currentUser: BridalCouple| null }) =>  {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="min-h-screen relative w-[500px] text-2xl bg-[url('/template2/bg-phone-navy.png')] flex flex-col justify-center gap-10 items-center">
      <div className="relative w-[500px] h-[95%]">
        <img src="/template2/bg-akad.jpeg" className="w-full h-full object-cover" alt="" />
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
        className="absolute text-center flex flex-col items-center justify-center mt-10 gap-3 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
      >
        <div className="z-10">
          <p className={`text-gray-700 text-5xl ${playball.className}`}>Akad</p>
        </div>

        <div className="z-10 mt-4 gap-2 flex flex-col items-center ">
          <p className="text-gray-700 text-4xl">Sabtu</p>
          <p className="text-gray-700 text-8xl font-bold">20</p>
          <p className="text-gray-700 text-3xl">Juli 2024</p>
          <p className="text-gray-700 text-2xl mt-2">Pukul: 08.00 WIB</p>
          <p className="text-gray-700 text-2xl ">||</p>
          <p className="text-gray-700 text-2xl ">Bertempat di:</p>
          <div className="mx-12 bg-white rounded-lg items-center py-1 px-4">
            <p className="text-gray-800 text-lg mt-2">Kediaman Mempelai Wanita, Ajibarang wetan Rt 02 Rw 12</p>
          </div>
        </div>
        <div>
          <a target="_blank" rel="noopener noreferrer" href="https://maps.google.com/maps?q=Ajibarang%20wetan%20Rt%2002%20Rw%2012&t=&z=13&ie=UTF8&iwloc">
            <div className="bg-white opacity-80 hover:opacity-100 hover:scale-110 px-4 py-2 rounded-lg shadow-lg hover:shadow-2xl shadow-cyan-600 hover:shadow-cyan-700 cursor-pointer">
                  <p className="text-sm text-gray-800 ">Buka Maps</p>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

const Place2 = ({ currentUser }: { currentUser: BridalCouple| null }) =>  {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="min-h-screen relative w-[500px] text-2xl bg-[url('/template2/bg-phone-navy.png')] flex flex-col justify-center gap-10 items-center">
      <div className="relative w-[500px] h-[95%]">
        <img src="/template2/bg-resepsi.jpeg" className="w-full h-full object-cover" alt="" />
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
        className="absolute text-center flex flex-col items-center justify-center mt-10 gap-3 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 4 }}
      >
        <div className="z-10">
          <p className={`text-white text-5xl ${playball.className}`}>Resepsi Pernikahan</p>
        </div>

        <div className="z-10 mt-4 gap-2 flex flex-col items-center ">
          <p className="text-white text-4xl">Minggu</p>
          <p className="text-white text-8xl font-bold">21</p>
          <p className="text-white text-3xl">Juli 2024</p>
          <p className="text-white text-2xl mt-2">Pukul: 08.00 WIB</p>
          <p className="text-white text-2xl ">||</p>
          <p className="text-white text-2xl ">Bertempat di:</p>
          <div className="mx-12 bg-white rounded-lg items-center py-1 px-4">
            <p className="text-gray-800 text-lg mt-2">Kediaman Mempelai Wanita, Ajibarang wetan Rt 02 Rw 12</p>
          </div>
        </div>
        <div>
          <a target="_blank" rel="noopener noreferrer" href="https://maps.google.com/maps?q=Ajibarang%20wetan%20Rt%2002%20Rw%2012&t=&z=13&ie=UTF8&iwloc">
            <div className="bg-white opacity-80 hover:opacity-100 hover:scale-110 px-4 py-2 rounded-lg shadow-lg hover:shadow-2xl shadow-cyan-600 hover:shadow-cyan-700 cursor-pointer">
                  <p className="text-sm text-gray-800 ">Buka Maps</p>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}


const Story = ({ currentUser }: { currentUser: BridalCouple| null }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return(
    <div className="min-h-screen relative w-[500px] text-2xl  flex flex-col justify-start items-center bg-[url('/template2/bg-phone-navy.png')]">
      <motion.div 
      className="px-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay:0.4 }}>
        <h2 className={`text-3xl font-bold text-center mt-5 text-[#D9C7A4] ${bilbo.className}`}>Story</h2>
        <p className={`text-sm text-center mt-2 text-[#D9C7A4] mx-3 `}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil pariatur amet consequuntur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </motion.div>

      <div className="z-20">
        <motion.img
          className="w-[200px] object-cover bottom-0 rounded-xl mt-5"
          src="/pasangan/1/4.jpeg"
          alt=""
          // animate={{ rotate: 360 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay:0.4 }}
        />      
      </div>

      <div className="absolute h-20  bottom-1/2  right-0 items-center opacity-40 ">
          <motion.img 
            className="h-20"
            src="/template2/circular3.png" alt="" 
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          />
        </div>
        <div className="absolute h-20 w-64 bottom-1/2 left-0 items-center opacity-40 ">
          <motion.img 
            className="h-20"
            src="/template2/circular3.png" alt="" 
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          />
        </div>

      <div className="absolute h-20  bottom-0  right-0 items-center opacity-40 ">
          <motion.img 
            className="h-20"
            src="/template2/circular3.png" alt="" 
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          />
        </div>
        <div className="absolute h-20 w-64 bottom-0 left-0 items-center opacity-40 ">
          <motion.img 
            className="h-20"
            src="/template2/circular3.png" alt="" 
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          />
        </div>
    </div>
    
  )
}

const Album = ({ currentUser }: { currentUser: BridalCouple| null }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return(
    <div className="min-h-screen relative w-[500px] text-2xl  flex flex-col justify-start items-center bg-[url('/template2/bg-phone-navy.png')]">

      <div className="my-4">
        <h2 className={`${bilbo.className} text-6xl text-[#D9C7A4]`}>Album</h2>
      </div>
      

    <div className="grid grid-cols-2 gap-4 px-3 py-1">
        <div>
            <motion.img        
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay:0.4 }}
              className=" rounded h-[270px] w-[180px] md:h-[320px] md:w-[213px]" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
        </div>
        <div>
            <motion.img        
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay:0.4 }}
              className=" rounded h-[270px] w-[180px] md:h-[320px] md:w-[213px]" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
        </div>
        <div>
            <motion.img        
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay:0.4 }}
              className=" rounded h-[270px] w-[180px] md:h-[320px] md:w-[213px]" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
        </div>
        <div>
            <motion.img        
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay:0.4 }}
              className=" rounded h-[270px] w-[180px] md:h-[320px] md:w-[213px]" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
        </div>
        <div>
            <motion.img        
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay:0.4 }}
              className=" rounded h-[270px] w-[180px] md:h-[320px] md:w-[213px]" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
        </div>
        <div>
            <motion.img        
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay:0.4 }}
              className=" rounded h-[270px] w-[180px] md:h-[320px] md:w-[213px]" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
        </div>
   
    </div>

    </div>
  )
}

const Gift = ({ currentUser }: { currentUser: BridalCouple| null }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const handleCopy = () => {
    const accountNumber = "18928199201";
    navigator.clipboard.writeText(accountNumber).then(() => {
      toast('Nomor Rekening Berhasil Disalin!', {
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
    }).catch(err => {
      console.error('Gagal menyalin teks: ', err);
    });
  };

  return(
    <div className="min-h-screen relative w-[500px] text-2xl bg-[url('/template2/bg-phone-navy.png')] md:py-10 flex flex-col justify-center items-center">
      <motion.div 
        className="px-16 mb-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay:0.4 }}
      >
        <h2 className={`${bilbo.className} text-6xl font-bold text-center text-[#D9C7A4]`}>Titip Hadiah</h2>
        <p className="text-center text-[#D9C7A4] text-sm">Doa restu Bapak/Ibu sekalian merupakan karunia yang sangat berarti bagi kami. Dan jika memberi merupakan ungkapan tanda kasih, Bapak/Ibu dapat memberi kado secara cashless. Terima kasih</p>
      </motion.div>

      <motion.div 
        className="rounded relative w-[330px] h-[220px] mt-5 mx-10 md:mx-5 bg-[url('/template2/card-pink.png')] bg-cover flex flex-col justify-center items-center gap-5 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay:0.4 }}
        >
          <h2 className=" absolute font-bold top-[15px] right-[25px] ">Mandiri</h2>
          <h2 className=" absolute text-lg bottom-[60px] left-[25px]">Romoe Mariona</h2>
          <h2 className=" absolute font-bold bottom-[25px] left-[25px] ">18928199201</h2>
          <button
          onClick={handleCopy}
          className="absolute bottom-[25px] right-[25px] bg-gray-300 scale-75 text-white p-3 rounded-full shadow-md hover:bg-gray-400 transition"
        >
          <FaCopy />
        </button>
      </motion.div>

      <motion.div 
        className="rounded relative w-[330px] h-[220px] mt-5 mx-10 md:mx-5 bg-[url('/template2/card-pink.png')] bg-cover flex flex-col justify-center items-center gap-5 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay:0.4 }}
        >
          <h2 className=" absolute font-bold top-[15px] right-[25px] ">BNI</h2>
          <h2 className=" absolute text-lg bottom-[60px] left-[25px]">Julieta Azizah</h2>
          <h2 className=" absolute font-bold bottom-[25px] left-[25px] ">2106750364</h2>
          <button
          onClick={handleCopy}
          className="absolute bottom-[25px] right-[25px] bg-gray-300 scale-75 text-white p-3 rounded-full shadow-md hover:bg-gray-400 transition"
        >
          <FaCopy />
        </button>
      </motion.div>
 
    </div>
  );
}
interface Expression {
  name: string;
  expression: string;
  time: string;
}

const Closing = ({ currentUser, name }: { currentUser: BridalCouple | null, name: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [message, setMessage] = useState("");
  const [ucapan, setUcapan] = useState<Expression[]>([]);
  const [attendance, setAttendance] = useState("bisa-hadir");
  const colors = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#1A535C", "#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1", "#034F84"];

  const getColor = (name) => {
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleAttendanceConfirmation = async () => {
    toast("Mengirim Konfirmasi Kehadiran....", {
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
    try {
      const response = await fetch('/api/saveConfirmationData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          type: attendance,
          weddingId: currentUser?.id,
        }),
      });

      if (response.ok) {
        toast.success('Konfirmasi Kehadiran Berhasil Dikirim!', {
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
      } else {
        console.error("Gagal menyimpan konfirmasi kehadiran");
        toast("Gagal menyimpan konfirmasi kehadiran, silakan coba lagi.", {
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
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      toast("Gagal menyimpan konfirmasi kehadiran, silakan coba lagi.", {
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
  };

  const handleSendGreeting = async () => {
    if (message.trim() === "") {
      toast('Anda belum menulis ucapan!', {
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
      return;
    }
    toast("Mengirim Ucapan...", {
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

    try {
      const response = await fetch('/api/saveExpressionData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          expression: message,
          weddingId: currentUser?.id,
        }),
      });

      if (response.ok) {
        const newGreeting = {
          name,
          expression: message,
          time: new Date().toLocaleString(),
        };
        setUcapan((prevUcapan) => [newGreeting, ...prevUcapan]);
        setMessage(""); // Reset text field setelah pengiriman
        toast.success('Ucapan Anda Berhasil Dikirim!', {
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
      } else {
        console.error("Gagal mengirim ucapan");
        toast('Gagal mengirim ucapan, silakan coba lagi!', {
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
    } catch (error) {
      console.error("Terjadi kesalahan:", error);      
      toast.error('Terjadi kesalahan, coba beberapa saat lagi', {
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
  };

  useEffect(() => {
    const fetchUcapan = async () => {
      try {
        const response = await fetch(`/api/getExpressionData?id=${currentUser?.id}`);
        const data = await response.json();
        setUcapan(data);
      } catch (error) {
        console.error('Error fetching ucapan:', error);
      }
    };

    fetchUcapan();
  }, [currentUser?.id]);

 
  return (
    <div className="min-h-screen relative w-[500px] text-2xl py-5 bg-[url('/template2/bg-phone-navy.png')] flex flex-col justify-start items-center">
      {/* Konfirmasi Kehadiran */}
      <div className="z-20">
        <h2 className="text-4xl mb-5 text-[#D9C7A4]">Konfirmasi Kehadiran</h2>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center z-20">
        <RadioGroup value={attendance} onValueChange={setAttendance}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="text-white" value="bisa-hadir" id="r1" />
            <Label className="text-white" htmlFor="r1">Bisa Hadir</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="text-white" value="belum-bisa-hadir" id="r2" />
            <Label className="text-white" htmlFor="r2">Belum Bisa Hadir</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="text-white" value="belum-tau" id="r3" />
            <Label className="text-white" htmlFor="r3">Belum Tau</Label>
          </div>
        </RadioGroup>
        <button
          onClick={handleAttendanceConfirmation}
          className="text-white px-3 py-1 text-sm rounded bg-[#D9C7A4] text-white hover:scale-105 cursor-pointer"
        >
          Konfirmasi
        </button>
      </div>

      {/* Form Ucapan */}
      <div className="z-20 mt-10">
        <h2 className="text-4xl mb-5 text-[#D9C7A4]">Kirim Ucapan</h2>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center z-20">
        <textarea
          className="w-[330px] h-[100px] p-10 text-sm text-black rounded focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis ucapan Anda di sini..."
        />
        <button
          onClick={handleSendGreeting}
          className="text-white px-3 py-1 text-sm rounded bg-[#D9C7A4] text-white hover:scale-105 cursor-pointer"
        >
          Kirim Ucapan
        </button>
      </div>

      <div className="mt-20 px-16 z-20">
        <h2 className="text-center text-[#D9C7A4] text-sm mx-10">Merupakan Suatu Kebahagiaan dan Kehormatan bagi Kami, Apabila Bapak/Ibu/Saudara/i, Berkenan Hadir di Acara kami</h2>
        <h2 className={`${bilbo.className} text-5xl text-center text-[#D9C7A4] mt-5`}>{currentUser?.nicknameMale} & {currentUser?.nicknameFemale}</h2>
      </div>

      <div className="">

        <img className=" w-[200px] absolute bottom-0 right-[-80px] object-contain animate-pulse " src="/template2/flower1.png" alt="" />
        <img className=" w-[200px] absolute top-0 left-0 object-contain animate-pulse" src="/template2/flower1.png" alt="" />
      </div>

      {/* Daftar Ucapan */}
      <div className="px-16 mb-10 md:px-10 mt-12 ">
        <h2 className="text-3xl text-[#D9C7A4]  mb-10 text-center">Ucapan :</h2>
        <ScrollArea className="h-[200px] md:h-[300px] fixed ">
          {ucapan.map((guest, index) => (
            <div key={index} className="flex gap-5 items-start px-5">
              <div className=" basis-1/5">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white text-sm"
                  style={{ backgroundColor: getColor(guest.name) }}
                  >
                  {guest.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
              </div>
              <div className="flex flex-col justify-start gap-1 basis-4/5">
                <div className="font-semibold text-white text-xl">{guest.name}</div>
                <div className="text-sm text-gray-300  text-wrap">{guest.expression}</div>
                <div className="text-xs text-gray-500">{guest.time}</div> {/* Waktu pengiriman pesan */}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <ToastContainer
            position="top-right"
            className="text-sm"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
    </div>
  );
}

export default HeritageOfIndonesiaNavy;

