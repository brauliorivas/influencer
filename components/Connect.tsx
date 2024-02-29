'use client';

export default function Connect({ name, supabase}: any) {
    const handleConnectClick = (name: any) => {
        switch (name) {
            case 'Instagram':
                // signInWithInstagram();
                break;
            case 'TikTok':
                // signInWithTikTok();
                break;
            case 'Twitter':
                signInWithTwitter(supabase);
                break;
        }
    }

    async function signInWithTwitter(supabase: any) {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'twitter',
        })
        console.log(data);
    }

    return (
        <button onClick={() => { handleConnectClick(name) }} className="g-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect</button>
    )
}
