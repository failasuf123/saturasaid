'use client';

import React, { Suspense, useEffect, useState } from 'react';

import { BridalCoupleList } from '@/shared/BridalCoupleList';
import dynamic from 'next/dynamic';
import { BridalCouple } from '@/typings';
import { ScrollArea } from "@/components/ui/scroll-area"
import { IntroductionList } from '@/shared/Choose/IntroductionList';


interface UserProfileDisplayProps {
  formPreview: any;
  theme: string;
  coverUrl: string;
  maleUrl: string;
  femaleUrl: string;
  albumUrl: string[];
}

// export const currentUsers = () => {}
const UserProfileDisplay: React.FC<UserProfileDisplayProps> = ({
  formPreview,
  theme,
  coverUrl,
  maleUrl,
  femaleUrl,
  albumUrl,
}) => {
  const [templateShow, setTemplateShow] = useState<string | null>(null);


  useEffect(() => {
    setTemplateShow(theme)
  },[theme])

  const Template = dynamic<{formPreview: any,  coverUrl: string, maleUrl: string, femaleUrl: string, albumUrl: string[] }>(() => import(`@/components/public/Preview/${templateShow}`)
    .catch((error) => {
      console.error('Error importing template:', error);
      return { default: () => <div>Template not found</div> }; // Menampilkan pesan saat template tidak ditemukan
    }), {
    ssr: false,
  });

  return (
    // <ScrollArea className="w-full max-w-[1740px] h-[1000px] mx-auto flex flex-col items-center snap-y snap-mandatory">
    <ScrollArea className="h-[500px] md:h-[1000px] fixed relative">
    <div>

        <div className="flex flex-col scale-75 md:scale-100 ">
          {Template ? (
            <Template formPreview={formPreview} coverUrl={coverUrl} maleUrl={maleUrl} femaleUrl={femaleUrl} albumUrl={albumUrl} />
          ) : (
            <div>Loading template...</div>
          )}
        </div>
    </div>
    </ScrollArea>
  );
};

export default UserProfileDisplay;
