import { NextResponse } from 'next/server';

export async function GET() {
    const twitter_api = 'https://api.twitter.com/';

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'oauth_callback': encodeURI('https://influencer-tools.vercel.app/dashboard/post')
        })
    }

    const req_token = await fetch(twitter_api + 'oauth/request_token', request);

    const token_data = await req_token.json();

    return NextResponse.json(token_data);
}