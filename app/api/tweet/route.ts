import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = JSON.parse(await request.text());
    const { access_token, secret_token } = body.tokens;
    const text = body.text;

    const response = await fetch('https://api.twitter.com/1.1/statuses/update.json?status=' + encodeURI(text), {
        method: 'POST',
        headers: {
            'Authorization': `authorization: OAuth oauth_consumer_key=${process.env.TWITTER_API_KEY}, oauth_nonce="OAUTH_NONCE", oauth_signature="OAUTH_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="OAUTH_TIMESTAMP", oauth_token=${access_token}, oauth_version="1.0"`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 'text': text })
    });

    return NextResponse.json(response);
}