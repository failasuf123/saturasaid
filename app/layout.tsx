import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            <header className="flex flex-row ">
              {/* <SignedOut>
                <SignInButton >
                  <button className="px-3 py-2 bg-gray-800 text-white rounded-2xl hover:scale-95">Signin</button>
                </SignInButton >
              </SignedOut> */}
              <SignedIn>
                
             
              </SignedIn>
            </header>
            <main>
              {children}
            </main>
          </ ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}