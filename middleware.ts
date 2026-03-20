import { NextRequest } from "next/server";
import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
  ConvexAuthNextjsMiddlewareContext,
} from "@convex-dev/auth/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAdminLoginRoute = createRouteMatcher(["/admin/login"]);
const isUserLoginRoute = createRouteMatcher(["/login"]);

export default convexAuthNextjsMiddleware(
  async (request: NextRequest, { convexAuth }: { convexAuth: ConvexAuthNextjsMiddlewareContext }) => {
    const isAuthenticated = await convexAuth.isAuthenticated();

  // Redirect authenticated users away from the login page
  if (isAdminLoginRoute(request) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/admin");
  }
  if (isUserLoginRoute(request) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/profile");
  }

  // Redirect unauthenticated users away from admin pages
  if (isAdminRoute(request) && !isAdminLoginRoute(request) && !isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/admin/login");
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
