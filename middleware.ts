import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Toggle this to 'false' when you want the site live
  const isMaintenanceMode = true; 
  
  // This matches your folder name in /app
  const maintenancePath = '/coming-soon';

  const { pathname } = request.nextUrl;

  // 1. If maintenance is OFF, do nothing
  if (!isMaintenanceMode) {
    return NextResponse.next();
  }

  // 2. Prevent infinite loops: If they are ALREADY on /coming-soon, let them stay
  if (pathname.startsWith(maintenancePath)) {
    return NextResponse.next();
  }

  // 3. Ignore internal Next.js files and static assets (images, etc.)
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('/api/') ||
    pathname.includes('.') // catches .png, .jpg, .svg, etc.
  ) {
    return NextResponse.next();
  }

  // 4. Redirect everyone else to /coming-soon
  const url = request.nextUrl.clone();
  url.pathname = maintenancePath;
  
  // Use 'rewrite' to keep the original URL in the bar, 
  // or 'redirect' to physically move them to /coming-soon.
  return NextResponse.rewrite(url);
}

// Ensure the middleware runs on all routes
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}