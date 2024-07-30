"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FaImages } from "react-icons/fa";
import { CgTemplate } from "react-icons/cg";
import { PiHandHeartDuotone } from "react-icons/pi";
import { Calendar } from "@/components/ui/calendar"; // Import Calendar component
import { FaMusic } from "react-icons/fa";

import { IntroductionList } from '@/shared/Choose/IntroductionList';
import { GreetingList} from '@/shared/Choose/GreetingList';
import { HookMiddleList} from '@/shared/Choose/HookMiddleList';
import { StoryList} from '@/shared/Choose/StoryList';
import { ClosingList} from '@/shared/Choose/ClosingList'; 
import { MusicList} from '@/shared/Choose/MusicList'; 

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { UploadButton } from "@/app/utils/uploadthing";
import Image from "next/image";

const formSchema = z.object({
  // Card 1
  nicknameMale: z.string(),
  nicknameFemale: z.string(),
  fullnameMale: z.string(),
  fullnameFemale: z.string(),
  dadMale: z.string(),
  momMale: z.string(),
  dadFemale: z.string(),
  momFemale: z.string(),
  mainEventTime: z.date(),

  accountName1: z.string(),
  accountBank1: z.string(),
  accountNumber1: z.string(),

  accountName2: z.string(),
  accountBank2: z.string(),
  accountNumber2: z.string(),

  event1: z.string(),
  address1: z.string(),
  gmap1: z.string(),
  time1: z.date(),
  
  event2: z.string(),
  address2: z.string(),
  gmap2: z.string(),
  time2: z.date(),

  // Card 2
  introductionType: z.number(),
  greetingType: z.number(),
  hookMiddleType: z.number(),
  storyType: z.number(),
  closingType: z.number(),

  // Card 3
  songType: z.number(),

  // default
  theme: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const initialFormValues: FormSchema = {
  nicknameMale: "",
  nicknameFemale: "",
  fullnameMale: "",
  fullnameFemale: "",
  dadMale: "",
  momMale: "",
  dadFemale: "",
  momFemale: "",
  mainEventTime: new Date(),

  accountName1: "",
  accountBank1: "",
  accountNumber1: "",

  accountName2: "",
  accountBank2: "",
  accountNumber2: "",

  event1: "",
  address1: "",
  gmap1: "",
  time1: new Date(),
  
  event2: "",
  address2: "",
  gmap2: "",
  time2: new Date(),

  introductionType: 1,
  greetingType: 1,
  hookMiddleType: 1,
  storyType: 1,
  closingType: 1,

  songType: 1,

  theme:"",
};


const saveWeddingClient = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  console.log("ACTION");
  console.log(data, "Save from action");

  const convertedData = {
    ...data,
    mainEventTime: new Date(data.mainEventTime as string),
    time1: new Date(data.time1 as string),
    time2: new Date(data.time2 as string),
    introductionType: parseInt(data.introductionType as string, 10),
    greetingType: parseInt(data.greetingType as string, 10),
    hookMiddleType: parseInt(data.hookMiddleType as string, 10),
    storyType: parseInt(data.storyType as string, 10),
    closingType: parseInt(data.closingType as string, 10),
    songType: parseInt(data.songType as string, 10),
  };

  const validatedFields = formSchema.safeParse(convertedData);

  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error.flatten().fieldErrors);
    return {
      error: validatedFields.error.flatten().fieldErrors
    };
  }

  try {
    console.log("Validation succeeded, saving to database...");
    const response = await fetch('/api/saveWeddingData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      console.log('failed to save data')
      throw new Error('Failed to save data');
    }

    const result = await response.json();
    console.log("Data successfully saved to the database.", result);
  } catch (error) {
    console.error("Error saving data to the database:", error);
  }

  console.log("Validated Data:", validatedFields.data);
};








function DrawerTools() {
  const [formValues, setFormValues] = useState<FormSchema>(initialFormValues);
  const [date, setDate] = useState<Date | undefined>(formValues.mainEventTime);
  const [time1, setTime1] = useState<Date | undefined>(formValues.time1)
  const [time2, setTime2] = useState<Date | undefined>(formValues.time2)

  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
  const [page2, setPage2] = useState(0);
  const [page3, setPage3] = useState(0);

  const [selectedIntroductionIndex, setSelectedIntroductionIndex] = useState<number | null>(null);
  const [selectedGreetingIndex, setSelectedGreetingIndex] = useState<number | null>(null);
  const [selectedHookMiddleIndex, setSelectedHookMiddleIndex] = useState<number | null>(null);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [selectedClosingIndex, setSelectedClosingIndex] = useState<number | null>(null);
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(null);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
  });

  useEffect(() => {
    setValue('mainEventTime', date || new Date());
    setValue('time1', time1 || new Date())
    setValue('time2', time2 || new Date())
  }, [date, setValue, time1 , time2]);

  const onSubmit: SubmitHandler<FormSchema> = data => {
    setFormValues(data);
    
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const value = data[key as keyof FormSchema];
      formData.append(key, value instanceof Date ? value.toISOString() : value.toString());
    });
  
    console.log("Form submitted, calling saveWedding...");
    saveWeddingClient(formData);
    console.log("Form data:", data);
  };
  


  const renderSectionBridalData = () => {
    switch (page) {
      case 0:
        return (
          <>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="nicknameMale" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nickname Mempelai Pria</label>
              <input {...register('nicknameMale')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.nicknameMale && <span className="text-red-500 text-xs">{errors.nicknameMale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="nicknameFemale" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nickname Mempelai Wanita</label>
              <input {...register('nicknameFemale')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.nicknameFemale && <span className="text-red-500 text-xs">{errors.nicknameFemale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="fullnameMale" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nama Lengkap Mempelai Pria</label>
              <input {...register('fullnameMale')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.fullnameMale && <span className="text-red-500 text-xs">{errors.fullnameMale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="fullnameFemale" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nama Lengkap Mempelai Wanita</label>
              <input {...register('fullnameFemale')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.fullnameFemale && <span className="text-red-500 text-xs">{errors.fullnameFemale.message}</span>}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="dadMale" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ayahanda Pengantin Pria</label>
              <input {...register('dadMale')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.dadMale && <span className="text-red-500 text-xs">{errors.dadMale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="momMale" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ibunda Pengantin Pria</label>
              <input {...register('momMale')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.momMale && <span className="text-red-500 text-xs">{errors.momMale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="dadFemale" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ayahanda Pengantin Wanita</label>
              <input {...register('dadFemale')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.dadFemale && <span className="text-red-500 text-xs">{errors.dadFemale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="momFemale" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ibunda Pengantin Wanita</label>
              <input {...register('momFemale')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.momFemale && <span className="text-red-500 text-xs">{errors.momFemale.message}</span>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4 flex flex-col gap-2 items-center">
              <label htmlFor="mainEventTime" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Waktu Acara Utama</label>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center mx-4 my-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, praesentium velit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis rem autem, repellat explicabo voluptates tenetur eaque consectetur quia! Aliquam, ad!</p>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border shadow" />
              {errors.mainEventTime && <span className="text-red-500 text-xs">{errors.mainEventTime.message}</span>}
            </div>
          </>
          
        );
        case 3:
          return(
            <>
            <h2>Acara 1</h2>
            <ScrollArea className="w-[480px] h-full rounded-md border">
              <div className="flex flex-wrap w-max space-x-4 p-4 h-full gap-4">
                <div className="w-[330px]">
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="event1" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nama Event</label>
                    <input {...register('event1')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.event1 && <span className="text-red-500 text-xs">{errors.event1.message}</span>}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="address1" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Alamat</label>
                    <input {...register('address1')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.address1 && <span className="text-red-500 text-xs">{errors.address1.message}</span>}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="gmap1" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Link Gmap</label>
                    <input {...register('gmap1')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.gmap1 && <span className="text-red-500 text-xs">{errors.gmap1.message}</span>}
                  </div>

                </div>

                <div className="mb-4 flex flex-col gap-2">
                <label htmlFor="time1" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Waktu Kegiatan</label>

                  <Calendar mode="single" selected={time1} onSelect={setTime1} className="rounded-md border shadow" />
                  {errors.time1 && <span className="text-red-500 text-xs">{errors.time1.message}</span>}
                </div>
              <ScrollBar orientation="horizontal" />
              </div>
            </ScrollArea>
          </>

          );
          case 4:

            return(
              <>
                <h2>Acara 2</h2>
                <ScrollArea className="w-[480px] h-full rounded-md border">
                  <div className="flex flex-wrap w-max space-x-4 p-4 h-full gap-4">
                    <div className="w-[330px]">
                      <div className="mb-4 flex flex-col gap-2">
                        <label htmlFor="event2" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nama Event</label>
                        <input {...register('event2')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        {errors.event2 && <span className="text-red-500 text-xs">{errors.event2.message}</span>}
                      </div>
                      <div className="mb-4 flex flex-col gap-2">
                        <label htmlFor="address2" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Alamat</label>
                        <input {...register('address2')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        {errors.address2 && <span className="text-red-500 text-xs">{errors.address2.message}</span>}
                      </div>
                      <div className="mb-4 flex flex-col gap-2">
                        <label htmlFor="gmap2" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Link Gmap</label>
                        <input {...register('gmap2')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        {errors.gmap2 && <span className="text-red-500 text-xs">{errors.gmap2.message}</span>}
                      </div>
    
                    </div>
    
                    <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="time2" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Waktu Kegiatan</label>
    
                      <Calendar mode="single" selected={time2} onSelect={setTime2} className="rounded-md border shadow" />
                      {errors.time2 && <span className="text-red-500 text-xs">{errors.time2.message}</span>}
                    </div>
                  <ScrollBar orientation="horizontal" />
                  </div>
                </ScrollArea>
              </>
            );
          case 5: 
          return(
            <>
              <h2 className="text-lg font-bold text-gray-800 text-center">Lorem ipsum dolor sit am</h2>
              <p className="text-xs text-center text-gray-500 dark:text-gray-200">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error maxime sapiente cum ullam nam sequi, pariatur, repudiandae eum illum deleniti dolorem saepe.</p>
              <ScrollArea>

              <div className="flex flex-wrap w-max space-x-4 p-4 h-full gap-4">
                <div className="w-[300px]">
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="placeEvent" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Atas Nama Rekening 1</label>
                    <input {...register('accountName1')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountName1 && <span className="text-red-500 text-xs">{errors.accountName1.message}</span>}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="accountBank1" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Bank 1</label>
                    <input {...register('accountBank1')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountBank1 && <span className="text-red-500 text-xs">{errors.accountBank1.message}</span>}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="gmap" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nomor Rekening 1</label>
                    <input {...register('accountNumber1')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountNumber1 && <span className="text-red-500 text-xs">{errors.accountNumber1.message}</span>}
                  </div>

                </div>

                <div className="w-[300px]">
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="accountName2" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Atas Nama Rekening 2</label>
                    <input {...register('accountName2')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountName2 && <span className="text-red-500 text-xs">{errors.accountName2.message}</span>}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="accountBank2" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Bank 2</label>
                    <input {...register('accountBank2')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountBank2 && <span className="text-red-500 text-xs">{errors.accountBank2.message}</span>}
                  </div>
                  <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="accountNumber2" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nomor Rekening 2</label>
                    <input {...register('accountNumber2')} className="px-2 w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {errors.accountNumber2 && <span className="text-red-500 text-xs">{errors.accountNumber2.message}</span>}
                  </div>

                </div>


              </div>
              <ScrollBar orientation="horizontal" />

              </ScrollArea>

            </>
          )
      default:
        return null;
    }

  };


  const renderSectionWordsTemplate = () => {
    switch (page1) {
        case 0:
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
                </>
            );
        case 1:
            return (
                <>
                    <div className="mb-4 flex flex-col gap-2 justify-between items-center h-2/3">
                      <div>

                        <label htmlFor="template_introductionType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Pilih Pembukaan undangan</label>
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
                </>
            );
        case 2:
            return (
                <>
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
                </>
            );
        case 3:
            return (
                <>
                    <div className="mb-4 flex flex-col gap-2 justify-between items-center">
                        <label htmlFor="template_greetingType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Pilih Salam undangan</label>
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
                </>
            );
        case 4:
            return (
                <>
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
                </>
            )
        case 5:
            return (
                <>
                    <div className="mb-4 flex flex-col gap-2 justify-between items-center">
                        <label htmlFor="template_hookMiddle" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Pilih Ucapan Pertengahan undangan</label>
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
                </>
            )
        case 6:
            return(
                <>
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
                </>
            );
        case 7:
            return(
                <>
                    <div className="mb-4 flex flex-col gap-2 justify-between items-center">
                        <label htmlFor="template_storyType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Pilih Story undangan</label>
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
                </>
            )
        case 8:
            return (
                <>
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
                </>
            );
        case 9:
            return (
                <>
                    <div className="mb-4 flex flex-col gap-2 justify-between items-center">
                        <label htmlFor="template_closingType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Pilih Penutup undangan</label>
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
            );
        case 10:
            return (
                <>
                    <div className="mb-4 flex flex-col gap-2 py-3 px-5 justify-between items-center h-2/3">
                        <div className="font-bold text-lg">
                            6. Penutup
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error aut, quae dolor quo iusto pariatur. 
                                Doloribus nostrum est dolor? Excepturi illo corporis asperiores. Qui dolorem est error, suscipit odit
                                commodi exercitationem impedit tempora?
                            </p>
                        </div>
                    </div>
                </>
            );
        default:
            return null;
    }
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
              <div className="grid gap-4 mt-5">
                <ScrollArea className="w-96 h-72 rounded-md border">
                  <div className="flex flex-wrap w-max space-x-4 p-4">
                    {instrumentalSongs.map((song, index) => (
                      <div key={index}
                        onClick={() => {
                          setValue('songType', song.type);
                          setSelectedSongIndex(index);
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
          <div className="grid gap-4 mt-5">
            <ScrollArea className="w-96 h-72 rounded-md border">
              <div className="flex flex-wrap w-max space-x-4 p-4 h-56 items-center">
                {musicSongs.map((song, index) => (
                  <div key={index} 
                    onClick={() => {
                      setValue('songType', song.type);
                      setSelectedSongIndex(index);
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
    switch (page3) {
      case 0:
        return (
          <div className="basis-11/12 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center p-2">
              <h2 className="font-bold ">Upload Gambar Cover Undangan</h2>
              <p className="text-xs text-gray-300 mt-2 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, pariatur mollitia at quam culpa impedit sapiente repellendus debitis modi adipisci illo natus!</p>
            </div>

          </div>
        );
      case 1:
        return (
          <div className="basis-11/12">

          </div>
        );
      case 2:
        return (
          <div className="basis-11/12">

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="hidden md:block md:basis-1/6 ">
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 rounded-md shadow-md">
      <div className="grid auto-rows-max items-center gap-4 lg:col-span-2 lg:gap-6">

        <Dialog>
          <DialogTrigger asChild className="group h-[80px] px-2">
            <Button variant="outline" className="flex flex-col gap-2 group ">
              <div>
                <PiHandHeartDuotone className="text-pink-600 h-7 w-7 group-hover:animate-pulse" />
              </div>
              <p className="text-sm">Masukan Data</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
              {renderSectionBridalData()}
              <div className="flex justify-between mt-4">
                {page > 0 && <button type="button" onClick={() => setPage(page - 1)} className="bg-gray-500 text-white px-4 py-2 rounded">Kembali</button>}
                {page < 5 && <button type="button" onClick={() => setPage(page + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">Selanjutnya</button>}
                {page === 5 && <button type="button" className="bg-green-500 text-white px-4 py-2 rounded">Selesai</button>}
              </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild className="group h-[80px] px-2">
            <Button variant="outline" className="flex flex-col gap-2 group ">
              <div>
                <CgTemplate className="text-blue-600 h-7 w-7 group-hover:animate-pulse" />
              </div>
              <p className="text-sm">Pilih Kalimat</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="h-full flex flex-col ">
              {renderSectionWordsTemplate()}
              <div className="flex justify-between mt-4">
                {page1 > 0 && <button type="button" onClick={() => setPage1(page1 - 1)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:opacity-90">Kembali</button>}
                {page1 < 9 && <button type="button" onClick={() => setPage1(page1 + 1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90">Selanjutnya</button>}
                {page1 === 9 && <button type="button" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-90">Selesai</button>}
              </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild className="group h-[80px] px-2">
            <Button variant="outline" className="flex flex-col gap-2 group ">
              <div>
                <FaMusic  className="text-green-600 h-7 w-7 group-hover:animate-pulse" />
              </div>
              <p className="text-sm">Pilih Backsound</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
              <div className="flex justify-center mt-2">
                <button type="button" onClick={() => setPage2(1)} className={`text-gray-800  cursor-pointer border-y-2 border-l-2 border-gray-300 rounded-l-lg w-36 hover:scale-95 hover:text-green-800 hover:border-green-800 dark:text-gray-300 dark:hover:text-green-800 px-1 py-2 rounded `}>Instumental</button>
                <button type="button" onClick={() => setPage2(2)} className={`text-gray-800  cursor-pointer border-y-2 border-r-2 border-gray-300 rounded-r-lg w-36 hover:scale-95 hover:text-green-800 hover:border-green-800 dark:text-gray-300 dark:hover:text-green-800 px-1 py-2 rounded `}>Musik</button>


              </div>
              {renderSectionSong()}
              <div className="flex justify-end mt-4">
                {page2 === 1 && <button type="button" className="bg-green-500 text-white px-4 py-2 rounded">Selesai</button>}
                {page2 === 2 && <button type="button" className="bg-green-500 text-white px-4 py-2 rounded">Selesai</button>}
              </div>
          </DialogContent>
        </Dialog>



        <Dialog>
          <DialogTrigger asChild className="group h-[80px] px-2">
            <Button variant="outline" className="flex flex-col gap-2 group ">
              <div>
                <FaImages className="text-red-600 h-7 w-7 group-hover:animate-pulse" />
              </div>
              <p className="text-sm">Upload Gambar</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="h-full flex flex-col ">
              {renderSectionImage()}
              <div className="flex justify-between mt-4 basis-1/12">
                {page3 > 0 && <button type="button" onClick={() => setPage3(page3 - 1)} className="bg-gray-500 h-10 text-white px-4 py-2 rounded">Kembali</button>}
                {page3 < 2 && <button type="button" onClick={() => setPage3(page3 + 1)} className="bg-blue-500 h-10 text-white px-4 py-2 rounded">Selanjutnya</button>}
                {page3 === 2 && <button type="button" className="bg-green-500 h-10 text-white px-4 py-2 rounded">Selesai</button>}
              </div>
          </DialogContent>
        </Dialog>

        <Button  type="submit" className="mt-10 bg-red-600">Simpan</Button>
      </div>
      </form>
    </div>
  );
}

export default DrawerTools;
