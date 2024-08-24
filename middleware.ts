import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', // Lindungi semua rute yang dimulai dengan /dashboard
  '/create(.*)',
  '/preview(.*)',
  '!/api/transaction(.*)', 
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect(); // Arahkan pengguna yang belum login ke halaman sign-in
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in se arch params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
