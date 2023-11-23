import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: ['/', '/api/webhook/clerk'],  //  routes that Clerk will authenticate, but that are considered to be public. This means that users will be able to access these routes without having to be signed in if they are not already signed in. However, if user signed out on any private page, Clerk will redirect them to a public route.
    ignoredRoutes: ['/api/webhook/clerk']   // routes that Clerk will not try to authenticate. This means that users will be able to access these routes without having to sign in.
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 