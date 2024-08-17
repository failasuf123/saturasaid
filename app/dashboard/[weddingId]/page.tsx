import { AccordionInfo } from '@/components/dashboard/AccordionInfo'
import { DataTableDemo } from '@/app/dashboard/components/DataTable'
import { WordInvitation } from '@/app/dashboard/components/WordInvitation'
import React from 'react'



interface PageProps {
  params: {
    weddingId: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { weddingId } = params;

  return (
    <div className="container py-5 flex flex-col md:flex-row  gap-4 md:gap-6 lg:gap-8">
      <div className='md:basis-1/2'>
        <DataTableDemo id={weddingId} />
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
