'use client';

export default function Connect({ name, supabase}) {
    const handleConnectClick = (name) => {
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

    async function signInWithTwitter(supabase) {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'twitter',
        })
        console.log(data);
    }

    return (
        <button onClick={() => { handleConnectClick(name) }} className="g-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect</button>
    )
}
