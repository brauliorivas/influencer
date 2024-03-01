'use client';
import { createClient } from '@supabase/supabase-js';

export default function Connect({ name }: any) {
    const getURL = () => {
        let url = process?.env?.NODE_ENV === 'production' ? 'https://influencer-tools.vercel.app/dashboard/post' : 'http://localhost:3000/dashboard/post';
        return url;
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '');

    const handleConnectClick = (name: any) => {
        switch (name) {
            case 'Instagram':
                signInWithInstagram();
                break;
            case 'TikTok':
                signInWithTikTok();
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

    async function signInWithInstagram() {}

    async function signInWithTikTok() {}

    return (
        <button onClick={() => { handleConnectClick(name) }} className="g-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect</button>
    )
}
