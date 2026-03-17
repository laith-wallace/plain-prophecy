// This file provides missing type definitions for @convex-dev/auth subpaths
// that are not properly exported in the package.json of the library.

declare module "@convex-dev/auth/nextjs/server" {
  import { 
    convexAuthNextjsMiddleware, 
    createRouteMatcher, 
    nextjsMiddlewareRedirect,
    ConvexAuthNextjsServerProvider,
    convexAuthNextjsToken,
    isAuthenticatedNextjs,
    ConvexAuthNextjsMiddlewareContext
  } from "@convex-dev/auth/dist/nextjs/server/index";
  
  export { 
    convexAuthNextjsMiddleware, 
    createRouteMatcher, 
    nextjsMiddlewareRedirect,
    ConvexAuthNextjsServerProvider,
    convexAuthNextjsToken,
    isAuthenticatedNextjs,
    ConvexAuthNextjsMiddlewareContext
  };
}

declare module "@convex-dev/auth/nextjs" {
  import { ConvexAuthNextjsProvider } from "@convex-dev/auth/dist/nextjs/index";
  export { ConvexAuthNextjsProvider };
}

declare module "@convex-dev/auth/react" {
  import { useAuthActions, useAuthToken, ConvexAuthProvider } from "@convex-dev/auth/dist/react/index";
  export { useAuthActions, useAuthToken, ConvexAuthProvider };
}
