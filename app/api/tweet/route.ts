import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';

export async function POST(request: Request) {
    const body = JSON.parse(await request.text());
    const { access_token, secret_token } = body.tokens;
    const text = body.text;

    const client = new TwitterApi({
        appKey: process.env.NEXT_PUBLIC_TWITTER_API_KEY as string,
        appSecret: process.env.NEXT_PUBLIC_TWITTER_API_SECRET as string,
        accessToken: access_token,
        accessSecret: secret_token
    });

    const response = await client.v2.tweet(text);

    return NextResponse.json(response);
}