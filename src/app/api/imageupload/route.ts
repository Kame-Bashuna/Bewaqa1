import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {

  const baseUrl = process.env.BASE_URL;
if (!baseUrl) {
  console.error('BASE_URL is not defined in environment variables');
  return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  
  try {
    const body = await request.json();
    const response = await fetch(`${baseUrl}/api/image-upload/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: errorData || 'Failed to post data.' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred. Please try again later. ' + (error as Error).message },
      { status: 500 }
    );
  }
}
