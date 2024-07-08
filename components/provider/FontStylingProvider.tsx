import React from 'react'
import { 
    Inter,
    Playball,
    Hachi_Maru_Pop,
    Bilbo,
} from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

const playball = Playball({
  weight: '400',
  subsets: ['latin'],
});

const hachi_maru_pop = Hachi_Maru_Pop({
    weight:'400',
    subsets: ['latin'],

})
const bilbo = Bilbo({
    weight:'400',
    subsets: ['latin'],

})
// cyrillic



export{inter, playball, hachi_maru_pop, bilbo}

