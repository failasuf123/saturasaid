"use client";

import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from '@clerk/nextjs';
import {formSchema, imageSchema} from '@/app/create/backend/FormSchema'
import { initialFormValues, initialImageValues } from "@/app/create/backend/InitialValue";
import { saveWeddingClient } from "@/app/create/backend/SaveWeddingClient";
import { saveImageClient } from "@/app/create/backend/SaveImageClient";
import {z} from 'zod'
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { UploadDropzone } from "@/app/utils/uploadthing";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { IntroductionList } from '@/shared/Choose/IntroductionList';
import { GreetingList} from '@/shared/Choose/GreetingList';
import { HookMiddleList} from '@/shared/Choose/HookMiddleList';
import { StoryList} from '@/shared/Choose/StoryList';
import { ClosingList} from '@/shared/Choose/ClosingList'; 
import { MusicList} from '@/shared/Choose/MusicList'; 
import { removeImage } from "@/app/create/backend/RemoveImage";

import { FaImages } from "react-icons/fa";
import { CgTemplate } from "react-icons/cg";
import { PiHandHeartDuotone } from "react-icons/pi";
import { FaMusic } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from "next/navigation";
import Preview from "@/app/create/components/Preview";

type FormSchema = z.infer<typeof formSchema>;

function page({ params }: { params: { theme: string } }) {
  const { theme } = params; 
  const router = useRouter()
  const [formValues, setFormValues] = useState<FormSchema>(initialFormValues);
  const [formPreview, setFormPreview] = useState({
    id: "",
    nicknameMale: "",
    nicknameFemale: "",
    fullnameMale: "",
    fullnameFemale: "",
    dadMale: "",
    momMale: "",
    dadFemale: "",
    momFemale: "",
  
    accountName1: "",
    accountBank1: "",
    accountNumber1: "",
  
    accountName2: "",
    accountBank2: "",
    accountNumber2: "",
  
    event: "",
    address: "",
    gmap: "",
    time: new Date(),

    event2: "",
    address2: "",
    gmap2: "",
    time2: new Date(),
    isEvent2: true,
  
    introductionType: 1,
    greetingType: 1,
    hookMiddleType: 1,
    storyType: 1,
    closingType: 1,
  
    songType: 1,
  
    theme:"",
  
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPreview({ ...formPreview, [name]: value });
  };

  const [page2, setPage2] = useState(0);


  const [time, setTime] = useState<Date | undefined>(formValues.time)
  const [time2, setTime2] = useState<Date | undefined>(formValues.time2)
  const [isEvent2, setIsEvent2] = useState<boolean>(formValues.isEvent2)
  const [selectedIntroductionIndex, setSelectedIntroductionIndex] = useState<number | null>(null);
  const [selectedGreetingIndex, setSelectedGreetingIndex] = useState<number | null>(null);
  const [selectedHookMiddleIndex, setSelectedHookMiddleIndex] = useState<number | null>(null);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [selectedClosingIndex, setSelectedClosingIndex] = useState<number | null>(null);
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(null);

  const [imageUrlCover, setImageUrlCover] = useState<string>("");
  const [imageUrlMale, setImageUrlMale] = useState<string>("");
  const [imageUrlFemale, setImageUrlFemale] = useState<string>("");
  const [imageUrlAlbumList, setImageUrlAlbumList] = useState<string[]>([]);

  const [imageKeyCover, setImageKeyCover] = useState<string>("")
  const [imageKeyMale, setImageKeyMale] = useState<string>("")
  const [imageKeyFemale, setImageKeyFemale] = useState<string>("")
  const [imageKeyAlbumList, setImageKeyAlbumList] = useState<string[]>([])

  const { isLoaded, user } = useUser();
  const clerkUserId = user?.id ?? '';
  console.log("USER-CLERK",clerkUserId)
  
  const { register, handleSubmit: handleFormSubmit, setValue, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema), 
    defaultValues: formValues,
  });


  useEffect(() => {
    const uuidWedding = uuidv4();
    const idWedding = nanoid(12)
    
    console.log("Generated UUID:", uuidWedding);
    console.log("Generated NANO ID:", idWedding);
    setValue('userId', clerkUserId);
    setValue('time', time || new Date());
    setValue('time2', time2 || new Date());
    setValue('id', idWedding);
    setValue('isEvent2', isEvent2);
    setValue('theme', params.theme)
  }, [setValue, time,time2, isLoaded, clerkUserId, isEvent2]);

  useEffect(() => {
    setFormPreview(prevState => ({
      ...prevState,
      introductionType: selectedIntroductionIndex !== null ? selectedIntroductionIndex : 1,
      greetingType: selectedGreetingIndex !== null ? selectedGreetingIndex : 1,
      hookMiddleType: selectedHookMiddleIndex !=null ? selectedHookMiddleIndex:1,
      storyType: selectedStoryIndex !=null ? selectedStoryIndex:1,
      closingType: selectedClosingIndex !=null ? selectedClosingIndex:1,
      songType: selectedSongIndex !=null ? selectedSongIndex:1,
      isEvent2: isEvent2,
    }));
    console.log("IS EVENT 2 from USE EFFECT", isEvent2)
  }, [selectedIntroductionIndex, selectedGreetingIndex, selectedHookMiddleIndex, selectedStoryIndex, selectedSongIndex, isEvent2]);
  
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    toast('😜 Data Sedang Diproses', {
      position: "bottom-right", autoClose: 50000, hideProgressBar: true,
      closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
    });
    toast('🥰 Tunggu sebentar anda akan diarahkan kehalaman tamu', {
      position: "bottom-right", autoClose: 50000, hideProgressBar: true,
      closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
    });
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const value = data[key as keyof FormSchema];
      formData.append(key, value instanceof Date ? value.toISOString() : value.toString());
    });

    console.log("Form submitted, calling saveWedding...");
    const weddingResult = await saveWeddingClient(formData);
    console.log("Form data:", data);
    console.log("WEDDING RESULT", weddingResult);

    toast('🥰 Mempersiapkan Data', {
      position: "bottom-right", autoClose: 50000, hideProgressBar: true,
      closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
    });


    if (weddingResult && 'id' in weddingResult) {
      const imageData = [
        { url: imageUrlCover, type: 'cover', weddingId: weddingResult.id },
        { url: imageUrlMale, type: 'male', weddingId: weddingResult.id },
        { url: imageUrlFemale, type: 'female', weddingId: weddingResult.id },
        ...imageUrlAlbumList.map(url => ({ url, type: 'album', weddingId: weddingResult.id })),
      ];

      await Promise.all(imageData.map(img => saveImageClient(img)));
      console.log("IMAGE DATA:", imageData)
    } else {
      console.error("Wedding data was not saved correctly, missing id.");
    }


    router.push(`/dashboard/${data.id}`);
  };
  
  const handleAlertSubmit = () => {
    const form = document.querySelector('form');
    if (form) {
      form.requestSubmit();
    }
  };

  const handleRemoveImage = async(event,part:string) => {
    event.preventDefault();
    toast('Menghapus Gambar ...', {
      position: "bottom-right", autoClose: 2000, hideProgressBar: true,
      closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
      });
    console.log("Remove Image Called", part)
    if(part == "cover"){
        console.log("KEY Cover:", imageKeyCover )
        const res = await removeImage(imageKeyCover)
        setImageUrlCover("")
        setImageKeyCover("")
      }else if(part == "male"){
       console.log("KEY Male:", imageKeyMale )
       const res = await removeImage(imageKeyMale)
       setImageUrlMale("")
       setImageKeyMale("")
      }else if(part == "female"){
        console.log("KEY Female:", imageKeyFemale )
      const res = await removeImage(imageKeyFemale)
      setImageUrlFemale("")
      setImageKeyFemale("")     
    }
  }

  const hanldeRemoveAlbum = async(event) => {
    event.preventDefault();
    toast('Menghapus Seluruh Gambar Album ...', {
      position: "bottom-right", autoClose: 2000, hideProgressBar: true,
      closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
      });
    const res = await removeImage(imageKeyAlbumList)
    setImageUrlAlbumList([])
    setImageKeyAlbumList([])
  }

  const handleEventTwoChange = () => {
    setIsEvent2((prevIsEvent2) => !prevIsEvent2);
  };



  const renderSectionBridalData = () => {
    return(
      <>
      <div>
        <div className="flex flex-row w-full gap-2">
          <div className="mb-4 flex flex-col gap-2 basis-1/2">
            <label htmlFor="nicknameMale"  className="block text-xs font-medium text-gray-700 dark:text-gray-200">Nickname Mempelai Pria</label>
            <input {...register('nicknameMale')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {errors.nicknameMale && <span className="text-red-500 text-xs">{errors.nicknameMale.message}</span>}
          </div>
          <div className="mb-4 flex flex-col gap-2 basis-1/2">
            <label htmlFor="fullnameMale"  className="block text-xs font-medium text-gray-700 dark:text-gray-200">Nama Lengkap Mempelai Pria</label>
            <input {...register('fullnameMale')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {errors.fullnameMale && <span className="text-red-500 text-xs">{errors.fullnameMale.message}</span>}
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="dadMale" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Ayahanda Pengantin Pria</label>
          <input {...register('dadMale')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          {errors.dadMale && <span className="text-red-500 text-xs">{errors.dadMale.message}</span>}
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="momMale" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Ibunda Pengantin Pria</label>
          <input {...register('momMale')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          {errors.momMale && <span className="text-red-500 text-xs">{errors.momMale.message}</span>}
        </div>

        <hr className="font-bold text-lg my-8" />

        <div className="flex flex-row w-full gap-2 ">
          <div className="mb-4 flex flex-col gap-2 w-full basis-1/2">
            <label htmlFor="nicknameFemale" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Nickname Mempelai Wanita</label>
            <input {...register('nicknameFemale')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {errors.nicknameFemale && <span className="text-red-500 text-xs">{errors.nicknameFemale.message}</span>}
          </div>
          <div className="mb-4 flex flex-col gap-2 basis-1/2">
            <label htmlFor="fullnameFemale" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Nama Lengkap Mempelai Wanita</label>
            <input {...register('fullnameFemale')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {errors.fullnameFemale && <span className="text-red-500 text-xs">{errors.fullnameFemale.message}</span>}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="dadFemale" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Ayahanda Pengantin Wanita</label>
          <input {...register('dadFemale')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          {errors.dadFemale && <span className="text-red-500 text-xs">{errors.dadFemale.message}</span>}
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="momFemale" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Ibunda Pengantin Wanita</label>
          <input {...register('momFemale')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          {errors.momFemale && <span className="text-red-500 text-xs">{errors.momFemale.message}</span>}
        </div>
      </div>

      <hr className="font-bold text-lg my-8" />

        <h2>Acara 1</h2>
        <ScrollArea className="w-full h-full rounded-md border">
            <div className="flex flex-wrap w-max space-x-4 p-4 h-full gap-4">
              <div className="w-[330px]">
                <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="event" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Nama Event</label>
                  <input {...register('event')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  {errors.event && <span className="text-red-500 text-xs">{errors.event.message}</span>}
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="address" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Alamat</label>
                  <input {...register('address')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="gmap" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Link Gmap</label>
                  <input {...register('gmap')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  {errors.gmap && <span className="text-red-500 text-xs">{errors.gmap.message}</span>}
                </div>

              </div>

              <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="time" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Waktu Kegiatan</label>

                <Calendar mode="single" selected={time} onSelect={setTime} className="rounded-md border shadow" />
                {errors.time && <span className="text-red-500 text-xs">{errors.time.message}</span>}
              </div>
            <ScrollBar orientation="horizontal" />
            </div>
          </ScrollArea>

      <hr className="font-bold text-lg my-8" />

        <h2>Acara 2</h2>
        <ScrollArea className="w-full h-full rounded-md border">
          <div>
            <label>
              Apakah Acara Kedua Tidak Diperlukan?
              <input
                type="checkbox"
                checked={!isEvent2} // Jika isEvent2 true, maka checkbox tidak tercentang (unchecked)
                onChange={handleEventTwoChange}
              />
            </label>
          </div>
            <div className="flex flex-wrap w-max space-x-4 p-4 h-full gap-4">
              <div className="w-[330px]">
                <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="event2" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Nama Event</label>
                  <input {...register('event2')}  disabled={!isEvent2} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  {errors.event2 && <span className="text-red-500 text-xs">{errors.event2.message}</span>}
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="address2"  className="block text-xs font-medium text-gray-700 dark:text-gray-200">Alamat</label>
                  <input {...register('address2')}  disabled={!isEvent2} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  {errors.address2 && <span className="text-red-500 text-xs">{errors.address2.message}</span>}
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <label htmlFor="gmap2" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Link Gmap</label>
                  <input {...register('gmap2')} disabled={!isEvent2}  onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  {errors.gmap2 && <span className="text-red-500 text-xs">{errors.gmap2.message}</span>}
                </div>

              </div>

              <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="time2" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Waktu Kegiatan</label>

                <Calendar mode="single" disabled={!isEvent2} selected={time2} onSelect={setTime2} className="rounded-md border shadow" />
                {errors.time2 && <span className="text-red-500 text-xs">{errors.time2.message}</span>}
              </div>
            <ScrollBar orientation="horizontal" />
            </div>
          </ScrollArea>

          <hr className="font-bold text-lg my-8" />

  
          <h2 className="text-lg font-bold text-gray-800 text-center">Lorem ipsum dolor sit am</h2>
              <p className="text-xs text-center text-gray-500 my-5 dark:text-gray-200">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error maxime sapiente cum ullam nam sequi, pariatur, repudiandae eum illum deleniti dolorem saepe.</p>
              <ScrollArea>

              <div className="flex flex-wrap w-max space-x-4 p-4 h-full gap-4">
                <div className="w-[300px]">
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="placeEvent" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Atas Nama Rekening 1</label>
                    <input {...register('accountName1')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountName1 && <span className="text-red-500 text-xs">{errors.accountName1.message}</span>}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="accountBank1" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Bank 1</label>
                    <input {...register('accountBank1')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountBank1 && <span className="text-red-500 text-xs">{errors.accountBank1.message}</span>}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="gmap" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Nomor Rekening 1</label>
                    <input {...register('accountNumber1')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountNumber1 && <span className="text-red-500 text-xs">{errors.accountNumber1.message}</span>}
                  </div>

                </div>

                <div className="w-[300px]">
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="accountName2" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Atas Nama Rekening 2</label>
                    <input {...register('accountName2')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountName2 && <span className="text-red-500 text-xs">{errors.accountName2.message}</span>}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="accountBank2" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Bank 2</label>
                    <input {...register('accountBank2')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountBank2 && <span className="text-red-500 text-xs">{errors.accountBank2.message}</span>}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="accountNumber2" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Nomor Rekening 2</label>
                    <input {...register('accountNumber2')} onChange={handleChange} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountNumber2 && <span className="text-red-500 text-xs">{errors.accountNumber2.message}</span>}
                  </div>

                </div>


              </div>
              <ScrollBar orientation="horizontal" />

              </ScrollArea>

      </>
    )  };

  const renderSectionWordsTemplate = () => {
    return(
      <>
        <div className="mb-4 flex flex-col gap-2 py-3 px-5 justify-between items-center h-2/3">
          <div className="font-bold text-lg">
              1. Pembukaan
          </div>
          <div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error aut, quae dolor quo iusto pariatur. 
                  Doloribus nostrum est dolor? Excepturi illo corporis asperiores. Qui dolorem est error, suscipit odit
                  commodi exercitationem impedit tempora?
              </p>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 justify-between items-center h-2/3">
          <div>
            <label htmlFor="template_introductionType" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Pilih Pembukaan undangan</label>
          </div>
            <div className="grid gap-4 mt-5">
                <ScrollArea className="w-[480px] h-full rounded-md border">
                    <div className="flex flex-wrap w-max space-x-4 p-4 h-full">
                        {IntroductionList.map((intro, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                  setValue('introductionType', intro.type);
                                  setSelectedIntroductionIndex(index);

                              }}                                         
                              className={`h-72 w-96 p-4 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedIntroductionIndex === index ? 'bg-gray-800 ' : ''}`}     
                                >
                                <div className="font-bold text-center">{index + 1}.Tema {intro.banner}</div>
                                <div className="italic text-center my-2">{intro.isi}</div>
                                <div className="text-sm text-gray-500 text-center">{intro.sumber}</div>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            {errors.introductionType && <span className="text-red-500 text-xs">{errors.introductionType.message}</span>}
        </div>

        <div className="mb-4 flex flex-col gap-2 py-3 px-5 justify-between items-center h-2/3">
          <div className="font-bold text-lg">
              2. Salam
          </div>
          <div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error aut, quae dolor quo iusto pariatur. 
                  Doloribus nostrum est dolor? Excepturi illo corporis asperiores. Qui dolorem est error, suscipit odit
                  commodi exercitationem impedit tempora?
              </p>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 justify-between items-center">
            <label htmlFor="template_greetingType" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Pilih Salam undangan</label>
            <div className="grid gap-4 mt-5">
                <ScrollArea className="w-96 h-72 rounded-md border">
                    <div className="flex flex-wrap w-max space-x-4 p-4">
                        {GreetingList.map((greeting, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                  setValue('greetingType', greeting.type);
                                  setSelectedGreetingIndex(index)
                                  
                                }}      
                                className={`h-72 w-96 p-4 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedGreetingIndex === index ? 'bg-gray-800 ' : ''}`}                                        
                                >
                                <div className="font-bold text-center">{index + 1}.Tema {greeting.banner}</div>
                                <div className="italic text-center my-2">{greeting.isi}</div>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            {errors.greetingType && <span className="text-red-500 text-xs">{errors.greetingType.message}</span>}
        </div>

        <div className="mb-4 flex flex-col gap-2 py-3 px-5 justify-between items-center h-2/3">
            <div className="font-bold text-lg">
                3. Ucapan Pertengahan
            </div>
            <div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error aut, quae dolor quo iusto pariatur. 
                    Doloribus nostrum est dolor? Excepturi illo corporis asperiores. Qui dolorem est error, suscipit odit
                    commodi exercitationem impedit tempora?
                </p>
            </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 justify-between items-center">
            <label htmlFor="template_hookMiddle" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Pilih Ucapan Pertengahan undangan</label>
            <div className="grid gap-4 mt-5">
                <ScrollArea className="w-96 h-72 rounded-md border">
                    <div className="flex flex-wrap w-max space-x-4 p-4">
                        {HookMiddleList.map((hook, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                  setValue('hookMiddleType', hook.type);
                                  setSelectedHookMiddleIndex(index);
                                }}           
                                className={`h-72 w-96 p-4 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedHookMiddleIndex === index ? 'bg-gray-800 ' : ''}`}                                        
                            >
                                <div className="font-bold text-center">{index + 1}.Tema {hook.banner}</div>
                                <div className="italic text-center my-2">{hook.isi}</div>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            {errors.hookMiddleType && <span className="text-red-500 text-xs">{errors.hookMiddleType.message}</span>}
        </div>

        <div className="mb-4 flex flex-col gap-2 py-3 px-5 justify-between items-center h-2/3">
            <div className="font-bold text-lg">
                4. Story
            </div>
            <div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error aut, quae dolor quo iusto pariatur. 
                    Doloribus nostrum est dolor? Excepturi illo corporis asperiores. Qui dolorem est error, suscipit odit
                    commodi exercitationem impedit tempora?
                </p>
            </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 justify-between items-center">
            <label htmlFor="template_storyType" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Pilih Story undangan</label>
            <div className="grid gap-4 mt-5">
                <ScrollArea className="w-96 h-72 rounded-md border">
                    <div className="flex flex-wrap w-max space-x-4 p-4">
                        {StoryList.map((story, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                  setValue('storyType', story.type);
                                  setSelectedStoryIndex(index)
                                }}
                                className={`h-72 w-96 p-4 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedStoryIndex === index ? 'bg-gray-800 ' : ''}`}                                        
                            >
                                <div className="font-bold text-center">{index + 1}.Tema {story.banner}</div>
                                <div className="italic text-center my-2">{story.isi}</div>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            {errors.storyType && <span className="text-red-500 text-xs">{errors.storyType.message}</span>}
        </div>


        <div className="mb-4 flex flex-col gap-2 py-3 px-5 justify-between items-center h-2/3">
            <div className="font-bold text-lg">
                5. Penutup
            </div>
            <div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error aut, quae dolor quo iusto pariatur. 
                    Doloribus nostrum est dolor? Excepturi illo corporis asperiores. Qui dolorem est error, suscipit odit
                    commodi exercitationem impedit tempora?
                </p>
            </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 justify-between items-center">
            <label htmlFor="template_closingType" className="block text-xs font-medium text-gray-700 dark:text-gray-200">Pilih Penutup undangan</label>
            <div className="grid gap-4 mt-5">
                <ScrollArea className="w-96 h-72 rounded-md border">
                    <div className="flex flex-wrap w-max space-x-4 p-4">
                        {ClosingList.map((closing, index) => (
                            <div
                                key={index}
                                onClick={() => 
                                  {
                                    setValue('closingType', closing.type);
                                    setSelectedClosingIndex(index);
                                  }}                                         
                                  className={`h-72 w-96 p-4 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedClosingIndex === index ? 'bg-gray-800 ' : ''}`}                                        
                                  >
                                <div className="font-bold text-center">{index + 1}.Tema {closing.banner}</div>
                                <div className="italic text-center my-2">{closing.isi}</div>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            {errors.closingType && <span className="text-red-500 text-xs">{errors.closingType.message}</span>}
        </div>

      </>
    )
  };

  const renderSectionSong = () => {
    const instrumentalSongs = MusicList.filter(song => song.class === 'instrumental')
    const musicSongs = MusicList.filter(song => song.class === 'music')

    switch (page2) {
      case 0:
        return <></>
        case 1:
          return (
            <>
              <div className="grid gap-4 mt-5 w-full">
                <ScrollArea className="w-full h-72 rounded-md border">
                  <div className="flex flex-wrap w-max space-x-4 p-4">
                    {instrumentalSongs.map((song, index) => (
                      <div key={index}
                        onClick={() => {
                          setValue('songType', song.type);
                          setSelectedSongIndex(song.type);
                          }}                                       
                        className={`p-4 border rounded-md cursor-pointer hover:bg-gray-100 ${selectedSongIndex === index ? 'bg-red-800' : ''}`}
                      >
                        <img src={song.image} alt={song.name} className="w-full h-48 object-cover rounded-md" />
                        <div className="font-bold">{song.name}</div>
                        <div className="text-sm text-gray-500">{song.class}</div>
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </>
          )
        
      case 2:
        return (
          <>
          <div className="grid gap-4 mt-5 w-full">
            <ScrollArea className="w-full h-72 rounded-md border">
              <div className="flex flex-wrap w-max space-x-4 p-4 h-56 items-center">
                {musicSongs.map((song, index) => (
                  <div key={index} 
                    onClick={() => {
                      setValue('songType', song.type);
                      setSelectedSongIndex(song.type);
      
                    }}                                         
                    className={`p-4 border rounded-md cursor-pointer hover:bg-gray-100 hover:scale-95 ${selectedSongIndex === index ? 'bg-green-800 text-white hover:bg-green-800' : ''}`}
                    >
                    <img src={song.image} alt={song.name} className="w-full h-48 object-cover rounded-md" />
                    <div className="font-bold my-2">{song.name}</div>
                    <div className="mt-2">
                      {song.tag.map((tag, tagIndex) => (
                        <span key={tagIndex} className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </>
        )
      default:
        return null
    }
  }

  const renderSectionImage = () => {
    return(
      <div className="flex flex-col items-center gap-4">
        <div>
          <h2 className="font-bold text-xl my-5">Cover Undangan</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, ullam officia!</p>
          <UploadDropzone
            className="border-gray-600 dark:border-gray-100"
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              if (imageUrlCover !== "" && imageKeyCover !== "") {
                console.log("auto remove for", imageUrlCover, imageKeyCover);
                const res = await removeImage(imageKeyCover)
                // (event) => autoRemove(event, imageKeyCover);
              }
              setImageUrlCover(res[0].url);
              setImageKeyCover(res[0].key);
              console.log("Files: ", res);
              toast.success('Gambar Cover Selesai Diupload!', {
                position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
              });
            }}
            onUploadError={(error: Error) => {
              toast.error('Gambar Cover Gagal Diupload!', {
                position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
              });
            }}
          />



            <div className="mt-3">
              <p className="text-sm font-bold text-gray-600">Gambar Cover Undangan</p>
                {imageUrlCover.length ? (
                  <div className="relative mt-2">
                    <Image src={imageUrlCover} alt="image" width={300} height={200} />
                    <div
                      onClick={(event) => handleRemoveImage(event, "cover")}
                      className="absolute cursor-pointer bottom-1 right-1 px-1 py-1 text-2xl text-white bg-red-500 md:text-3xl active:scale-105 rounded-lg hover:bg-red-600"
                    >
                      <MdDeleteOutline />
                    </div>
                  </div>
                ) : null}
            </div>
        </div>

        <hr />

        <div>
          <h2 className="font-bold text-xl my-5">Foto Pengantin Pria</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, ullam officia!</p>       
             <UploadDropzone
                className="border-gray-600 dark:border-gray-100"
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
                  if (imageUrlMale !== "" && imageKeyMale !== "") {
                    console.log("auto remove for", imageUrlMale, imageKeyMale);
                    const res = await removeImage(imageKeyMale)
                  }
                  setImageUrlMale(res[0].url)           
                  setImageKeyMale(res[0].key)
                  toast.success('Foto Pengantin Pria Selesai Diupload!', {
                    position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                    });
                }}
                onUploadError={(error: Error) => {
                  toast.error('Foto Pengantin Pria Gagal Diupload!', {
                    position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                    });
                }}

            />

            <div className="mt-3">
              <p className="text-sm font-bold text-gray-600">Foto Pengantin Pria</p>
                
                {imageUrlMale.length?(
                    <div className="relative mt-2">
                        <Image src={imageUrlMale} alt="image" width={300} height={200} />
                        <div
                          onClick={(event) => handleRemoveImage(event, "male")}
                          className="absolute cursor-pointer bottom-1 right-1 px-1 py-1 text-2xl text-white bg-red-500 md:text-3xl active:scale-105 rounded-lg hover:bg-red-600"
                        >
                          <MdDeleteOutline />
                        </div>

                    </div>
                ):null}
            </div>
        </div>

        <hr />

        <div>
          <h2 className="font-bold text-xl my-5">Foto Pengantin Wanita</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, ullam officia!</p>
          <UploadDropzone
                className="border-gray-600 dark:border-gray-100"
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
                  if (imageUrlFemale !== "" && imageKeyFemale !== "") {
                    console.log("auto remove for", imageUrlFemale, imageKeyFemale);
                    const res = await removeImage(imageKeyFemale)
                  }
                  setImageUrlFemale(res[0].url)
                  setImageKeyFemale(res[0].key)
                  toast.success('Gambar Pengantin Wanita Selesai Diupload!', {
                    position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                  });
                }}
                onUploadError={(error: Error) => {
                toast.error('Foto Pengantin Wanite Gagal Diupload!', {
                  position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                  closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                  });
                }}

            />

            <div className="mt-3">
              <p className="text-sm font-bold text-gray-600">Foto Pengantin Wanita</p>
                {imageUrlFemale.length?(
                    <div className="relative mt-2">
                        <Image src={imageUrlFemale} alt="image" width={300} height={200} />
                        <div
                          onClick={(event) => handleRemoveImage(event, "female")}
                          className="absolute cursor-pointer bottom-1 right-1 px-1 py-1 text-2xl text-white bg-red-500 md:text-3xl active:scale-105 rounded-lg hover:bg-red-600"
                        >
                          <MdDeleteOutline />
                        </div>
                        

                    </div>
                ):null}
            </div>
        </div>
        <hr />

        <div>
          <h2 className="font-bold text-xl my-5">Foto Album</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, ullam officia!</p>
          <UploadDropzone
            className="border-gray-600 dark:border-gray-100"
            endpoint="imageUploaderAlbum"
            onClientUploadComplete={(res) => {
              // Pastikan res adalah array
              if (Array.isArray(res)) {
                // Ambil URL dari response
                const newUrls = res.map(file => file.url);

                // Gabungkan URL baru dengan URL yang sudah ada
                const updatedImageUrlAlbumList = [
                  ...imageUrlAlbumList,
                  ...newUrls
                ].slice(0, 6); // Batasi hingga maksimal 6 URL

                // Perbarui state
                setImageUrlAlbumList(updatedImageUrlAlbumList);
              }

              console.log("Files: ", res);
              toast.success('Gambar Album Selesai Diupload!', {
                position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                });
            }}
            onUploadError={(error: Error) => {
              // Tangani kesalahan saat upload
              toast.error('Foto Album Gagal Diupload!', {
                position: "bottom-right", autoClose: 2000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
                });
            }}
          />

          <div className="mt-3 ">
            <p className="text-sm font-bold text-gray-600">Foto Album</p>
            {imageUrlAlbumList.length ? (
              <div className="mt-2 grid grid-cols-2 gap-4 relative">
                {imageUrlAlbumList.map((url, index) => (
                  <div key={index}>
                    <Image src={url} alt={`image-${index}`} width={300} height={200} />

                  </div>
                ))}
                  <div
                    onClick={(event) => handleRemoveImage(event, "male")}
                    className="cursor-pointer flex flex-row gap-2 mt-3 px-1 py-1 text-md items-center text-white bg-red-500 md:text-lg active:scale-105 rounded-lg hover:bg-red-600"
                  >
                    <MdDeleteOutline />
                    <div><p>Hapus Semua Foto Album</p></div>
                  </div>
              </div>
            ) : null}
          </div>
        </div>

        <hr />

      </div>
    )
  };

  return (
    <div className="px-1 md:px-4 container pt-4 flex flex-col-reverse md:flex-row gap-1 md:gap-4 lg:gap-6 ">
      <div className="top-5   md:basis-3/6  bg-[url('/paper.svg')] dark:bg-[url('/paper-dark.svg')] flex justify-center  no-scroll py-4 md:py-10">
        <Preview formPreview={formPreview} theme={theme} coverUrl={imageUrlCover} maleUrl={imageUrlMale} femaleUrl={imageUrlFemale} albumUrl={imageUrlAlbumList}/>
      </div>

      {/* <div className="hidden md:block md:basis-3/6 "> */}
      <div className=" md:block md:basis-3/6 ">
        <div className="p-2 md:py-5 md:px-5">
          <form onSubmit={handleFormSubmit(onSubmit)} className="p-4 rounded-md shadow-sm">
            <div className="flex flex-col items-center gap-4 lg:col-span-2 lg:gap-6">
            <Accordion type="single" collapsible className="w-full md:w-[450px]">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex flex-row items-center group flex-start gap-5">
                      <div>
                        <PiHandHeartDuotone className="text-pink-600 h-7 w-7 group-hover:animate-pulse" />
                      </div>
                      <p className="">Masukan Data</p>
                    </div>

                    <div className="text-xs font-normal text-start text-solid hover:no-underline">Lorem ipsum dolor sit amet consectetur adipisicing</div>

                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {renderSectionBridalData()}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex flex-row items-center group flex-start gap-5">
                        <div>
                          <CgTemplate className="text-blue-600 h-7 w-7 group-hover:animate-pulse" />
                        </div>
                        <p className="">Pilih Kalimat</p>
                      </div>

                      <div className="text-xs font-normal text-start text-solid hover:no-underline">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                    </div>
                  </AccordionTrigger>
                <AccordionContent>
                  {renderSectionWordsTemplate()}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex flex-row items-center group flex-start gap-5">
                          <div>
                            <FaMusic className="text-green-600 h-7 w-7 group-hover:animate-pulse" />
                          </div>
                          <p className="">Pilih Backsound</p>
                        </div>
                        <div className="text-xs font-normal text-start text-solid hover:no-underline">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                      </div>

                </AccordionTrigger>
              <AccordionContent>

                  <>
                    <div className="flex justify-center mt-2">
                      <button
                        type="button"
                        onClick={() => setPage2(1)}
                        className={`text-gray-800 cursor-pointer border-y-2 border-l-2 border-gray-300 rounded-l-lg w-36 hover:scale-95 hover:text-green-800 hover:border-green-800 dark:text-gray-300 dark:hover:text-green-800 px-1 py-2 rounded`}
                      >
                        Instrumental
                      </button>
                      <button
                        type="button"
                        onClick={() => setPage2(2)}
                        className={`text-gray-800 cursor-pointer border-y-2 border-r-2 border-gray-300 rounded-r-lg w-36 hover:scale-95 hover:text-green-800 hover:border-green-800 dark:text-gray-300 dark:hover:text-green-800 px-1 py-2 rounded`}
                      >
                        Musik
                      </button>
                    </div>
                    {renderSectionSong()}
                    <div className="flex justify-end mt-4">
                    </div>
                  </>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex flex-row items-center group flex-start gap-5">
                        <div>
                          <FaImages className="text-red-600 h-7 w-7 group-hover:animate-pulse" />
                        </div>
                        <p className="">Upload Gambar</p>
                      </div>

                      <div className="text-xs font-normal text-start text-solid hover:no-underline">Lorem ipsum dolor sit amet consectetur adipisicing</div>
                    </div>
                  </AccordionTrigger>
                <AccordionContent>
                  {renderSectionImage()}


                </AccordionContent>
              </AccordionItem>

            </Accordion>

              <button
                type="button"
                onClick={() => document.getElementById('alertDialog')?.classList.remove('hidden')}
                className="bg-green-600 hover:bg-green-500 hover:scale-95 text-white px-4 py-2 rounded mt-10 w-[200px]"
              >
                Simpan
              </button>

              <div id="alertDialog" className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 hidden">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-[420px]">
                  <h2 className="text-xl font-semibold mb-4">Apakah Anda Yakin?</h2>
                  <p>Data yang sudah disimpan tidak bisa dirubah lagi</p>
                  <div className="flex justify-end gap-4 mt-7">
                    <button
                      onClick={() => document.getElementById('alertDialog')?.classList.add('hidden')}
                      className="bg-gray-100  dark:bg-gray-500 dark:hover:bg-gray-400 hover:bg-gray-200 px-3 py-1 rounded"
                    >
                      Lanjutkan Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleAlertSubmit}
                      className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Ya, saya yakin
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </form>
          <ToastContainer
            position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop={false}
            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"
            />
    
        </div>
    </div>
    </div>
  )
}

export default page
