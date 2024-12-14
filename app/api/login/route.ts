import { NextRequest, NextResponse } from 'next/server';
import { authenticate, setAuthCookie } from '@/lib/auth';

const RATE_LIMIT = 5;
const TIME_WINDOW = 60 * 1000;

const requestCounts: { [key: string]: { count: number; timestamp: number } } = {};

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';

 
  const currentTime = Date.now();
  const requestLog = requestCounts[ip] || { count: 0, timestamp: currentTime };

  if(currentTime - requestLog.timestamp > TIME_WINDOW) {
    requestLog.count = 0;
    requestLog.timestamp = currentTime;
  }
  
  requestLog.count += 1;

  if(requestLog.count > RATE_LIMIT) {
    return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
  }

  requestCounts[ip] = requestLog;

  if (authenticate(username, password)) {
    // Set authentication cookie
    setAuthCookie();
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
