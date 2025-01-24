// src/app/api/avatar/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Check if filename exists
  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  // Ensure request body is not null
  const body = request.body;
  if (!body) {
    return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
  }

  // Upload the file to Vercel Blob
  try {
    const blob = await put(filename, body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
