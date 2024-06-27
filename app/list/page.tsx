import TemplateWeddingList from '@/components/TemplateWeddingList'
import React from 'react'

function page() {
  return (
    <div className="container p-4 md:p-8 pt-4">
        <h2 className="text-xl md:text-2xl text-gray-800 font-bold dark:text-white">Pilih Template</h2>
        
        <TemplateWeddingList />
      
    </div>
  )
}

export default page
