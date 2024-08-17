"use client";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function Page() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push('/validate');
    } else {
      console.log("Not redirecting. isLoaded:", isLoaded, "userId:", userId);
    }
  }, [isLoaded, userId, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp redirectUrl="/validate"/>
    </div>
  );
}
