import { NextResponse } from 'next/server';
import crypto from 'crypto';

interface OAuthParameter {
    key: string;
    value: string;
}

function percentEncode(value: string): string {
    return encodeURIComponent(value).replace(/[!*()']/g, (char) => {
        return '%' + char.charCodeAt(0).toString(16).toUpperCase();
    });
}

function buildOAuthString(parameters: OAuthParameter[]): string {
    // Sort parameters alphabetically by encoded key
    parameters.sort((a, b) => {
        const keyA = percentEncode(a.key);
        const keyB = percentEncode(b.key);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        // If keys are equal, sort by value
        const valueA = percentEncode(a.value);
        const valueB = percentEncode(b.value);
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
    });

    // Build the encoded string
    let encodedString = '';
    parameters.forEach((param, index) => {
        const encodedKey = percentEncode(param.key);
        const encodedValue = percentEncode(param.value);
        encodedString += `${encodedKey}=${encodedValue}`;
        if (index < parameters.length - 1) {
            encodedString += '&';
        }
    });

    return encodedString;
}

function encodeSignatureBaseString(httpMethod: string, url: string, parameterString: string): string {
    // Convert HTTP Method to uppercase
    const encodedMethod = httpMethod.toUpperCase();

    // Percent encode the URL
    const encodedUrl = encodeURIComponent(url);

    // Percent encode the parameter string
    const encodedParams = parameterString.replace(/%/g, '%25'); // Encode percent characters
    const encodedParameterString = encodeURIComponent(encodedParams);

    // Build the signature base string
    const signatureBaseString = `${encodedMethod}&${encodedUrl}&${encodedParameterString}`;

    return signatureBaseString;
}

function generateSigningKey(consumerSecret: string, tokenSecret?: string): string {
    // Percent encode the consumer secret
    const encodedConsumerSecret = encodeURIComponent(consumerSecret);

    if (tokenSecret) {
        // Percent encode the token secret
        const encodedTokenSecret = encodeURIComponent(tokenSecret);

        // Combine and return the signing key
        return `${encodedConsumerSecret}&${encodedTokenSecret}`;
    } else {
        // Return the consumer secret with an ampersand
        return `${encodedConsumerSecret}&`;
    }
}

function calculateSignature(signatureBaseString: string, signingKey: string): string {
    // Calculate HMAC-SHA1 hash
    const hmac = crypto.createHmac('sha1', signingKey);
    hmac.update(signatureBaseString);
    const signature = hmac.digest('binary');

    // Base64 encode the signature
    const base64EncodedSignature = Buffer.from(signature, 'binary').toString('base64');

    return base64EncodedSignature;
}

function buildHeaderString(parameters: OAuthParameter[]): string {
    let headerString = 'OAuth ';

    parameters.forEach((param, index) => {
        const encodedKey = percentEncode(param.key);
        const encodedValue = percentEncode(param.value);
        headerString += `${encodedKey}="${encodedValue}"`;
        if (index < parameters.length - 1) {
            headerString += ', ';
        }
    });

    return headerString;
}


export async function POST(request: Request) {
    const body = JSON.parse(await request.text());
    const { access_token, secret_token } = body.tokens;
    const text = body.text;

    // random 32 bytes
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);
    let binaryString = '';
    randomBytes.forEach(byte => binaryString += String.fromCharCode(byte));
    const nonce = btoa(binaryString);
    const timestamp = Math.floor(Date.now() / 1000);

    const method = 'POST';

    const base_url = 'https://api.twitter.com/1.1/statuses/update.json';

    const parameters: OAuthParameter[] = [
        { key: 'status', value: text },
        { key: 'oauth_consumer_key', value: process.env.NEXT_PUBLIC_TWITTER_API_KEY },
        { key: 'oauth_nonce', value: nonce },
        { key: 'oauth_signature_method', value: 'HMAC-SHA1' },
        { key: 'oauth_timestamp', value: timestamp.toString() },
        { key: 'oauth_token', value: access_token },
        { key: 'oauth_version', value: '1.0' }
    ];

    const encodedString = buildOAuthString(parameters);
    
    const signatureBaseString = encodeSignatureBaseString(method, base_url, encodedString);

    const signingKey = generateSigningKey(process.env.NEXT_PUBLIC_TWITTER_API_SECRET as string, secret_token);

    const signature = calculateSignature(signatureBaseString, signingKey);

    const requestParameters: OAuthParameter[] = [
        { key: 'oauth_consumer_key', value: process.env.NEXT_PUBLIC_TWITTER_API_KEY as string},
        { key: 'oauth_nonce', value: nonce },
        { key: 'oauth_signature', value: signature },
        { key: 'oauth_signature_method', value: 'HMAC-SHA1' },
        { key: 'oauth_timestamp', value: timestamp.toString() },
        { key: 'oauth_token', value: access_token },
        { key: 'oauth_version', value: '1.0' }
    ]

    const headerString = buildHeaderString(requestParameters);

    const response = await fetch('https://api.twitter.com/1.1/statuses/update.json?status=' + encodeURI(text), {
        method: 'POST',
        headers: {
            'Authorization': headerString,
            'Content-Type': 'application/json',
        },
    });

    return NextResponse.json(response);
}
/*

curl --request POST \

  --url 'https://api.twitter.com/1.1/statuses/update.json?status=Hello%20world' \

  --header 'authorization: OAuth oauth_consumer_key="CONSUMER_API_KEY", oauth_nonce="OAUTH_NONCE", oauth_signature="OAUTH_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="OAUTH_TIMESTAMP", oauth_token="ACCESS_TOKEN", oauth_version="1.0"' \

  */