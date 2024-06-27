'use client'
import Logo from '@/components/Logo'
import {ThemeModeButton} from '@/components/ThemeModeButton'
import { UserButton } from '@clerk/clerk-react'
import React, { ReactNode } from 'react'
import { useTheme } from 'next-themes';



function Layout({children}:{children:ReactNode}) {
      const { theme } = useTheme();
  return (
    <div className="flex flex-col min-h-screen max-w-full bg-background max-h-screen ">
     <nav className={`flex justify-between items-center border-b border-border h-[60px] px-4 py-2 `}>
            <Logo/>
            <div className="flex  items-center gap-4">
                <ThemeModeButton />
                <UserButton afterSignOutUrl="/sign-in"/>
            </div>
        </nav>
        <main className="flex w-full flex-grow">
            {children}
        </main>
     </div>
  )
}

export default Layout
