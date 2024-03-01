import { NextResponse } from 'next/server';

export async function GET() {
    const twitter_api = 'https://api.twitter.com/';

    const req_token = await fetch(twitter_api + 'oauth/request_token', {
        method: 'POST',
        body: JSON.stringify({
            oauth_callback: encodeURI('https://influencer-tools.vercel.app/dashboard/post'),
            oauth_consumer_key: process.env.NEXT_PUBLIC_TWITTER_API_KEY
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const token_data = await req_token.json();

    return NextResponse.json(token_data);
}