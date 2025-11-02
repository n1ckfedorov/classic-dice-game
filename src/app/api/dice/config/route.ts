import { NextResponse } from 'next/server';
import { getGameConfig } from '@/utils/dice/config';

export async function GET() {
  const config = getGameConfig();
  return NextResponse.json({ success: true, code: 0, data: config });
}
