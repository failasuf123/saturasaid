"use client";
import React, { useState, useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Calendar } from "@/components/ui/calendar"; // Import Calendar component

// Define the schema for the form
const formSchema = z.object({
  // Section 1
  nicknameMale: z.string(),
  nicknameFemale: z.string(),
  fullnameMale: z.string(),
  fullnameFemale: z.string(),
  // Section 2
  dadMale: z.string(),
  momMale: z.string(),
  dadFemale: z.string(),
  momFemale: z.string(),
  // Section 3
  mainEventTime: z.date(), // Change to date
});

type FormSchema = z.infer<typeof formSchema>;

interface FormInputProps {
  formValues: FormSchema;
  setFormValues: React.Dispatch<React.SetStateAction<FormSchema>>;
}

function FormInput({ formValues, setFormValues }: FormInputProps) {
  const [page, setPage] = useState(0);
  const [date, setDate] = useState<Date | undefined>(formValues.mainEventTime);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
  });

  useEffect(() => {
    setValue('mainEventTime', date || new Date());
  }, [date, setValue]);

  const onSubmit: SubmitHandler<FormSchema> = data => {
    setFormValues(data);
    console.log(data);
  };

  const renderSection = () => {
    switch (page) {
      case 0:
        return (
          <>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="nicknameMale" className="block text-sm font-medium text-gray-700">Nickname Male</label>
              <input {...register('nicknameMale')} className="w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.nicknameMale && <span className="text-red-500 text-xs">{errors.nicknameMale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="nicknameFemale" className="block text-sm font-medium text-gray-700">Nickname Female</label>
              <input {...register('nicknameFemale')} className="w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.nicknameFemale && <span className="text-red-500 text-xs">{errors.nicknameFemale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="fullnameMale" className="block text-sm font-medium text-gray-700">Fullname Male</label>
              <input {...register('fullnameMale')} className="w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.fullnameMale && <span className="text-red-500 text-xs">{errors.fullnameMale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="fullnameFemale" className="block text-sm font-medium text-gray-700">Fullname Female</label>
              <input {...register('fullnameFemale')} className="w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.fullnameFemale && <span className="text-red-500 text-xs">{errors.fullnameFemale.message}</span>}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="dadMale" className="block text-sm font-medium text-gray-700">Dad Male</label>
              <input {...register('dadMale')} className="w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.dadMale && <span className="text-red-500 text-xs">{errors.dadMale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="momMale" className="block text-sm font-medium text-gray-700">Mom Male</label>
              <input {...register('momMale')} className="w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.momMale && <span className="text-red-500 text-xs">{errors.momMale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="dadFemale" className="block text-sm font-medium text-gray-700">Dad Female</label>
              <input {...register('dadFemale')} className="w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.dadFemale && <span className="text-red-500 text-xs">{errors.dadFemale.message}</span>}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="momFemale" className="block text-sm font-medium text-gray-700">Mom Female</label>
              <input {...register('momFemale')} className="w-full py-2 rounded-md border text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              {errors.momFemale && <span className="text-red-500 text-xs">{errors.momFemale.message}</span>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4 flex flex-col gap-2 items-center justify-center">
              <label htmlFor="mainEventTime" className="block text-sm font-medium text-gray-700">Main Event Times</label>
              <div className="flex items-center ">
                <Calendar date={date} onChange={setDate} />
                {errors.mainEventTime && <span className="text-red-500 text-xs">{errors.mainEventTime.message}</span>}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 rounded-md shadow-md">
      {renderSection()}
      <div className="flex justify-between mt-4">
        {page > 0 && <button type="button" onClick={() => setPage(page - 1)} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>}
        {page < 2 && <button type="button" onClick={() => setPage(page + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>}
        {page === 2 && <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>}
      </div>
    </form>
  );
}

export default FormInput;
