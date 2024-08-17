'use client';
import { SignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function Page() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  console.log("User Id from signin", userId)

  // useEffect(() => {
  //   if (isLoaded && userId) {
  //     router.push('/validate');
  //   } else {
  //     console.log("Not redirecting. isLoaded:", isLoaded, "userId:", userId);
  //     router.push('/validate');

  //   }
  // }, [isLoaded, userId, router]);

  return(
     <div className="flex items-center justify-center min-h-screen">
       {/* <SignIn redirectUrl="/validate" /> */}
       <SignIn  />
    </div>
  );
}