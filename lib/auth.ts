import { cookies } from "next/headers";

export function authenticate(username: string, password: string): boolean {
  return (
    username === process.env.NEXT_PUBLIC_ADMIN_USER &&
    password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  );
}

export function setAuthCookie() {
  cookies().set('authenticated', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 // 24 hours
  });
}

export function clearAuthCookie() {
  cookies().delete('authenticated');
}

export function isAuthenticated() {
  return cookies().get('authenticated')?.value === 'true';
}
