import { AccordionInfo } from '@/components/dashboard/AccordionInfo'
import { DataTableDemo } from '@/app/dashboard/components/DataTable'
import { WordInvitation } from '@/app/dashboard/components/WordInvitation'
import React from 'react'
import { ConfirmationTable } from '../components/ConfirmationTable';
import StatusOfPayment from '../components/StatusOfPayment';
import Script from 'next/script';



interface PageProps {
  params: {
    weddingId: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { weddingId } = params;

  return (
    <div className="container py-5 flex flex-col md:flex-row  gap-4 md:gap-4 lg:gap-4">

      <div className='md:basis-1/2 flex flex-col gap-10' >
        <StatusOfPayment id={weddingId}/>
        <DataTableDemo id={weddingId}/>
        <ConfirmationTable id={weddingId} />
      </div>

      <div className='flex flex-col-reverse mb-3 md:mb-0 md:flex-col md:basis-1/2'>
        <div>
          <h2 className="text-lg md:text-xl mb-3 mt-2">Informasi</h2>
          <AccordionInfo />
        </div>
        <hr className="my-4"/>
        <WordInvitation />
      </div>
    </div>
  );
};

export default Page;
