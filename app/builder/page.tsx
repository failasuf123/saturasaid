import Canvas from '@/components/builder/Canvas'
import DrawerTools from '@/components/builder/DrawTools'
import React from 'react'

function page() {
  return (
    <div className="px-1 md:px-4 container pt-4 flex gap-1 md:gap-4 lg:gap-6 ">
      <Canvas/>
      <DrawerTools />
    </div>
  )
}

export default page
