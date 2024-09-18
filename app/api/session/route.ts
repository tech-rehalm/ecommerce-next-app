// app/api/session/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/getSession'; // Adjust the import path if necessary

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }
}
