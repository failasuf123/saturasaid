'use client'
import Logo from '@/components/Logo'
import {ThemeModeButton} from '@/components/ThemeModeButton'
import { UserButton } from '@clerk/clerk-react'
import { SignedOut, SignInButton } from '@clerk/nextjs'
import React, { ReactNode } from 'react'



function Layout({children}:{children:ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen max-w-full bg-background max-h-screen">
        <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
            <Logo/>
            <div className="flex  items-center gap-2">
                <ThemeModeButton />
                <UserButton afterSignOutUrl="/sign-in"/>
                <SignedOut>
                <SignInButton >
                  <button className="px-3 py-2  bg-gradient-to-r from-red-500 to-blue-500 border-4 bg-clip-text text-transparent border-gray-300 dark:border-gray-100 dark:border-2 rounded-full scale-95 hover:scale-90">SignIn</button>
                </SignInButton >
              </SignedOut>
            </div>
        </nav>
        <main className="flex w-full flex-grow">
            {children}
        </main>
     </div>
  )
}

export default Layout
