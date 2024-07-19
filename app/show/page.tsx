import React from 'react'
import {getAllWeddings} from '@/lib/data'

async function Show() {

    const weddings = await getAllWeddings();
    
  return (
    <div>
        {weddings.map((wedding,index) => (
            <div key={wedding.id}>
                <p>{wedding.nicknameMale}</p>
            </div>
        ))}
    </div>
  )
}

export default Show
