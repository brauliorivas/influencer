import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = JSON.parse(await request.text());
    const token = body.token;
    const text = body.text;

    const API = 'https://api.twitter.com/2/tweets';
    const auth = `Bearer ${token}`;

    const json = JSON.stringify({ 'text': text });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: json
    };

    const response = await fetch(API as string, requestOptions);
    const data = await response.json();
    return NextResponse.json(data);
}