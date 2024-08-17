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
      const foundUser = BridalCoupleList.find(user => user.id === 1);
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
      return { default: () => <div>Template not found {params.template}</div> };
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

     

      </div>



  );
}
