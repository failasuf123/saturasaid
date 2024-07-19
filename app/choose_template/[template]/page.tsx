'use client';
import React, { Suspense, useEffect, useState } from 'react';
import {BridalCoupleList} from '@/shared/BridalCoupleList';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation'
import {BridalCouple} from '@/typings';

import Link from 'next/link';




export default function Links({ params }: { params: { template: string } }) {
  const [currentUser, setCurrentUser] = useState<BridalCouple | null>(null);
  const [templateShow, setTemplateShow] = useState<string | null>(null);

  useEffect(() => {
    const findUserByUrl = () => {
      const foundUser = BridalCoupleList.find(user => user.link === params.template);
      if (foundUser) {
        setCurrentUser(foundUser);
      } else {
        redirect('/404'); 
      }
    };

    findUserByUrl();
  }, [params.template]);

  useEffect(() => {
    const findTemplateDesain = () => {
      if (currentUser) {
        const templateName = currentUser.theme;
        console.log(templateName);
        setTemplateShow(templateName);
      }
    };

    findTemplateDesain();
  }, [currentUser]);


  const Template = dynamic(() => import(`@/components/public/Template/${templateShow}`)
    .catch((error) => {
      console.error('Error importing template:', error);
      return { default: () => <div>Template not found</div> }; // Menampilkan pesan saat template tidak ditemukan
    }), {
    ssr: false,
  });
  
  return (
      <div>
        <div >
            {Template? (
            <Template currentUser={currentUser} />
            ) : (
                <div>Loading template...</div>
                )}
        </div>
{/* 
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-10 backdrop-filter p-1 rounded-lg  flex  h-15 w-72 z-50">
            <Link href="/cvtest">
            <button  className="bg-white-50 bg-opacity-50 text-gray-500 py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-300 ease-in-out hover:bg-opacity-70 hover:bg-cyan-50 animate-pulse">
                <FontAwesomeIcon icon={faHandPointer} className="mr-2 text-md "/>
                <p>
                    Gunakan Template
                </p>
            </button>
            </Link>
        </div> */}

      </div>



  );
}
