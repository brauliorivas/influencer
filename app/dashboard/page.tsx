'use server'

import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

const socialNetworks = [
  {
    name: 'Instagram',
    icon: '/icons/instagram.png',
  },
  {
    name: 'TikTok',
    icon: '/icons/tiktok.png',
  },
  {
    name: 'Twitter',
    icon: '/icons/twitter.png',
  },
]

export default async function page() {
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
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
    })
    console.log(data);
  }
  

  return (
    <div className="w-full p-10">
      <p className="text-black text-4xl font-semibold mb-10">Connections</p>
      <div className="grid grid-cols-2 gap-10">
        {socialNetworks.map((network) => (
          <div key={network.name} className="aspect-w-1 aspect-h-1 bg-blue-500 text-white p-4 rounded-lg flex items-center justify-center">
            <Image
              src={network.icon}
              alt={network.name}
              width={30}
              height={30}
            />
            <div className="mx-10">
              <p className="text-black text-2xl font-semibold mb-2">{network.name}</p>
              <button onClick={() => {handleConnectClick(network.name)}} className="g-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
