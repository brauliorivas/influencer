'use client';
import { createClient } from '@supabase/supabase-js';

export default function Connect({ name }: any) {
    const getURL = () => {
        let url =
            process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
            process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
            'http://localhost:3000/'
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
        return url
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '');

    const handleConnectClick = (name: any) => {
        switch (name) {
            case 'Instagram':
                // signInWithInstagram();
                break;
            case 'TikTok':
                // signInWithTikTok();
                break;
            case 'Twitter':
                signInWithTwitter();
                break;
        }
    }

    async function signInWithTwitter() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'twitter',
            options: {
                redirectTo: getURL(),
            }
        });
    }

    return (
        <button onClick={() => { handleConnectClick(name) }} className="g-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect</button>
    )
}
