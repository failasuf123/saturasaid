'use client';
import React, { Suspense, useEffect, useState } from 'react';
import {BridalCoupleList} from '@/shared/BridalCoupleList';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation'
import {BridalCouple} from '@/typings';
import { GiClick } from "react-icons/gi";
import Link from 'next/link';





export default function Links({ params }: { params: { template: string } }) {
  const [currentUser, setCurrentUser] = useState<BridalCouple | null>(null);
  const [templateShow, setTemplateShow] = useState<string | null>(null);

  useEffect(() => {
    const findUserByUrl = () => {
      const foundUser = BridalCoupleList.find(user => user.id === "1");
      if (foundUser) {
        setCurrentUser(foundUser);
      } else {
        // redirect('/404'); 
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


  // Ubah komponen dynamic import untuk menerima currentUser
  const Template = dynamic<{ currentUser: BridalCouple | null }>(() => import(`@/components/public/Template/${params.template}`)
    .catch((error) => {
      console.error('Error importing template:', error);
      return { default: () => <div>Template not found</div> };
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

        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-30 backdrop-filter p-1 rounded-lg flex justify-center items-center h-15 w-72 z-50">
            <Link href={`/create/${params.template}`}>
                <button className="flex items-center justify-center bg-white-50 bg-opacity-50 text-gray-500 py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-300 ease-in-out hover:bg-opacity-70 hover:bg-cyan-50 animate-blink w-full">
                    <GiClick className="mr-2 text-md" />
                    <p>Gunakan Template</p>
                </button>
            </Link>
        </div>


      </div>



  );
}
